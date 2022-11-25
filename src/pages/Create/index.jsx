import React, { useState } from 'react'

import Logo from '../../components/common/Logo'
import useStore from '../../store/useStore'
import { ethers } from 'ethers'
import { create } from 'ipfs-http-client'
import token from '../../services/token'

const auth = `Basic ${token}`
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
})

const Create = () => {
  const accountWeb3 = useStore((state) => state.accountWeb3)
  const nft = useStore((state) => state.nft)
  const marketplace = useStore((state) => state.marketplace)

  const [image, setImage] = useState('')
  const [price, setPrice] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)

        setImage(`https://gcamon.infura-ipfs.io/ipfs/${result.path}`)
      } catch (error) {
        console.log('ipfs image upload error: ', error)
      }
    }
  }

  const mintThenList = async (result) => {
    const uri = `https://gcamon.infura-ipfs.io/ipfs/${result.path}`
    // mint nft
    await (await nft.mint(uri)).wait()
    //get tokenId of new nft
    const id = await nft.tokenCount()
    // approve marketplace to spend nft
    await (await nft.setApprovalForAll(marketplace.address, true)).wait()
    // add nft to marketplace
    const listingPrice = ethers.utils.parseEther(price.toString())
    await (await marketplace.makeItem(nft.address, id, listingPrice)).wait()
  }

  const createNFT = async (e) => {
    e.preventDefault()

    if (!image || !price || !name || !description) return
    try {
      const result = await client.add(
        JSON.stringify({ image, name, description }),
      )
      mintThenList(result)
    } catch (error) {
      console.log('ipfs uri upload error: ', error)
    }
  }

  return (
    <>
      <Logo />
      <section className="section-create">
        <div className="row">
          <div className="book">
            <div className="book__form">
              <form className="form" onSubmit={createNFT}>
                <div className="u-margin-bottom-medium">
                  <h2 className="heading-secondary">Create NFT</h2>
                </div>
                <div className="form__group">
                  <input
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form__input"
                    placeholder="Name"
                    required
                  />
                  <label htmlFor="name" className="form__label">
                    Name
                  </label>
                </div>
                <div className="form__group">
                  <input
                    id="description"
                    onChange={(e) => setDescription(e.target.value)}
                    type="text"
                    className="form__input"
                    placeholder="NFT Description"
                    required
                  />
                  <label htmlFor="description" className="form__label">
                    Description
                  </label>
                </div>
                <div className="form__group">
                  <input
                    id="price"
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    className="form__input"
                    placeholder="NFT Price"
                    required
                  />
                  <label htmlFor="price" className="form__label">
                    Price
                  </label>
                </div>

                <div className="form__group">
                  <div htmlFor="file" className="form__file">
                    <input
                      id="file"
                      onChange={uploadToIPFS}
                      type="file"
                      className="form__input"
                      placeholder="NFT Price"
                      required
                    />
                  </div>
                </div>
                <div className="form__group">
                  <button className="btn btn--blue">Create & List NFT!</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Create
