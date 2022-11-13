import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist((set) => ({
    nft: {},
    getMarketplace: (data) =>
      set({
        nft: data,
      }),
    removeMarketplace: () =>
      set({
        nft: {},
      }),
  }))
);
export default useStore;
