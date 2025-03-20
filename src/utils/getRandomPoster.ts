import { TFetchedMovies } from "@/app/page";

export function getRandomPoster(
  Movies: Pick<TFetchedMovies, "poster_path">[]
): string {
  let randomNumber = Math.round(Math.random() * Movies.length);

  return Movies[randomNumber]?.poster_path
    ? Movies[randomNumber].poster_path
    : "/kkjTbwV1Xnj8wBL52PjOcXzTbnb.jpg";
}
