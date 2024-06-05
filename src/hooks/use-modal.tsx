import { create } from "zustand";

type modalStore = {
  open: boolean;
  setOpen: (value: boolean) => void;
  set: (state: Partial<modalStore>) => void;
};

export const useModal = create<modalStore>((set) => ({
  open: false,
  setOpen: (value) => set(() => ({ open: value })),
  set: (state) => set(state),
}));
