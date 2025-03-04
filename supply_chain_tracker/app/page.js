"use client"
import React, {useState, useEffect, useContext} from "react";

//INTERNAL IMPORT

import {
  Table,
  Form,
  Services,
  Profile,
  CompleteShipment,
  GetShipment,
  StartShipment,
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
    getShipmentsCount
  } = useContext(TrackingContext);

  //STATE VARIABLE

  const [createShipmentModel, setCreateShipmentModel] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [startModal, setStartModal] = useState(false);
  const [completemodal, setCompleteModal] = useState(false);
  const [getModal, setGetModal] = useState(false);

  //DATA STATE VARIABLE

  const [allShipmentsdata, setallShipmentsdata] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getAllShipment();
      setallShipmentsdata(allData);
    };
    fetchData();
  }, []);
  

  return (
    <>
    <Services
    setOpenProfile = {setOpenProfile}
    setCompleteModal = {setCompleteModal}
    setGetModal = {setGetModal}
    setStartModal = {setStartModal}
    />
    <Table
    setCreateShipmentModel = {setCreateShipmentModel}
    allShipmentsdata = {allShipmentsdata}
    />
    <Form
    createShipmentModel = {createShipmentModel}
    createShipment = {createShipment}
    setCreateShipmentModel = {setCreateShipmentModel}
    />
    <Profile
    openProfile = {openProfile}
    setOpenProfile = {setOpenProfile}
    currentUser = {currentUser}
    getShipmentsCount = {getShipmentsCount}
    />
    <CompleteShipment
    completemodal = {completemodal}
    setCompleteModal = {setCompleteModal}
    completeShipment = {completeShipment}
    />
    <GetShipment
    getModal = {getModal}
    setGetModal = {setGetModal}
    getShipment = {getShipment}
    />
    <StartShipment
    startModal = {startModal}
    setStartModal = {setStartModal}
    startShipment = {startShipment}
    />
    </>
  );
};

export default Page