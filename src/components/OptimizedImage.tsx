"use client";
import { Skeleton } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
type props = {
  path: string;
  className?: string;
};
const OptimizedImage = ({ path, className = "rounded-md w-full" }: props) => {
  const [loading, setLoading] = useState(true);

  return (
    <Skeleton loading={loading}>
      <Image
        src={path}
        alt=""
        width={400}
        height={400}
        onLoad={() => setLoading(false)}
        className={className}
      />
    </Skeleton>
  );
};

export default OptimizedImage;
