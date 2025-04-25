"use client";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import InputField from "../InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "../ui/toaster";

const ActorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  biography: z.string().min(1, "Name is required"),
  birthDay: z.string().min(1, "Name is required"),
  deathday: z.string().nullable(),
  place_of_birth: z.string().min(1, "Name is required"),
  profile_path: z.string().min(1, "Name is required"),
});
export type formData = z.infer<typeof ActorSchema>;

const ActorTab = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(ActorSchema),
  });
  const [loading, setLoading] = useState(false);
  async function onSubmit(actor: formData) {}
  return (
    <form
      className="flex flex-col gap-4 justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <InputField
        label="name"
        register={register}
        field="name"
        className="bg-black text-white p-2"
        error={formState.errors.name?.message}
      />
      <InputField
        label="biography"
        register={register}
        field="biography"
        textArea={true}
        className="bg-black text-white p-2 h-[10rem]"
        error={formState.errors.biography?.message}
      />
      <InputField
        label="birthDay"
        register={register}
        type="date"
        field="birthDay"
        error={formState.errors.birthDay?.message}
        className="bg-black text-white p-2"
      />
      <InputField
        label="deathday"
        register={register}
        type="date"
        field="deathday"
        error={formState.errors.deathday?.message}
        className="bg-black text-white p-2"
      />
      <InputField
        label="place of birth"
        register={register}
        field="place_of_birth"
        error={formState.errors.place_of_birth?.message}
        className="bg-black text-white p-2"
      />
      <InputField
        label="profile image key"
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
          "Save"
        )}
      </Button>
      <Toaster />
    </form>
  );
};

export default ActorTab;
