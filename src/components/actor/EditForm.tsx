"use client";

import { useActorEditFormStore } from "@/stores/useActorEditFormStore";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";

import ActorForm from "./ActorForm";

const EditForm = () => {
  const { isOpen, toggle: close } = useActorEditFormStore((store) => store);

  const formRef = useRef<HTMLDivElement>(null);
  function handleOutsideClick(e: MouseEvent) {
    if (!formRef.current) return;
    const target = e.target as HTMLElement;

    if (
      !formRef.current.contains(e.target as Node) &&
      target.tagName !== "BUTTON"
    ) {
      return close();
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      {isOpen && (
        <Box
          className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg w-3/4 p-5"
          ref={formRef}
        >
          <ActorForm />
        </Box>
      )}
    </>
  );
};

export default EditForm;
