"use client";

import { Suspense } from "react";
import VerificationPageContent from "@/components/verify/VerificationPageContent";

const VerificationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerificationPageContent />
    </Suspense>
  );
};

export default VerificationPage;
