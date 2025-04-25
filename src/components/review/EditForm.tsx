"use client";
import { useEditForm } from "@/stores/useEditForm";
import { Box, Tabs } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import MovieTab from "./MovieTab";
import CastTab from "./CastTab";

const EditForm = () => {
  const isOpen = useEditForm((store) => store.isOpen);
  const close = useEditForm((store) => store.toggle);
  const formRef = useRef<HTMLDivElement>(null);
  function handleOutsideClick(e: MouseEvent) {
    if (!formRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest("#hints-container")) return;
    if (target.closest(".io-close-outline")) return;
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
          className="fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg w-3/4"
          ref={formRef}
        >
          <Tabs.Root
            defaultValue="movieChanges"
            className="grid grid-cols-[1fr_6fr] gap-4 items-baseline p-7  w-full"
          >
            <Box>
              <Tabs.List className="flex flex-col gap-3">
                <Tabs.Trigger
                  value="movieChanges"
                  _selected={{
                    bg: "black",
                    color: "white",
                  }}
                  className="shadow-xl rounded-sm px-4 py-2 text-sm"
                >
                  Movie
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="castChanges"
                  _selected={{
                    bg: "black",
                    color: "white",
                  }}
                  className="shadow-xl rounded-md px-4 py-2 text-sm"
                >
                  Cast
                </Tabs.Trigger>
              </Tabs.List>
            </Box>
            <Box>
              <Tabs.Content value="movieChanges">
                <MovieTab />
              </Tabs.Content>
              <Tabs.Content value="castChanges">
                <CastTab />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Box>
      )}
    </>
  );
};

export default EditForm;
