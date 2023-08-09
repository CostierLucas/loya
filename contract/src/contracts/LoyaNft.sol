// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../interfaces/IERC6551Registry.sol";

contract LoyaNft is ERC721 {
    address public registry;
    constructor() ERC721("LoyaNft", "LOYA") {}

    function mint(address to, uint256 tokenId) external {
        _mint(to, tokenId);
        IERC6551Registry(registry).createAccount(
            address(this),
            1,
            address(this),
            tokenId,
            0,
            ""
        );
    }
}