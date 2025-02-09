import { Actor } from "../models/actor";
import { Cast } from "../models/cast";
import { Movie } from "../models/movie";
import connectDb from "./db";

type TActor = {
  id: number;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday?: string;
  name: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
};
export type TCast = {
  character: string;
  id: number;
  cast_id: number;
  name: string;
  order: number;
  popularity: number;
  profile_path: string | null;
};
type TMovie = {
  id: number;
  genre_ids: number[];
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
};
type TTrailer = {
  key: string;
  site: string;
};
type TTrailerData = {
  results: TTrailer[];
};
type TCastData = {
  cast: TCast[];
};
type TMovieData = {
  page: number;
  results: TMovie[];
};
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzE1MWUzZTE3MDFjNDk4NzA4YmUxNmU3OWIzMmYzMyIsIm5iZiI6MTcyNjExNjkwNC43MTcsInN1YiI6IjY2ZTI3NDI4OTAxM2ZlODcyMjIzNmUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jCLcIAJpJhdNezM7Ac5diJoF2vEu8C18A5sw9mU7bXo`,
  },
};
async function getMovieData(page?: string): Promise<TMovieData> {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?language=en-US`,
    options
  );
  const movieData: TMovieData = await res.json();
  return movieData;
}

async function getCastData(movieId: number): Promise<TCastData> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=57151e3e1701c498708be16e79b32f33`,
    options
  );
  const castData: TCastData = await res.json();
  return castData;
}
async function getTrailerData(movieId: number): Promise<TTrailerData> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=57151e3e1701c498708be16e79b32f33`,
    options
  );
  const trailerData: TTrailerData = await res.json();
  return trailerData;
}
async function getActorData(actorId: number): Promise<TActor> {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}?language=en-US`,
    options
  );
  const actorData: TActor = await res.json();
  return actorData;
}
export async function addMoviesToDb(page?: string): Promise<void> {
  try {
    await connectDb();
    const movieData = await getMovieData();
    for (let movie of movieData.results) {
      const castData = await getCastData(movie.id);
      const trailerData = await getTrailerData(movie.id);
      const m = new Movie({
        _id: movie.id,
        title: movie.title,
        overview: movie.overview,
        cast: castData.cast[0].cast_id,
        genre: movie.genre_ids,
        release_date: movie.release_date,
        popularity: movie.popularity,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        trailer_key: trailerData.results[0].key,
        trailer_site: trailerData.results[0].site,
        backdrop_path: movie.backdrop_path,
        poster_path: movie.poster_path,
      });
      await m.save();
    }
  } catch (err) {
    console.log(err);
  }
}
export async function addCastsToDb() {
  await connectDb();
  const movies: TMovie[] = await Movie.find();
  for (let movie of movies) {
    const castData = await getCastData(movie.id);
    const cast = castData.cast.map((actor) => {
      return {
        character: actor.character,
        id: actor.id,
        cast_id: actor.cast_id,
        name: actor.name,
        order: actor.order,
        popularity: actor.popularity,
        profile_path: actor.profile_path,
      };
    });
    console.log(movie.id);
    console.log(castData.cast[0].cast_id);
    const c = new Cast({
      tmdb_movie_id: movie.id,
      cast: [...cast],
    });
    await c.save();
  }
}
export async function addActorsToDb() {
  await connectDb();
  const casts: { tmdb_movie_id: number; cast: TCast[] }[] = await Cast.find();
  for (let cast of casts) {
    try {
      for (let actor of cast.cast) {
        const actorData = await getActorData(actor.id);
        console.log(actorData);
        const a = new Actor({
          _id: actorData.id,
          also_known_as: actorData.also_known_as,
          biography: actorData.biography,
          birthday: actorData.birthday,
          deathday: actorData.deathday,
          name: actorData.name,
          popularity: actorData.popularity,
          place_of_birth: actorData.place_of_birth,
          profile_path: actorData.profile_path,
        });
        await a.save();
      }
    } catch (err) {
      continue;
    }
  }
}
