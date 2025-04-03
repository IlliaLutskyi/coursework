"use client";
import React from "react";
import { Provider as ChakraProvider } from "./ui/provider";

const ChakraWraper = ({ children }: { children: React.ReactNode }) => {
  return <ChakraProvider>{children}</ChakraProvider>;
};

export default ChakraWraper;
