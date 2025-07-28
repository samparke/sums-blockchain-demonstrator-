// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "../../lib/forge-std/src/Test.sol";
import {SupplyChain} from "../../src/SupplyChain.sol";

contract SupplyChainIntegration is Test {
    SupplyChain supplyChain;
    uint256 sepolia_fork;
    address sender = makeAddr("sender");
    address receiver = makeAddr("receiver");

    function setUp() public {
        sepolia_fork = vm.createSelectFork(vm.envString("SEPOLIA_RPC_URL"));
        supplyChain = new SupplyChain(sender);
    }

    function testSupplyChainIsDeployedOnSepolia() public view {
        assertEq(block.chainid, 11155111);
    }
}
