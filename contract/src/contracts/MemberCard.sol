// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../interfaces/IERC6551Registry.sol";

contract MemberCard is ERC721 {
    using Counters for Counters.Counter;
    address public registry;
    address public implementation;
    address public business;
    Counters.Counter private _tokenIds;

    constructor(
        address _business,
        address _registry,
        address _implementation
    ) ERC721("LoyaNft", "LOYA") {
        registry = _registry;
        implementation = _implementation;
        business = _business;
    }

    function _requireFromBusiness() internal view {
        require(msg.sender == business, "only the business can call this function");
    }

    function mint(address to, uint256 _chainId) external {
        _requireFromBusiness();
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
}
