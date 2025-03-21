import images from "../Images/page";
import Image from "next/image";

export default ({
  setOpenProfile,
  setCompleteModal,
  setGetModal,
  setStartModal,
}) => {
  const team = [
    {
      avatar: images.compShipment,
      title: "Completed Shipments",
      description: "Explore your completed shipments.",
    },
    {
      avatar: images.getShipment,
      title: "Get Shipments",
      description: "Find new shipments to fulfill.",
    },
    {
      avatar: images.startShipment,
      title: "Start Shipment",
      description: "Initiate a new shipment process.",
    },
    {
      avatar: images.userProfile,
      title: "User Profile",
      description: "Manage your account and settings.",
    },
  ];

  const openModelBox = (text) => {
    if (text === 1) {
      setCompleteModal(true);
    } else if (text === 2) {
      setGetModal(true);
    } else if (text === 3) {
      setStartModal(true);
    } else if (text === 4) {
      setOpenProfile(true);
    }
  };

  return (
    <section className="py-12 bg-black">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {team.map((item, i) => (
            <div
              key={i}
              onClick={() => openModelBox(i + 1)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl bg-black/20 backdrop-blur-md"
            >
              <div className="relative">
                <Image
                  src={item.avatar}
                  className="w-full h-64 object-cover object-center transition-opacity duration-300"
                  alt={item.title}
                  width={500}
                  height={256}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div> {/* Gradient overlay */}
              </div>
              <div className="p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};