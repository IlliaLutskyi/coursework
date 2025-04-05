"use client";

import type { HTMLChakraProps } from "@chakra-ui/react";
import { createRecipeContext } from "@chakra-ui/react";

// Directly use HTMLChakraProps<"a"> for LinkButtonProps
const { withContext } = createRecipeContext({ key: "button" });

// Replace "a" with your framework's link component
export const LinkButton = withContext<HTMLAnchorElement, HTMLChakraProps<"a">>(
  "a"
);
