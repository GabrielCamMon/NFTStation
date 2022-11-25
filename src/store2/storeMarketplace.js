export const useStoreMarketplace = (set) => ({
  marketplace: {},
  setMarketplace: (marketplaceData) => set({ marketplace: marketplaceData }),
  removeMarketplace: () => set({ marketplace: {} })
})
