"use client";
import { useEditForm } from "@/stores/useEditForm";
import { Box, Button, Text } from "@chakra-ui/react";
import { FaPlus, FaUserAlt } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import OptimizedImage from "../OptimizedImage";
import { useCastMemberStore } from "@/stores/useCastMemberForm";
import { useCreateCastMemberStore } from "@/stores/useCreateCastMemberStore";
import CastMemberForm from "./CastMemberForm";
import CreateCastMemberForm from "./CreateCastMemberForm";
import ConfirmationForm from "./ConfirmationForm";
import { useConfirmatinFormStore } from "@/stores/useConfirmationForm";
import { Toaster } from "../ui/toaster";

const CastTab = () => {
  const { setCastMember, toggle: openEditCastMemberForm } = useCastMemberStore(
    (store) => store
  );
  const openCreateCastMemberForm = useCreateCastMemberStore(
    (store) => store.toggle
  );
  const { toggle: openConfirmationForm, setCastMemberId } =
    useConfirmatinFormStore((store) => store);
  const cast = useEditForm((store) => store.cast);

  return (
    <Box>
      <Box className="flex flex-col gap-2">
        <Box className="m-2">
          <Button
            className="bg-blue-500 p-2 text-white rounded-sm hover:scale-105"
            onClick={() => {
              openCreateCastMemberForm();
            }}
          >
            <FaPlus /> Add new character
          </Button>
        </Box>
        <Box className="overflow-y-scroll h-[400px]" id="scroll_container">
          {cast?.cast.map((actor, index) => {
            return (
              <Box
                className="grid grid-cols-[1fr_3fr_3fr_3fr] items-baseline hover:shadow-lg"
                key={index}
              >
                <Box>
                  {actor.profile_path ? (
                    <OptimizedImage
                      path={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                      className="w-1/2 rounded-sm"
                    />
                  ) : (
                    <FaUserAlt size="2rem" className="text-black mx-auto" />
                  )}
                </Box>
                <Box>
                  <Text className="text-xs ">{actor.name}</Text>
                </Box>
                <Box>
                  <Text className="text-xs ">{actor.character}</Text>
                </Box>
                <Box className="self-center flex gap-4 items-baseline">
                  <MdModeEdit
                    className="hover:scale-110"
                    onClick={() => {
                      setCastMember(actor);
                      openEditCastMemberForm();
                    }}
                  />

                  <CiTrash
                    className="bg-red-500 text-white hover:scale-110 rounded-full"
                    onClick={() => {
                      setCastMemberId(actor.id);
                      openConfirmationForm();
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <ConfirmationForm />
      <CastMemberForm />
      <CreateCastMemberForm />
      <Toaster />
    </Box>
  );
};

export default CastTab;
