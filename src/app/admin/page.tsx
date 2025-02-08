"use client";
import {
  Box,
  Button,
  Container,
  Field,
  Input,
  Separator,
  Tabs,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <Container className="mx-auto ">
      <Tabs.Root defaultValue="Movie" variant="line">
        <Tabs.List className="gap-4 justify-center">
          <Tabs.Trigger value="Movie">Movie</Tabs.Trigger>
          <Tabs.Trigger value="Trailer">Trailer</Tabs.Trigger>
          <Tabs.Trigger value="Actor">Actor</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="Movie">
          <Box className="flex flex-col gap-4 justify-center items-center">
            <Field.Root>
              <Field.Label>The name of the movie</Field.Label>
              <Input
                className="bg-white text-black p-1 "
                placeholder="Batman"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>The year</Field.Label>
              <Input className="bg-white text-black p-1 " placeholder="2012" />
            </Field.Root>
            <Field.Root>
              <Field.Label>The page</Field.Label>
              <Input className="bg-white text-black p-1 " placeholder="1" />
            </Field.Root>
            <Button
              variant="surface"
              className="bg-[#FFC300] p-1 self-end duration-100 hover:scale-95 text-black text-sm uppercase"
              onClick={() => {
                const p = "/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg";
                const apiKey = process.env.TMDB_API_KEY as string;
                const options = {
                  method: "GET",
                  headers: {
                    accept: "application/json",
                    Authorization:
                      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NzE1MWUzZTE3MDFjNDk4NzA4YmUxNmU3OWIzMmYzMyIsIm5iZiI6MTcyNjExNjkwNC43MTcsInN1YiI6IjY2ZTI3NDI4OTAxM2ZlODcyMjIzNmUyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jCLcIAJpJhdNezM7Ac5diJoF2vEu8C18A5sw9mU7bXo",
                  },
                };
                fetch(
                  `https://api.themoviedb.org/3/movie/2661
/credits?api_key=${apiKey}`,
                  options
                )
                  .then((res) => res.json())
                  .then((data) => console.log(data))
                  .catch(() => alert("Error"));
              }}
            >
              Add to db
            </Button>
            <Image
              src={
                "https://image.tmdb.org/t/p/original/zo8CIjJ2nfNOevqNajwMRO6Hwka.jpg"
              }
              alt="d"
              width={500}
              height={500}
            ></Image>
            <Image
              src={
                "https://image.tmdb.org/t/p/original/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg"
              }
              alt="d"
              width={500}
              height={500}
            ></Image>
          </Box>
          {/* 7a211ada74d8ee23b26b9d4 */}
        </Tabs.Content>
        <Tabs.Content value="Trailer">
          <Box className="flex flex-col gap-4 justify-center items-center">
            <Field.Root>
              <Field.Label>The movie id</Field.Label>
              <Input
                className="bg-white text-black p-1 "
                placeholder="Batman"
              />
            </Field.Root>
            <Button
              variant="surface"
              className="bg-[#FFC300] p-1 self-end duration-100 hover:scale-95 text-black text-sm uppercase"
            >
              Add to db
            </Button>
          </Box>
        </Tabs.Content>
        <Tabs.Content value="Actor"></Tabs.Content>
      </Tabs.Root>
    </Container>
  );
};

export default page;
