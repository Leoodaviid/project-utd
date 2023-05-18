import React, { useCallback } from "react";
import { deleteMovie } from "../service/mainApi/movies";
import { BsXLg } from "react-icons/bs";

interface DeleteButtonProps {
  movieId: string;
}

export const DeleteButton = ({ movieId }: DeleteButtonProps) => {
  const toggleDelete = useCallback(async () => {
    try {
      const response = await deleteMovie(movieId);

      if (response.status == 200) {
        console.log("Filme excluído com sucesso");
      } else {
        console.error("Erro ao excluir o filme");
      }
    } catch (error) {
      console.error(error);
    }
  }, [movieId]);

  return (
    <div
      onClick={toggleDelete}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <BsXLg className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};
