import React from "react";
import { useRouter } from "next/navigation";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
  movieId: string;
}

export const PlayButton = ({ movieId }: PlayButtonProps) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/watch?movie=${movieId}`)}
      className="bg-white text-black rounded-md py-1 md:py-2 px-2 md:px-4w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition"
    >
      <BsFillPlayFill className="w-4 md:w-7 text-black mr-1" />
      Play
    </button>
  );
};
