// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "@openzeppelin/contracts/utils/Create2.sol";

import "../src/ERC6551Registry.sol";
import "../src/contracts/BusinessAccount.sol";
import "../src/examples/simple/SimpleERC6551Account.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("TESTNET_PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        SimpleERC6551Account account = new SimpleERC6551Account();

        ERC6551Registry registry = new ERC6551Registry();

        LoyaNft nft = new LoyaNft(address(registry), address(account));

        nft.mint(0x39f5e8C23f1a7565476B8F851c0A23911E3F6Cc2, 5);

        vm.stopBroadcast();
    }
}
