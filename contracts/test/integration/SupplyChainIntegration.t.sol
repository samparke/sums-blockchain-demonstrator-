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
        vm.deal(receiver, 10 ether);
    }

    function testSupplyChainIsDeployedOnSepolia() public view {
        assertEq(block.chainid, 11155111);
    }

    function testReceiverCreatesShipment(uint256 inputPickupTime, uint256 inputDistance, uint256 inputPrice) public {
        inputPickupTime = bound(inputPickupTime, 1, type(uint96).max);
        inputDistance = bound(inputDistance, 1, type(uint96).max);
        inputPrice = bound(inputPrice, 1e5, type(uint96).max);
        vm.deal(receiver, inputPrice);
        vm.prank(receiver);
        vm.expectEmit(true, true, false, false);
        emit SupplyChain.SupplyChain__ShipmentCreated(
            address(sender), address(receiver), inputPickupTime, inputDistance, inputPrice
        );
        supplyChain.createShipment{value: inputPrice}(inputPickupTime, inputDistance, inputPrice);

        (
            address theSender,
            address theReceiver,
            uint256 pickupTime,
            uint256 deliveryTime,
            uint256 distance,
            uint256 price,
            SupplyChain.ShipmentStatus status,
            bool isPaid
        ) = supplyChain.getShipment(receiver, 0);

        assertEq(address(theSender), address(sender));
        assertEq(address(theReceiver), address(receiver));
        assertEq(pickupTime, inputPickupTime);
        assertEq(deliveryTime, 0);
        assertEq(distance, inputDistance);
        assertEq(price, inputPrice);
        assertEq(uint256(status), uint256(SupplyChain.ShipmentStatus.PENDING));
        assertFalse(isPaid);
    }
}
