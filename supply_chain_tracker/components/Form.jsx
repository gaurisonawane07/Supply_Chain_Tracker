"use client";
import React, { useState } from "react";

export default ({ setCreateShipmentModel, createShipmentModel, createShipment }) => {
  const [shipment, setShipment] = useState({
    receiver: "",
    pickupTime: "",
    distance: "",
    price: "",
  });

  const createItem = async () => {
    try {
      const pickupTimestamp = new Date(shipment.pickupTime).getTime();

      if (!shipment.receiver || !pickupTimestamp || !shipment.distance || !shipment.price) {
        alert("Please fill in all fields.");
        return;
      }

      if (isNaN(Number(shipment.price)) || isNaN(Number(shipment.distance))) {
        alert("Distance and price must be numbers.");
        return;
      }

      if (isNaN(pickupTimestamp)) {
        alert("Please select a valid date.");
        return;
      }

      await createShipment({
        ...shipment,
        pickupTime: pickupTimestamp,
        distance: Number(shipment.distance),
        price: Number(shipment.price),
      });
      setCreateShipmentModel(false);
    } catch (error) {
      console.error("Error creating item:", error);
      alert("Failed to create shipment. Please check the console for details.");
    }
  };

  return createShipmentModel ? (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-md shadow-lg">
        <div className="flex justify-end">
          <button
            className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
            onClick={() => setCreateShipmentModel(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
          <h4 className="text-lg font-medium text-gray-800">Track product, Create Shipment</h4>
          <p className="text-[15px] text-gray-600">
          Experience a new level of transparency and traceability in your
          supply chain, secured by blockchain's immutable ledger.
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Receiver"
                className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setShipment({ ...shipment, receiver: e.target.value })}
              />
            </div>
            <div className="relative mt-3">
              <input
                type="date"
                placeholder="Pickup Time"
                className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setShipment({ ...shipment, pickupTime: e.target.value })}
              />
            </div>
            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Distance"
                className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setShipment({ ...shipment, distance: e.target.value })}
              />
            </div>
            <div className="relative mt-3">
              <input
                type="text"
                placeholder="Price"
                className="w-full pl-5 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                onChange={(e) => setShipment({ ...shipment, price: e.target.value })}
              />
            </div>
            <button
              onClick={() => createItem()}
              className="block w-full mt-6 py-4 px-6 font-semibold text-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Create Shipment
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};