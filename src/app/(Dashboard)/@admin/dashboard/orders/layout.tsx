export default function layout({ 
  children
}: { 
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="flex-1">{children}</div>
    </div>
  )
}
