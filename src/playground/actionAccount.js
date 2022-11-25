import useStore from './storeAccount'
import { getMarketplace } from './actionMarketplace'
import { getNFT } from './actionNFT'

export const accountWeb3 = useStore((state) => state.accountWeb3)

export const getAccountWeb3 = async () => {
  const setAccountWeb3 = useStore((state) => state.setAccountWeb3)
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  })

  setAccountWeb3(accounts[0])

  // Get provider from MetaMask
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  // MetaMask requires requesting permission to connect users accounts
  await provider.send('eth_requestAccounts', [])
  // Set signer
  const signer = provider.getSigner()

  await getMarketplace(signer)
  await getNFT(signer)
}
