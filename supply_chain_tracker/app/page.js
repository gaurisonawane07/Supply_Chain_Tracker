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
  ShipmentCount, // Import ShipmentCount
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
  const [allShipmentsdata, setallShipmentsdata] = useState([]); // Initialize as empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allData = await getAllShipment();
        setallShipmentsdata(allData);
      } catch (error) {
        console.error("Error fetching shipments:", error);
        setallShipmentsdata([]); // Set to empty array on error
      }
    };
    fetchData();
  }, [getAllShipment]); // Add getAllShipment as dependency

  return (
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
      />
      <ShipmentCount shipments={allShipmentsdata} />
    </>
  );
};

export default Page;