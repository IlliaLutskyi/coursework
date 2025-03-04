import Header from "@/components/home/Header";
import { Box } from "@chakra-ui/react";
import Content from "@/components/home/Content";
import TrailerPopup from "@/components/TrailerPopup";

export default function Home() {
  return (
    <Box display="flex" flexDirection={"column"} gap="2rem">
      <Header />
      <Content />
      <TrailerPopup />
    </Box>
  );
}
