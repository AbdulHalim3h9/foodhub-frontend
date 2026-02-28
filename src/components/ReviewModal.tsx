"use client";

import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // ← prefer shadcn Textarea if available
import { Star } from "lucide-react";
import { toast } from "sonner";
import {
  createMealReview,
  deleteMealReview,
} from "@/actions/review.action";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  mealId: string;
  mealName: string;
  existingReview?: {
    id: string;
    rating: number;
    comment: string | null;
  } | null;
  onReviewChange?: () => void; // optional callback to refresh parent
}

export default function ReviewModal({
  isOpen,
  onClose,
  mealId,
  mealName,
  existingReview,
  onReviewChange,
}: ReviewModalProps) {
  const [rating, setRating] = useState(existingReview?.rating ?? 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState(existingReview?.comment ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isViewOnlyMode = !!existingReview && rating === existingReview.rating && comment === (existingReview.comment ?? "");

  const effectiveRating = hoveredRating || rating;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError("Please select a rating (1–5 stars)");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const payload = { rating, comment: comment.trim() || null };

    const result = existingReview
      ? await createMealReview(mealId, payload)
      : await createMealReview(mealId, payload);

    if (result.success) {
      toast.success("Review submitted!");
      onReviewChange?.();
      onClose();
    } else {
      const msg = result.error || "Something went wrong";
      setError(msg);
      toast.error(msg);
    }

    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (!existingReview) return;
    if (!confirm("Delete this review permanently?")) return;

    setIsDeleting(true);
    setError(null);

    const result = await deleteMealReview(mealId, existingReview.id);

    if (result.success) {
      toast.success("Review deleted");
      onReviewChange?.();
      onClose();
    } else {
      const msg = result.error || "Failed to delete review";
      setError(msg);
      toast.error(msg);
    }

    setIsDeleting(false);
  };

  const StarRating = () => (
    <div className="flex justify-center gap-1.5 mb-6">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onMouseEnter={() => setHoveredRating(star)}
          onMouseLeave={() => setHoveredRating(0)}
          onClick={() => setRating(star)}
          className="p-1 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-sm"
          disabled={isViewOnlyMode}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            className={`h-9 w-9 transition-colors ${
              effectiveRating >= star
                ? "fill-orange-400 text-orange-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {existingReview ? "Your Review" : `Review ${mealName}`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <StarRating />

          <div className="space-y-2">
            <label htmlFor="comment" className="text-sm font-medium text-gray-700">
              Your thoughts (optional)
            </label>
            <Textarea
              id="comment"
              rows={4}
              placeholder="What did you like? Any suggestions?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={isViewOnlyMode}
              className="resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {existingReview && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting || isSubmitting}
                className="flex-1 sm:flex-none sm:w-36"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            )}

            {!isViewOnlyMode && (
              <Button
                type="submit"
                disabled={isSubmitting || isDeleting}
                className="flex-1 bg-orange-600 hover:bg-orange-700"
              >
                {isSubmitting
                  ? "Saving..."
                  : existingReview
                  ? "Update Review"
                  : "Submit Review"}
              </Button>
            )}

            {isViewOnlyMode && (
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Close
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}