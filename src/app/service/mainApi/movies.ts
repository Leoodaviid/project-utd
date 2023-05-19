import { Movie } from "@prisma/client";
import { MovieDataProps } from "../../models/models";
import api from "./config";

export const getMovies = () => api.get<Movie[]>("api/movies");

export const getMovie = (movieId: string | null) =>
  api.get(`/api/movies/${movieId}/movie`);

export const postMovie = (movie: MovieDataProps) =>
  api.post<Movie>("api/movies", movie);

export const updateMovie = (movie: MovieDataProps, movieId: string | null) =>
  api.put<Movie>(`/api/movies/${movieId}/movie`, movie);

export const deleteMovie = (movieId: string) =>
  api.delete<Movie>(`/api/movies/${movieId}/movie`);
