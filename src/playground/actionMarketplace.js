import useStore from './storeMarketplace'
import { ethers } from 'ethers'

export const marketplace = useStore((state) => state.marketplace)

export const getMarketplace = async (signer) => {
  const marketplace = new ethers.Contract(
    MarketplaceAddress.address,
    MarketplaceAbi.abi,
    signer,
  )
  const setMarketplace = useStore((state) => state.setMarketplace)

  setMarketplace(marketplace)
}
