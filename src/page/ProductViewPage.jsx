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
  // Sample product data
  const product = {
    id: 1,
    title: "Luxury Silk Abaya",
    description:
      "Handcrafted premium silk abaya with delicate embroidery. This exquisite piece features intricate hand-stitched patterns and is made from 100% pure silk for ultimate comfort and elegance.",
    price: 189.99,
    originalPrice: 249.99,
    images: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    isNew: true,
    rating: 4.8,
    reviewCount: 124,
    colors: [
      { name: "Amber", hex: "#92400e" },
      { name: "Sapphire", hex: "#1e40af" },
      { name: "Onyx", hex: "#374151" },
    ],
    sizes: ["S", "M", "L", "XL"],
    details: [
      "100% Pure Silk",
      "Hand-embroidered details",
      "Machine wash cold",
      "Made in UAE",
      "Free shipping worldwide",
    ],
    reviews: [
      {
        id: 1,
        author: "Aisha Rahman",
        rating: 5,
        date: "2023-05-15",
        comment:
          "Absolutely stunning! The craftsmanship is incredible and it fits perfectly. Worth every penny.",
      },
      {
        id: 2,
        author: "Fatima Ahmed",
        rating: 4,
        date: "2023-04-22",
        comment:
          "Beautiful abaya, the silk is so luxurious. Only wish it came in more colors.",
      },
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

  // Refs
  const imageRef = useRef(null);
  const zoomRef = useRef(null);

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

  return (
    <div className="bg-white min-h-screen">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        {[...Array(10)].map((_, i) => (
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
              scale: [0, 0.3 + Math.random() * 0.3, 0],
              opacity: [0, 0.1 + Math.random() * 0.1, 0],
              rotate: [0, 180],
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

      {/* Main content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <motion.button
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-amber-700 mb-8"
        >
          <FiChevronLeft className="mr-1" />
          Back to Products
        </motion.button>

        {/* Product grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div className="space-y-4">
            {/* Main image with zoom */}
            <div className="relative overflow-hidden rounded-xl aspect-square bg-gray-50">
              <motion.div
                ref={imageRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={`w-full h-full cursor-${
                  zoomImage ? "zoom-out" : "zoom-in"
                }`}
                onClick={() => setZoomImage(!zoomImage)}
              >
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Zoomed view */}
              <AnimatePresence>
                {zoomImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    ref={zoomRef}
                    className="fixed inset-0 z-50 bg-white bg-no-repeat bg-contain cursor-zoom-out"
                    style={{
                      backgroundImage: `url(${product.images[currentImageIndex]})`,
                      backgroundSize: "200%",
                    }}
                    onClick={() => setZoomImage(false)}
                  >
                    <button
                      className="absolute top-4 right-4 p-2 bg-white/80 rounded-full shadow-md hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomImage(false);
                      }}
                    >
                      <FiX size={24} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <FiChevronLeft size={24} />
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full shadow-md hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <FiChevronRight size={24} />
              </button>

              {/* New badge */}
              {product.isNew && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  New Arrival
                </motion.div>
              )}
            </div>

            {/* Thumbnail gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    currentImageIndex === index
                      ? "border-amber-600"
                      : "border-transparent"
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

          {/* Product details */}
          <div className="space-y-6">
            {/* Title and price */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-amber-900 mb-2"
              >
                {product.title}
              </motion.h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
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
                  <span className="ml-2 text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl font-bold text-amber-900"
                >
                  ${product.price.toFixed(2)}
                </motion.p>
                {product.originalPrice && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-gray-500 line-through"
                  >
                    ${product.originalPrice.toFixed(2)}
                  </motion.p>
                )}
                {product.originalPrice && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium"
                  >
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </motion.span>
                )}
              </div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-700"
            >
              {product.description}
            </motion.p>

            {/* Color selection */}
            <div className="space-y-3">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg font-medium text-amber-900"
              >
                Color: <span className="font-normal">{selectedColor.name}</span>
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex space-x-3"
              >
                {product.colors.map((color) => (
                  <button
                    key={color.hex}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                      selectedColor.hex === color.hex
                        ? "border-amber-600"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedColor(color)}
                    aria-label={color.name}
                  >
                    <span
                      className="w-8 h-8 rounded-full border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </motion.div>
            </div>

            {/* Size selection */}
            <div className="space-y-3">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg font-medium text-amber-900"
              >
                Size
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-2"
              >
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? "bg-amber-600 text-white border-amber-600"
                        : "border-gray-300 hover:border-amber-400"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </motion.div>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="text-sm text-amber-600 hover:text-amber-700"
              >
                Size Guide
              </motion.button>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-lg font-medium text-amber-900"
              >
                Quantity
              </motion.h3>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="flex items-center space-x-4"
              >
                <div className="flex border rounded-md divide-x divide-gray-200">
                  <button
                    className="px-3 py-2 hover:bg-gray-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <div className="px-4 py-2 text-center w-12">{quantity}</div>
                  <button
                    className="px-3 py-2 hover:bg-gray-50"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">
                  {quantity > 1 ? `${quantity} items` : "1 item"}
                </span>
              </motion.div>
            </div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-3 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                onClick={addToCart}
              >
                <FiShoppingCart />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-3 rounded-lg border flex items-center justify-center ${
                  isWishlisted
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "border-gray-300 hover:border-amber-400"
                }`}
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <FiHeart
                  className={isWishlisted ? "fill-red-500 text-red-500" : ""}
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-3 rounded-lg border border-gray-300 hover:border-amber-400 flex items-center justify-center"
              >
                <FiShare2 />
              </motion.button>
            </motion.div>

            {/* Added to cart notification */}
            <AnimatePresence>
              {showAddedToCart && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed bottom-4 right-4 bg-green-100 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50"
                >
                  <FiCheck className="text-green-600" />
                  Added to cart! {quantity} x {product.title}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product details tabs */}
            <div className="pt-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {[
                    { id: "description", label: "Description" },
                    { id: "details", label: "Details" },
                    {
                      id: "reviews",
                      label: `Reviews (${product.reviewCount})`,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === tab.id
                          ? "border-amber-600 text-amber-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
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
                    <p>
                      This luxurious abaya is perfect for special occasions,
                      weddings, or whenever you want to feel extra elegant. The
                      flowing silhouette flatters all body types while
                      maintaining modesty.
                    </p>
                  </motion.div>
                )}

                {activeTab === "details" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                  >
                    <h4 className="font-medium text-amber-900">
                      Product Details
                    </h4>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {product.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {activeTab === "reviews" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                  >
                    {product.reviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-200 pb-6"
                      >
                        <div className="flex items-center mb-2">
                          <div className="flex items-center mr-4">
                            {[...Array(5)].map((_, i) => (
                              <FiStar
                                key={i}
                                className={`${
                                  i < review.rating
                                    ? "text-amber-500 fill-amber-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>
                        </div>
                        <h5 className="font-medium text-amber-900">
                          {review.author}
                        </h5>
                        <p className="text-gray-700 mt-1">{review.comment}</p>
                      </div>
                    ))}
                    <button className="mt-4 text-amber-600 hover:text-amber-700 font-medium">
                      Write a Review
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended products section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-amber-900 mb-8"
          >
            You May Also Like
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square bg-gray-100 relative">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      150 + item
                    }9236455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80`}
                    alt={`Recommended ${item}`}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white">
                    <FiHeart className="text-gray-600" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-amber-900 mb-1">
                    Matching Hijab
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
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">(24)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900">$49.99</span>
                    <button className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductViewPage;
