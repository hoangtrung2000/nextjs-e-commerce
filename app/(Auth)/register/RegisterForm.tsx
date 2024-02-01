"use client";

import Heading from "@/components/Heading";
import Button from "@/components/Product/Button";
import Input from "@/components/inputs/Input";
import { SafeUser } from "@/types";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";

interface Props {
  currentUser: SafeUser | null;
}

const RegisterForm = ({ currentUser }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        alert("Account created");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((response) => {
          if (response?.ok) {
            router.push("/cart");
            router.refresh();
            alert("Login successful");
          }
          if (response?.error) {
            alert("Error: " + response.error);
          }
        });
      })
      .catch(() => {
        alert("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
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
      <Heading title="Sign up for E-shop" />
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
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
        label={`${isLoading ? "Loading" : "Sign up"}`}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account?{" "}
        <Link className="underline" href="/login">
          Log in
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
