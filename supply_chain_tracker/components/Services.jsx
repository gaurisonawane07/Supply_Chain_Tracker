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
    },
    {
      avatar: images.getShipment,
    },
    {
      avatar: images.startShipment,
      
    },
    {
      avatar: images.userProfile,
      
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
    <section className="py-12 bg-black"> {/* Added bg-black to section */}
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {team.map((item, i) => (
            <div
              key={i}
              onClick={() => openModelBox(i + 1)}
              className="group relative cursor-pointer overflow-hidden rounded-xl shadow-md transition-transform transform hover:scale-105"
            >
              <div className="relative"> {/*Added relative position to the image container*/}
                <Image
                  src={item.avatar}
                  className="w-full h-64 object-cover object-center transition-opacity duration-300 group-hover:opacity-80"
                  alt={item.title}
                  width={500}
                  height={256}
                />
                <div className="absolute inset-0 shadow-white-glow"></div> {/* White shadow overlay */}
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};