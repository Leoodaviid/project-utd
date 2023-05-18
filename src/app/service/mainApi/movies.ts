import { Movie } from "@prisma/client";
import api from "./config";

export const getMovies = () => api.get<Movie[]>("api/movies");

export const getMovie = (movieId: string | null) =>
  api.get<Movie>(`/api/movies/${movieId}/movie`);

export const deleteMovie = (movieId: string) =>
  api.delete<Movie>(`/api/movies/${movieId}/movie`);

interface MovieData {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  gender: string;
  duration: string;
}
export const updateMovie = (movie: MovieData, movieId: string | null) =>
  api.put<Movie>(`/api/movies/${movieId}/movie`, movie);
