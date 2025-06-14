import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  FiShoppingCart,
  FiHeart,
  FiShare2,
  FiChevronLeft,
  FiChevronRight,
  FiX,
  FiStar,
  FiCheck,
} from "react-icons/fi";

const ProductViewPage = () => {
  // Enhanced product data
  const product = {
    id: 1,
    title: "Royal Silk Abaya",
    subtitle: "Embroidered Luxury Collection",
    description:
      "Handcrafted premium silk abaya with delicate gold embroidery. This exquisite piece features intricate hand-stitched patterns and is made from 100% pure silk for ultimate comfort and elegance. The flowing silhouette flatters all body types while maintaining modesty.",
    price: 189.99,
    originalPrice: 249.99,
    images: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    isNew: true,
    isBestSeller: true,
    rating: 4.8,
    reviewCount: 124,
    colors: [
      { name: "Amber Gold", hex: "#92400e" },
      { name: "Sapphire Blue", hex: "#1e40af" },
      { name: "Onyx Black", hex: "#374151" },
      { name: "Emerald Green", hex: "#065f46" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    details: [
      "100% Pure Silk",
      "24K Gold thread embroidery",
      "Hand-wash only",
      "Made in UAE by master artisans",
      "Includes luxury dust bag",
      "Free worldwide express shipping",
      "60-day return policy",
    ],
    materials: [
      { name: "Silk", percentage: 100 },
      { name: "Gold Thread", percentage: 5 },
    ],
    reviews: [
      {
        id: 1,
        author: "Aisha Rahman",
        rating: 5,
        date: "2023-05-15",
        comment:
          "Absolutely stunning! The craftsmanship is incredible and it fits perfectly. Worth every penny.",
        avatar: "/avatars/1.jpg",
      },
      {
        id: 2,
        author: "Fatima Ahmed",
        rating: 4,
        date: "2023-04-22",
        comment:
          "Beautiful abaya, the silk is so luxurious. Only wish it came in more colors.",
        avatar: "/avatars/2.jpg",
      },
    ],
    deliveryOptions: [
      { type: "standard", price: 0, days: "5-7" },
      { type: "express", price: 15, days: "2-3" },
    ],
  };

  // State management
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [zoomImage, setZoomImage] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(
    product.deliveryOptions[0]
  );

  // Refs
  const imageRef = useRef(null);
  const zoomRef = useRef(null);
  const detailsRef = useRef(null);

  // Handle keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "Escape") {
        setZoomImage(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Image zoom effect
  useEffect(() => {
    if (!zoomImage || !imageRef.current || !zoomRef.current) return;

    const image = imageRef.current;
    const zoomContainer = zoomRef.current;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = image.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      zoomContainer.style.backgroundPosition = `${x}% ${y}%`;
    };

    image.addEventListener("mousemove", handleMouseMove);
    return () => image.removeEventListener("mousemove", handleMouseMove);
  }, [zoomImage, currentImageIndex]);

  // 3D tilt effect for main image
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = image.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      image.style.transform = `perspective(1000px) rotateX(${
        (0.5 - y) * 10
      }deg) rotateY(${(x - 0.5) * 10}deg)`;
    };

    const handleMouseLeave = () => {
      image.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    };

    image.addEventListener("mousemove", handleMouseMove);
    image.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      image.removeEventListener("mousemove", handleMouseMove);
      image.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const addToCart = () => {
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  // Floating particles background
  const Particle = ({ index }) => {
    const size = Math.random() * 5 + 1;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 10;
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    return (
      <motion.div
        className="absolute rounded-full bg-amber-100/20"
        initial={{
          scale: 0,
          opacity: 0,
          x: `${x}%`,
          y: `${y}%`,
        }}
        animate={{
          scale: [0, 0.3 + Math.random() * 0.3, 0],
          opacity: [0, 0.1 + Math.random() * 0.1, 0],
          rotate: [0, 180],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatDelay: delay,
          ease: "easeInOut",
        }}
        style={{
          width: `${size}px`,
          height: `${size}px`,
        }}
      />
    );
  };

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Enhanced floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(50)].map((_, i) => (
          <Particle key={i} index={i} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-amber-50/30 to-white opacity-30"></div>
      </div>

      {/* Main content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back button with animated hover */}
        <motion.button
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-amber-700 mb-8 group"
        >
          <FiChevronLeft className="mr-1 transition-transform group-hover:-translate-x-1" />
          <span className="border-b border-transparent group-hover:border-amber-700">
            Back to Collections
          </span>
        </motion.button>

        {/* Product grid with enhanced layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-16">
          {/* Image gallery with enhanced interactions */}
          <div className="space-y-4 lg:space-y-6">
            {/* Main image with 3D tilt and zoom */}
            <div className="relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-amber-50 to-amber-100 shadow-lg">
              <motion.div
                ref={imageRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`w-full h-full cursor-${
                  zoomImage ? "zoom-out" : "zoom-in"
                } transition-transform duration-500 ease-out`}
                onClick={() => setZoomImage(!zoomImage)}
              >
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Enhanced zoomed view */}
              <AnimatePresence>
                {zoomImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    ref={zoomRef}
                    className="fixed inset-0 z-50 bg-white bg-no-repeat bg-contain cursor-zoom-out backdrop-blur-sm"
                    style={{
                      backgroundImage: `url(${product.images[currentImageIndex]})`,
                      backgroundSize: "200%",
                    }}
                    onClick={() => setZoomImage(false)}
                  >
                    <button
                      className="absolute top-6 right-6 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomImage(false);
                      }}
                    >
                      <FiX size={24} className="text-amber-900" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced navigation arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all group"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <FiChevronLeft
                  size={24}
                  className="text-amber-900 group-hover:text-amber-700"
                />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-all group"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <FiChevronRight
                  size={24}
                  className="text-amber-900 group-hover:text-amber-700"
                />
              </button>

              {/* Enhanced badges with animation */}
              <div className="absolute top-4 left-4 flex flex-col space-y-2">
                {product.isNew && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md"
                  >
                    New Arrival
                  </motion.div>
                )}
                {product.isBestSeller && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-amber-800 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md"
                  >
                    Best Seller
                  </motion.div>
                )}
              </div>
            </div>

            {/* Enhanced thumbnail gallery with scrollable container */}
            <div className="relative">
              <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((image, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex-shrink-0 aspect-square w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-lg border-2 transition-all ${
                      currentImageIndex === index
                        ? "border-amber-600 scale-105"
                        : "border-transparent hover:border-amber-300"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced product details section */}
          <div className="space-y-6 md:space-y-8">
            {/* Title and price with enhanced typography */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-900 mb-1"
              >
                {product.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-amber-700 mb-4"
              >
                {product.subtitle}
              </motion.p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center bg-amber-100 px-3 py-1 rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "text-amber-500 fill-amber-500"
                          : "text-amber-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-amber-800 font-medium">
                    {product.rating}{" "}
                    <span className="text-amber-600">
                      ({product.reviewCount} reviews)
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-end space-x-6 mb-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl font-bold text-amber-900"
                >
                  ${product.price.toFixed(2)}
                </motion.p>
                {product.originalPrice && (
                  <div className="flex flex-col">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg text-gray-500 line-through"
                    >
                      ${product.originalPrice.toFixed(2)}
                    </motion.p>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-gradient-to-r from-amber-600 to-amber-800 text-white px-3 py-1 rounded-full text-sm font-medium mt-1 self-start"
                    >
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </motion.span>
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced color selection */}
            <div className="space-y-3">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg font-medium text-amber-900 flex items-center"
              >
                <span
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                Color:{" "}
                <span className="font-normal ml-1">{selectedColor.name}</span>
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-3"
              >
                {product.colors.map((color) => (
                  <motion.button
                    key={color.hex}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedColor.hex === color.hex
                        ? "border-amber-600 shadow-md"
                        : "border-transparent hover:border-amber-300"
                    }`}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color.name}
                  >
                    <span
                      className="w-10 h-10 rounded-full border border-gray-200 shadow-inner"
                      style={{ backgroundColor: color.hex }}
                    />
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Enhanced size selection */}
            <div className="space-y-3">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg font-medium text-amber-900"
              >
                Size: <span className="font-normal">{selectedSize}</span>
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="grid grid-cols-5 gap-2"
              >
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`px-3 py-2 border rounded-md text-center transition-all ${
                      selectedSize === size
                        ? "bg-amber-600 text-white border-amber-600 shadow-md"
                        : "border-gray-300 hover:border-amber-400 bg-white"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </motion.button>
                ))}
              </motion.div>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-sm text-amber-600 hover:text-amber-700 flex items-center"
              >
                Size Guide
                <FiChevronRight className="ml-1" />
              </motion.button>
            </div>

            {/* Enhanced delivery options */}
            <div className="space-y-3">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-lg font-medium text-amber-900"
              >
                Delivery Options
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="grid grid-cols-2 gap-3"
              >
                {product.deliveryOptions.map((option) => (
                  <motion.button
                    key={option.type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-3 border rounded-lg text-left transition-all ${
                      selectedDelivery.type === option.type
                        ? "border-amber-600 bg-amber-50 shadow-sm"
                        : "border-gray-200 hover:border-amber-300"
                    }`}
                    onClick={() => setSelectedDelivery(option)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium capitalize">
                        {option.type}
                      </span>
                      <span className="text-amber-700 font-bold">
                        {option.price > 0 ? `$${option.price}` : "FREE"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {option.days} business days
                    </p>
                  </motion.button>
                ))}
              </motion.div>
            </div>

            {/* Enhanced quantity selector */}
            <div className="space-y-3">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-lg font-medium text-amber-900"
              >
                Quantity
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3 }}
                className="flex items-center space-x-4"
              >
                <div className="flex border rounded-lg divide-x divide-gray-200 overflow-hidden shadow-sm">
                  <button
                    className="px-4 py-2 hover:bg-gray-50 text-lg font-medium"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <div className="px-6 py-2 text-center w-12 font-medium">
                    {quantity}
                  </div>
                  <button
                    className="px-4 py-2 hover:bg-gray-50 text-lg font-medium"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {quantity > 1 ? `${quantity} items` : "1 item"} in cart
                </span>
              </motion.div>
            </div>

            {/* Enhanced action buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 20px rgba(180, 83, 9, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white py-4 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                onClick={addToCart}
              >
                <FiShoppingCart size={20} />
                <span>
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-xl border flex items-center justify-center shadow-sm transition-all ${
                  isWishlisted
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "border-gray-300 hover:border-amber-400 hover:bg-amber-50"
                }`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <FiHeart
                  size={20}
                  className={isWishlisted ? "fill-red-500 text-red-500" : ""}
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-xl border border-gray-300 hover:border-amber-400 hover:bg-amber-50 shadow-sm flex items-center justify-center transition-all"
              >
                <FiShare2 size={20} />
              </motion.button>
            </motion.div>

            {/* Enhanced added to cart notification */}
            <AnimatePresence>
              {showAddedToCart && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50"
                >
                  <div className="bg-white/20 p-1 rounded-full">
                    <FiCheck size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium">Added to cart!</p>
                    <p className="text-sm opacity-90">
                      {quantity} x {product.title}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced product details tabs */}
            <div className="pt-8" ref={detailsRef}>
              <div className="border-b border-gray-200">
                <nav className="flex space-x-6">
                  {[
                    { id: "description", label: "Description", icon: null },
                    { id: "details", label: "Details", icon: null },
                    {
                      id: "reviews",
                      label: `Reviews`,
                      count: product.reviewCount,
                      icon: null,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-all ${
                        activeTab === tab.id
                          ? "border-amber-600 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => {
                        setActiveTab(tab.id);
                        detailsRef.current?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      {tab.label}
                      {tab.count && (
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="py-6">
                {activeTab === "description" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-700 space-y-4"
                  >
                    <p>{product.description}</p>
                    <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4">
                      <h4 className="font-medium text-amber-900 mb-2">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <FiCheck className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Premium 100% silk fabric</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheck className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Hand-embroidered with gold thread</span>
                        </li>
                        <li className="flex items-start">
                          <FiCheck className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span>Flowing modest silhouette</span>
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}

                {activeTab === "details" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="font-medium text-amber-900 mb-3">
                        Product Details
                      </h4>
                      <ul className="space-y-3">
                        {product.details.map((detail, i) => (
                          <li key={i} className="flex items-start">
                            <FiCheck className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-amber-900 mb-3">
                        Materials
                      </h4>
                      <div className="space-y-2">
                        {product.materials.map((material, i) => (
                          <div key={i} className="flex items-center">
                            <span className="w-24 text-gray-600">
                              {material.name}
                            </span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
                              <div
                                className="bg-amber-600 h-2.5 rounded-full"
                                style={{ width: `${material.percentage}%` }}
                              ></div>
                            </div>
                            <span className="w-10 text-right text-sm text-gray-500">
                              {material.percentage}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center mb-1">
                          {[...Array(5)].map((_, i) => (
                            <FiStar
                              key={i}
                              className={`${
                                i < Math.floor(product.rating)
                                  ? "text-amber-500 fill-amber-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-amber-800 font-medium">
                            {product.rating} out of 5
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Based on {product.reviewCount} reviews
                        </p>
                      </div>
                      <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Write a Review
                      </button>
                    </div>

                    {product.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6"
                      >
                        <div className="flex items-start">
                          <div className="bg-amber-100 w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-amber-800 font-medium">
                              {review.author.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-medium text-amber-900">
                                {review.author}
                              </h5>
                              <span className="text-sm text-gray-500">
                                {review.date}
                              </span>
                            </div>
                            <div className="flex items-center mb-2">
                              {[...Array(5)].map((_, i) => (
                                <FiStar
                                  key={i}
                                  className={`${
                                    i < review.rating
                                      ? "text-amber-500 fill-amber-500"
                                      : "text-gray-300"
                                  }`}
                                  size={14}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced recommended products section */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-16 md:py-20">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-amber-900"
            >
              Complete Your Look
            </motion.h2>
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center text-amber-700 group"
            >
              <span className="border-b border-transparent group-hover:border-amber-700">
                View All Accessories
              </span>
              <FiChevronRight className="ml-1 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ delay: item * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-gray-100 relative group">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      150 + item
                    }9236455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80`}
                    alt={`Recommended ${item}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                      item % 2 === 0
                        ? "bg-red-100 text-red-600 hover:bg-red-200"
                        : "bg-white/80 text-gray-600 hover:bg-white"
                    } shadow-sm`}
                  >
                    <FiHeart
                      className={
                        item % 2 === 0 ? "fill-red-500 text-red-500" : ""
                      }
                    />
                  </button>
                  <button className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-left opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-sm font-medium">Quick View</span>
                  </button>
                </div>
                <div className="p-4 md:p-5">
                  <h3 className="font-medium text-amber-900 mb-1">
                    {item % 2 === 0 ? "Matching Hijab" : "Embroidered Belt"}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center mr-2">
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
                    <span className="text-xs text-gray-500">(24)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-amber-900">$49.99</span>
                      {item % 3 === 0 && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          $69.99
                        </span>
                      )}
                    </div>
                    <button className="text-amber-600 hover:text-amber-700 text-sm font-medium flex items-center">
                      Add <span className="hidden sm:inline ml-1">to Cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-10 sm:hidden mx-auto bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            View All Accessories
            <FiChevronRight />
          </motion.button>
        </div>
      </section>

      {/* Luxury promise section */}
      <section className="py-12 bg-amber-900 text-amber-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-6"
            >
              <div className="bg-amber-800/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Luxury Packaging</h3>
              <p className="text-amber-100">
                Each piece comes in our signature gift box with gold foil
                detailing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="text-center p-6"
            >
              <div className="bg-amber-800/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">
                Authenticity Guaranteed
              </h3>
              <p className="text-amber-100">
                Certified authentic materials with hologram verification.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="text-center p-6"
            >
              <div className="bg-amber-800/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Worldwide Shipping</h3>
              <p className="text-amber-100">
                Free express delivery to most countries within 3-5 days.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductViewPage;
