"use client";
import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Input } from "../components/Input";
import { useMovie } from "../hooks/useMovie";
import { MovieDataProps } from "../models/models";
import { getMovie } from "../service/mainApi/movies";

export default function Edit() {
  const { editMovie, loading } = useMovie();
  const router = useRouter();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movie");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MovieDataProps>();

  useEffect(() => {
    (async () => {
      try {
        const response = await getMovie(movieId);
        const movie = response.data;
        reset(movie);
      } catch (error) {
        console.error("Erro ao buscar os dados do filme", error);
      }
    })();
  }, [movieId, reset]);

  const onSubmit = async (movie: MovieDataProps) => {
    await editMovie(movieId, movie);
  };

  return (
    <>
      <div className=" h-full w-full">
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
                  Update Video
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
                <button
                  type="submit"
                  className="bg-orange-500 py-3 text-white rounded-md w-full mt-10 hover:bg-orange-600 transition"
                >
                  {loading ? "updating..." : "Update now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
