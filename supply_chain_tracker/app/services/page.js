import Image from "next/image";
import { FaInfoCircle, FaRoute, FaPlusCircle } from "react-icons/fa"; // Relevant icons

const ShipmentServicesPage = () => {
  const services = [
    {
      icon: <FaInfoCircle />,
      title: "Get Shipment Details",
      description: "Retrieve comprehensive details for any shipment, including origin, destination, and product information.",
      
    },
    {
      icon: <FaRoute />,
      title: "Track Shipment Progress",
      description: "Monitor the real-time location and progress of your shipments along the supply chain.",
      
    },
    {
      icon: <FaPlusCircle />,
      title: "Start New Shipment",
      description: "Initiate new shipments quickly and efficiently through our user-friendly interface.",
     
    },
  ];

  return (
    <section className="bg-gradient-to-br from-gray-900 to-black text-white py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Shipment Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-black/20 backdrop-blur-md rounded-2xl p-6 hover:scale-105 transition-transform duration-300 shadow-lg"
            >
              <div className="flex items-center justify-center mb-4 text-4xl text-blue-400">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              <div className="relative h-48 rounded-xl overflow-hidden">
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShipmentServicesPage;