import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { useStoreAccount } from './storeAccount'
import { useStoreMarketplace } from './storeMarketplace'
import { useStoreNFT } from './storeNft'

const useStore = create(
  devtools((...a) => ({
    ...useStoreAccount(...a),
    ...useStoreMarketplace(...a),
    ...useStoreNFT(...a),
  })),
)
export default useStore
