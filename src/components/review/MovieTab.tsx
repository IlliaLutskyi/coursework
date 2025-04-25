"use client";
import { Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditForm } from "@/stores/useEditForm";

import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";
import { toaster, Toaster } from "../ui/toaster";
import InputField from "../InputField";
import { useFetchTrailer } from "@/hooks/useFetchTrailer";

const formDataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  release_date: z.string().min(1, "Release date is required"),
  trailer_key: z.string().min(1, "Release date is required"),
  poster: z.string().min(1, "Poster path is required"),
  backdrop_image: z.string().min(1, "Backdrop image path is required"),
});
export type formData = z.infer<typeof formDataSchema>;

const MovieTab = () => {
  const type = useEditForm((store) => store.type);
  const movie = useEditForm((store) => store.movie);
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<formData>({
    resolver: zodResolver(formDataSchema),
  });
  const { trailer } = useFetchTrailer(movie?.trailer_id as string);
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
      const res = await fetch(`/api/editMovie/${type}/${movie?._id}`, {
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
        className="bg-black text-white p-2"
        label="title"
        field="title"
        defaultValue={movie?.title}
        error={formState.errors.title?.message}
        register={register}
        type="text"
      />
      <InputField
        className="bg-black text-white p-2 h-[7rem]"
        textArea={true}
        defaultValue={movie?.overview}
        field="description"
        error={formState.errors.description?.message}
        register={register}
        label="overview"
      />
      <InputField
        className="bg-black text-white p-2"
        label="release date"
        defaultValue={movie?.release_date}
        field="release_date"
        error={formState.errors.release_date?.message}
        register={register}
        type="date"
      />
      <InputField
        className="bg-black text-white p-2"
        label="trailer key"
        defaultValue={trailer?.trailer_key ? trailer.trailer_key : ""}
        field="trailer_key"
        error={formState.errors.trailer_key?.message}
        register={register}
        type="text"
      />
      <InputField
        className="bg-black text-white p-2"
        label="poster key"
        defaultValue={movie?.poster_path}
        field="poster"
        error={formState.errors.poster?.message}
        register={register}
        type="text"
      />
      <InputField
        className="bg-black text-white p-2"
        label="backdrop key"
        defaultValue={movie?.backdrop_path}
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
          "Save edits"
        )}
      </Button>
      <Toaster />
    </form>
  );
};

export default MovieTab;
