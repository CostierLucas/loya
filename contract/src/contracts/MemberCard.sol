// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../interfaces/IERC6551Registry.sol";

contract MemberCard is ERC721 {
    address public registry;

    constructor(address _business) ERC721("LoyaNft", "LOYA") {}

    function _requireFromBusiness() internal view {
        require(msg.sender == _business, "only owner");
    }

    function mint(address to, uint256 tokenId) external {
        _requireFromBusiness();
        _mint(to, tokenId);
        IERC6551Registry(registry).createAccount(address(this), 5, address(this), tokenId, 0, "");
    }
}
