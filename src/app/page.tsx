"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Billboard } from "@/components/Billboard";
import { MovieList } from "@/components/MovieList";
import { useMovie } from "@/hooks/useMovie";
import { InfoModal } from "@/components/InfoModal";

function Home() {
  const { movies, isOpen, closeModal } = useMovie();

  const { data: user } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/auth");
    },
  });

  if (movies)
    return (
      <>
        <InfoModal visible={isOpen} onClose={closeModal} />
        <NavBar />
        <Billboard />
        <div className="pb-40">
          {movies && <MovieList title="Trending Now" data={movies} />}
        </div>
      </>
    );
}

export default Home;
