"use client";
import Login from "@/components/login/Login";
import { Suspense } from "react";
const LoginPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    </>
  );
};
export default LoginPage;
