"use client";

import { useCreateCastMemberStore } from "@/stores/useCreateCastMemberStore";
import { Button } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toaster, Toaster } from "../ui/toaster";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "../InputField";
import SearchActorBar from "./SearchActorBar";
import { useEditForm } from "@/stores/useEditForm";
import { useRouter } from "next/navigation";

const castMemberSchema = z.object({
  character: z.string().min(1, "Character is required"),
});
export type formData = z.infer<typeof castMemberSchema>;

const CreateCastMemberForm = () => {
  const { register, handleSubmit, formState } = useForm<formData>({
    resolver: zodResolver(castMemberSchema),
  });
  const {
    isOpen,
    toggle: close,
    actorId,
  } = useCreateCastMemberStore((store) => store);
  const router = useRouter();
  const { movie, type } = useEditForm((store) => store);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  function handleOutsideClick(e: MouseEvent) {
    if (!formRef.current) return;
    const target = e.target as HTMLElement;
    if (target.closest(".io-close-outline")) return;
    if (target.closest("#hints-container")) return;
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

  async function onSubmit(formData: formData) {
    toaster.dismiss();
    if (!actorId) {
      return toaster.create({
        title: "You need to choose an actor",
        type: "error",
        duration: 3000,
      });
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/cast/addCastMember/${type}/${movie?._id}/${actorId}`,
        {
          method: "POST",
          body: JSON.stringify({ character: formData.character }),
        }
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
        title: err instanceof Error ? err.message : "Could not add the actor",
        type: "error",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isOpen && (
        <form
          className="fixed flex flex-col justify-center gap-4 top-1/4 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white shadow-2xl   rounded-lg w-3/4 p-4"
          ref={formRef}
          id="createCastForm"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SearchActorBar />
          <InputField
            type="text"
            register={register}
            error={formState.errors.character?.message}
            label="character"
            field="character"
            className="bg-black text-white p-2"
          />
          <Button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md self-end hover:scale-105"
          >
            {loading ? "Saving..." : "Save"}
          </Button>
          <Toaster />
        </form>
      )}
    </>
  );
};

export default CreateCastMemberForm;
