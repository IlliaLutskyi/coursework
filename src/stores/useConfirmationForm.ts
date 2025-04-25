import { create } from "zustand";

type initialStates = {
  isOpen: boolean;
  castMemberId: number | null;
};
type actions = {
  toggle: () => void;
  setCastMemberId: (castMemberId: number) => void;
};
const initialStates: initialStates = {
  isOpen: false,
  castMemberId: null,
};
type ConfirmationFormStore = initialStates & actions;
export const useConfirmatinFormStore = create<ConfirmationFormStore>(
  (setState) => ({
    ...initialStates,
    toggle: () =>
      setState((states) => ({
        isOpen: !states.isOpen,
      })),
    setCastMemberId: (castMemberId) => setState(() => ({ castMemberId })),
  })
);
