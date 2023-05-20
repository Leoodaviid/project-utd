"use client";
import React, { useCallback, useState } from "react";
import Image from "next/image";
import popcorn from "/public/img/popcorn.png";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useMovie } from "@/hooks/useMovie";
import { UserCreateProps } from "@/models/models";

export default function Login() {
  const { create, login, loading } = useMovie();
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserCreateProps>();

  const onSubmit = async (data: UserCreateProps) => {
    if (variant === "login") {
      await login(data.email, data.password);
    } else {
      await create(data.name, data.email, data.password);
    }
    reset();
  };

  return (
    <div className="relative h-[100vh] w-full bg-no-repeat bg-center bg-cover">
      <div className="bg-black w-full h-full grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex items-center h-[100vh] w-[50vw]">
          <Image
            className="object-cover h-full w-full"
            src={popcorn}
            alt="popcorn"
          />
        </div>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-10 py-16 self-center lg:w-4/5 lg:max-w-md rounded-md w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2 className="text-white  text-4xl mb-8 font-semibold">
                {variant === "login" ? "Sign in" : "Register"}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === "register" && (
                  <Input
                    label="Username"
                    id="name"
                    type="text"
                    {...register("name", { required: true, minLength: 3 })}
                    errors={errors.name}
                  />
                )}
                <Input
                  label="Email"
                  id="email"
                  type="email"
                  {...register("email", { required: true, minLength: 3 })}
                  errors={errors.email}
                />
                <Input
                  label="Password"
                  id="password"
                  type="password"
                  {...register("password", { required: true, minLength: 3 })}
                  errors={errors.password}
                />
              </div>
              <button
                type="submit"
                className="bg-orange-500 py-3 text-white rounded-md w-full mt-10 hover:bg-orange-600 transition"
              >
                {variant === "login"
                  ? loading
                    ? "Loading..."
                    : "Login"
                  : loading
                  ? "Loading..."
                  : "Sign up"}
              </button>
            </form>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} color="black" />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using VideoHub?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
