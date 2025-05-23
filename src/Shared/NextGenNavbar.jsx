import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  FiSearch,
  FiShoppingBag,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
} from "react-icons/fi";

const NextGenNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3); // Example cart count
  const searchRef = useRef(null);
  const userDropdownRef = useRef(null);

  const navItems = [
    { name: "New Arrivals", submenu: ["Women", "Men", "Kids"] },
    { name: "Collections", submenu: ["Abayas", "Hijabs", "Evening Wear"] },
    { name: "About Us", submenu: null },
    { name: "Contact", submenu: null },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle search bar
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-3 px-4 md:px-6 backdrop-blur-md bg-white/95 shadow-sm border-b border-amber-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-serif font-bold text-amber-900 cursor-pointer flex-shrink-0 mr-4"
        >
          Damamah
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center flex-1 mx-8">
          {/* Navigation Items */}
          <ul className="flex space-x-6">
            {navItems.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <a
                  href="#"
                  className="flex items-center text-amber-900 hover:text-amber-700 transition-colors py-2"
                >
                  {item.name}
                  {item.submenu && (
                    <FiChevronDown className="ml-1 text-amber-700 group-hover:rotate-180 transition-transform" />
                  )}
                </a>

                {item.submenu && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-amber-50 hidden group-hover:block"
                  >
                    {item.submenu.map((subItem) => (
                      <li key={subItem}>
                        <a
                          href="#"
                          className="block px-4 py-2 text-amber-800 hover:bg-amber-50 transition-colors"
                        >
                          {subItem}
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {/* Search Button - Mobile */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-amber-900"
            onClick={toggleSearch}
          >
            <FiSearch size={20} />
          </motion.button>

          {/* Search Bar - Desktop */}
          <motion.div
            className="hidden md:flex items-center relative flex-1 max-w-md"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
          >
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 pr-10 rounded-full border border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 text-amber-900"
            />
            <FiSearch className="absolute right-3 text-amber-600" />
          </motion.div>

          {/* Cart Button */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="p-2 text-amber-900 relative">
              <FiShoppingBag size={20} />
              {cartItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  {cartItems}
                </motion.span>
              )}
            </button>
          </motion.div>

          {/* User Profile */}
          <motion.div className="relative" ref={userDropdownRef}>
            <motion.button
              className="flex items-center space-x-1 p-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            >
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                <FiUser size={18} />
              </div>
            </motion.button>

            <AnimatePresence>
              {isUserDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50 border border-amber-50"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-amber-800 hover:bg-amber-50 transition-colors"
                  >
                    My Account
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-amber-800 hover:bg-amber-50 transition-colors"
                  >
                    Orders
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-amber-800 hover:bg-amber-50 transition-colors"
                  >
                    Sign Out
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-amber-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-2"
          >
            <div className="relative">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 text-amber-900"
              />
              <FiSearch className="absolute right-3 top-2.5 text-amber-600" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-amber-100 overflow-hidden"
          >
            <ul className="py-2 px-4 space-y-2">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <a
                    href="#"
                    className="block py-3 px-2 text-amber-900 border-b border-amber-50 hover:bg-amber-50 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex justify-between items-center">
                      {item.name}
                      {item.submenu && <FiChevronDown />}
                    </div>
                  </a>

                  {item.submenu && (
                    <ul className="ml-4 mt-1 space-y-1">
                      {item.submenu.map((subItem) => (
                        <li key={subItem}>
                          <a
                            href="#"
                            className="block py-2 px-2 text-amber-800 hover:bg-amber-50 rounded-lg"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ul>
            <div className="px-4 py-3 border-t border-amber-100">
              <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors">
                Sign In
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NextGenNavbar;
