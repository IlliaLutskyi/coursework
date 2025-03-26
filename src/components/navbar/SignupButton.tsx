"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const SignupButton = () => {
  const { data: session } = useSession();
  return (
    <>
      {!session?.user && (
        <Link
          href="/signup"
          className="sm:block hidden bg-black shadow-md  text-white p-2 text-sm rounded-lg hover:scale-105"
        >
          Sign up
        </Link>
      )}
    </>
  );
};

export default SignupButton;
