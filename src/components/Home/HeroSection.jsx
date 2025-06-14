import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FiSearch, FiX, FiChevronRight } from "react-icons/fi";

const HeroSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });
  const containerRef = useRef(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  const products = [
    {
      id: 1,
      image: "/image/product-1.jpg",
      alt: "Elegant black abaya with gold embroidery",
      title: "Signature Abaya",
      price: "$149",
      size: "large",
    },
    {
      id: 2,
      image: "/image/product-2.jpg",
      alt: "Luxurious silk hijab in emerald green",
      title: "Silk Hijab",
      price: "$79",
      size: "medium",
    },
    {
      id: 3,
      image: "/image/product-3.jpg",
      alt: "Modern modest evening gown",
      title: "Evening Gown",
      price: "$199",
      size: "medium",
    },
    {
      id: 4,
      image: "/image/product-4.jpg",
      alt: "Casual modest summer dress",
      title: "Summer Dress",
      price: "$89",
      size: "medium",
    },
    {
      id: 5,
      image: "/image/product-5.jpg",
      alt: "Traditional Islamic attire",
      title: "Classic Collection",
      price: "$129",
      size: "medium",
    },
    {
      id: 6,
      image: "/image/product-6.jpg",
      alt: "Traditional Islamic attire",
      title: "Classic Collection",
      price: "$129",
      size: "medium",
    },
    {
      id: 7,
      image: "/image/product-7.jpg",
      alt: "Elegant black abaya with gold embroidery",
      title: "Signature Abaya",
      price: "$149",
      size: "large",
    },
    {
      id: 8,
      image: "/image/product-8.jpg",
      alt: "Luxurious silk hijab in emerald green",
      title: "Silk Hijab",
      price: "$79",
      size: "medium",
    },
    {
      id: 9,
      image: "/image/product-9.jpg",
      alt: "Modern modest evening gown",
      title: "Evening Gown",
      price: "$199",
      size: "medium",
    },
  ];

  const gridProducts = [...products].map((product, index) => ({
    ...product,
    key: `${product.id}-${index}`,
  }));

  const suggestions = [
    { id: 1, name: "Silk Abaya Collection", category: "Abayas" },
    { id: 2, name: "Embroidered Hijabs", category: "Hijabs" },
    { id: 3, name: "Evening Gowns", category: "Dresses" },
    { id: 4, name: "Casual Summer Dresses", category: "Dresses" },
  ];

  const filteredSuggestions = searchQuery
    ? suggestions.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : suggestions;

  useEffect(() => {
    if (inView) {
      controls.start({
        y: ["0%", "-90%"],
        transition: {
          y: {
            duration: 50,
            repeat: Infinity,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [controls, inView]);

  useEffect(() => {
    if (isSearchFocused) {
      searchInputRef.current?.focus();
    }
  }, [isSearchFocused]);

  const getGridClass = (size) => {
    switch (size) {
      case "large":
        return "col-span-2 row-span-2";
      case "medium":
      default:
        return "col-span-1 row-span-1";
    }
  };

  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
      style={{ height: "80vh", minHeight: "600px" }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMCAwdjIwTTAgMTBoMjAiIHN0cm9rZT0icmdiYSgxODQsMTM0LDExLDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* Scrolling grid container with blur effect */}
      <motion.div
        animate={{
          filter: isSearchFocused ? "blur(8px)" : "blur(0px)",
          opacity: isSearchFocused ? 0.7 : 1,
        }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div ref={containerRef} className="w-full" animate={controls}>
            <div className="grid grid-cols-3 gap-2 p-2 h-full auto-rows-min sm:grid-cols-4 sm:gap-3 sm:p-3 md:grid-cols-3 md:gap-4 md:p-4">
              {gridProducts.map((product) => (
                <div
                  key={product.key}
                  className={`relative rounded-xl overflow-hidden shadow-lg ${getGridClass(
                    product.size
                  )}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-10" />
                  <img
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute p-2 w-full bottom-0 left-0 bg-black/35 z-20 text-white sm:p-4 md:p-6">
                    <h3 className="text-xs font-bold sm:text-xl md:text-2xl lg:text-3xl">
                      {product.title}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-lg lg:text-xl">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/10 z-15 pointer-events-none" />

      {/* Centered headline and CTA */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        {/* Search bar positioned above the heading */}
        <motion.div
          className="w-full max-w-xs sm:max-w-sm md:max-w-md mb-4 sm:mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search collections..."
              className="w-full bg-white/50 backdrop-blur-sm text-gray-800 py-2 px-4 pr-10 rounded-full border border-white/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent sm:py-3 sm:px-5 sm:pr-12 md:py-4 md:px-6"
              onClick={() => setIsSearchFocused(true)}
            />
            <FiSearch
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600 sm:right-4 md:right-6"
              size={20}
            />
          </div>
        </motion.div>

        <motion.button
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-medium text-sm shadow-xl sm:px-7 sm:py-3 sm:text-base md:px-8 md:py-4 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          View Collection
          <motion.span
            className="ml-1 inline-block sm:ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.button>
      </div>

      {/* Search overlay */}
      <AnimatePresence>
        {isSearchFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
            onClick={() => setIsSearchFocused(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="relative p-3 border-b border-amber-100 sm:p-4">
                <div className="flex items-center">
                  <FiSearch className="text-amber-600 mr-2 sm:mr-3" size={20} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search our collections..."
                    className="flex-1 text-amber-900 text-sm sm:text-base md:text-lg focus:outline-none placeholder-amber-400"
                  />
                  <button
                    onClick={() => setIsSearchFocused(false)}
                    className="ml-2 text-amber-600 hover:text-amber-800 sm:ml-3"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              </div>

              {/* Search suggestions */}
              <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
                {filteredSuggestions.length > 0 ? (
                  <ul>
                    {filteredSuggestions.map((item) => (
                      <motion.li
                        key={item.id}
                        whileHover={{ backgroundColor: "#FEF3C7" }}
                        className="border-b border-amber-50 last:border-b-0"
                      >
                        <a
                          href="#"
                          className="flex items-center justify-between p-3 text-amber-900 hover:text-amber-700 transition-colors sm:p-4"
                        >
                          <div>
                            <h3 className="font-medium text-sm sm:text-base">
                              {item.name}
                            </h3>
                            <p className="text-xs text-amber-600 sm:text-sm">
                              {item.category}
                            </p>
                          </div>
                          <FiChevronRight className="text-amber-500" />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-4 sm:p-6 md:p-8 text-center text-amber-800">
                    <p className="text-sm sm:text-base">
                      No results found for "{searchQuery}"
                    </p>
                    <p className="text-xs mt-2 text-amber-600 sm:text-sm">
                      Try different keywords
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
