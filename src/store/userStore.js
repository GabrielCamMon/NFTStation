import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist((set) => ({
    userMetaMask: {},
    getUserMetaMask: (data) =>
      set({
        userMetaMask: data,
      }),
    removeMetaMask: () =>
      set({
        userMetaMask: {},
      }),
  }))
);
export default useStore;
