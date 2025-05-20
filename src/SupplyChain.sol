// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract SupplyChain {
    // Shipment delivery status

    enum ShipmentStatus {
        PENDING,
        INTRANSIT,
        DELIVERED
    }

    // Shipment details
    struct Shipment {
        address sender;
        address reciever;
        uint pickupTime;
        uint deliveryTime;
        uint distance;
        uint price;
        ShipmentStatus status;
        bool isPaid;
    }

    // errors
    error PaymentDoesNotMatchPrice(uint amount, uint price);

    // addresses linking to a specific shipment
    mapping(address => Shipment[]) public shipments;

    // number of shipments
    uint shipmentCount;

    // displayed shipment
    struct TestShipment {
        address sender;
        address reciever;
        uint pickupTime;
        uint deliveryTime;
        uint distance;
        uint price;
        ShipmentStatus status;
        bool isPaid;
    }

    TestShipment[] testShipment;

    // events

    event ShipmentCreated(
        address indexed sender,
        address indexed receiver,
        uint pickupTime,
        uint distance,
        uint price
    );

    event ShipmentInTransit(
        address indexed sender,
        address indexed receiver,
        uint pickupTime
    );

    event ShipmentDelivered(
        address indexed sender,
        address indexed receiver,
        uint deliveryTime
    );
    event ShipmentPaid(
        address indexed sender,
        address indexed receiver,
        uint amount
    );

    constructor() {
        shipmentCount = 0;
    }

    function createShipment(
        address _receiver,
        uint _pickupTime,
        uint _distance,
        uint _price
    ) public payable {
        // checks the actual value being sent (such as 10 ETH) matches the price the user sets
        if (msg.value != _price) {
            revert PaymentDoesNotMatchPrice(msg.value, _price);
        }

        // creates a temporary shipment structure, which then is pushed into mapping(address => Shipment) shipments
        // when creating the shipment: delivery time is 0, shipment status is pending (it was just intialised), and is has not been paid for
        Shipment memory shipment = Shipment(
            msg.sender,
            _receiver,
            _pickupTime,
            0,
            _distance,
            _price,
            ShipmentStatus.PENDING,
            false
        );

        // pushes the created shipment struct into main mapping linked to the users address
        shipments[msg.sender].push(shipment);
        // increments the number of shipments created to track the ID
        shipmentCount++;

        // test shipment too
        testShipment.push(
            TestShipment(
                msg.sender,
                _receiver,
                _pickupTime,
                0,
                _distance,
                _price,
                ShipmentStatus.PENDING,
                false
            )
        );

        // emits an event for the shipment created
        emit ShipmentCreated(
            msg.sender,
            _receiver,
            _pickupTime,
            _distance,
            _price
        );
    }
}
