import { TCast } from "@/models/cast";
import { TMovie } from "@/models/movie";
import { TTVshow } from "@/models/tvshow";
import { TTVshowCast } from "@/models/tvshowcast";
import { create } from "zustand";
type initialStates = {
  isOpen: boolean;

  movie: TMovie | TTVshow | null;
  cast: {
    tmdb_movie_id: number;
    cast: (TCast | TTVshowCast)[];
  } | null;
  type: "tv" | "movie";
};
type actions = {
  toggle: () => void;
  setCast: (cast: {
    tmdb_movie_id: number;
    cast: (TCast | TTVshowCast)[];
  }) => void;

  setType: (type: "tv" | "movie") => void;
  setMovie: (movie: TTVshow | TMovie) => void;
};
type EditFormStore = initialStates & actions;
const initialStates: initialStates = {
  isOpen: false,
  type: "movie",
  movie: null,
  cast: null,
};

export const useEditForm = create<EditFormStore>((setState) => ({
  ...initialStates,
  toggle: () => setState((states) => ({ isOpen: !states.isOpen })),
  setCast: (cast) => setState(() => ({ cast })),
  setMovie: (movie) => setState(() => ({ movie })),
  setType: (type) => setState(() => ({ type })),
}));
