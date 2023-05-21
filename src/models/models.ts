export interface MovieDataProps {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

export interface UserCreateProps {
  name: string;
  email: string;
  password: string;
}

export interface ModalStoreProps {
  movieId?: string;
  isOpen: boolean;
  openModal: (MovieId: string) => void;
  closeModal: () => void;
}
