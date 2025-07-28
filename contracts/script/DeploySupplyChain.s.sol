// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Script} from "../lib/forge-std/src/Script.sol";
import {SupplyChain} from "../src/SupplyChain.sol";

contract DeploySupplyChain is Script {
    function run() external returns (SupplyChain) {
        vm.startBroadcast();
        SupplyChain supplyChain = new SupplyChain(msg.sender);
        vm.stopBroadcast();
        return supplyChain;
    }
}
