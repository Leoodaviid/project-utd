import React from "react";
import { divide, isEmpty } from "lodash";
import { Movie } from "@prisma/client";
import { MovieCard } from "./MovieCard";

interface MovieListProps {
  data: Movie[];
  title: string;
}
export const MovieList = ({ data, title }: MovieListProps) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {Array.isArray(data) ? (
            data.map((movie) => <MovieCard key={movie.id} data={movie} />)
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};
