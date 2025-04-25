"use client";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import z from "zod";
import InputField from "../InputField";
const formDataSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string(),
});
type formData = z.infer<typeof formDataSchema>;
const Login = () => {
  const { register, handleSubmit, formState } = useForm<formData>({
    resolver: zodResolver(formDataSchema),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movieId");
  const type = searchParams.get("type");
  const router = useRouter();
  useEffect(() => {
    setError("");
    if (searchParams.get("error") === "OAuthAccountNotLinked") {
      setError("This email is already linked to another login method");
      return;
    }
  }, [searchParams]);
  // Handle providers
  async function handleProviderAuth(provider: "google" | "github") {
    setError("");
    setLoading(true);
    try {
      const res = await signIn(provider, { redirect: false });

      if (res?.error) {
        throw new Error(res.error);
      }
      router.replace(movieId && type ? `/review/${type}/${movieId}` : "/");
    } catch (err) {
      console.log(err);
      setError(
        err instanceof Error
          ? err.message
          : `Could not sign you up with ${provider}`
      );
    } finally {
      setLoading(false);
    }
  }
  // Handle Form Submition
  async function onSubmit(credentials: formData) {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: credentials.email,
        password: credentials.password,
      });
      if (res?.error) {
        throw new Error(res.error);
      }
      router.replace(movieId && type ? `/review/${type}/${movieId}` : "/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not log you in");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      className="flex flex-col gap-2 justify-center sm:w-1/2 w-3/4 mx-auto shadow-2xl my-3 p-4 bg-white rounded-md "
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === "enter") {
          handleSubmit(onSubmit)();
        }
      }}
      method="POST"
    >
      <Heading className="text-xl text-center font-bold">Log in</Heading>
      {error && (
        <Text className="text-red-600 text-center text-sm fade-in-95 duration-300">
          {error}
        </Text>
      )}
      <InputField
        className="focus:border-black focus:border-[3px] bg-blue-100 p-1"
        type="email"
        error={formState.errors.email?.message}
        register={register}
        label="email"
        field="email"
      />
      <InputField
        className="focus:border-black focus:border-[3px] bg-blue-100 p-1"
        type="text"
        error={formState.errors.password?.message}
        register={register}
        label="password"
        field="password"
      />
      <Button
        type="submit"
        disabled={
          loading ||
          (formState.errors.email || formState.errors.password ? true : false)
        }
        className="self-end bg-black hover:bg-opacity-70 duration-0 rounded-md p-2 text-white"
      >
        {loading ? "Submiting..." : " Submit"}
      </Button>
      <Box>
        <Text className="text-sm text-center">
          Still does not have an account{" "}
          <Link href="/signup" className="hover:underline text-blue-400">
            Sign up
          </Link>
        </Text>
      </Box>
      <Box className="relative flex flex-col gap-4 justify-center  items-center mt-2 border-black border-t-[1px] w-full">
        <Text className="absolute top-[-13%] text-black bg-white px-2">or</Text>
        <Button
          className="px-4 py-2 shadow-md hover:shadow-xl mt-4 hover:scale-105 text-black"
          disabled={loading}
          onClick={async () => await handleProviderAuth("google")}
        >
          <FcGoogle className="mr-2" /> Sign in with google
        </Button>
        <Button
          className="px-4 py-2 shadow-md hover:shadow-xl hover:scale-105 text-black"
          disabled={loading}
          onClick={async () => await handleProviderAuth("github")}
        >
          <BsGithub className="mr-2" /> Sign in with github
        </Button>
      </Box>
    </form>
  );
};

export default Login;
