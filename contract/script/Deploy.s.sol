// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

import "../src/ERC6551Registry.sol";
import "../src/contracts/FactoryERC721.sol";
import "../src/examples/simple/SimpleERC6551Account.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../src/contracts/RewardNft.sol";


contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("TESTNET_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        SimpleERC6551Account account = new SimpleERC6551Account();

        ERC6551Registry registry = new ERC6551Registry();

        FactoryERC721 factory = new FactoryERC721();

        address nft = factory.deployERC721(
            address(account),
            address(registry),
            address(account),
            10,
            "Test",
            "TEST"
        );

        RewardNft(nft).mint(
            0x39f5e8C23f1a7565476B8F851c0A23911E3F6Cc2, 5);

        vm.stopBroadcast();
    }
}
