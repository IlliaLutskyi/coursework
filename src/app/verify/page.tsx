"use client";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import { Box, Heading } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = () => {
  const token = useSearchParams().get("token");
  if (!token) return;
  const { message, loading, error } = useVerifyEmail(token);
  return (
    <Box className="mx-auto mt-[10rem] w-1/2 shadow-2xl p-4 ">
      <Heading className="text-black text-center">
        {message}
        {error}
      </Heading>
    </Box>
  );
};

export default page;
