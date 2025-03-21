// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract Tracking {
    enum ShipmentStatus { PENDING, IN_TRANSIT, DELIVERED }

    struct Shipment {
        address sender;
        address receiver;
        uint256 pickupTime;
        uint256 deliveryTime;
        uint256 distance;
        uint256 price;
        ShipmentStatus status; // Use ShipmentStatus enum
        bool isPaid;
    }

    mapping(address => Shipment[]) public shipments;
    uint256 public shipmentCount;

    event ShipmentCreated(address indexed sender, address indexed receiver, uint256 pickupTime, uint256 distance, uint256 price, ShipmentStatus status);
    event ShipmentInTransit(address indexed sender, address indexed receiver, uint256 pickupTime, ShipmentStatus status);
    event ShipmentDelivered(address indexed sender, address indexed receiver, uint256 deliveryTime, ShipmentStatus status);
    event ShipmentPaid(address indexed sender, address indexed receiver, uint256 amount);

    constructor() {
        shipmentCount = 0;
    }

    function createShipment(address _receiver, uint256 _pickupTime, uint256 _distance, uint256 _price) public payable {
        require(msg.value == _price, "Payment amount must match the price.");

        Shipment memory shipment = Shipment({
            sender: msg.sender,
            receiver: _receiver,
            pickupTime: _pickupTime,
            deliveryTime: 0,
            distance: _distance,
            price: _price,
            status: ShipmentStatus.PENDING,
            isPaid: false
        });

        shipments[msg.sender].push(shipment);
        shipmentCount++;

        emit ShipmentCreated(msg.sender, _receiver, _pickupTime, _distance, _price, ShipmentStatus.PENDING);
    }

    function startShipment(address _sender, address _receiver, uint256 _index) public {
        require(_index < shipments[_sender].length, "Invalid shipment index");
        Shipment storage shipment = shipments[_sender][_index];

        require(shipment.receiver == _receiver, "Invalid receiver");
        require(shipment.status == ShipmentStatus.PENDING, "Shipment already in transit");

        shipment.status = ShipmentStatus.IN_TRANSIT;

        emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime, ShipmentStatus.IN_TRANSIT);
    }

    function completeShipment(address _sender, address _receiver, uint256 _index) public {
        require(_index < shipments[_sender].length, "Invalid shipment index");
        Shipment storage shipment = shipments[_sender][_index];

        require(shipment.receiver == _receiver, "Invalid receiver");
        require(shipment.status == ShipmentStatus.IN_TRANSIT, "Shipment not in transit");
        require(!shipment.isPaid, "Shipment already paid");

        shipment.status = ShipmentStatus.DELIVERED;
        shipment.deliveryTime = block.timestamp;
        uint256 amount = shipment.price;

        payable(shipment.sender).transfer(amount);
        shipment.isPaid = true;

        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime, ShipmentStatus.DELIVERED);
        emit ShipmentPaid(_sender, _receiver, amount);
    }

    function getShipment(address _sender, uint256 _index) public view returns (address, address, uint256, uint256, uint256, uint256, ShipmentStatus, bool) {
        require(_index < shipments[_sender].length, "Invalid shipment index");
        Shipment memory shipment = shipments[_sender][_index];

        return (shipment.sender, shipment.receiver, shipment.pickupTime, shipment.deliveryTime, shipment.distance, shipment.price, shipment.status, shipment.isPaid);
    }

    function getShipmentsCount(address _sender) public view returns (uint256) {
        return shipments[_sender].length;
    }
}