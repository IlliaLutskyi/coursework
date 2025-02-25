import { useTrailerPopupStore } from "@/stores/useTrailerPopupStore";
import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const CloseButton = () => {
  const close = useTrailerPopupStore((store) => store.toggle);
  return (
    <IoCloseOutline
      onClick={close}
      color="white"
      size="2.5rem"
      className="self-end cursor-pointer hover:bg-white hover:bg-opacity-20 hover:rounded-sm"
    />
  );
};

export default CloseButton;
