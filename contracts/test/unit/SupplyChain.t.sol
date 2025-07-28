// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {Test} from "../../lib/forge-std/src/Test.sol";
import {SupplyChain} from "../../src/SupplyChain.sol";

contract SupplyChainTest is Test {
    SupplyChain supplyChain;
    address sender = makeAddr("sender");
    address receiver = makeAddr("receiver");

    function setUp() public {
        supplyChain = new SupplyChain(sender);
    }

    function testCreateShipment(uint256 inputDistance, uint256 inputPrice) public {
        inputDistance = bound(inputDistance, 1, type(uint96).max);
        inputPrice = bound(inputPrice, 1e5, type(uint96).max);
        vm.deal(receiver, inputPrice);
        vm.prank(receiver);
        supplyChain.createShipment{value: inputPrice}(inputDistance, inputPrice);

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

        assertEq(theSender, sender);
        assertEq(theReceiver, receiver);
        assertEq(pickupTime, 0);
        assertEq(deliveryTime, deliveryTime);
        assertEq(distance, distance);
        assertEq(inputPrice, price);
        assertEq(uint256(status), uint256(SupplyChain.ShipmentStatus.PENDING));
        assertEq(isPaid, false);
    }

    function testAttemptToCreateShipmentButInsufficientEthSent(uint256 inputDistance, uint256 inputPrice) public {
        inputDistance = bound(inputDistance, 1, type(uint96).max);
        inputPrice = bound(inputPrice, 1e5, type(uint96).max);
        vm.deal(receiver, inputPrice);

        vm.prank(receiver);
        vm.expectRevert(SupplyChain.SupplyChain__InsufficientEthSent.selector);
        supplyChain.createShipment{value: inputPrice - 1}(inputDistance, inputPrice);
    }

    function testCreateAndStartShipmentAndCheckUpdatedPickupAndStatus(uint256 inputDistance, uint256 inputPrice)
        public
    {
        inputDistance = bound(inputDistance, 1, type(uint96).max);
        inputPrice = bound(inputPrice, 1e5, type(uint96).max);
        vm.deal(receiver, inputPrice);

        vm.startPrank(receiver);
        supplyChain.createShipment{value: inputPrice}(inputDistance, inputPrice);
        supplyChain.startShipment(0);
        vm.stopPrank();

        (,, uint256 pickupTime,,,, SupplyChain.ShipmentStatus status,) = supplyChain.getShipment(receiver, 0);

        assertEq(pickupTime, block.timestamp);
        assertEq(uint256(status), uint256(SupplyChain.ShipmentStatus.IN_TRANSIT));
    }

    function testCreateAndAttemptToStartShipmentButWrongStage(uint256 inputDistance, uint256 inputPrice) public {
        inputDistance = bound(inputDistance, 1, type(uint96).max);
        inputPrice = bound(inputPrice, 1e5, type(uint96).max);
        vm.deal(receiver, inputPrice);

        vm.startPrank(receiver);
        supplyChain.createShipment{value: inputPrice}(inputDistance, inputPrice);
        supplyChain.startShipment(0);
        supplyChain.completeShipment(0);
        vm.expectRevert(SupplyChain.SupplyChain__ShipmentNotInCorrectStatus.selector);
        supplyChain.startShipment(0);
        vm.stopPrank();
    }

    function testCreateAndStartAndCompleteShipment(uint256 inputDistance, uint256 inputPrice) public {
        inputDistance = bound(inputDistance, 1, type(uint96).max);
        inputPrice = bound(inputPrice, 1e5, type(uint96).max);
        vm.deal(receiver, inputPrice);

        vm.startPrank(receiver);
        supplyChain.createShipment{value: inputPrice}(inputDistance, inputPrice);
        supplyChain.startShipment(0);
        supplyChain.completeShipment(0);

        (,,,,,, SupplyChain.ShipmentStatus status, bool isPaid) = supplyChain.getShipment(receiver, 0);
        vm.stopPrank();

        assertTrue(isPaid);
        assertEq(uint256(status), uint256(SupplyChain.ShipmentStatus.DELIVERED));
    }

    function testCreateAndStartAndAttemptCompleteShipmentButWrongStage(uint256 inputDistance, uint256 inputPrice)
        public
    {
        inputDistance = bound(inputDistance, 1, type(uint96).max);
        inputPrice = bound(inputPrice, 1e5, type(uint96).max);
        vm.deal(receiver, inputPrice);

        vm.startPrank(receiver);
        supplyChain.createShipment{value: inputPrice}(inputDistance, inputPrice);
        vm.expectRevert(SupplyChain.SupplyChain__ShipmentNotInCorrectStatus.selector);
        supplyChain.completeShipment(0);
        vm.stopPrank();
    }

    function testCreateShipmentAndGetShipmentCount(uint256 inputDistance, uint256 inputPrice) public {
        inputDistance = bound(inputDistance, 1, type(uint96).max);
        inputPrice = bound(inputPrice, 1e5, type(uint96).max);
        vm.deal(receiver, inputPrice);
        vm.prank(receiver);
        supplyChain.createShipment{value: inputPrice}(inputDistance, inputPrice);
        uint256 shipmentCount = supplyChain.getShipmentCount(receiver);
        assertEq(shipmentCount, 1);

        vm.deal(receiver, inputPrice);
        vm.prank(receiver);
        supplyChain.createShipment{value: inputPrice}(inputDistance, inputPrice);
        shipmentCount = supplyChain.getShipmentCount(receiver);
        assertEq(shipmentCount, 2);
    }

    function testGetShipmentButNoShipmentExistsRevert() public {
        vm.prank(receiver);
        vm.expectRevert(SupplyChain.SupplyChain__NoShipmentExists.selector);
        supplyChain.getShipment(receiver, 0);
    }

    function testStartShipmentButNoShipmentExistsRevert() public {
        vm.expectRevert(SupplyChain.SupplyChain__NoShipmentExists.selector);
        vm.prank(receiver);
        supplyChain.startShipment(0);
    }
}
