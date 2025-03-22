// getShipment.jsx
"use client";
import { useState } from "react";
import { Str1 } from "./page";

export default ({ getModal, setGetModal, getShipment, getShipmentsCount, currentUser }) => {
    const [userId, setUserId] = useState(""); 
    const [index, setIndex] = useState(0); 
    const [singleShipmentData, setSingleShipmentData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getShipmentData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const shipmentsCount = await getShipmentsCount();
            const parsedUserId = parseInt(userId);

            if (isNaN(parsedUserId) || parsedUserId <= 0) {
                setError("Please enter a valid shipment ID.");
                setSingleShipmentData(null);
                setIsLoading(false);
                return;
            }

            const actualIndex = parsedUserId - 1;

            if (actualIndex < 0 || actualIndex >= shipmentsCount) {
                setError("Invalid shipment ID.");
                setSingleShipmentData(null);
                setIsLoading(false);
                return;
            }

            setIndex(actualIndex);
            const getData = await getShipment(actualIndex);
            setSingleShipmentData(getData);
            console.log("Fetched data:", getData);
        } catch (err) {
            setError("Failed to fetch shipment details.");
            console.error("Error fetching data:", err);
            setSingleShipmentData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const convertTime = (time) => {
        if (!time) return "N/A";
        const newTime = new Date(time * 1000); 
        const dataTime = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(newTime);
        return dataTime;
    };

    return getModal ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div
                className="fixed inset-0 h-full bg-black opacity-40"
                onClick={() => setGetModal(false)}
            ></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div
                    className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg"
                >
                    <div className="flex justify-end">
                        <button
                            className="p-2 text-black rounded-md hover:bg-gray-100"
                            onClick={() => setGetModal(false)}
                        >
                            <Str1 />
                        </button>
                    </div>
                    <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                        <h4 className="text-ldetailsg font-medium text-black">
                            Product Tracking Details
                        </h4>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="relative mt-3">
                                <input
                                    type="number"
                                    placeholder="Shipment ID"
                                    className="w-full pl-5 pr-3 py-2 text-black bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                    onChange={(e) => setUserId(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => getShipmentData()}
                                className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2"
                            >
                                Get details
                            </button>
                        </form>
                        {isLoading && <p>Loading...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {singleShipmentData && (
                            <div className="text-left">
                                <p className="text-black">Sender: {singleShipmentData.sender?.slice(0, 25) || "N/A"}...</p>
                                <p className="text-black">Receiver: {singleShipmentData.receiver?.slice(0, 25) || "N/A"}...</p>
                                <p className="text-black">Pickup Time: {convertTime(singleShipmentData.pickupTime)}</p>
                                <p className="text-black">Delivery Time: {convertTime(singleShipmentData.deliveryTime)}</p>
                                <p className="text-black">Distance: {singleShipmentData.distance || "N/A"}</p>
                                <p className="text-black">Price: {singleShipmentData.price || "N/A"}</p>
                                <p className="text-black">Status: {singleShipmentData.status || "N/A"}</p>
                                <p className="text-black">Paid: {singleShipmentData.isPaid ? "Complete" : "Not Complete"}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};