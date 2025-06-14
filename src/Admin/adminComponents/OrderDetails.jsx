import { FiUser, FiMapPin, FiPhone, FiMail, FiTruck } from "react-icons/fi";

const OrderDetails = ({ order, onStatusChange }) => {
  // Mock order details - in a real app this would come from props or API
  const orderDetails = {
    ...order,
    shippingAddress: "123 Main St, Dubai, UAE",
    contact: "+971 50 123 4567",
    email: "customer@example.com",
    paymentMethod: "Credit Card (VISA ****4242)",
    items: [
      {
        id: 1,
        name: "Silk Abaya",
        price: 189.99,
        quantity: 1,
        image: "/products/abaya.jpg",
      },
      {
        id: 2,
        name: "Embroidered Hijab",
        price: 49.99,
        quantity: 1,
        image: "/products/hijab.jpg",
      },
    ],
    trackingNumber: "DX123456789AE",
    carrier: "DHL Express",
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Info */}
        <div className="bg-amber-50 p-4 rounded-lg">
          <h4 className="font-medium text-amber-900 mb-3 flex items-center">
            <FiUser className="mr-2" /> Customer Information
          </h4>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Name:</span> {order.customer}
            </p>
            <p className="text-sm flex items-center">
              <FiMail className="mr-2 text-gray-500" /> {orderDetails.email}
            </p>
            <p className="text-sm flex items-center">
              <FiPhone className="mr-2 text-gray-500" /> {orderDetails.contact}
            </p>
          </div>
        </div>

        {/* Shipping Info */}
        <div className="bg-amber-50 p-4 rounded-lg">
          <h4 className="font-medium text-amber-900 mb-3 flex items-center">
            <FiMapPin className="mr-2" /> Shipping Address
          </h4>
          <p className="text-sm">{orderDetails.shippingAddress}</p>
        </div>

        {/* Order Summary */}
        <div className="bg-amber-50 p-4 rounded-lg">
          <h4 className="font-medium text-amber-900 mb-3">Order Summary</h4>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-medium">Date:</span> {order.date}
            </p>
            <p className="text-sm">
              <span className="font-medium">Payment:</span>{" "}
              {orderDetails.paymentMethod}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-amber-100">
              <span className="font-medium">Total:</span>
              <span className="font-bold text-amber-700">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-amber-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orderDetails.items.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {item.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Shipping Tracking */}
      {order.status !== "Cancelled" && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-amber-900 mb-3 flex items-center">
            <FiTruck className="mr-2" /> Shipping Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm">
                <span className="font-medium">Status:</span>
              </p>
              <select
                value={order.status}
                onChange={(e) => onStatusChange(e.target.value)}
                className="mt-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            {order.status === "Shipped" || order.status === "Delivered" ? (
              <div>
                <p className="text-sm">
                  <span className="font-medium">Tracking Number:</span>{" "}
                  {orderDetails.trackingNumber}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Carrier:</span>{" "}
                  {orderDetails.carrier}
                </p>
                <button className="mt-2 text-sm text-amber-600 hover:text-amber-800">
                  Track Package
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
