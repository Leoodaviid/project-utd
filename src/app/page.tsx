"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NavBar } from "../app/components/NavBar";
import { Billboard } from "../app/components/Billboard";
import { MovieList } from "../app/components/MovieList";
import { useMovie } from "./hooks/useMovie";

function Home() {
  const { movies } = useMovie();

  const { data: user } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  if (movies)
    return (
      <>
        <NavBar />
        <Billboard />
        <div className="pb-40">
          {movies && <MovieList title="Trending Now" data={movies} />}
        </div>
      </>
    );
}

export default Home;
