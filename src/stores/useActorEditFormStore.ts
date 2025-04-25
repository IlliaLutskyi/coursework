import { TActor } from "@/models/actor";
import { create } from "zustand";
type initialStates = {
  isOpen: boolean;
  actor: TActor | null;
};
type actions = {
  toggle: () => void;

  setActor: (actor: TActor) => void;
};
const initialStates: initialStates = {
  isOpen: false,
  actor: null,
};
type ActorStore = initialStates & actions;
export const useActorEditFormStore = create<ActorStore>((setState) => ({
  ...initialStates,
  toggle: () =>
    setState((states) => ({
      isOpen: !states.isOpen,
    })),
  setActor: (actor) => setState(() => ({ actor })),
}));
