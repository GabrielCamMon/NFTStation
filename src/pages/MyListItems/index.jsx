import React, { useState, useEffect } from 'react'

import Card from '../../components/common/Card'
import dataCard from '../../pages/Home/dataCards'
import Logo from '../../components/common/Logo'
import useStore from '../../store/useStore'

import { ethers } from 'ethers'

const MyListItems = () => {
  const [loading, setLoading] = useState(true)
  const [listedItems, setListedItems] = useState([])
  const [soldItems, setSoldItems] = useState([])

  const accountWeb3 = useStore((state) => state.accountWeb3)
  const nft = useStore((state) => state.nft)
  const marketplace = useStore((state) => state.marketplace)

  const loadListedItems = async () => {
    // Load all sold items that the user listed
    const itemCount = await marketplace.itemCount()
    let listedItems = []
    let soldItems = []

    for (let indx = 1; indx <= itemCount; indx++) {
      const i = await marketplace.items(indx)
      if (i.seller.toLowerCase() === accountWeb3) {
        //get uri url from  nft contract
        const uri = await nft.tokenURI(i.tokenId)
        // use uri to fetch the nft metadata stored on ipfs
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(i.itemId)
        // define listed item object
        let item = {
          totalPrice,
          price: i.price,
          itemId: i.itemId,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
        }
        listedItems.push(item)
        // Add listed item to sold items array if sold
        if (i.sold) soldItems.push(item)
      }
    }
    setLoading(false)
    setListedItems(listedItems)
    setSoldItems(soldItems)
  }

  useEffect(() => {
    loadListedItems()
  }, [])

  return (
    <>
      <Logo />
      <section className="section-explore-page" style={{ marginTop: '15rem' }}>
        <div>
          <div className="u-center-text u-margin-bottom-big">
            <h2 className="heading-secondary">My NFTs</h2>
          </div>
          <div className="row">
            {listedItems.length > 0 ? (
              listedItems.map((e, i) => (
                <div key={i} className="col-1-of-3">
                  <Card
                    title={e.name}
                    urlImage={e.image}
                    price={ethers.utils.formatEther(e.totalPrice)}
                    details={[e.description]}
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
        <div style={{ marginTop: '15rem' }}>
          <div className="u-center-text u-margin-bottom-big">
            <h2 className="heading-secondary">My Solds</h2>
          </div>
          <div className="row">
            {soldItems.length > 0 ? (
              soldItems.map((e, i) => (
                <div key={i} className="col-1-of-3">
                  <Card
                    title={e.name}
                    urlImage={e.image}
                    price={ethers.utils.formatEther(e.totalPrice)}
                    details={[
                      e.description,
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

export default MyListItems
