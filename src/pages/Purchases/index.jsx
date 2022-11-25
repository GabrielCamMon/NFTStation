import React, { useState, useEffect } from 'react'

import Card from '../../components/common/Card'
import dataCard from '../../pages/Home/dataCards'
import Logo from '../../components/common/Logo'
import useStore from '../../store/useStore'

import { ethers } from 'ethers'

const Purchases = () => {
  const [loading, setLoading] = useState(true)
  const [purchases, setPurchases] = useState([])

  const accountWeb3 = useStore((state) => state.accountWeb3)
  const nft = useStore((state) => state.nft)
  const marketplace = useStore((state) => state.marketplace)

  const loadPurchasedItems = async () => {
    //Featch purchased items from marketplace by quering offered events with the buyer set as the user
    const filter = marketplace.filters.Bought(
      null,
      null,
      null,
      null,
      null,
      accountWeb3,
    )
    const results = await marketplace.queryFilter(filter)

    //Fetch metadata of each nft and add that to listedItem object
    const purchases = await Promise.all(
      results.map(async (i) => {
        // get arguments from each result
        i = i.args
        // get uri url from nft contract
        const uri = await nft.tokenURI(i.tokenId)
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId)
        // define listed item object
        let purchasedItem = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: i.name,
          description: i.description,
          image: metadata.image,
        }
        return purchasedItem
      }),
    )
    setLoading(false)
    setPurchases(purchases)
  }

  useEffect(() => {
    loadPurchasedItems()
  }, [])

  return (
    <>
      <Logo />
      <section className="section-explore-page" style={{ marginTop: '15rem' }}>
        <div style={{ marginTop: '15rem' }}>
          <div className="u-center-text u-margin-bottom-big">
            <h2 className="heading-secondary">My Solds</h2>
          </div>
          <div className="row">
            {purchases.length > 0 ? (
              purchases.map((e, i) => (
                <div key={i} className="col-1-of-3">
                  <Card
                    title={e.name}
                    urlImage={e.image}
                    price={ethers.utils.formatEther(e.totalPrice)}
                    details={[
                      `For ${ethers.utils.formatEther(e.totalPrice)} ETH `,
                      `Recieved
                    ${ethers.utils.formatEther(e.price)} ETH`,
                    ]}
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

export default Purchases
