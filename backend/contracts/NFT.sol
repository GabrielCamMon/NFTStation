//SPOX-License-Identifier : MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount;
    constructor() ERC721("Gcamon NFT", "Gcamon"){

    }

    function mint(string memory _tokenURI) external returns (uint){
         tokenCount ++;
         // Safely mints tokenId and transfers it to to.
         _safeMint(msg.sender, tokenCount);
         // Sets _tokenURI as the tokenURI of tokenId.
         _setTokenURI(tokenCount, _tokenURI);
         return(tokenCount);
    }
}