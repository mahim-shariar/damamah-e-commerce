import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingBag, FiEye, FiChevronRight, FiHeart } from "react-icons/fi";

const ModernProductCard = ({
  images,
  title,
  description,
  price,
  isNew = false,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Auto-rotate images
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const difference = touchStartX.current - touchEndX.current;
    if (Math.abs(difference) > 50) {
      difference > 0 ? handleNextImage() : handlePrevImage();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
      className="relative h-full"
    >
      <div
        className="relative h-full overflow-hidden rounded-xl border border-amber-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image gallery */}
        <div
          className="relative aspect-square overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={images[currentImageIndex]}
                alt={`${title} - View ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          {images.length > 1 && isHovered && (
            <>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-amber-800 p-2 rounded-full shadow-sm"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronRight className="rotate-180" size={16} />
              </motion.button>
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-amber-800 p-2 rounded-full shadow-sm"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiChevronRight size={16} />
              </motion.button>
            </>
          )}

          {/* Badges */}
          {isNew && (
            <motion.div
              className="absolute top-3 left-3 bg-amber-600 text-white px-2.5 py-1 rounded-md text-xs font-medium shadow-sm"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              New
            </motion.div>
          )}

          {/* Like button */}
          <motion.button
            className={`absolute top-3 right-3 p-2 rounded-full ${
              isLiked
                ? "text-rose-500"
                : "text-amber-600/80 hover:text-amber-600"
            } bg-white/90 backdrop-blur-sm shadow-sm`}
            onClick={() => setIsLiked(!isLiked)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiHeart className={isLiked ? "fill-current" : ""} size={16} />
          </motion.button>

          {/* Image counter */}
          {images.length > 1 && (
            <motion.div
              className="absolute bottom-3 right-3 bg-white/90 text-amber-800 px-2 py-1 rounded-md text-xs shadow-sm backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {currentImageIndex + 1}/{images.length}
            </motion.div>
          )}
        </div>

        {/* Product info */}
        <div className="p-4 flex flex-col">
          <div className="mb-2">
            <motion.h3
              className="font-medium text-amber-900 line-clamp-1"
              whileHover={{ color: "#b45309" }} // amber-700
            >
              {title}
            </motion.h3>
            <motion.p
              className="text-sm text-amber-800/70 line-clamp-2 h-10"
              whileHover={{ color: "#92400e" }} // amber-800
            >
              {description}
            </motion.p>
          </div>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              <motion.span
                className="font-medium text-amber-900"
                whileHover={{ scale: 1.03 }}
              >
                ${price}
              </motion.span>
              <motion.div
                className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                Free Shipping
              </motion.div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2">
              <motion.a
                href={`/products/${title.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center justify-center gap-1.5 bg-white text-amber-800 border border-amber-200 hover:border-amber-300 hover:bg-amber-50 px-3 py-2 rounded-lg text-sm transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiEye size={14} />
                <span>Details</span>
              </motion.a>

              <motion.button
                className="flex items-center justify-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white px-3 py-2 rounded-lg text-sm transition-all"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiShoppingBag size={14} />
                <span>Add</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Subtle hover effect */}
        <motion.div
          className="absolute inset-0 border-2 border-transparent pointer-events-none"
          animate={{
            borderColor: isHovered ? "rgba(245, 158, 11, 0.2)" : "transparent", // amber-400/20
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

export default ModernProductCard;
