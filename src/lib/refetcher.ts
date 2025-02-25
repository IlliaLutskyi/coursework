import { TTVshow, TVshow } from "./../models/tvshow";
import { Trailer } from "@/models/trailer";
import { Actor } from "../models/actor";
import { Cast } from "../models/cast";
import { Movie } from "../models/movie";
import connectDb from "./db";
import { Genre } from "@/models/genre";
import { TTVshowCast, TVshowCast } from "@/models/tvshowcast";
const TMDB_API_KEY: string = process.env.TMDB_API_KEY as string;
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
  },
};
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
type TGenre = {
  id: number;
  name: string;
};
type TGenreData = {
  genres: TGenre[];
};
type TMovieCast = {
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
  id: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
};
type TTrailerData = {
  results: TTrailer[];
};
type TTV = {
  id: number;
  name: string;
  genre_ids: number[];
  overview: string;
  popularity: number;
  first_air_date: string;
  media_type: string;
  vote_average: number;
  vote_count: number;
  backdrop_path: string;
  poster_path: string;
  origin_country: string[];
};
type TTVData = {
  page: number;
  results: TTV[];
};
type TMovieCastData = {
  cast: TMovieCast[];
};
type TTVCastData = {
  id: number;
  cast: TTVshowCast[];
};
type TMovieData = {
  page: number;
  results: TMovie[];
};
async function getMovieOrTvData(
  page: number,
  type: string = "movie"
): Promise<TMovieData | TTVData> {
  if (type.toLowerCase() === "movie") {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
      options
    );
    const movieData: TMovieData = await res.json();
    return movieData;
  } else {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/tv/week?language=en-US`,
      options
    );
    const TVshowData: TTVData = await res.json();
    return TVshowData;
  }
}

async function getCastData(
  id: number,
  type: string = "movie"
): Promise<TMovieCastData | TTVCastData> {
  if (type.toLowerCase() === "movie") {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`,
      options
    );
    const castData: TMovieCastData = await res.json();
    return castData;
  } else {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${TMDB_API_KEY}`,
      options
    );
    const castData: TTVCastData = await res.json();
    return castData;
  }
}
async function getTrailerData(
  id: number,
  type: string = "movie"
): Promise<TTrailerData> {
  if (type.toLowerCase() == "movie") {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}`,
      options
    );
    const trailerData: TTrailerData = await res.json();
    return trailerData;
  } else {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${TMDB_API_KEY}`,
      options
    );
    const trailerData: TTrailerData = await res.json();
    return trailerData;
  }
}
async function getActorData(actorId: number): Promise<TActor> {
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${actorId}?language=en-US`,
    options
  );
  const actorData: TActor = await res.json();
  return actorData;
}
async function getGenresData() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`,
    options
  );
  const genreData: TGenreData = await res.json();
  return genreData;
}
export async function addMoviesToDb(page: number): Promise<void> {
  await connectDb();
  const movieData = (await getMovieOrTvData(page)) as TMovieData;
  console.log(movieData.results);
  for (let movie of movieData.results) {
    try {
      const castData = (await getCastData(movie.id)) as TMovieCastData;
      const trailerData = await getTrailerData(movie.id);
      console.log(trailerData.results);
      if (!trailerData.results[0]) {
        throw new Error();
      }
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
        trailer_id: trailerData.results[0].id,
        backdrop_path: movie.backdrop_path,
        poster_path: movie.poster_path,
      });
      await m.save();
      const t = new Trailer({
        _id: trailerData.results[0].id,
        trailer_key: trailerData.results[0].key,
        trailer_type: trailerData.results[0].type,
        trailer_site: trailerData.results[0].site,
        official: trailerData.results[0].official,
      });
      await t.save();
    } catch (err) {
      console.log("Movie have already been there");
      continue;
    }
  }
}
export async function addCastsToDb(type: string = "movie") {
  await connectDb();
  if (type.toLowerCase() === "movie") {
    const movies: TMovie[] = await Movie.find();
    for (let movie of movies) {
      try {
        const castData = (await getCastData(movie.id)) as TMovieCastData;
        if (!castData.cast) {
          throw new Error("Cast does not exist");
        }
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
        console.log(castData.cast);
        const c = new Cast({
          tmdb_movie_id: movie.id,
          cast: [...cast],
        });
        await c.save();
      } catch (err) {
        continue;
      }
    }
  } else {
    const tvshows: TTVshow[] = await TVshow.find();
    for (let tvshow of tvshows) {
      try {
        const castData = (await getCastData(tvshow._id, "tv")) as TTVCastData;
        console.log(castData);
        if (!castData.cast) {
          throw new Error("Cast does not exist");
        }
        const cast = castData.cast.map((actor) => {
          return {
            character: actor.character,
            id: actor.id,
            name: actor.name,
            order: actor.order,
            popularity: actor.popularity,
            profile_path: actor.profile_path,
          };
        });
        const c = new TVshowCast({
          tmdb_movie_id: tvshow._id,
          cast: [...cast],
        });
        await c.save();
      } catch (err) {
        console.log(err);
        break;
      }
    }
  }
}
export async function addGenresToDb() {
  const genreData = await getGenresData();
  for (let genre of genreData.genres) {
    const g = new Genre({
      _id: genre.id,
      name: genre.name,
    });
    await g.save();
  }
}
export async function addActorsToDb(type: string = "movie") {
  await connectDb();
  console.log("Starting...");
  if (type.toLowerCase() === "movie") {
    const casts: { tmdb_movie_id: number; cast: TMovieCast[] }[] =
      await Cast.find();
    for (let cast of casts) {
      for (let actor of cast.cast) {
        try {
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
        } catch (err) {
          console.log("Actor was in db");
          continue;
        }
      }
    }
  } else {
    const casts: { tmdb_movie_id: number; cast: TTVshowCast[] }[] =
      await TVshowCast.find();
    for (let cast of casts) {
      for (let actor of cast.cast) {
        try {
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
        } catch (err) {
          console.log(err);
          continue;
        }
      }
    }
  }
  console.log("End...");
}
export async function addTVshowToDb(page: number): Promise<void> {
  await connectDb();
  const tvshowData = (await getMovieOrTvData(page, "tv")) as TTVData;
  console.log(tvshowData.results);
  for (let tvshow of tvshowData.results) {
    try {
      const trailerData = await getTrailerData(tvshow.id, "tv");
      // console.log(trailerData.results);
      if (!trailerData.results[0]) {
        throw new Error();
      }
      const tv = new TVshow({
        _id: tvshow.id,
        title: tvshow.name,
        overview: tvshow.overview,
        genre: tvshow.genre_ids,
        media_type: tvshow.media_type,
        release_date: tvshow.first_air_date,
        popularity: tvshow.popularity,
        vote_average: tvshow.vote_average,
        vote_count: tvshow.vote_count,
        trailer_id: trailerData.results[0].id,
        backdrop_path: tvshow.backdrop_path,
        poster_path: tvshow.poster_path,
        origin_country: tvshow.origin_country,
      });
      await tv.save();
      const t = new Trailer({
        _id: trailerData.results[0].id,
        trailer_key: trailerData.results[0].key,
        trailer_type: trailerData.results[0].type,
        trailer_site: trailerData.results[0].site,
        official: trailerData.results[0].official,
      });
      await t.save();
    } catch (err) {
      console.log("TV have already been there");
      continue;
    }
  }
}
export async function deleteTvshowCastsFromDb() {
  await connectDb();
  const tvshows = await TVshow.find().lean();
  for (let tvshow of tvshows) {
    try {
      const c = await Cast.findOne({ tmdb_movie_id: tvshow._id });
      console.log(c);
    } catch (err) {
      console.log(err);
      break;
    }
  }
}
