import React from "react";
import { BsXLg } from "react-icons/bs";
import { useMovie } from "@/hooks/useMovie";

interface DeleteButtonProps {
  movieId: string;
}

export const DeleteButton = ({ movieId }: DeleteButtonProps) => {
  const { removeMovie } = useMovie();
  const toggleDelete = () => {
    removeMovie(movieId);
  };

  return (
    <div
      onClick={toggleDelete}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <BsXLg className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};
