// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

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

    // errors
    error PaymentDoesNotMatchPrice(uint256 amount, uint256 price, string note);
    error InvalidReceiver();
    error ShipmentNotInIntendedStatus(string note);
    error ShipmentIsAlreadypaid();

    // addresses linking to a specific shipment
    mapping(address => Shipment[]) public shipments;

    // events

    event ShipmentCreated(
        address indexed sender, address indexed receiver, uint256 pickupTime, uint256 distance, uint256 price
    );

    event ShipmentInTransit(address indexed sender, address indexed receiver, uint256 pickupTime);

    event ShipmentDelivered(address indexed sender, address indexed receiver, uint256 deliveryTime);
    event ShipmentPaid(address indexed sender, address indexed receiver, uint256 amount);

    function createShipment(address _receiver, uint256 _pickupTime, uint256 _distance, uint256 _price) public payable {
        // checks the actual value being sent (such as 10 ETH) matches the price the user sets
        if (msg.value != _price) {
            revert PaymentDoesNotMatchPrice(msg.value, _price, "Payment does not match the price user set");
        }

        // creates a temporary shipment structure, which then is pushed into mapping(address => Shipment) shipments
        // when creating the shipment: delivery time is 0, shipment status is pending (it was just intialised), and is has not been paid for
        Shipment memory shipment =
            Shipment(msg.sender, _receiver, _pickupTime, 0, _distance, _price, ShipmentStatus.PENDING, false);

        // pushes the created shipment struct into main mapping linked to the users address
        shipments[msg.sender].push(shipment);
        // emits an event for the shipment created
        emit ShipmentCreated(msg.sender, _receiver, _pickupTime, _distance, _price);
    }

    // once the shipment is created, it is held within the contract, and the shipping proccess will be started using this function
    // index refers to the ID. The user adds the index when wanting to start the shipment they created
    function startShipment(address _sender, address _receiver, uint256 _index) public {
        // fetches shipment we created, puts it in storage state as we will change its state on the blockchain
        // we change its status
        // explaination of code: we go into the shipments array, and get the shipment associated with the sender and index(ID) we want.
        Shipment storage shipment = shipments[_sender][_index];

        if (shipment.receiver != _receiver) {
            revert InvalidReceiver();
        }
        if (shipment.status != ShipmentStatus.PENDING) {
            revert ShipmentNotInIntendedStatus("Shipment is not in Pending state");
        }

        // changes shipment status to in-transit phase
        shipment.status = ShipmentStatus.IN_TRANSIT;

        // logs the change in shipment status
        emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime);
    }

    // once in-transit has finished, it is delivered, and we must complete it
    function completeShipment(address _sender, address _receiver, uint256 _index) external nonReentrant {
        Shipment storage shipment = shipments[_sender][_index];

        if (shipment.receiver != _receiver) {
            revert InvalidReceiver();
        }
        if (shipment.status != ShipmentStatus.IN_TRANSIT) {
            revert ShipmentNotInIntendedStatus("Shipment is not in In-Transit state");
        }
        if (shipment.isPaid) {
            revert ShipmentIsAlreadypaid();
        }

        shipment.isPaid = true;
        // change shipment storage (blockchain) status to delivered
        shipment.status = ShipmentStatus.DELIVERED;
        // set shipment delivery time to current time
        shipment.deliveryTime = block.timestamp;

        // once the delivery process is complete, we complete payment to the sender (such as a manufacturer)
        uint256 amount = shipment.price;
        payable(shipment.sender).transfer(amount);

        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime);
        emit ShipmentPaid(_sender, _receiver, amount);
    }

    // get shipment for display
    function getShipment(address _sender, uint256 _index)
        public
        view
        returns (address, address, uint256, uint256, uint256, uint256, ShipmentStatus, bool)
    {
        // we are simply fetching the shipment for display, no state changes
        Shipment memory shipment = shipments[_sender][_index];
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

    function getShipmentCount(address _sender) public view returns (uint256) {
        return shipments[_sender].length;
    }
}
