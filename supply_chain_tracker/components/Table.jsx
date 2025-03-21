export default ({ setCreateShipmentModel, allShipmentsdata }) => {
  const convertTime = (time) => {
    if (!time) {
      return "No Date";
    }
    const newTime = new Date(time);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(newTime);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="flex flex-col items-center">
        <button
          onClick={() => setCreateShipmentModel(true)}
          className="px-8 py-4 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Add Tracking
        </button>

        <div className="mt-12 w-full">
          <h3 className="text-white text-xl font-bold sm:text-2xl mb-6">
            Tracking Details
          </h3>
          <div className="shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-50 text-gray-800 font-medium border-b">
                <tr>
                  <th className="py-3 px-6">Sender</th>
                  <th className="py-3 px-6">Receiver</th>
                  <th className="py-3 px-6">Pickup Time</th>
                  <th className="py-3 px-6">Distance</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6">Delivery Time</th>
                  <th className="py-3 px-6">Paid</th>
                  <th className="py-3 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-300 divide-y">
                {allShipmentsdata?.map((shipment, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.sender?.slice(0, 15)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.receiver?.slice(0, 15)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {convertTime(shipment.pickupTime)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.distance} Km
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.deliveryTime
                        ? convertTime(shipment.deliveryTime)
                        : "Not Delivered"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.isPaid ? "Completed" : "Not Complete"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {shipment.status === 0
                        ? "Pending"
                        : shipment.status === 1
                        ? "In Transit"
                        : shipment.status === 2
                        ? "Delivered"
                        : "Unknown"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};