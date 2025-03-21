"use client";
import React, { useState, useEffect, useContext } from "react";

// INTERNAL IMPORT
import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
  ShipmentCount,
} from "@/components/page";

import { TrackingContext } from "@/context/TrackingContext";

const Page = () => {
  const {
    currentUser,
    createShipment,
    getAllShipment,
    completeShipment,
    getShipment,
    startShipment,
    getShipmentsCount,
  } = useContext(TrackingContext);

  // STATE VARIABLE
  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completemodal, setCompleteModal] = useState(false);
  const [getModal, setGetModal] = useState(false);

  // DATA STATE VARIABLE
  const [allShipmentsdata, setallShipmentsdata] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const fetchData = async () => {
    setLoading(true);
    try {
      const allData = await getAllShipment();
      setallShipmentsdata(allData);
    } catch (error) {
      console.error("Error fetching shipments:", error);
      setallShipmentsdata([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on mount
  }, [getAllShipment]); // Add getAllShipment as dependency

  // Function to refetch data after shipment actions
  const handleShipmentAction = async () => {
    await fetchData();
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Services
            setOpenProfile={setOpenProfile}
            setCompleteModal={setCompleteModal}
            setGetModal={setGetModal}
            setStartModal={setStartModal}
          />
          <Table
            setCreateShipmentModel={setCreateShipmentModel}
            allShipmentsdata={allShipmentsdata}
          />
          <Form
            createShipmentModel={createShipmentModel}
            createShipment={createShipment}
            setCreateShipmentModel={setCreateShipmentModel}
            onShipmentAction={handleShipmentAction} // Pass refetch function
          />
          <Profile
            openProfile={openProfile}
            setOpenProfile={setOpenProfile}
            currentUser={currentUser}
            getShipmentsCount={getShipmentsCount}
          />
          <CompleteShipment
            completemodal={completemodal}
            setCompleteModal={setCompleteModal}
            completeShipment={completeShipment}
            onShipmentAction={handleShipmentAction} // Pass refetch function
          />
          <GetShipment
            getModal={getModal}
            getShipment={getShipment}
            getShipmentsCount={getShipmentsCount}
            currentUser={currentUser}
            setGetModal={setGetModal}
          />
          <StartShipment
            startModal={startModal}
            setStartModal={setStartModal}
            startShipment={startShipment}
            onShipmentAction={handleShipmentAction} // Pass refetch function
          />
          <ShipmentCount shipments={allShipmentsdata} />
        </>
      )}
    </>
  );
};

export default Page;