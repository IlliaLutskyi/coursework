import { create } from "zustand";

type initialStates = {
  isOpen: boolean;
  actorId: number | null;
};
type actions = {
  toggle: () => void;
  setActorId: (actorId: number) => void;
};
const initialStates: initialStates = {
  isOpen: false,
  actorId: null,
};
type CreateCastMemberStore = initialStates & actions;
export const useCreateCastMemberStore = create<CreateCastMemberStore>(
  (setState) => ({
    ...initialStates,
    toggle: () =>
      setState((states) => ({
        isOpen: !states.isOpen,
      })),
    setActorId: (actorId) => setState(() => ({ actorId })),
  })
);
