import { create } from "zustand";
import { User } from "@/types/user";

type UserDraftStore = {
  user: User | null;
  setDraft: (user: User) => void;
};

export const useUserStore = create<UserDraftStore>()((set) => ({
  user: null,
  setDraft: (user) => set({ user }),
}));
