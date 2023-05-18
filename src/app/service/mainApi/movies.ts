import { Movie } from "@prisma/client";
import api from "./config";

export const getMovies = () => api.get<Movie[]>("api/movies");

export const deleteMovie = (movieId: string) =>
  api.delete<Movie>(`/api/movies/${movieId}/movie`);
