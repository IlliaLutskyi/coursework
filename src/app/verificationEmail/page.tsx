"use client";
import { Box, Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
const expiryTime = 60 * 60 * 60 * 24;
const page = () => {
  if (typeof window === "undefined") return;
  const [expireIn, setExpireIn] = useState(
    localStorage.getItem("expireIn")
      ? Number(localStorage.getItem("expireIn"))
      : expiryTime
  );
  const hours = Math.floor((expireIn / 60 / 60 / 24) % 24);
  const minutes = Math.floor((expireIn / 60 / 60) % 60);
  const seconds = Math.round((expireIn / 60) % 60);

  useEffect(() => {
    if (expireIn <= 0) return;
    const tik = setInterval(() => {
      localStorage.setItem("expireIn", String(expireIn));
      setExpireIn((prev) => expireIn - 60);
    }, 1000);
    return () => {
      clearInterval(tik);
    };
  });
  return (
    <Box className="flex flex-col rounded-md gap-7 mx-auto sm:my-10 my-3 bg-white  min-w-[300px]  w-1/2 shadow-2xl  py-10 px-4">
      <Heading className="text-xl font-bold text-center">
        Verify your email
      </Heading>
      <Text className="text-start">
        We've sent a verification link to your email. Please check your inbox
        and click the link to verify your account. If you don’t see the email,
        check your spam folder or try resending the verification.
      </Text>
      <Heading className="text-center font-bold">The Link Expires In:</Heading>
      {expireIn > 0 ? (
        <Text className="text-center text-xl ">
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
        <Text className="font-bold text-center text-xl ">
          The Link has been expired
        </Text>
      )}
    </Box>
  );
};

export default page;
