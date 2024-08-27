"use client";

import { ReviewsWithUser } from "@/lib/infer-type";
import { Card, CardDescription, CardTitle } from "../ui/card";
import Stars from "./stars";
import { getReviewAverage } from "@/lib/review-average";
import { useMemo } from "react";
import { Progress } from "../ui/progress";

export default function ReviewChart({
  reviews,
}: {
  reviews: ReviewsWithUser[];
}) {
  const getRatingByStars = useMemo(() => {
    const ratingValues = Array.from({ length: 5 }, () => 0);
    const totalReviews = reviews.length;
    reviews.forEach((review) => {
      const starIndex = review.rating - 1;
      if (starIndex >= 0 && starIndex < 5) {
        ratingValues[starIndex]++;
      }
    });
    console.log(ratingValues);
    return ratingValues.map((rating) => (rating / totalReviews) * 100);
  }, [reviews]);
  const totalRating = getReviewAverage(reviews.map((r) => r.rating));
  return (
    <Card className="flex flex-col p-8 rounded-md gap-4 font-gothamBook">
      <div className="flex gap-2 flex-col">
        <CardTitle className="font-gothamBlack">Rating-ul anvelopei:</CardTitle>
        {totalRating ? (
          <CardDescription className="text-lg font-gothamLight">
            {totalRating.toFixed(1)} stele
          </CardDescription>
        ) : (
          "Nu există niciun review până acum"
        )}
      </div>
      {getRatingByStars
        .slice()
        .reverse()
        .map((rating, index) => (
          <div key={index} className="flex gap-2 justify-between items-center">
            <p className="text-sm font-gothamLight flex gap-1">
              {5 - index} <span>{index === 4 ? "stea" : "stele"}</span>
            </p>
            <Progress value={rating} />
          </div>
        ))}
    </Card>
  );
}
