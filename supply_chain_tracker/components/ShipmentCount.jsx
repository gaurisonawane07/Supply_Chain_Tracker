"use client";
import { useState, useEffect } from "react";
import { Str1 } from "./page";

export default function ShipmentCount({ shipments }) {
  const [showCard, setShowCard] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const [shipmentCount, setShipmentCount] = useState(0);

  useEffect(() => {
    setShipmentCount(shipments ? shipments.length : 0);
  }, [shipments]);

  const handleShowCard = () => {
    setShowCard(true);
  };

  const handleCloseCard = () => {
    setShowCard(false);
    setShowCount(false);
  };

  const handleShowCount = () => {
    setShowCount(true);
  };

  return (
    <div className="flex justify-center mt-4"> {/* Center horizontally and add margin-top */}
      <button
        onClick={handleShowCard}
        className="py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
      >
        Get Shipments Count
      </button>

      {showCard && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={handleCloseCard}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-8">
            <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
              <div className="flex justify-end">
                <button
                  className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                  onClick={handleCloseCard}
                >
                  <Str1 />
                </button>
              </div>
              <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                <h4 className="text-lg font-medium text-gray-800">
                  Shipment Options
                </h4>
                <button
                  onClick={handleShowCount}
                  className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
                >
                  Total Shipments
                </button>
                {showCount && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Total Shipments: {shipmentCount}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}