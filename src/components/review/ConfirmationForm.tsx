"use client";
import { useConfirmatinFormStore } from "@/stores/useConfirmationForm";
import { Box, Button, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import { toaster } from "../ui/toaster";
import { useEditForm } from "@/stores/useEditForm";
import { useRouter } from "next/navigation";

const ConfirmationForm = () => {
  const {
    isOpen,
    castMemberId,
    toggle: close,
  } = useConfirmatinFormStore((store) => store);
  const { movie, type } = useEditForm((store) => store);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleDeleting() {
    toaster.dismiss();
    setLoading(true);
    try {
      const res = await fetch(
        `/api/cast/deleteCastMember/${type}/${movie?._id}/${castMemberId}`,
        { method: "DELETE" }
      );
      const data: { message: string } = await res.json();
      if (!res.ok) throw new Error(data.message);
      toaster.create({
        title: data.message,
        type: "info",
        duration: 3000,
      });
      return router.refresh();
    } catch (err) {
      return toaster.create({
        title:
          err instanceof Error ? err.message : "Could not delete the actor",
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
      return close();
    }
  }
  return (
    <>
      {isOpen && (
        <Box className="fixed flex flex-col justify-center gap-4 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-2xl bg-white rounded-lg w-1/2 p-4">
          <Heading className="p-4 text-xl text-center">Are you sure?</Heading>
          <Box className="flex items-baseline justify-between ">
            <Button
              className="bg-red-500 px-4 py-2 rounded-sm text-white hover:scale-105"
              disabled={loading}
              onClick={() => close()}
            >
              No
            </Button>
            <Button
              disabled={loading}
              className="bg-green-500 px-4 py-2 rounded-sm text-white hover:scale-105"
              onClick={handleDeleting}
            >
              Yes
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default ConfirmationForm;
