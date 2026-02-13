"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  FileText,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Search,
  Download,
  Terminal,
  Filter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for system logs
const mockLogs = [
  {
    id: "LOG-001",
    timestamp: new Date(2024, 2, 10, 14, 30, 25).toISOString(),
    level: "info",
    source: "Authentication Service",
    message: "User login successful",
    userId: "USR-12345",
    ip: "192.168.1.105",
  },
  {
    id: "LOG-002",
    timestamp: new Date(2024, 2, 10, 14, 32, 10).toISOString(),
    level: "warning",
    source: "Payment Gateway",
    message: "Transaction processing time exceeded 2s",
    userId: "USR-67890",
    ip: "192.168.1.112",
  },
  {
    id: "LOG-003",
    timestamp: new Date(2024, 2, 10, 14, 35, 45).toISOString(),
    level: "error",
    source: "Database",
    message: "Connection timeout while fetching menu items",
    userId: "System",
    ip: "10.0.0.5",
  },
  {
    id: "LOG-004",
    timestamp: new Date(2024, 2, 10, 14, 36, 12).toISOString(),
    level: "info",
    source: "Order Service",
    message: "New order placed successfully",
    userId: "USR-54321",
    ip: "192.168.1.200",
  },
  {
    id: "LOG-005",
    timestamp: new Date(2024, 2, 10, 14, 40, 0).toISOString(),
    level: "success",
    source: "Email Service",
    message: "Order confirmation email sent",
    userId: "USR-54321",
    ip: "System",
  },
  // Generate more logs
  ...Array.from({ length: 15 }).map((_, i) => ({
    id: `LOG-00${i + 6}`,
    timestamp: new Date(2024, 2, 10, 14, 41 + i, 15).toISOString(),
    level: ["info", "warning", "error", "success"][
      Math.floor(Math.random() * 4)
    ],
    source: ["Auth Service", "Order Service", "Payment Gateway", "Database"][
      Math.floor(Math.random() * 4)
    ],
    message: "Automated system check performed",
    userId: "System",
    ip: "127.0.0.1",
  })),
];

type LogLevel = "info" | "warning" | "error" | "success";

export default function AdminLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "all" || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "error":
        return (
          <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">
            <AlertCircle className="size-3 mr-1" /> Error
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
            <AlertCircle className="size-3 mr-1" /> Warning
          </Badge>
        );
      case "success":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="size-3 mr-1" /> Success
          </Badge>
        );
      default:
        return (
          <Badge
            variant="secondary"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <FileText className="size-3 mr-1" /> Info
          </Badge>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6 h-[calc(100vh-2rem)]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Logs</h1>
          <p className="text-sm text-muted-foreground">
            Monitor system activity and debug issues.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-64 bg-background"
            />
          </div>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="success">Success</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="size-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full min-h-0">
        {/* Recent Logs List */}
        <Card className="md:col-span-2 border-none shadow-md flex flex-col h-full overflow-hidden">
          <CardHeader className="pb-3 border-b bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="size-5 text-muted-foreground" />
                <CardTitle>Console Output</CardTitle>
              </div>
              <Badge variant="outline" className="font-mono text-xs">
                {filteredLogs.length} events
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-hidden font-mono text-sm bg-[#1e1e1e] text-gray-300">
            <ScrollArea className="h-full w-full p-4">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="mb-2 hover:bg-white/5 p-1 rounded -mx-1 px-2 group transition-colors flex gap-3"
                >
                  <span className="text-gray-500 shrink-0 select-none w-[150px]">
                    {format(new Date(log.timestamp), "MMM dd HH:mm:ss")}
                  </span>
                  <div className="flex-1 break-all">
                    <span
                      className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        log.level === "error"
                          ? "bg-red-500"
                          : log.level === "warning"
                            ? "bg-yellow-500"
                            : log.level === "success"
                              ? "bg-green-500"
                              : "bg-blue-500"
                      }`}
                    />
                    <span className="text-orange-400 mr-2">[{log.source}]</span>
                    <span
                      className={log.level === "error" ? "text-red-400" : ""}
                    >
                      {log.message}
                    </span>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Stats & Filters */}
        <div className="flex flex-col gap-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Log distribution in the last 24h
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-2 bg-red-50 text-red-700 rounded-lg">
                <span className="flex items-center gap-2 font-medium">
                  <AlertCircle className="size-4" /> Errors
                </span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 text-yellow-700 rounded-lg">
                <span className="flex items-center gap-2 font-medium">
                  <AlertCircle className="size-4" /> Warnings
                </span>
                <span className="font-bold">5</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-blue-50 text-blue-700 rounded-lg">
                <span className="flex items-center gap-2 font-medium">
                  <FileText className="size-4" /> Info
                </span>
                <span className="font-bold">342</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md flex-1">
            <CardHeader>
              <CardTitle>Sources</CardTitle>
              <CardDescription>Event frequency by source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>Auth Service</span>
                  <span className="font-mono">45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Order Service</span>
                  <span className="font-mono">30%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "30%" }}
                  ></div>
                </div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Database</span>
                  <span className="font-mono">15%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "15%" }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
