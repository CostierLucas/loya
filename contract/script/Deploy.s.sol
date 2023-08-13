// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

import "../src/ERC6551Registry.sol";
import "../src/contracts/FactoryERC721.sol";
import "../src/examples/simple/SimpleERC6551Account.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("TESTNET_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        new SimpleERC6551Account();

        new ERC6551Registry();

        new FactoryERC721();

        vm.stopBroadcast();
    }
}
