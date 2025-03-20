"use client";
import React, { useState, useEffect } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

// INTERNAL IMPORT
import tracking from "./Tracking.json";

// Replace with your actual deployed contract address on Sepolia
const ContractAddress = "0xd8602075C6E996B36dD2eEBea87BA16209a102ff";
const ContractABI = tracking.abi;

// FETCH SMART CONTRACT
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(ContractAddress, ContractABI, signerOrProvider);

export const TrackingContext = React.createContext();

export const TrackingProvider = ({ children }) => {
  // STATE VARIABLE
  const DappName = "Product Tracking Dapp";
  const [currentUser, setCurrentUser] = useState("");
  const [shipments, setShipments] = useState([]); // Add shipments state

  // CREATE SHIPMENT
  const createShipment = async (items) => {
    console.log(items);
    const { receiver, pickupTime, distance, price } = items;

    try {
      if (!window.ethereum) throw new Error("Install MetaMask");

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      const createItem = await contract.createShipment(
        receiver,
        new Date(pickupTime).getTime(),
        distance,
        ethers.parseEther(price.toString()),
        {
          value: ethers.parseEther(price.toString()),
        }
      );

      await createItem.wait();
      console.log(createItem);
      fetchShipments(); // Update shipments after creating one
    } catch (error) {
      console.error("Error creating shipment:", error);
    }
  };

  const getShipmentsCount = async () => {
    try {
      if (!window.ethereum) throw new Error("Install MetaMask");
      const accounts = await window.ethereum.request({ method: "eth_accounts" });

      if (!accounts.length) {
        console.error("No connected accounts");
        return 0;
      }

      const userAddress = accounts[0];
      console.log("Current user address:", userAddress);

      if (!ethers.isAddress(userAddress)) {
        console.error("Invalid address:", userAddress);
        return 0;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);
      const shipmentsCount = await contract.getShipmentsCount(userAddress);

      console.log("Shipments Count:", shipmentsCount.toString());
      return Number(shipmentsCount);
    } catch (error) {
      console.error("Error getting shipment count:", error);
      return 0;
    }
  };

  // GET ALL SHIPMENTS
  const getAllShipment = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      if (!window.ethereum) throw new Error("Install MetaMask");
      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const currentUser = accounts[0];

      const shipmentsCount = await contract.getShipmentsCount(currentUser);
      const fetchedShipments = [];

      for (let i = 0; i < Number(shipmentsCount); i++) {
        const shipment = await contract.getShipment(currentUser, i);
        fetchedShipments.push({
          sender: shipment[0],
          receiver: shipment[1],
          pickupTime: Number(shipment[2]),
          deliveryTime: Number(shipment[3]),
          distance: Number(shipment[4]),
          price: ethers.formatEther(shipment[5]),
          status: shipment[6],
          isPaid: shipment[7],
        });
      }

      return fetchedShipments;
    } catch (error) {
      console.error("Error getting shipments:", error);
      return [];
    }
  };

  const fetchShipments = async () => {
    const fetchedShipments = await getAllShipment();
    setShipments(fetchedShipments);
  };

  // COMPLETE SHIPMENT
  const completeShipment = async ({ receiver, index }) => {
    try {
      if (!window.ethereum) throw new Error("Install MetaMask");

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      const transaction = await contract.completeShipment(
        accounts[0],
        receiver,
        index,
        { gasLimit: 300000 }
      );
      await transaction.wait();

      console.log(transaction);
      fetchShipments(); // Update shipments after completing one
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

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      const shipment = await contract.getShipment(accounts[0], index);
      return {
        sender: shipment[0],
        receiver: shipment[1],
        pickupTime: Number(shipment[2]),
        deliveryTime: Number(shipment[3]),
        distance: Number(shipment[4]),
        price: ethers.formatEther(shipment[5]),
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
      const provider = new ethers.BrowserProvider(connection);
      const signer = await provider.getSigner();
      const contract = fetchContract(signer);

      const shipment = await contract.startShipment(
        accounts[0],
        receiver,
        index * 1
      );

      await shipment.wait();
      console.log(shipment);
      fetchShipments(); // Update shipments after starting one
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
      if (!window.ethereum) throw new Error("MetaMask is not installed!");

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      if (!accounts.length) throw new Error("No accounts found. Please log in to MetaMask.");

      setCurrentUser(accounts[0]);
      console.log("Connected account:", accounts[0]);
    } catch (error) {
      console.error("Error connecting wallet:", error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
    fetchShipments(); // Fetch shipments on initial load
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
        shipments, // Provide shipments to the context
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};