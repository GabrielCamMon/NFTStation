import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStoreNFT = create(
  persist((set) => ({
    nft: {},
    setNFT: (NFTData) =>
      set({
        nft: NFTData,
      }),
    removeNFT: () =>
      set({
        nft: {},
      }),
  })),
)
export default useStoreNFT
