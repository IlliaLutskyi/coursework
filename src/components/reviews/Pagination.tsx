import React from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../ui/pagination";
import { HStack } from "@chakra-ui/react";
type props = {
  count: number;
  pageSize: number;
  defaultPage?: number;
  page: number;
  onPageChange: (e: { page: number }) => void;
};
const Pagination = ({
  count,
  pageSize,
  page,
  defaultPage = 1,
  onPageChange,
}: props) => {
  return (
    <PaginationRoot
      count={count}
      pageSize={pageSize}
      page={page}
      defaultPage={defaultPage}
      onPageChange={onPageChange}
    >
      <HStack>
        <PaginationPrevTrigger />
        <PaginationItems className="hover:bg-black hover:bg-opacity-30" />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  );
};

export default Pagination;
