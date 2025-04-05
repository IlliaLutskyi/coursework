"use client";
import { Box, Button, Field, Heading, Input, Text } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FormEvent, KeyboardEvent, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import Link from "next/link";
const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setError("");
    if (!formData.email || !formData.name || !formData.password) {
      setError("All field are required");
      return;
    }
    if (formData.password.length <= 6) {
      setError("Password has to contain more then 6 chars");
      return;
    }
  }, [formData]);
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
  async function handleSubmit(e: FormEvent<HTMLFormElement> | KeyboardEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name.trim(),
          password: formData.password.trim(),
          email: formData.email.trim(),
        }),
      });
      const data: { message: string } = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setError("");
      setFormData({ name: "", password: "", email: "" });
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
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === "enter") {
          handleSubmit(e);
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
      <Box>
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              })
            }
            value={formData.name}
            name="name"
            placeholder="e.g. Pirat"
            className="focus:border-black focus:border-[3px] bg-blue-100 p-1"
          />
        </Field.Root>
      </Box>
      <Box>
        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input
            onChange={(e) =>
              setFormData((prev) => {
                return { ...prev, [e.target.name]: e.target.value };
              })
            }
            value={formData.email}
            name="email"
            type="email"
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
