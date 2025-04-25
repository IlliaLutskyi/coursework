"use client";
import { useCastMemberStore } from "@/stores/useCastMemberForm";
import { useEditForm } from "@/stores/useEditForm";
import { Button, Heading } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useRef, useState } from "react";
import { toaster } from "../ui/toaster";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import InputField from "../InputField";

const formDataSchema = z.object({
  character: z.string().min(1, "Character is required"),
});
export type formData = z.infer<typeof formDataSchema>;
const CastMemberForm = () => {
  const router = useRouter();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const {
    castMember,
    isOpen,
    toggle: close,
  } = useCastMemberStore((store) => store);
  const movieId = useEditForm((store) => store.movie?._id);
  const type = useEditForm((store) => store.type);
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit, formState, setValue } = useForm<formData>({
    resolver: zodResolver(formDataSchema),
  });
  useEffect(() => {
    if (message) {
      toaster.dismiss();
      toaster.create({
        title: message,
        type: "info",
      });
    } else if (err) {
      toaster.dismiss();
      toaster.create({
        title: err,
        type: "error",
      });
    }
  }, [message, err]);
  useEffect(() => {
    setValue("character", castMember?.character ? castMember.character : "");
  }, [castMember]);
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);
  function handleOutsideClick(e: MouseEvent) {
    if (!formRef.current) return;
    const target = e.target as HTMLElement;

    if (
      !formRef.current.contains(e.target as Node) &&
      target.tagName !== "path" &&
      target.tagName !== "SVG"
    ) {
      return close();
    }
  }
  async function onSubmit(edits: formData) {
    try {
      setErr("");
      setMessage("");
      setLoading(true);
      const res = await fetch(
        `/api/cast/editCastMember/${type}/${movieId}/${castMember?.id}`,
        {
          method: "POST",
          body: JSON.stringify(edits),
        }
      );
      const data: { message: string } = await res.json();
      if (!res.ok) setErr(data.message);
      setMessage(data.message);
      router.refresh();
    } catch (err) {
      setErr(err instanceof Error ? err.message : "Could not save changes");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {isOpen && (
        <form
          className="fixed flex flex-col justify-center gap-4 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shadow-2xl bg-white rounded-lg w-1/2 p-4"
          onSubmit={handleSubmit(onSubmit)}
          ref={formRef}
        >
          <Heading className="text-center font-bold text-xl ">
            Edit cast member
          </Heading>

          <InputField
            type="text"
            error={formState.errors.character?.message}
            register={register}
            defaultValue={castMember?.character}
            field="character"
            label="character"
            className="bg-black text-white p-2 "
          />

          <Button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md self-end hover:scale-105"
          >
            {loading ? (
              <>
                <ClipLoader size={"0.5rem"} />
                Saving...
              </>
            ) : (
              "Save edits"
            )}
          </Button>
        </form>
      )}
    </>
  );
};

export default CastMemberForm;
