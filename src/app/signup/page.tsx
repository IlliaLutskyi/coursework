"use client";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "@/components/InputField";
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(6, "Password has to contain more then 6 chars"),
});
type formData = z.infer<typeof userSchema>;
const Signup = () => {
  const { register, handleSubmit, formState, reset } = useForm<formData>({
    resolver: zodResolver(userSchema),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function handleProviderAuth(provider: "google" | "github") {
    setError("");
    setLoading(true);
    try {
      const res = await signIn(provider, { redirect: false });
      if (res?.error) {
        throw new Error(res.error);
      }
      router.replace("/");
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
  async function onSubmit(user: formData) {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name: user.name.trim(),
          password: user.password.trim(),
          email: user.email.trim(),
        }),
      });
      const data: { message: string } = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      reset({ email: "", password: "", name: "" });
      setError("");
      localStorage.removeItem("expireIn");
      router.replace("/verificationEmail");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong try later"
      );
      return;
    } finally {
      setLoading(false);
      return;
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
        return;
      }}
      method="POST"
    >
      <Heading className="text-xl text-center font-bold">Sign up</Heading>
      {error && (
        <Text className="text-red-600 text-center text-sm fade-in-95 duration-300">
          {error}
        </Text>
      )}
      <InputField
        type="text"
        label="name"
        error={formState.errors.name?.message}
        register={register}
        field="name"
        className="focus:border-black focus:border-[3px] bg-blue-100 p-1"
      />
      <InputField
        type="email"
        label="email"
        error={formState.errors.email?.message}
        register={register}
        field="email"
        className="focus:border-black focus:border-[3px] bg-blue-100 p-1"
      />
      <InputField
        type="text"
        label="password"
        error={formState.errors.password?.message}
        register={register}
        field="password"
        className="focus:border-black focus:border-[3px] bg-blue-100 p-1"
      />
      <Button
        type="submit"
        disabled={
          loading ||
          (formState.errors.name ||
          formState.errors.email ||
          formState.errors.password
            ? true
            : false)
        }
        className="self-end bg-black hover:bg-opacity-70 duration-0 rounded-md p-2 text-white"
      >
        {loading ? "Submiting..." : " Submit"}
      </Button>
      <Box>
        <Text className="text-sm text-center">
          Already have an account{" "}
          <Link href="/login" className="hover:underline text-blue-400">
            login
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

export default Signup;
