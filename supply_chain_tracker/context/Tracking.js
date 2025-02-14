"use client"; 
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
 

// INTERNAL IMPORT
import tracking from "../context/Tracking.json";

const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ContractABI = tracking.abi;

// FETCH SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  // STATE VARIABLE
  const DappName = "Product Tracking Dapp";
  const [currentUser, setCurrentUser] = useState("");

  // CREATE SHIPMENT
  const createShipment = async (items) => {
    console.log(items);
    const { receiver, pickupTime, distance, price } = items;

    try {
      if (!window.ethereum) throw new Error("Install MetaMask");
      
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.utils.parseUnits(price.toString(), 18),
        {
          value: ethers.utils.parseUnits(price.toString(), 18),
        }
      );

      await createItem.wait();
      console.log(createItem);
    } catch (error) {
      console.error("Error creating shipment:", error);
    }
  };

  // GET ALL SHIPMENTS
  const getAllShipment = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider();
      const contract = fetchContract(provider);
      const shipments = await contract.getAllTransactions();

      return shipments.map((shipment) => ({
        sender: shipment.sender,
        receiver: shipment.receiver,
        price: ethers.utils.formatEther(shipment.price.toString()),
        pickupTime: shipment.pickupTime.toNumber(),
        deliveryTime: shipment.deliveryTime.toNumber(),
        distance: shipment.distance.toNumber(),
        isPaid: shipment.isPaid,
        status: shipment.status,
      }));
    } catch (error) {
      console.error("Error getting shipments:", error);
      return [];
    }
  };

  // GET SHIPMENTS COUNT
  const getShipmentsCount = async () => {
    try {
      if (!window.ethereum) throw new Error("Install MetaMask");
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (!accounts.length) return 0;

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = fetchContract(provider);
      const shipmentsCount = await contract.getShipmentsCount(accounts[0]);
      
      return shipmentsCount.toNumber();
    } catch (error) {
      console.error("Error getting shipment count:", error);
      return 0;
    }
  };

  // COMPLETE SHIPMENT
  const completeShipment = async ({ receiver, index }) => {
    try {
      if (!window.ethereum) throw new Error("Install MetaMask");
      
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        { gasLimit: 300000 }
      );
      await transaction.wait();

      console.log(transaction);
    } catch (error) {
      console.error("Error completing shipment:", error);
    }
  };

  // GET A SINGLE SHIPMENT
  const getShipment = async (index) => {
    try {
      if (!window.ethereum) throw new Error("Install MetaMask");
      
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (!accounts.length) throw new Error("No connected accounts");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = fetchContract(provider);

      const shipment = await contract.getShipment(accounts[0], index);
      return {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: shipment[2].toNumber(),
        deliveryTime: shipment[3].toNumber(),
        distance: shipment[4].toNumber(),
        price: ethers.utils.formatEther(shipment[5].toString()),
        status: shipment[6],
        isPaid: shipment[7],
      };
    } catch (error) {
      console.error("Error getting shipment:", error);
      return null;
    }
  };

  //  START SHIPMENT
  const startShipment = async ({ receiver, index }) => {
    try {
      if (!window.ethereum) throw new Error("Install MetaMask");

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);

      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1
      );

      await shipment.wait();
      console.log(shipment);
    } catch (error) {
      console.error("Error starting shipment:", error);
    }
  };

  //  CHECK WALLET CONNECTION
  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) throw new Error("Install MetaMask");

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentUser(accounts[0]);
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  // CONNECT WALLET FUNCTION
  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("Install MetaMask");

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setCurrentUser(accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  return (
    <TrackingContext.Provider
      value={{
        connectWallet,
        createShipment,
        getAllShipment,
        completeShipment,
        getShipment,
        startShipment,
        getShipmentsCount,
        DappName,
        currentUser,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};
