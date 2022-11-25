import React, { useState, useEffect } from 'react'

import Card from '../../components/common/Card'
import dataCard from '../../pages/Home/dataCards'
import Logo from '../../components/common/Logo'
import useStore from '../../store/useStore'

import { ethers } from 'ethers'

const Explore = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const accountWeb3 = useStore((state) => state.accountWeb3)
  const nft = useStore((state) => state.nft)
  const marketplace = useStore((state) => state.marketplace)

  const loadMarketplaceItems = async () => {
    let itemCount = await marketplace.itemCount()
    let items = []

    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)

      if (!item.sold) {
        //get uir from nft contract

        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs

        const response = await fetch(uri)

        const metadata = await response.json()

        //get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: [metadata.description],
          urlImage: metadata.image,
        })
      }
    }
    setItems(items)
    setLoading(false)
  }
  const buyMarketItem = async (item) => {
    await (
      await marketplace.purchaseItem(item.itemId, { value: item.totalPrice })
    ).wait()
    loadMarketplaceItems()
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])

  return (
    <>
      <Logo />
      <section className="section-explore-page" style={{ marginTop: '15rem' }}>
        <div id="section-explore">
          <div className="u-center-text u-margin-bottom-big">
            <h2 className="heading-secondary">Explore Beatiful NFTs</h2>
          </div>
          <div className="row">
            {items.length > 0 ? (
              items.map((e, i) => (
                <div key={i} className="col-1-of-3">
                  <Card
                    title={e.name}
                    urlImage={e.urlImage}
                    price={ethers.utils.formatEther(e.totalPrice)}
                    details={e.description}
                    action={() => buyMarketItem(e)}
                  />
                </div>
              ))
            ) : (
              <div style={{ padding: '1rem 0', textAlign: 'center' }}>
                <h2>No listed assets</h2>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Explore
