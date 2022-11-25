export const useStoreNFT = (set) => ({
  nft: {},
  setNFT: (NFTData) => {
    set({ nft: NFTData })
  },
  removeNFT: () => {
    set({ nft: {} })
  },
})
