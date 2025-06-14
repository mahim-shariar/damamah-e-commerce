import { useState } from "react";
import {
  FiUserPlus,
  FiEdit2,
  FiTrash2,
  FiSearch,
  FiUser,
  FiMail,
  FiLock,
  FiX,
} from "react-icons/fi";
import ModeratorForm from "./ModeratorForm";
import { motion, AnimatePresence } from "framer-motion";

const ModeratorsManager = () => {
  const [moderators, setModerators] = useState([
    {
      id: 1,
      name: "Fatima Ahmed",
      email: "fatima@damamah.com",
      role: "Senior Moderator",
      permissions: ["products", "orders", "reviews"],
      lastActive: "2023-06-14",
    },
    {
      id: 2,
      name: "Aisha Khan",
      email: "aisha@damamah.com",
      role: "Content Moderator",
      permissions: ["products", "reviews"],
      lastActive: "2023-06-12",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingModerator, setEditingModerator] = useState(null);

  const filteredModerators = moderators.filter(
    (moderator) =>
      moderator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      moderator.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    setModerators(moderators.filter((mod) => mod.id !== id));
  };

  const permissionLabels = {
    products: "Manage Products",
    orders: "Manage Orders",
    reviews: "Manage Reviews",
    settings: "System Settings",
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-amber-900">
          Moderators Management
        </h2>
        <button
          onClick={() => {
            setEditingModerator(null);
            setShowForm(true);
          }}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors duration-200"
        >
          <FiUserPlus className="mr-2" /> Add Moderator
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search moderators..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Moderator
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-amber-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredModerators.map((moderator) => (
                <tr
                  key={moderator.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <FiUser className="text-amber-700" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {moderator.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {moderator.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {moderator.role}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {moderator.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800"
                        >
                          {permissionLabels[perm] || perm}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {moderator.lastActive}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setEditingModerator(moderator);
                        setShowForm(true);
                      }}
                      className="text-amber-600 hover:text-amber-800 transition-colors duration-200"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      onClick={() => handleDelete(moderator.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Animated Modal */}
      <AnimatePresence>
        {showForm && (
          <>
            {/* Blur backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(4px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white/30 min-h-screen backdrop-blur-sm z-40"
            />

            {/* Modal content */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              className="fixed inset-0 flex min-h-screen items-center justify-center z-50 p-4"
            >
              <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-auto shadow-xl border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-amber-900">
                    {editingModerator ? "Edit Moderator" : "Add New Moderator"}
                  </h3>
                  <button
                    onClick={() => setShowForm(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                  >
                    <FiX size={24} />
                  </button>
                </div>
                <ModeratorForm
                  moderator={editingModerator}
                  onClose={() => setShowForm(false)}
                  onSave={(moderator) => {
                    if (editingModerator) {
                      setModerators(
                        moderators.map((m) =>
                          m.id === moderator.id ? moderator : m
                        )
                      );
                    } else {
                      setModerators([
                        ...moderators,
                        { ...moderator, id: moderators.length + 1 },
                      ]);
                    }
                    setShowForm(false);
                  }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModeratorsManager;
