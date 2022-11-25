import React, { useState } from 'react'
import { ethers } from 'ethers'
import MarketplaceAbi from '../../contractsData/Marketplace.json'
import MarketplaceAddress from '../../contractsData/Marketplace-address.json'
import NFTAbi from '../../contractsData/NFT.json'
import NFTAddress from '../../contractsData/NFT-address.json'
import { Link } from 'react-router-dom'

import useStore from '../../store/useStore'
import shallow from 'zustand/shallow'

function Navigation() {
  const [loading, setLoading] = useState(true)

  const [
    accountWeb3,
    setAccountWeb3,
    removeAccountWeb3,
    marketplace,
    setMarketplace,
    removeMarketplace,
    nft,
    setNFT,
    removeNFT,
  ] = useStore(
    (state) => [
      state.accountWeb3,
      state.setAccountWeb3,
      state.removeAccountWeb3,
      state.marketplace,
      state.setMarketplace,
      state.removeAccountWeb3,
      state.nft,
      state.setNFT,
      state.removeNFT,
    ],
    shallow,
  )

  const loadContracts = async (signer) => {
    //Get deployed copies of contracts
    const marketplaceContract = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer,
    )
    const nftContract = new ethers.Contract(
      NFTAddress.address,
      NFTAbi.abi,
      signer,
    )
    setMarketplace(marketplaceContract)
    setNFT(nftContract)
    setLoading(false)
  }

  const logOut = () => {
    removeNFT()
    removeMarketplace()
    removeAccountWeb3()
  }
  //MetaMask Login/Connect
  const web3Handler = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    // Get provider from MetaMask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // MetaMask requires requesting permission to connect users accounts
    await provider.send('eth_requestAccounts', [])
    // Set signer
    const signer = provider.getSigner()

    await loadContracts(signer)
    setAccountWeb3(accounts[0])
  }

  return (
    <div className="navigation">
      <input
        type="checkbox"
        id="navi-toggle"
        className="navigation__checkbox"
      />
      <label htmlFor="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>
      <div className="navigation__background">&nbsp;</div>
      <nav className="navigation__nav">
        <ul className="navigation__list">
          <li className="navigation__item">
            {!accountWeb3 ? (
              <Link href="#" className="navigation__link" onClick={web3Handler}>
                <span>01 </span>Connect Wallet {accountWeb3}
              </Link>
            ) : (
              <a
                href={`https://etherscan.io/address/${accountWeb3}`}
                target="_blanck"
                rel="nooperner noreferrer"
                className="navigation__link"
                onClick={() => {}}
              >
                <span>01</span> Account :
                {accountWeb3 &&
                  accountWeb3.slice(0, 5) + '...' + accountWeb3.slice(38, 42)}
              </a>
            )}
          </li>

          <li className="navigation__item">
            <Link to={'/explore'} className="navigation__link">
              <span>02</span>Explore
            </Link>
          </li>
          {accountWeb3 && (
            <>
              <li className="navigation__item">
                <Link to="/create" className="navigation__link">
                  <span>03</span> Create
                </Link>
              </li>
              <li className="navigation__item">
                <Link to="/mylist" className="navigation__link">
                  <span>04</span>My Items
                </Link>
              </li>
              <li className="navigation__item">
                <Link to={'/purchases'} className="navigation__link">
                  <span>05</span>My Purchase
                </Link>
              </li>
              <li className="navigation__item">
                <a href="#" className="navigation__link" onClick={logOut}>
                  <span>06</span>Logout
                </a>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default Navigation
