import useStore from "./marketplaceStore";
import { ethers } from "ethers";

export const marketplace = useStore((state) => state.marketplace);

export const getMarketplace = async () => {
  const marketplace = new ethers.Contract(
    MarketplaceAddress.address,
    MarketplaceAbi.abi,
    signer
  );
  const getMarketplace = useStore((state) => state.getMarketplace);

  getMarketplace(marketplace);
};
