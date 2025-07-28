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
        vm.deal(sender, 100 ether);
        vm.deal(receiver, 100 ether);
    }

    function testCreateShipment() public {
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(receiver);
        supplyChain.createShipment{value: price}(distance, price);

        (
            address _sender,
            address _receiver,
            uint256 _pickupTime,
            uint256 _deliveryTime,
            uint256 _distance,
            uint256 _price,
            SupplyChain.ShipmentStatus _status,
            bool _isPaid
        ) = supplyChain.getShipment(receiver, 0);

        vm.stopPrank();

        assertEq(_sender, sender);
        assertEq(_receiver, receiver);
        assertEq(_pickupTime, 0);
        assertEq(_deliveryTime, _deliveryTime);
        assertEq(_distance, distance);
        assertEq(_price, price);
        assertEq(uint256(_status), uint256(SupplyChain.ShipmentStatus.PENDING));
        assertEq(_isPaid, false);
    }

    function testAttemptToCreateShipmentButInsufficientEthSent() public {
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(receiver);
        vm.expectRevert();
        supplyChain.createShipment{value: 0.5 ether}(distance, price);
        vm.stopPrank();
    }

    function testCreateAndStartShipment() public {
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(receiver);
        supplyChain.createShipment{value: 1 ether}(distance, price);

        supplyChain.startShipment(0);

        (,,,,,, SupplyChain.ShipmentStatus _status,) = supplyChain.getShipment(receiver, 0);

        vm.stopPrank();
        assertEq(uint256(_status), uint256(SupplyChain.ShipmentStatus.IN_TRANSIT));
    }

    function testCreateAndAttemptToStartShipmentButWrongStage() public {
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(receiver);
        supplyChain.createShipment{value: price}(distance, price);

        supplyChain.startShipment(0);
        supplyChain.completeShipment(0);
        vm.expectRevert();
        supplyChain.startShipment(0);
        vm.stopPrank();
    }

    function testCreateAndStartAndCompleteShipment() public {
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(receiver);
        supplyChain.createShipment{value: 1 ether}(distance, price);

        supplyChain.startShipment(0);
        supplyChain.completeShipment(0);

        (,,,,,, SupplyChain.ShipmentStatus _status, bool _isPaid) = supplyChain.getShipment(receiver, 0);
        vm.stopPrank();

        assertEq(_isPaid, true);
        assertEq(uint256(_status), uint256(SupplyChain.ShipmentStatus.DELIVERED));
    }

    function testCreateAndStartAndAttemptCompleteShipmentButWrongStage() public {
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(receiver);
        supplyChain.createShipment{value: price}(distance, price);

        vm.expectRevert();
        supplyChain.completeShipment(0);
        vm.stopPrank();
    }

    function testCreateShipmentAndGetShipmentCount() public {
        uint256 distance = 10;
        uint256 price = 1 ether;

        vm.startPrank(receiver);
        supplyChain.createShipment{value: 1 ether}(distance, price);
        uint256 shipmentCount = supplyChain.getShipmentCount(receiver);
        assertEq(shipmentCount, 1);
    }
}
