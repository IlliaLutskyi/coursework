"use client";
import { Box, Button, Field, Heading, Input, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movieId");
  const type = searchParams.get("type");
  useEffect(() => {
    setError("");
    if (searchParams.get("error") === "OAuthAccountNotLinked") {
      setError("This email is already linked to another login method");
      return;
    }

    if (!formData.email || !formData.password) {
      setError("All field are required");
      return;
    }
  }, [formData]);
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
  async function handleSubmit(e: FormEvent<HTMLFormElement> | KeyboardEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
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
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === "enter") {
          handleSubmit(e);
        }
        return;
      }}
      method="POST"
    >
      <Heading className="text-xl text-center font-bold">Log in</Heading>
      {error && (
        <Text className="text-red-600 text-center text-sm fade-in-95 duration-300">
          {error}
        </Text>
      )}
      <Box>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input
            type="email"
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              })
            }
            value={formData.email}
            name="email"
            placeholder="e.g. Pirat@gmail.com"
            className="focus:border-black focus:border-[3px] bg-blue-100 p-1"
          />
        </Field.Root>
      </Box>
      <Box>
        <Field.Root>
          <Field.Label>Password</Field.Label>
          <Input
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              })
            }
            value={formData.password}
            name="password"
            type="password"
            placeholder="e.g. P!rAt@#1d+"
            className="focus:border-black focus:border-[3px] bg-blue-100 p-1"
          />
        </Field.Root>
      </Box>
      <Button
        type="submit"
        disabled={loading || (error ? true : false)}
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
