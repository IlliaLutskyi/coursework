"use client";
import Reviews from "@/components/reviews/Reviews";
import { Suspense } from "react";
const ReviewsPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Reviews />
    </Suspense>
  );
};
export default ReviewsPage;
