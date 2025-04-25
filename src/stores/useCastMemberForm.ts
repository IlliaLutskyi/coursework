import { create } from "zustand";
type castMember = {
  id: number;
  character: string;
};
type initialStates = {
  isOpen: boolean;
  castMember: castMember | null;
};
type actions = {
  toggle: () => void;

  setCastMember: (castMember: castMember) => void;
};
const initialStates: initialStates = {
  isOpen: false,
  castMember: null,
};
type CastMemberStore = initialStates & actions;
export const useCastMemberStore = create<CastMemberStore>((setState) => ({
  ...initialStates,
  toggle: () =>
    setState((states) => ({
      isOpen: !states.isOpen,
    })),
  setCastMember: (castMember) =>
    setState(() => ({
      castMember,
    })),
}));
