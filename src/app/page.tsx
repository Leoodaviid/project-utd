"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NavBar } from "../app/components/NavBar";
import { Billboard } from "../app/components/Billboard";
import { MovieList } from "../app/components/MovieList";
import { getMovies } from "./service/mainApi/movies";
import { useEffect, useState } from "react";
import { Movie } from "@prisma/client";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  const { data: user } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  useEffect(() => {
    (async () => {
      try {
        const moviesRequest = await getMovies();

        const request = [moviesRequest];

        const [{ data: moviesResponse }] = await Promise.all(request);

        setMovies(moviesResponse);
      } catch (error) {
        throw new Error(`Error: ${error}`);
      }
    })();
  }, [setMovies]);

  return (
    <>
      <NavBar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
      </div>
    </>
  );
}

export default Home;
