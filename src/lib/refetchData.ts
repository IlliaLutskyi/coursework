import React from "react";
// Trailer
// https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}
// Actor
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={apiKey}
// Genre
// https://api.themoviedb.org/3/genre/movie/list?api_key=YOUR_API_KEY&language=en-US
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzE1MWUzZTE3MDFjNDk4NzA4YmUxNmU3OWIzMmYzMyIsIm5iZiI6MTcyNjExNjkwNC43MTcsInN1YiI6IjY2ZTI3NDI4OTAxM2ZlODcyMjIzNmUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jCLcIAJpJhdNezM7Ac5diJoF2vEu8C18A5sw9mU7bXo",
  },
};
async function movieData(page: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    options
  );
  const movieData = await res.json();
  return movieData;
}
async function addDataToDb() {}
