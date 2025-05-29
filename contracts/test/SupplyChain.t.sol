// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {SupplyChain} from "../src/SupplyChain.sol";

contract SupplyChainTest is Test {
    SupplyChain supplyChain;
    address sender = makeAddr("sender");
    address receiver = makeAddr("receiver");

    function setUp() public {
        supplyChain = new SupplyChain();
        vm.deal(sender, 100 ether);
        vm.deal(receiver, 100 ether);
    }

    function testCreateShipment() public {
        uint256 pickupTime = 12345;
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(sender);
        supplyChain.createShipment{value: 1 ether}(receiver, pickupTime, distance, price);

        vm.stopPrank();

        (
            address _sender,
            address _receiver,
            uint256 _pickupTime,
            uint256 _deliveryTime,
            uint256 _distance,
            uint256 _price,
            SupplyChain.ShipmentStatus _status,
            bool _isPaid
        ) = supplyChain.getShipment(sender, 0);

        assertEq(_sender, sender);
        assertEq(_receiver, receiver);
        assertEq(_pickupTime, pickupTime);
        assertEq(_deliveryTime, _deliveryTime);
        assertEq(_distance, distance);
        assertEq(_price, price);
        assertEq(uint256(_status), uint256(SupplyChain.ShipmentStatus.PENDING));
        assertEq(_isPaid, false);
    }

    function testAttemptToCreateShipmentButInsufficientEthSent() public {
        uint256 pickupTime = 12345;
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(sender);
        vm.expectRevert();
        supplyChain.createShipment{value: 0.5 ether}(receiver, pickupTime, distance, price);
        vm.stopPrank();
    }

    function testCreateAndStartShipment() public {
        uint256 pickupTime = 12345;
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(sender);
        supplyChain.createShipment{value: 1 ether}(receiver, pickupTime, distance, price);

        supplyChain.startShipment(sender, receiver, 0);
        vm.stopPrank();

        (,,,,,, SupplyChain.ShipmentStatus _status,) = supplyChain.getShipment(sender, 0);

        assertEq(uint256(_status), uint256(SupplyChain.ShipmentStatus.IN_TRANSIT));
    }

    function testCreateAndAttemptToStartShipmentButWrongReceiver() public {
        uint256 pickupTime = 12345;
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(sender);
        supplyChain.createShipment{value: price}(receiver, pickupTime, distance, price);

        vm.expectRevert();
        supplyChain.startShipment(sender, sender, 0);
        vm.stopPrank();
    }

    function testCreateAndAttemptToStartShipmentButWrongStage() public {
        uint256 pickupTime = 12345;
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(sender);
        supplyChain.createShipment{value: price}(receiver, pickupTime, distance, price);

        supplyChain.startShipment(sender, receiver, 0);
        supplyChain.completeShipment(sender, receiver, 0);
        vm.expectRevert();
        supplyChain.startShipment(sender, receiver, 0);
        vm.stopPrank();
    }

    function testCreateAndStartAndCompleteShipment() public {
        uint256 pickupTime = 12345;
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(sender);
        supplyChain.createShipment{value: 1 ether}(receiver, pickupTime, distance, price);

        supplyChain.startShipment(sender, receiver, 0);
        supplyChain.completeShipment(sender, receiver, 0);
        vm.stopPrank();

        (,,,,,, SupplyChain.ShipmentStatus _status, bool _isPaid) = supplyChain.getShipment(sender, 0);

        assertEq(_isPaid, true);
        assertEq(uint256(_status), uint256(SupplyChain.ShipmentStatus.DELIVERED));
    }

    function testCreateAndStartAndAttemptCompleteShipmentButWrongReceiver() public {
        uint256 pickupTime = 12345;
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(sender);
        supplyChain.createShipment{value: price}(receiver, pickupTime, distance, price);

        vm.expectRevert();
        supplyChain.startShipment(sender, sender, 0);
        vm.expectRevert();
        supplyChain.completeShipment(sender, receiver, 0);
        vm.stopPrank();
    }

    function testGetAllTransaction() public {
        uint256 pickupTime = 12345;
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(sender);
        supplyChain.createShipment{value: 1 ether}(receiver, pickupTime, distance, price);
        vm.stopPrank();

        vm.startPrank(sender);
        supplyChain.createShipment{value: 10 ether}(receiver, pickupTime, distance, 10 ether);
        vm.stopPrank();

        assertEq(2, supplyChain.getAllTransactions().length);
    }
}
