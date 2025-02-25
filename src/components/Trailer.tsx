"use client";
import { TTrailer } from "@/models/trailer";
import { Alert, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
type props = {
  trailer_id: string;
  className: string;
};
const Trailer = ({ trailer_id, className }: props) => {
  const [trailer, setTrailer] = useState<TTrailer | undefined>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchTrailer() {
      try {
        setLoading(true);
        const res = await fetch(`/api/trailer/${trailer_id}`, {
          signal: signal,
        });
        const data: { trailer: TTrailer } = await res.json();
        console.log("Here ", data);
        setTrailer(data.trailer);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrailer();
    return () => {
      controller.abort();
    };
  }, [trailer_id]);
  if (loading)
    return (
      <Text color="white" textAlign={"center"}>
        Loading...{" "}
      </Text>
    );

  return (
    <>
      {trailer && (
        <iframe
          src={`https://www.youtube.com/embed/${trailer.trailer_key}`}
          className={className}
        ></iframe>
      )}
    </>
  );
};

export default Trailer;
