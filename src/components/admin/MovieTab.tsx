"use client";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import InputField from "../InputField";
import ClipLoader from "react-spinners/ClipLoader";
import { Toaster } from "../ui/toaster";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const movieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  release_date: z.string().min(1, "Release date is required"),
  trailer_key: z.string().min(1, "Release date is required"),
  poster: z.string().min(1, "Poster path is required"),
  backdrop_image: z.string().min(1, "Backdrop image path is required"),
});
export type formData = z.infer<typeof movieSchema>;

const MovieTab = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(movieSchema),
  });
  const [loading, setLoading] = useState(false);
  async function onSubmit(movie: formData) {}
  return (
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
      <InputField
        className="bg-black text-white p-2"
        label="title"
        field="title"
        error={formState.errors.title?.message}
        register={register}
        type="text"
      />
      <InputField
        className="bg-black text-white p-2 h-[7rem]"
        textArea={true}
        field="description"
        error={formState.errors.description?.message}
        register={register}
        label="overview"
      />
      <InputField
        className="bg-black text-white p-2"
        label="release date"
        field="release_date"
        error={formState.errors.release_date?.message}
        register={register}
        type="date"
      />
      <InputField
        className="bg-black text-white p-2"
        label="trailer key"
        field="trailer_key"
        error={formState.errors.trailer_key?.message}
        register={register}
        type="text"
      />
      <InputField
        className="bg-black text-white p-2"
        label="poster key"
        field="poster"
        error={formState.errors.poster?.message}
        register={register}
        type="text"
      />
      <InputField
        className="bg-black text-white p-2"
        label="backdrop key"
        error={formState.errors.backdrop_image?.message}
        field="backdrop_image"
        register={register}
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

export default MovieTab;
