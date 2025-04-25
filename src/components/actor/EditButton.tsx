"use client";
import { TActor } from "@/models/actor";
import { useActorEditFormStore } from "@/stores/useActorEditFormStore";
import { Button } from "@chakra-ui/react";
import React from "react";
type props = {
  actor: TActor;
};
const EditButton = ({ actor }: props) => {
  const { toggle, setActor } = useActorEditFormStore((store) => store);
  return (
    <Button
      className=" bg-blue-600 text-white px-4 py-2 font-mono rounded-sm mx-4 my-2 hover:scale-105 self-end"
      onClick={() => {
        setActor(actor);
        toggle();
      }}
    >
      Edit Page
    </Button>
  );
};

export default EditButton;
