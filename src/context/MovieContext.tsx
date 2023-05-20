"use client";
import { Movie } from "@prisma/client";
import React, {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  deleteMovie,
  getMovies,
  postMovie,
  updateMovie,
} from "@/service/mainApi/movies";
import { userCreate } from "@/service/mainApi/user";
import { useRouter } from "next/navigation";
import { MovieDataProps, UserCreateProps } from "@/models/models";
import { signIn } from "next-auth/react";

interface MoviesContextProps {
  login: (email: string, password: string) => Promise<void>;
  create(name: string, email: string, password: string): Promise<void>;
  createMovie(movie: MovieDataProps): Promise<void>;
  editMovie(
    movieId: string | null,
    updatedMovie: MovieDataProps
  ): Promise<void>;
  removeMovie(movieId: string): Promise<void>;
  movies: Movie[];
  error: null;
  loading: boolean;
}

export const MovieContext = createContext<MoviesContextProps>(
  {} as MoviesContextProps
);

export const MovieStorage = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setError(null);
        setLoading(true);
        const moviesRequest = await getMovies();
        if (moviesRequest.status !== 200)
          throw new Error(`Error: ${moviesRequest.statusText}`);
        const request = [moviesRequest];
        const [{ data: moviesResponse }] = await Promise.all(request);
        setMovies(moviesResponse);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [setMovies]);

  async function login(email: string, password: string) {
    try {
      setError(null);
      setLoading(true);
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/profiles");
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function create(name: string, email: string, password: string) {
    try {
      setError(null);
      setLoading(true);
      const registerRequest = await userCreate({ name, email, password });
      if (registerRequest.status !== 200)
        throw new Error(`Error: ${registerRequest.statusText}`);
      await login(email, password);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function createMovie(movie: MovieDataProps) {
    try {
      setError(null);
      setLoading(true);
      const createRequest = await postMovie(movie);
      if (createRequest.status !== 200)
        throw new Error(`Error: ${createRequest.statusText}`);
      setMovies((prevMovies) => [...prevMovies, createRequest.data]);
      router.push("/");
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function editMovie(
    movieId: string | null,
    updatedMovie: MovieDataProps
  ) {
    try {
      setError(null);
      setLoading(true);
      const editRequest = await updateMovie(updatedMovie, movieId);
      if (editRequest.status !== 200)
        throw new Error(`Error: ${editRequest.statusText}`);
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === movieId ? editRequest.data : movie
        )
      );
      router.push("/");
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeMovie(movieId: string) {
    try {
      const response = await deleteMovie(movieId);
      if (response.status === 200) {
        console.log("Filme excluído com sucesso");
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.id !== movieId)
        );
      } else {
        console.error("Erro ao excluir o filme");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <MovieContext.Provider
      value={{
        movies,
        login,
        create,
        createMovie,
        editMovie,
        removeMovie,
        loading,
        error,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
