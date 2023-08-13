// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../interfaces/IERC6551Registry.sol";


contract RewardNft is ERC721 {
    using Counters for Counters.Counter;
    address public registry;
    address public implementation;
    uint256 public minimumPoints;
    address public owner;
    Counters.Counter private _tokenIds;

    constructor(
        address _business,
        address _registry,
        address _implementation,
        uint256 _minimumPoints,
        string memory _name,
        string memory _symbol
    ) ERC721(
        _name, _symbol) {
        owner = _business;
        minimumPoints = _minimumPoints;
        registry = _registry;
        implementation = _implementation;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Not owner");
        _;
    }

    function mint(address to, uint256 _chainId) external {
        _safeMint(to, _tokenIds.current());
        IERC6551Registry(registry).createAccount(
            implementation,
            _chainId,
            address(this),
            _tokenIds.current(),
            0,
            ""
        );
        _tokenIds.increment();
    }

    function burn(uint256 tokenId) external onlyOwner(){
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        _burn(tokenId);
    }
}
