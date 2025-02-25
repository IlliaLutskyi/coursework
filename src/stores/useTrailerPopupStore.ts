import { create } from "zustand";

type InitialStates = {
  trailer_id: string;
  isOpen: boolean;
  movie_title: string;
};

type PopUpActions = {
  toggle: () => void;
  setTrailerId: (id: string) => void;
  setMovieTitle: (title: string) => void;
};

type TrailerPopupStore = InitialStates & PopUpActions;

const initialStates: InitialStates = {
  trailer_id: "",
  movie_title: "",
  isOpen: false,
};

export const useTrailerPopupStore = create<TrailerPopupStore>((setState) => ({
  ...initialStates,
  toggle: () => setState((state) => ({ isOpen: !state.isOpen })),
  setTrailerId: (id) => setState(() => ({ trailer_id: id })),
  setMovieTitle: (title) => setState(() => ({ movie_title: title })),
}));
