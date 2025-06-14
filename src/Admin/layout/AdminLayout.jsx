import { useState } from "react";
import { NavLink, useLocation, Outlet } from "react-router-dom";
import {
  FiBox,
  FiSettings,
  FiStar,
  FiTruck,
  FiMenu,
  FiLogOut,
  FiPieChart,
  FiShield,
} from "react-icons/fi";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Check if a route is active
  const isActive = (path) => {
    return location.pathname === `/admin${path}`;
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-white shadow-lg z-10 transition-all duration-300 ease-in-out border-r border-gray-200`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold">AP</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-indigo-600 transition-colors"
          >
            <FiMenu size={20} />
          </button>
        </div>

        <nav className="p-2 space-y-1 mt-4">
          {/* Dashboard */}
          <NavItem
            icon={<FiPieChart className="text-indigo-500" size={20} />}
            text="Dashboard"
            to="/admin"
            expanded={sidebarOpen}
            active={isActive("")}
          />

          {/* Products */}
          <NavItem
            icon={<FiBox className="text-emerald-500" size={20} />}
            text="Products"
            to="/admin/products"
            expanded={sidebarOpen}
            active={isActive("/products")}
          />

          {/* Orders */}
          <NavItem
            icon={<FiTruck className="text-amber-500" size={20} />}
            text="Orders"
            to="/admin/orders"
            expanded={sidebarOpen}
            active={isActive("/orders")}
          />

          {/* Reviews */}
          <NavItem
            icon={<FiStar className="text-purple-500" size={20} />}
            text="Reviews"
            to="/admin/reviews"
            expanded={sidebarOpen}
            active={isActive("/reviews")}
          />

          {/* Moderators */}
          <NavItem
            icon={<FiShield className="text-blue-500" size={20} />}
            text="Moderators"
            to="/admin/moderators"
            expanded={sidebarOpen}
            active={isActive("/moderators")}
          />

          {/* Settings Section */}
          <div className="border-t border-gray-200 mt-4 pt-4">
            <NavItem
              icon={<FiSettings className="text-gray-500" size={20} />}
              text="Settings"
              to="/admin/settings"
              expanded={sidebarOpen}
              active={isActive("/settings")}
            />

            <button className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors">
              <FiLogOut className="text-red-500" size={20} />
              {sidebarOpen && <span className="ml-3 font-medium">Logout</span>}
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {location.pathname === "/admin" && "Dashboard Overview"}
              {location.pathname === "/admin/products" && "Products Manager"}
              {location.pathname === "/admin/orders" && "Orders Manager"}
              {location.pathname === "/admin/reviews" && "Reviews Manager"}
              {location.pathname === "/admin/moderators" &&
                "Moderators Manager"}
              {location.pathname === "/admin/settings" && "Settings"}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <FiSettings size={18} />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium">
                AU
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto min-h-screen p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const NavItem = ({ icon, text, to, expanded, active }) => {
  return (
    <NavLink
      to={to}
      end={to === "/admin"} // Exact match for dashboard
      className={({ isActive }) =>
        `flex items-center p-3 rounded-lg transition-colors ${
          isActive
            ? "bg-indigo-50 text-indigo-600 font-medium"
            : "hover:bg-gray-100 text-gray-700"
        }`
      }
    >
      <span>{icon}</span>
      {expanded && <span className="ml-3">{text}</span>}
    </NavLink>
  );
};

export default AdminLayout;
