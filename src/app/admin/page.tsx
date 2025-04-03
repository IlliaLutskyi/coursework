"use client";
import { Button, Container } from "@chakra-ui/react";

const page = () => {
  return (
    <Container className="mx-auto ">
      <Button
        className="p-2 bg-black text-white rounded-md hover:scale-105 focus:scale-110"
        onClick={async () => {
          try {
            const res = await fetch("/api/save", { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            alert(data.message);
          } catch (err) {
            if (err instanceof Error) {
              alert(err.message);
            }
          }
        }}
      >
        Save
      </Button>
    </Container>
  );
};

export default page;
