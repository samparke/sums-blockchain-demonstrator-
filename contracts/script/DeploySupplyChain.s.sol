// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "../lib/forge-std/src/Script.sol";
import {SupplyChain} from "../src/SupplyChain.sol";

contract DeploySupplyChain is Script {
    function run() external {
        vm.startBroadcast();
        new SupplyChain(msg.sender);
        vm.stopBroadcast();
    }
}
