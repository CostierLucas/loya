// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LoyaNft is ERC721 {
    constructor() ERC721("LoyaNft", "LOYA") {}

    function mint(address to, uint256 tokenId) external {
        _mint(to, tokenId);
    }
}