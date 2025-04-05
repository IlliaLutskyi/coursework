"use client";
import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const expiryTime = 60 * 60 * 24; // seconds in a day

const VerificationEmail = () => {
  const [expireIn, setExpireIn] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("expireIn");
    setExpireIn(stored ? Number(stored) : expiryTime);
  }, []);

  useEffect(() => {
    if (expireIn === null || expireIn <= 0) return;

    const interval = setInterval(() => {
      setExpireIn((prev) => {
        if (prev === null) return null;
        const newVal = prev - 1;
        localStorage.setItem("expireIn", String(newVal));
        return newVal;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expireIn]);

  if (expireIn === null) return null; // avoid mismatch until mounted

  const hours = Math.floor((expireIn / 3600) % 24);
  const minutes = Math.floor((expireIn / 60) % 60);
  const seconds = expireIn % 60;

  return (
    <Box className="flex flex-col rounded-md gap-7 mx-auto sm:my-10 my-3 bg-white min-w-[300px] w-1/2 shadow-2xl py-10 px-4">
      <Heading className="text-xl font-bold text-center">
        Verify your email
      </Heading>
      <Text className="text-start">
        We&apos;ve sent a verification link to your email. Please check your
        inbox and click the link to verify your account. If you don&apos;t see
        the email, check your spam folder.
      </Text>
      <Heading className="text-center font-bold">The Link Expires In:</Heading>
      {expireIn > 0 ? (
        <Text className="text-center text-xl">
          <span className="bg-black p-2 text-white border-white border-[1px] rounded-sm">
            {hours}
          </span>
          :
          <span className="bg-black p-2 text-white border-white border-[1px] rounded-sm">
            {minutes}
          </span>
          :
          <span className="bg-black p-2 text-white border-white border-[1px] rounded-sm">
            {seconds}
          </span>
        </Text>
      ) : (
        <Text className="font-bold text-center text-xl">
          The Link has expired
        </Text>
      )}
    </Box>
  );
};

export default VerificationEmail;
