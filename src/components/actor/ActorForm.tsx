"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toaster } from "../ui/toaster";
import { Box, Button, Field, Input, Text, Textarea } from "@chakra-ui/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActorEditFormStore } from "@/stores/useActorEditFormStore";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";
import InputField from "../InputField";
const ActorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  biography: z.string().min(1, "Name is required"),
  birthDay: z.string().min(1, "Name is required"),
  deathday: z.string().nullable(),
  place_of_birth: z.string().min(1, "Name is required"),
  profile_path: z.string().min(1, "Name is required"),
});
export type formData = z.infer<typeof ActorSchema>;
const ActorForm = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(ActorSchema),
  });
  const router = useRouter();
  const actor = useActorEditFormStore((store) => store.actor);

  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (message) {
      toaster.dismiss();

      toaster.create({
        title: message,
        type: "info",
        duration: 3000,
      });
    } else if (err) {
      toaster.dismiss();
      toaster.create({
        title: err,
        type: "error",
        duration: 3000,
      });
    }
  }, [message, err]);
  async function onSubmit(edits: formData) {
    setMessage("");
    setErr("");
    setLoading(true);
    try {
      const res = await fetch(`/api/editActor/${actor?._id}`, {
        method: "POST",
        body: JSON.stringify(edits),
      });
      const data: { message: string } = await res.json();
      if (!res.ok) {
        setErr(data.message);
      }
      setMessage(data.message);
      router.refresh();
    } catch (err) {
      setErr(err instanceof Error ? err.message : "Could not save changes");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      className="flex flex-col gap-4 justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        label="name"
        defaultValue={actor?.name}
        register={register}
        field="name"
        className="bg-black text-white p-2"
        error={formState.errors.name?.message}
      />
      <InputField
        label="biography"
        defaultValue={actor?.biography}
        register={register}
        field="biography"
        textArea={true}
        className="bg-black text-white p-2 h-[10rem]"
        error={formState.errors.biography?.message}
      />
      <InputField
        label="birthDay"
        defaultValue={actor?.birthday ? actor.birthday : ""}
        register={register}
        type="date"
        field="birthDay"
        error={formState.errors.birthDay?.message}
        className="bg-black text-white p-2"
      />
      <InputField
        label="deathday"
        defaultValue={actor?.deathday ? actor.deathday : ""}
        register={register}
        type="date"
        field="deathday"
        error={formState.errors.deathday?.message}
        className="bg-black text-white p-2"
      />
      <InputField
        label="place of birth"
        defaultValue={actor?.place_of_birth ? actor.place_of_birth : ""}
        register={register}
        field="place_of_birth"
        error={formState.errors.place_of_birth?.message}
        className="bg-black text-white p-2"
      />
      <InputField
        label="profile image key"
        defaultValue={actor?.profile_path ? actor.profile_path : ""}
        register={register}
        field="profile_path"
        error={formState.errors.profile_path?.message}
        className="bg-black text-white p-2"
      />
      <Button
        type="submit"
        disabled={loading}
        className="bg-blue-600 px-4 py-2 self-end hover:scale-105  text-white"
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
      <Toaster />
    </form>
  );
};

export default ActorForm;
