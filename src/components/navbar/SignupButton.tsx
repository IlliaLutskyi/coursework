"use client";
import Link from "next/link";
import React from "react";
import ProfileMenu from "./ProfileMenu";

import { useSession } from "next-auth/react";

const SignupButton = () => {
  const { data: session, status } = useSession();
  return (
    <>
      {!session?.user && status !== "loading" && (
        <Link
          href="/signup"
          className="sm:block hidden bg-black shadow-md  text-white p-2 text-sm rounded-lg hover:scale-105"
        >
          Sign up
        </Link>
      )}
      {session?.user && <ProfileMenu />}
    </>
  );
};

export default SignupButton;
