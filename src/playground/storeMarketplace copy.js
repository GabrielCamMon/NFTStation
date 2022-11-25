import create from 'zustand'
import { persist } from 'zustand/middleware'

const useStoreMarketplace = create(
  persist((set, get) => ({
    marketplace: {},
    setMarketplace: (marketplaceData) => set({ marketplace: marketplaceData }),
    removeMarketplace: () => set({ marketplace: '' }),
  })),
)

export default useStoreMarketplace
