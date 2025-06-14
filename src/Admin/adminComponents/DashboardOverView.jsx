import { FiDollarSign, FiShoppingCart, FiStar, FiUsers } from "react-icons/fi";

const DashboardOverview = () => {
  // Mock data - in a real app this would come from API
  const stats = [
    {
      title: "Total Revenue",
      value: "$12,845",
      change: "+12%",
      icon: <FiDollarSign size={24} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Orders",
      value: "324",
      change: "+8%",
      icon: <FiShoppingCart size={24} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "New Customers",
      value: "89",
      change: "+5%",
      icon: <FiStar size={24} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Product Reviews",
      value: "142",
      change: "+23%",
      icon: <FiStar size={24} />,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-1001",
      customer: "Aisha Rahman",
      date: "2023-06-15",
      amount: "$189.99",
      status: "Shipped",
    },
    {
      id: "ORD-1002",
      customer: "Fatima Ahmed",
      date: "2023-06-14",
      amount: "$239.98",
      status: "Processing",
    },
    {
      id: "ORD-1003",
      customer: "Mariam Ali",
      date: "2023-06-13",
      amount: "$89.99",
      status: "Delivered",
    },
    {
      id: "ORD-1004",
      customer: "Zainab Khan",
      date: "2023-06-12",
      amount: "$149.99",
      status: "Shipped",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-900">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <p
                  className={`text-sm mt-1 ${
                    stat.change.startsWith("+")
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-amber-900">
            Recent Orders
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-700">
                    {order.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Processing"
                          ? "bg-amber-100 text-amber-800"
                          : order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 text-center">
          <button className="text-amber-600 hover:text-amber-800 text-sm font-medium">
            View All Orders
          </button>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-amber-900">
            Recent Reviews
          </h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((review) => (
            <div key={review} className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <FiUsers className="text-amber-700" />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-amber-900">
                      Customer {review}
                    </h4>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`${
                            i < 4
                              ? "text-amber-500 fill-amber-500"
                              : "text-gray-300"
                          }`}
                          size={14}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {review === 1
                      ? "Absolutely love this abaya! The quality is amazing."
                      : review === 2
                      ? "Beautiful hijab but the color was slightly different than expected."
                      : "Fast delivery and excellent customer service. Will shop again!"}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    2 days ago on Silk Abaya
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-200 text-center">
          <button className="text-amber-600 hover:text-amber-800 text-sm font-medium">
            View All Reviews
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
