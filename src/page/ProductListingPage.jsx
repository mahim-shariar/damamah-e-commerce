import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiFilter,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiStar,
  FiShoppingCart,
  FiSearch,
} from "react-icons/fi";
import ModernProductCard from "../Shared/ModernProductCard";

const ProductListingPage = () => {
  // Sample product data
  const allProducts = [
    {
      id: 1,
      title: "Luxury Silk Abaya",
      description: "Handcrafted premium silk abaya with delicate embroidery",
      price: 189.99,
      originalPrice: 249.99,
      images: [
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      ],
      isNew: true,
      rating: 4.8,
      reviewCount: 124,
      category: "abayas",
      colors: ["#92400e", "#1e40af", "#374151"],
      sizes: ["S", "M", "L", "XL"],
      tags: ["premium", "limited-edition"],
    },
    {
      id: 2,
      title: "Chiffon Hijab Collection",
      description: "Premium lightweight chiffon hijabs in seasonal colors",
      price: 59.99,
      images: [
        "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      ],
      rating: 4.5,
      reviewCount: 89,
      category: "hijabs",
      colors: ["#f43f5e", "#3b82f6", "#10b981"],
      sizes: ["One Size"],
      tags: ["bestseller"],
    },
    // ... (other products with similar structure)
  ];

  // State for filters
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    price: [],
    color: [],
    size: [],
    tag: [],
  });
  const [sortOption, setSortOption] = useState("featured");
  const [expandedFilter, setExpandedFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Floating bubbles animation
  const BubbleBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-amber-100/20"
          initial={{
            scale: 0,
            opacity: 0,
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50,
          }}
          animate={{
            scale: [0, 0.5 + Math.random() * 0.5, 0],
            opacity: [0, 0.2 + Math.random() * 0.1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            repeatDelay: Math.random() * 10,
            ease: "easeInOut",
          }}
          style={{
            width: `${100 + Math.random() * 200}px`,
            height: `${100 + Math.random() * 200}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Extract filter options
  const categories = [...new Set(allProducts.map((p) => p.category))];
  const colors = [...new Set(allProducts.flatMap((p) => p.colors))];
  const sizes = [...new Set(allProducts.flatMap((p) => p.sizes))];
  const tags = [...new Set(allProducts.flatMap((p) => p.tags || []))];
  const priceRanges = [
    { label: "Under $50", value: "0-50" },
    { label: "$50 to $100", value: "50-100" },
    { label: "$100 to $150", value: "100-150" },
    { label: "Over $150", value: "150-9999" },
  ];

  // Filter products
  const filteredProducts = allProducts.filter((product) => {
    // Search filter
    if (
      searchQuery &&
      !product.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Other filters
    return (
      (activeFilters.category.length === 0 ||
        activeFilters.category.includes(product.category)) &&
      (activeFilters.price.length === 0 ||
        activeFilters.price.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return product.price >= min && product.price <= max;
        })) &&
      (activeFilters.color.length === 0 ||
        activeFilters.color.some((c) => product.colors.includes(c))) &&
      (activeFilters.size.length === 0 ||
        activeFilters.size.some((s) => product.sizes.includes(s))) &&
      (activeFilters.tag.length === 0 ||
        (product.tags &&
          product.tags.some((t) => activeFilters.tag.includes(t))))
    );
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      default:
        return 0;
    }
  });

  // Toggle filter
  const toggleFilter = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  // Clear all filters
  const clearFilters = () =>
    setActiveFilters({
      category: [],
      price: [],
      color: [],
      size: [],
      tag: [],
    });

  // Active filter count
  const activeFilterCount = Object.values(activeFilters).flat().length;

  return (
    <div className="relative overflow-hidden">
      <BubbleBackground />

      {/* Animated floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-200/10"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5,
              opacity: 0,
            }}
            animate={{
              y: [0, -100 - Math.random() * 200],
              opacity: [0, 0.2, 0],
              x: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
            }}
          />
        ))}
      </div>

      {/* Sticky search header */}
      <motion.header
        className={`sticky top-0 z-30 backdrop-blur-md transition-all ${
          isScrolled ? "py-2 shadow-sm" : "py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-serif font-bold text-amber-900"
            >
              Damamah
            </motion.div>

            <motion.div
              className="flex-1 max-w-2xl mx-8"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              transition={{ delay: 0.3 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full py-2 px-4 pr-10 rounded-full border border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 text-amber-900 bg-white/90"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FiSearch className="absolute right-3 top-2.5 text-amber-600" />
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden p-2 text-amber-900 relative"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <FiFilter size={20} />
                {activeFilterCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {activeFilterCount}
                  </motion.span>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-amber-900 relative"
              >
                <FiShoppingCart size={20} />
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                >
                  3
                </motion.span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="relative">
        {/* Hero section with parallax effect */}
        <motion.section
          className="relative h-96 md:h-[32rem] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            style={{ y: useParallax(0.2) }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/40 to-amber-600/20" />
          <div className="relative h-full flex items-center">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="max-w-2xl"
              >
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Modest Fashion{" "}
                  <span className="text-amber-200">Reimagined</span>
                </h1>
                <p className="text-lg md:text-xl text-amber-50 mb-8">
                  Discover our premium collection blending tradition with
                  contemporary design
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Shop New Arrivals
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Product grid section */}
        <section className="relative py-16">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-x-8">
              {/* Filters sidebar - Desktop */}
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="hidden lg:block w-72 shrink-0"
              >
                <div className="sticky top-32 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-amber-100">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium text-amber-900">
                      Filters
                    </h3>
                    {activeFilterCount > 0 && (
                      <button
                        onClick={clearFilters}
                        className="text-sm font-medium text-amber-600 hover:text-amber-700"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {[
                    {
                      name: "category",
                      options: categories,
                      title: "Category",
                    },
                    {
                      name: "price",
                      options: priceRanges,
                      title: "Price",
                      optionLabel: "label",
                    },
                    { name: "color", options: colors, title: "Color" },
                    { name: "size", options: sizes, title: "Size" },
                    { name: "tag", options: tags, title: "Tags" },
                  ].map((filter) => (
                    <div
                      key={filter.name}
                      className="border-b border-amber-100 py-6"
                    >
                      <button
                        className="flex justify-between items-center w-full text-left"
                        onClick={() =>
                          setExpandedFilter(
                            expandedFilter === filter.name ? null : filter.name
                          )
                        }
                      >
                        <h4 className="font-medium text-amber-900">
                          {filter.title}
                        </h4>
                        {expandedFilter === filter.name ? (
                          <FiChevronUp className="text-amber-600" />
                        ) : (
                          <FiChevronDown className="text-amber-600" />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedFilter === filter.name && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pt-4 space-y-3"
                          >
                            {filter.options.map((option) => {
                              const value = filter.optionLabel
                                ? option.value
                                : option;
                              const label = filter.optionLabel
                                ? option.label
                                : option;
                              const isActive =
                                activeFilters[filter.name].includes(value);

                              return (
                                <motion.div
                                  key={value}
                                  whileHover={{ x: 5 }}
                                  className="flex items-center"
                                >
                                  <button
                                    onClick={() =>
                                      toggleFilter(filter.name, value)
                                    }
                                    className={`flex items-center justify-center w-5 h-5 rounded border ${
                                      isActive
                                        ? "bg-amber-600 border-amber-600"
                                        : "border-amber-300"
                                    }`}
                                  >
                                    {isActive && (
                                      <svg
                                        className="w-3 h-3 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    )}
                                  </button>
                                  <span
                                    className={`ml-3 text-sm ${
                                      isActive
                                        ? "text-amber-900 font-medium"
                                        : "text-amber-700"
                                    }`}
                                  >
                                    {filter.name === "color" ? (
                                      <div className="flex items-center">
                                        <span
                                          className="w-4 h-4 rounded-full mr-2 border border-amber-200"
                                          style={{ backgroundColor: option }}
                                        />
                                        {label}
                                      </div>
                                    ) : (
                                      label
                                    )}
                                  </span>
                                </motion.div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.aside>

              {/* Main product grid */}
              <div className="flex-1">
                {/* Active filters and sort */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="mb-8 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border border-amber-100"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-amber-900">
                        Our Collection
                      </h2>
                      <p className="text-amber-700">
                        {filteredProducts.length} of {allProducts.length}{" "}
                        products
                      </p>
                    </div>

                    {/* Sort dropdown - Fixed Version */}
                    <div className="relative">
                      <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-200 rounded-lg text-amber-900"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          setExpandedFilter(
                            expandedFilter === "sort" ? null : "sort"
                          );
                        }}
                      >
                        Sort:{" "}
                        {
                          {
                            featured: "Featured",
                            "price-low": "Price: Low to High",
                            "price-high": "Price: High to Low",
                            rating: "Highest Rated",
                            newest: "Newest",
                          }[sortOption]
                        }
                        {expandedFilter === "sort" ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )}
                      </button>

                      <AnimatePresence>
                        {expandedFilter === "sort" && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-amber-100 z-50" // Increased z-index
                            onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
                          >
                            {[
                              { label: "Featured", value: "featured" },
                              {
                                label: "Price: Low to High",
                                value: "price-low",
                              },
                              {
                                label: "Price: High to Low",
                                value: "price-high",
                              },
                              { label: "Highest Rated", value: "rating" },
                              { label: "Newest", value: "newest" },
                            ].map((option) => (
                              <button
                                key={option.value}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSortOption(option.value);
                                  setExpandedFilter(null);
                                }}
                                className={`block w-full text-left px-4 py-2 text-sm ${
                                  sortOption === option.value
                                    ? "bg-amber-100 text-amber-900"
                                    : "text-amber-700 hover:bg-amber-50"
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Active filters */}
                  {activeFilterCount > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-amber-100"
                    >
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(activeFilters).map(([type, filters]) =>
                          filters.map((filter) => {
                            let label = filter;
                            if (type === "price") {
                              const range = priceRanges.find(
                                (r) => r.value === filter
                              );
                              label = range?.label || filter;
                            }

                            return (
                              <motion.button
                                key={`${type}-${filter}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleFilter(type, filter)}
                                className="flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800 hover:bg-amber-200"
                              >
                                {type === "color" && (
                                  <span
                                    className="w-3 h-3 rounded-full mr-1"
                                    style={{ backgroundColor: filter }}
                                  />
                                )}
                                {label}
                                <FiX className="ml-1" size={14} />
                              </motion.button>
                            );
                          })
                        )}
                        <button
                          onClick={clearFilters}
                          className="text-sm text-amber-600 hover:text-amber-700 ml-2 self-center"
                        >
                          Clear all
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                {/* Product grid */}
                {filteredProducts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-white/90 backdrop-blur-sm rounded-xl border border-amber-100"
                  >
                    <h3 className="text-xl font-medium text-amber-900 mb-2">
                      No products found
                    </h3>
                    <p className="text-amber-700 mb-6">
                      Try adjusting your search or filters
                    </p>
                    <button
                      onClick={clearFilters}
                      className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                    >
                      Clear all filters
                    </button>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "100px" }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        whileHover={{ y: -5 }}
                        className="relative"
                      >
                        <ModernProductCard
                          images={product.images}
                          title={product.title}
                          description={product.description}
                          price={product.price}
                          originalPrice={product.originalPrice}
                          isNew={product.isNew}
                          rating={product.rating}
                          reviewCount={product.reviewCount}
                          tags={product.tags}
                        />
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {filteredProducts.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-12 flex justify-center"
                  >
                    <nav className="flex items-center gap-1">
                      <button className="px-4 py-2 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50">
                        Previous
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-amber-600 text-white">
                        1
                      </button>
                      {[2, 3, 4].map((page) => (
                        <button
                          key={page}
                          className="px-4 py-2 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50 hidden sm:block"
                        >
                          {page}
                        </button>
                      ))}
                      <span className="px-4 py-2 text-amber-700">...</span>
                      <button className="px-4 py-2 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50 hidden sm:block">
                        8
                      </button>
                      <button className="px-4 py-2 rounded-lg border border-amber-200 text-amber-700 hover:bg-amber-50">
                        Next
                      </button>
                    </nav>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter section */}
      </main>

      {/* Mobile filters */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={() => setMobileFiltersOpen(false)}
              />

              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="inline-block align-bottom bg-white rounded-t-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-medium text-amber-900">
                      Filters
                    </h3>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        name: "category",
                        options: categories,
                        title: "Category",
                      },
                      {
                        name: "price",
                        options: priceRanges,
                        title: "Price",
                        optionLabel: "label",
                      },
                      { name: "color", options: colors, title: "Color" },
                      { name: "size", options: sizes, title: "Size" },
                      { name: "tag", options: tags, title: "Tags" },
                    ].map((filter) => (
                      <div
                        key={filter.name}
                        className="border-b border-amber-100 pb-6"
                      >
                        <button
                          className="flex justify-between items-center w-full text-left"
                          onClick={() =>
                            setExpandedFilter(
                              expandedFilter === filter.name
                                ? null
                                : filter.name
                            )
                          }
                        >
                          <h4 className="font-medium text-amber-900">
                            {filter.title}
                          </h4>
                          {expandedFilter === filter.name ? (
                            <FiChevronUp className="text-amber-600" />
                          ) : (
                            <FiChevronDown className="text-amber-600" />
                          )}
                        </button>

                        <AnimatePresence>
                          {expandedFilter === filter.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pt-4 space-y-3"
                            >
                              {filter.options.map((option) => {
                                const value = filter.optionLabel
                                  ? option.value
                                  : option;
                                const label = filter.optionLabel
                                  ? option.label
                                  : option;
                                const isActive =
                                  activeFilters[filter.name].includes(value);

                                return (
                                  <div
                                    key={value}
                                    className="flex items-center"
                                  >
                                    <button
                                      onClick={() =>
                                        toggleFilter(filter.name, value)
                                      }
                                      className={`flex items-center justify-center w-5 h-5 rounded border ${
                                        isActive
                                          ? "bg-amber-600 border-amber-600"
                                          : "border-amber-300"
                                      }`}
                                    >
                                      {isActive && (
                                        <svg
                                          className="w-3 h-3 text-white"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      )}
                                    </button>
                                    <span
                                      className={`ml-3 text-sm ${
                                        isActive
                                          ? "text-amber-900 font-medium"
                                          : "text-amber-700"
                                      }`}
                                    >
                                      {filter.name === "color" ? (
                                        <div className="flex items-center">
                                          <span
                                            className="w-4 h-4 rounded-full mr-2 border border-amber-200"
                                            style={{ backgroundColor: option }}
                                          />
                                          {label}
                                        </div>
                                      ) : (
                                        label
                                      )}
                                    </span>
                                  </div>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={clearFilters}
                      className="text-sm font-medium text-amber-600 hover:text-amber-700"
                    >
                      Clear all
                    </button>
                    <button
                      onClick={() => setMobileFiltersOpen(false)}
                      className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                    >
                      Apply filters
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Custom hook for parallax effect
function useParallax(movement = 0.1) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * movement);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [movement]);

  return offset;
}

export default ProductListingPage;
