"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "../components/Input";
import { useMovie } from "../hooks/useMovie";
import { MovieDataProps } from "../models/models";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function Upload() {
  const router = useRouter();
  const { createMovie, loading } = useMovie();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieDataProps>();

  const onSubmit = async (movie: MovieDataProps) => {
    await createMovie(movie);
  };

  return (
    <>
      <div className="h-full w-full">
        <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
          <AiOutlineArrowLeft
            onClick={() => router.push("/")}
            className="text-white cursor-pointer"
            size={30}
          />
        </nav>
        <div className="bg-black w-full h-full lg:bg-opacity-50">
          <div className="flex justify-center h-[100vh]">
            <div className="bg-black bg-opacity-70 px-10 py-16 self-center lg:w-4/5 lg:max-w-md rounded-md w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-white  text-4xl mb-8 font-semibold">
                  Insert New Video
                </h2>
                <div className="flex flex-col gap-4">
                  <Input
                    id="title"
                    label="Title"
                    type="text"
                    {...register("title", { required: true, minLength: 3 })}
                    errors={errors.title}
                  />

                  <Input
                    id="description"
                    label="Description"
                    type="text"
                    {...register("description", {
                      required: true,
                      minLength: 3,
                    })}
                    errors={errors.description}
                  />
                  <Input
                    label="Url"
                    id="videoUrl"
                    type="text"
                    {...register("videoUrl", { required: true, minLength: 3 })}
                    errors={errors.videoUrl}
                  />
                  <Input
                    label="Cover"
                    id="thumbnailUrl"
                    type="text"
                    {...register("thumbnailUrl", {
                      required: true,
                      minLength: 3,
                    })}
                    errors={errors.thumbnailUrl}
                  />
                  <Input
                    label="Genre"
                    id="genre"
                    type="text"
                    {...register("genre", { required: true, minLength: 3 })}
                    errors={errors.genre}
                  />
                  <Input
                    label="Duration"
                    id="duration"
                    type="text"
                    {...register("duration", { required: true, minLength: 3 })}
                    errors={errors.duration}
                  />
                </div>
                <button className="bg-orange-500 py-3 text-white rounded-md w-full mt-10 hover:bg-orange-600 transition">
                  {loading ? "Inserting..." : "Insert Video"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
