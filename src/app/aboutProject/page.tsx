import { Box, Heading, List, Text } from "@chakra-ui/react";
import React from "react";

const page = () => {
  return (
    <Box className="px-5 py-2">
      <Heading className="text-lg font-bold text-center">
        About This Project
      </Heading>
      <Text>
        This project is a modern and responsive movie discovery platform built
        using the latest web technologies. It allows users to explore movies,
        view details, and get recommendations, all powered by the TMDB API.With
        a clean and user-friendly design, this project provides an intuitive
        experience for browsing and discovering movies effortlessly.
      </Text>
      <Heading className="text-lg font-bold text-center">
        Tech Stack Used
      </Heading>
      <List.Root className="list-disc">
        <List.Item>
          Next.js & TypeScript – For a fast, SEO-friendly, and scalable
          frontend.
        </List.Item>
        <List.Item>
          Chakra UI – For a sleek, responsive, and accessible user interface.
        </List.Item>
        <List.Item>
          TMDB API – To fetch real-time movie data, including ratings, posters,
          and descriptions.
        </List.Item>
        <List.Item>MongoDB – For storing movies</List.Item>
      </List.Root>
    </Box>
  );
};

export default page;
