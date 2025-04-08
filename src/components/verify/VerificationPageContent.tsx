"use client";

import { useVerifyEmail } from "@/hooks/useVerifyEmail";
import { Box, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerificationPageContent = () => {
  const searchParams = useSearchParams();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(searchParams.get("token"));
  }, [searchParams]);

  const { message, loading, error } = useVerifyEmail(token);
  if (loading)
    return (
      <Box className="mx-auto mt-[10rem] w-1/2 shadow-2xl p-4 rounded-md text-lg ">
        {loading && (
          <Heading className="text-black text-center">Validating ...</Heading>
        )}
      </Box>
    );
  if (!token)
    return (
      <Box className="mx-auto mt-[10rem] w-1/2 shadow-2xl p-4 rounded-md text-lg">
        <Heading className="text-black text-center">Token is missing</Heading>
      </Box>
    );

  return (
    <Box className="mx-auto mt-[10rem] w-1/2 shadow-2xl p-4 rounded-md text-lg ">
      {message && (
        <Box className="flex gap-2 items-baseline justify-center">
          <Heading className="text-black text-center">
            {message}, You can log in now
          </Heading>
          <Link href="/login" className="hover:underline text-blue-400">
            log in
          </Link>
        </Box>
      )}
      {error && <Heading className="text-black text-center">{error}</Heading>}
    </Box>
  );
};

export default VerificationPageContent;
