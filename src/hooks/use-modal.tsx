import { create } from "zustand";

type modalStore = {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  set: (state: Partial<modalStore>) => void;
};

export const useModal = create<modalStore>((set) => ({
  modalOpen: false,
  setModalOpen: (value) => set(() => ({ modalOpen: value })),
  set: (state) => set(state),
}));
