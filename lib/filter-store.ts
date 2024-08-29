import { create } from "zustand";
import { persist } from "zustand/middleware";

export type isLoading = {
  isLoading: boolean;
};

export type loadingState = {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
};

export const useLoadingStore = create<loadingState>()(
  persist(
    (set) => ({
      isLoading: false,
      setIsLoading: (val) => set({ isLoading: val }),
    }),
    { name: "cart-loading" }
  )
);
