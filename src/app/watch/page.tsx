"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getMovie } from "../service/mainApi/movies";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Movie } from "@prisma/client";

export default function Watch() {
  const router = useRouter();
  const [movie, setMovie] = useState<Movie>();
  const searchParams = useSearchParams();
  const movieId = searchParams.get("movie");

  useEffect(() => {
    (async () => {
      try {
        const movieRequest = await getMovie(movieId);
        const request = [movieRequest];
        const [{ data: movieResponse }] = await Promise.all(request);
        setMovie(movieResponse);
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    })();
  }, [movieId]);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white cursor-pointer"
          size={30}
        />
        <p className="text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {movie?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="h-full w-full"
        src={movie?.videoUrl}
      ></video>
    </div>
  );
}
