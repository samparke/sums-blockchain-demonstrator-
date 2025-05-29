// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract SupplyChain {
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
        uint pickupTime;
        uint deliveryTime;
        uint distance;
        uint price;
        ShipmentStatus status;
        bool isPaid;
    }

    // errors
    error PaymentDoesNotMatchPrice(uint amount, uint price, string note);
    error InvalidReceiver();
    error ShipmentNotInIntendedStatus(string note);
    error ShipmentIsAlreadypaid();

    // addresses linking to a specific shipment
    mapping(address => Shipment[]) public shipments;

    // number of shipments
    uint public shipmentCount;

    // displayed shipment
    struct TestShipment {
        address sender;
        address receiver;
        uint pickupTime;
        uint deliveryTime;
        uint distance;
        uint price;
        ShipmentStatus status;
        bool isPaid;
    }

    TestShipment[] testShipments;

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
            revert PaymentDoesNotMatchPrice(
                msg.value,
                _price,
                "Payment does not match the price user set"
            );
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
        testShipments.push(
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

    // once the shipment is created, it is held within the contract, and the shipping proccess will be started using this function
    // index refers to the ID. The user adds the index when wanting to start the shipment they created
    function startShipment(
        address _sender,
        address _receiver,
        uint _index
    ) public {
        // fetches shipment we created, puts it in storage state as we will change its state on the blockchain
        // we change its status
        // explaination of code: we go into the shipments array, and get the shipment associated with the sender and index(ID) we want.
        Shipment storage shipment = shipments[_sender][_index];
        TestShipment storage testShipment = testShipments[_index];

        if (shipment.receiver != _receiver) {
            revert InvalidReceiver();
        }
        if (shipment.status != ShipmentStatus.PENDING) {
            revert ShipmentNotInIntendedStatus(
                "Shipment is not in Pending state"
            );
        }

        // changes shipment status to in-transit phase
        shipment.status = ShipmentStatus.IN_TRANSIT;
        testShipment.status = ShipmentStatus.IN_TRANSIT;

        // logs the change in shipment status
        emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime);
    }

    // once in-transit has finished, it is delivered, and we must complete it
    function completeShipment(
        address _sender,
        address _receiver,
        uint _index
    ) public {
        Shipment storage shipment = shipments[_sender][_index];
        TestShipment storage testShipment = testShipments[_index];

        if (shipment.receiver != _receiver) {
            revert InvalidReceiver();
        }
        if (shipment.status != ShipmentStatus.IN_TRANSIT) {
            revert ShipmentNotInIntendedStatus(
                "Shipment is not in In-Transit state"
            );
        }
        if (shipment.isPaid) {
            revert ShipmentIsAlreadypaid();
        }

        // change shipment storage (blockchain) status to delivered
        shipment.status = ShipmentStatus.DELIVERED;
        // set shipment delivery time to current time
        shipment.deliveryTime = block.timestamp;
        testShipment.status = ShipmentStatus.DELIVERED;
        testShipment.deliveryTime = block.timestamp;

        // once the delivery process is complete, we complete payment to the sender (such as a manufacturer)
        uint amount = shipment.price;
        payable(shipment.sender).transfer(amount);
        shipment.isPaid = true;
        testShipment.isPaid = true;

        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime);
        emit ShipmentPaid(_sender, _receiver, amount);
    }

    // get shipment for display
    function getShipment(
        address _sender,
        uint _index
    )
        public
        view
        returns (address, address, uint, uint, uint, uint, ShipmentStatus, bool)
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

    // gets the number of shipments made by a user
    function getShipmentCount(address _sender) public view returns (uint) {
        return shipments[_sender].length;
    }

    // gets all the transactions
    function getAllTransactions() public view returns (TestShipment[] memory) {
        return testShipments;
    }
}
