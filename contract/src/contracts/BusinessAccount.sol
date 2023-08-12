// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../interfaces/IERC6551Registry.sol";

contract BusinessAccount is ERC721 {
    using Counters for Counters.Counter;
    address public registry;
    address public implementation;
    Counters.Counter private _tokenIds;

    constructor(address _registry, address _implementation) ERC721("LoyaBusinessAccount", "LOYA") {
        registry = _registry;
        implementation = _implementation;
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

    function setRegistry(address _registry) external {
        registry = _registry;
    }

    function setImplementation(address _implementation) external {
        implementation = _implementation;
    }
}
