"use client";

import { Box, Button, Container, Tabs } from "@chakra-ui/react";
import React, { useState } from "react";

const page = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Container className="mx-auto ">
      <Tabs.Root defaultValue="Movie" variant="line">
        <Tabs.List gap="1rem" justifyItems="center" alignItems="center">
          <Tabs.Trigger value="Movie">Movie</Tabs.Trigger>
          <Tabs.Trigger value="Genre">Genre</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="Movie">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="1rem"
          >
            <Button
              variant="surface"
              className="bg-[#FFC300] p-1 self-end duration-100 hover:scale-95 text-black text-sm uppercase"
              onClick={async () => {
                setLoading((prev) => !prev);
                const res = await fetch(`api/save`, { method: "POST" });
                const data = await res.json();
                setLoading((prev) => !prev);
                if (data?.err) {
                  console.error(data.err);
                }
                alert(data.message);
              }}
              loading={loading}
              spinnerPlacement="start"
              loadingText="saving..."
            >
              Add to db
            </Button>
          </Box>
          {/* 7a211ada74d8ee23b26b9d4 */}
        </Tabs.Content>
        <Tabs.Content value="Genre">
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="1rem"
          >
            <Button
              variant="surface"
              className="bg-[#FFC300] p-1 self-end duration-100 hover:scale-95 text-black text-sm uppercase"
              onClick={async () => {
                // setLoading((prev) => !prev);
                // const res = await fetch("/api/save", {
                //   method: "POST",
                // });
                // const data = await res.json();
                // setLoading((prev) => !prev);
                // if (data?.err) {
                //   console.error(data.err);
                // }
                // alert(data.message);
              }}
              loading={loading}
              spinnerPlacement="start"
              loadingText="saving..."
            >
              Add to db
            </Button>
          </Box>
          {/* 7a211ada74d8ee23b26b9d4 */}
        </Tabs.Content>
      </Tabs.Root>
    </Container>
  );
};

export default page;
