// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RewardNft.sol";

contract FactoryERC721 {
    address[] public tokens;

    event ERC721Created(address business, address tokenContract, string name, string symbol, uint256 minimumPoints);
    
    function deployERC721(
        address _business,
        address _registry,
        address _implementation,
        uint256 _minimumPoints,
        string memory _name,
        string memory _symbol
    ) public returns (address) {
        RewardNft t = new RewardNft(
            _business,
            _registry,
            _implementation,
            _minimumPoints,
            _name,
            _symbol
        );
        tokens.push(address(t));
        emit ERC721Created(msg.sender, address(t), _name, _symbol, _minimumPoints);
        return address(t);
    }
}