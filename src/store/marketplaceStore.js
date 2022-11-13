import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist((set) => ({
    marketplace: {},

    getMarketplace: (data) =>
      set({
        marketplace: data,
      }),
    removeMarketplace: () =>
      set({
        marketplace: {},
      }),
  }))
);
export default useStore;
