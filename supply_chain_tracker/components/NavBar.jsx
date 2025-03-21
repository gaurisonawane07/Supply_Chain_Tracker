"use client";
import { useEffect, useState, useContext } from "react";
import { TrackingContext } from "@/context/TrackingContext";
import { Nav1, Nav2, Nav3 } from "@/components/page";

export default function Navbar() {
  const [state, setState] = useState(false);
  const { currentUser, connectWallet } = useContext(TrackingContext);

  const navigation = [
    { title: "Home", path: "/" },
    { title: "Services", path: "/services" },
    { title: "Contact Us", path: "/contactus" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav
      className={`bg-white pb-5 md:text-sm ${
        state
          ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
          : ""
      } `}
    >
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-2 md:flex md:px-4">
        <div className="flex items-center">
          <button
            onClick={() => {
              window.location.href = "/";
            }}
            className="flex items-center gap-x-2"
          >
            <img
              src="/logo.jpg"
              width={120}
              height={50}
              alt="Supply Chain Tracker logo"
            />
            <span className="font-bold text-black text-2xl">
              Supply Chain Tracker
            </span>
          </button>
        </div>
        <div className="md:hidden">
          <button
            className="menu-btn text-gray-500 hover:text-gray-800"
            onClick={() => setState(!state)}
          >
            {state ? <Nav1 /> : <Nav2 />}
          </button>
        </div>
        <div
          className={`flex-1 items-center mt-8 md:mt-0 md:flex justify-end ${
            state ? "block" : "hidden"
          }`}
        >
          <div className="flex justify-center items-center">
            <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {navigation.map((item, idx) => (
                <li key={idx} className="text-gray-700 hover:text-gray-900">
                  <a href={item.path} className="block">
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center mt-6 space-y-6 md:flex md:space-y-0 md:mt-0 ml-56">
             
              {currentUser ? (
                <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-black rounded-full md:inline-flex">
                  {currentUser.slice(0, 25)}..
                </p>
              ) : (
                <button
                  onClick={() => connectWallet()}
                  className="flex items-center font-bold justify-center gap-x-1 py-2 px-4 text-white bg-black rounded-full md:inline-flex"
                >
                  Connect Wallet
                  <Nav3 />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}