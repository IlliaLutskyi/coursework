"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import ClipLoader from "react-spinners/ClipLoader";
import { Button } from "@chakra-ui/react";
import { Toaster } from "../ui/toaster";

const GenreSchema = z.object({
  name: z.string(),
});
type formData = z.infer<typeof GenreSchema>;

const GenreTab = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(GenreSchema),
  });
  const [loading, setLoading] = useState(false);
  async function onSubmit(genre: formData) {}
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      method="POST"
      className="flex flex-col gap-4 justify-center"
    >
      <InputField
        label="name"
        field="name"
        register={register}
        className="bg-black text-white p-2"
        error={formState.errors.name?.message}
        type="text"
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

export default GenreTab;
