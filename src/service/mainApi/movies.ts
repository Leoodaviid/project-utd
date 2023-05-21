import { MovieDataProps } from "@/models/models";
import api from "./config";

export const getMovies = () => api.get<MovieDataProps[]>("/api/movies");

export const getMovie = (movieId: string | null) =>
  api.get<MovieDataProps>(`/api/movies/${movieId}/movie`);

export const postMovie = (movie: MovieDataProps) =>
  api.post<MovieDataProps>("/api/movies", movie);

export const updateMovie = (movie: MovieDataProps, movieId: string | null) =>
  api.put<MovieDataProps>(`/api/movies/${movieId}/movie`, movie);

export const deleteMovie = (movieId: string) =>
  api.delete<MovieDataProps>(`/api/movies/${movieId}/movie`);
