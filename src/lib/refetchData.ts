import { Actor } from "@/models/actor";
import { Cast } from "@/models/cast";
import { Movie } from "@/models/movie";
import mongoose from "mongoose";
import React from "react";
import { connectDb } from "./db";
// Trailer
// https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}
// Actor
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={apiKey}
// Genre
// https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY&language=en-US
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
};
type TCast = {
  cast_id: number;
  character: string;
  id: number;
  name: string;
  order: number;
  popularity: number;
  profile_path: string;
};
type TTrailer = {
  key: string;
  site: string;
};
type TTrailerData = {
  result: TTrailer[];
};
type TCastData = {
  cast: TCast[];
};
type TMovieData = {
  page: number;
  result: TMovie[];
};
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_TOKEN as string}`,
  },
};
async function getMovieData(page: string): Promise<TMovieData> {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    options
  );
  const movieData: TMovieData = await res.json();
  return movieData;
}

async function getCastData(movieId: number): Promise<TCastData> {
  const apiKey = process.env.TMDB_API_KEY as string;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=${apiKey}`,
    options
  );
  const castData: TCastData = await res.json();
  return castData;
}
async function getTrailerData(movieId: number): Promise<TTrailerData> {
  const apiKey = process.env.TMDB_API_KEY as string;
  const res = await fetch(
    ` https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`,
    options
  );
  const trailerData: TTrailerData = await res.json();
  return trailerData;
}
async function addDataToDb(page: string): Promise<void> {
  try {
    await connectDb();
    const movieData = await getMovieData(page);
    for (const movie of movieData.result) {
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
        trailer_key: trailerData.result[0].key,
        trailer_site: trailerData.result[0].site,
        poster_path: movie.poster_path,
      });
      await m.save();
      let actorIds: number[] = castData.cast.map((actor) => actor.id);

      const c = new Cast({
        _id: castData.cast[0].cast_id,
        tmdb_movie_id: movie.id,
        cast: actorIds,
      });
      await c.save();
      await Promise.all(
        castData.cast.map(async (actor) => {
          const a = new Actor({
            tmdb_cast_id: actor.cast_id,
            _id: actor.id,
            character: actor.character,
            name: actor.name,
            order: actor.order,
            popularity: actor.popularity,
            profile_path: actor.profile_path,
          });
          await a.save();
        })
      ).catch((err) => {
        throw err;
      });
    }
  } catch (err) {
    console.log(err);
  }
}
