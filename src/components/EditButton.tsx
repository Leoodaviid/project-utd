import React from "react";
import { useRouter } from "next/navigation";
import { FiEdit3 } from "react-icons/fi";

interface EditButtonProps {
  movieId: string;
}

export const EditButton = ({ movieId }: EditButtonProps) => {
  const router = useRouter();
  const toggleEdit = () => {
    router.push(`/edit?movie=${movieId}`);
  };

  return (
    <div
      onClick={toggleEdit}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <FiEdit3 className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};
