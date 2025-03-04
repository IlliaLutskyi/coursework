"use client";
import { TTrailer } from "@/models/trailer";
import React, { useEffect, useState } from "react";
type props = {
  trailer_id: string;
  className: string;
};
const Trailer = ({ trailer_id, className }: props) => {
  const [trailer, setTrailer] = useState<TTrailer | undefined>();
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchTrailer() {
      try {
        const res = await fetch(`/api/trailer/${trailer_id}`, {
          signal: signal,
        });
        const data: { trailer: TTrailer } = await res.json();
        setTrailer(data.trailer);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTrailer();
    return () => {
      controller.abort();
    };
  }, [trailer_id]);

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
