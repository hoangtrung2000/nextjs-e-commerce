"use client";

import Heading from "@/components/Heading";
import Button from "@/components/Product/Button";
import Input from "@/components/inputs/Input";
import { SafeUser } from "@/types";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";

interface Props {
  currentUser: SafeUser | null;
}

const LoginForm = ({ currentUser }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((response) => {
      setIsLoading(false);
      if (response?.ok) {
        router.push("/cart");
        router.refresh();
        alert("Login successful");
      }
      if (response?.error) {
        alert("Error: " + response.error);
      }
    });
  };

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, []);

  if (currentUser)
    return <p className="text-center">Signed in, Redirecting...</p>;

  return (
    <>
      <Heading title="Sign in to E-shop" />
      <Button
        label="Continue with Google"
        variants="outline"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn("google");
        }}
      />
      <hr className="bg-slate-300 w-full h-px" />

      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        disabled={isLoading}
        label={`${isLoading ? "Loading" : "Login"}`}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Do not have an account?{" "}
        <Link className="underline" href="/register">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
