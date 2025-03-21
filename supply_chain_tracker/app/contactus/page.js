import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactDetails = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900 to-black text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Information</h2>
        <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto">
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-blue-400 mr-3" />
            <p>gaurisonawane918@gmail.com</p>
          </div>
          <div className="flex items-center mb-4">
            <FaPhone className="text-blue-400 mr-3" />
            <p>+91 7249644087</p>
          </div>
          <div className="flex items-center">
            <FaMapMarkerAlt className="text-blue-400 mr-3" />
            <p>Nashik,Maharashtra,India</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetails;