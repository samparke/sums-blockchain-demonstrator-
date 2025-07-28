// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../lib/openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";

contract SupplyChain is ReentrancyGuard {
    // Shipment delivery status
    enum ShipmentStatus {
        PENDING,
        IN_TRANSIT,
        DELIVERED
    }

    // Shipment details
    struct Shipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status;
        bool isPaid;
    }

    // immutable manufacturer so students do not have to manage two wallets
    address public immutable s_sender;

    constructor(address _sender) {
        s_sender = _sender;
    }

    // errors
    error SupplyChain__InsufficientEthSent();
    error SupplyChain__InvalidReceiver();
    error SupplyChain__ShipmentNotInCorrectStatus();
    error SupplyChain__ShipmentIsAlreadypaid();
    error SupplyChain__InvalidShipmentIdOrNoShipmentCreated();

    // addresses linking to a specific shipment
    mapping(address => Shipment[]) public s_shipments;

    // events

    event SupplyChain__ShipmentCreated(
        address indexed sender, address indexed receiver, uint256 distance, uint256 price
    );

    event SupplyChain__ShipmentInTransit(address indexed sender, address indexed receiver, uint256 pickupTime);

    event SupplyChain__ShipmentDelivered(address indexed sender, address indexed receiver, uint256 deliveryTime);
    event SupplyChain__ShipmentPaid(address indexed sender, address indexed receiver, uint256 amount);

    function createShipment(uint256 _distance, uint256 _price) external payable {
        // checks the actual value being sent (such as 10 ETH) matches the price the user sets
        if (msg.value != _price) {
            revert SupplyChain__InsufficientEthSent();
        }

        // creates a temporary shipment structure, which then is pushed into mapping(address => Shipment) shipments
        // when creating the shipment: delivery time is 0, shipment status is pending (it was just intialised), and is has not been paid for
        Shipment memory shipment =
            Shipment(s_sender, msg.sender, 0, 0, _distance, _price, ShipmentStatus.PENDING, false);

        // pushes the created shipment struct into main mapping linked to the users address
        s_shipments[msg.sender].push(shipment);
        // emits an event for the shipment created
        emit SupplyChain__ShipmentCreated(s_sender, msg.sender, _distance, _price);
    }

    // once the shipment is created, it is held within the contract, and the shipping proccess will be started using this function
    // index refers to the ID. The user adds the index when wanting to start the shipment they created
    function startShipment(uint256 _index) external {
        if (s_shipments[msg.sender].length == 0) {
            revert SupplyChain__InvalidShipmentIdOrNoShipmentCreated();
        }
        // fetches shipment we created, puts it in storage state as we will change its state on the blockchain
        // we change its status
        // explaination of code: we go into the shipments array, and get the shipment associated with the sender and index(ID) we want.
        Shipment storage shipment = s_shipments[msg.sender][_index];

        if (shipment.status != ShipmentStatus.PENDING) {
            revert SupplyChain__ShipmentNotInCorrectStatus();
        }

        // changes shipment status to in-transit phase
        shipment.pickupTime = block.timestamp;
        shipment.status = ShipmentStatus.IN_TRANSIT;

        // logs the change in shipment status
        emit SupplyChain__ShipmentInTransit(s_sender, msg.sender, shipment.pickupTime);
    }

    // once in-transit has finished, it is delivered, and we must complete it
    function completeShipment(uint256 _index) external nonReentrant {
        Shipment storage shipment = s_shipments[msg.sender][_index];

        if (shipment.status != ShipmentStatus.IN_TRANSIT) {
            revert SupplyChain__ShipmentNotInCorrectStatus();
        }
        if (shipment.isPaid) {
            revert SupplyChain__ShipmentIsAlreadypaid();
        }

        shipment.isPaid = true;
        // change shipment storage (blockchain) status to delivered
        shipment.status = ShipmentStatus.DELIVERED;
        // set shipment delivery time to current time
        shipment.deliveryTime = block.timestamp;

        // once the delivery process is complete, we complete payment to the sender (such as a manufacturer)
        uint256 amount = shipment.price;
        payable(s_sender).transfer(amount);

        emit SupplyChain__ShipmentDelivered(s_sender, msg.sender, shipment.deliveryTime);
        emit SupplyChain__ShipmentPaid(s_sender, msg.sender, amount);
    }

    // get shipment for display
    function getShipment(address _user, uint256 _index)
        public
        view
        returns (address, address, uint256, uint256, uint256, uint256, ShipmentStatus, bool)
    {
        if (s_shipments[_user].length == 0) {
            revert SupplyChain__InvalidShipmentIdOrNoShipmentCreated();
        }
        // we are simply fetching the shipment for display, no state changes
        Shipment memory shipment = s_shipments[_user][_index];
        return (
            shipment.sender,
            shipment.receiver,
            shipment.pickupTime,
            shipment.deliveryTime,
            shipment.distance,
            shipment.price,
            shipment.status,
            shipment.isPaid
        );
    }

    function getShipmentCount(address _receiver) external view returns (uint256) {
        return s_shipments[_receiver].length;
    }
}
