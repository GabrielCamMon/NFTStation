import useStore from './storeNft'
import { ethers } from 'ethers'

export const nft = useStore((state) => state.nft)

export const getNFT = async (signer) => {
  const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
  const setNFT = useStore((state) => state.setNFT)
  setNFT(nft)
}
