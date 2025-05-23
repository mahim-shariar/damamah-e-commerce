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
        return "md:col-span-2 md:row-span-2";
      case "medium":
        return "md:col-span-1 md:row-span-1";
      default:
        return "md:col-span-1 md:row-span-1";
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 h-full auto-rows-min">
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
                  <div className="absolute p-6 w-full bottom-0 left-0 bg-black/35 z-20 text-white">
                    <h3 className="text-3xl font-bold">{product.title}</h3>
                    <p className="text-4xl">{product.price}</p>
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
          className="w-full max-w-md mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search collections..."
              className="w-full bg-white/50 backdrop-blur-sm text-gray-800 py-4 px-6 pr-12 rounded-full border border-white/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
              onClick={() => setIsSearchFocused(true)}
            />
            <FiSearch
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-amber-600"
              size={24}
            />
          </div>
        </motion.div>

        {/* <motion.h1
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="block">Damamah</span>
          <span className="text-amber-300">Collections</span>
        </motion.h1> */}
        <motion.button
          className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium text-lg shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          View Collection
          <motion.span
            className="ml-2 inline-block"
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
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsSearchFocused(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search input */}
              <div className="relative p-4 border-b border-amber-100">
                <div className="flex items-center">
                  <FiSearch className="text-amber-600 mr-3" size={24} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search our collections..."
                    className="flex-1 text-amber-900 text-lg focus:outline-none placeholder-amber-400"
                  />
                  <button
                    onClick={() => setIsSearchFocused(false)}
                    className="ml-3 text-amber-600 hover:text-amber-800"
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              {/* Search suggestions */}
              <div className="max-h-[60vh] overflow-y-auto">
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
                          className="flex items-center justify-between p-4 text-amber-900 hover:text-amber-700 transition-colors"
                        >
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-amber-600">
                              {item.category}
                            </p>
                          </div>
                          <FiChevronRight className="text-amber-500" />
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <div className="p-8 text-center text-amber-800">
                    <p>No results found for "{searchQuery}"</p>
                    <p className="text-sm mt-2 text-amber-600">
                      Try different keywords
                    </p>
                  </div>
                )}
              </div>

              {/* Popular searches */}
              <div className="p-4 bg-amber-50">
                <h4 className="text-sm font-medium text-amber-800 mb-2">
                  Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Abayas", "Hijabs", "Dresses", "New Arrivals"].map(
                    (term) => (
                      <motion.button
                        key={term}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1.5 bg-white text-amber-800 text-sm rounded-full border border-amber-200 hover:border-amber-300"
                      >
                        {term}
                      </motion.button>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;

// import { useEffect, useState } from "react";
// import { useInView } from "react-intersection-observer";
// import { motion, useAnimation, AnimatePresence } from "framer-motion";

// const HeroSection = () => {
//   const controls = useAnimation();
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [ref, inView] = useInView({
//     threshold: 0.1,
//     triggerOnce: false,
//   });

//   const slides = [
//     {
//       image:
//         "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
//       alt: "Description 1",
//       title: "Elegant Abayas",
//       description: "Discover our premium collection of handcrafted abayas",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
//       alt: "Description 2",
//       title: "Luxurious Hijabs",
//       description: "Silk and chiffon hijabs for every occasion",
//     },
//     {
//       image:
//         "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
//       alt: "Description 3",
//       title: "Modest Evening Wear",
//       description: "Evening gowns designed for modern modest fashion",
//     },
//   ];

//   useEffect(() => {
//     if (inView) {
//       controls.start("visible");
//     }
//   }, [controls, inView]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 10000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   const textVariants = {
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         staggerChildren: 0.1,
//       },
//     },
//     hidden: { opacity: 0, y: 20 },
//   };

//   const letterVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         ease: "easeOut",
//       },
//     },
//   };

//   const floatingVariants = {
//     float: {
//       y: [0, -20, 0],
//       transition: {
//         duration: 8,
//         repeat: Infinity,
//         repeatType: "reverse",
//         ease: "easeInOut",
//       },
//     },
//   };

//   const slideVariants = {
//     enter: (direction) => {
//       return {
//         x: direction > 0 ? "120%" : "-120%",
//         opacity: 0,
//         scale: 0.9,
//       };
//     },
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//       scale: 1,
//     },
//     exit: (direction) => {
//       return {
//         zIndex: 0,
//         x: direction < 0 ? "120%" : "-120%",
//         opacity: 0,
//         scale: 0.9,
//       };
//     },
//   };

//   const title = "Elegance in Modesty".split(" ");

//   return (
//     <div
//       className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-50 pt-20"
//       ref={ref}
//     >
//       {/* Enhanced grid pattern background */}
//       <div className="absolute inset-0 overflow-hidden opacity-30">
//         <svg
//           className="absolute inset-0 w-full h-full"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             <pattern
//               id="grid-pattern"
//               width="80"
//               height="80"
//               patternUnits="userSpaceOnUse"
//               patternTransform="rotate(45)"
//             >
//               <rect width="80" height="80" fill="none" />
//               <path
//                 d="M 0 0 L 0 80 M 80 0 L 80 80"
//                 stroke="rgba(184, 134, 11, 0.2)"
//                 strokeWidth="1.5"
//               />
//               <path
//                 d="M 0 0 L 80 0 M 0 80 L 80 80"
//                 stroke="rgba(184, 134, 11, 0.2)"
//                 strokeWidth="1.5"
//               />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#grid-pattern)" />
//         </svg>
//       </div>

//       {/* Abstract geometric shapes (replaced particles) */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(50)].map((_, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, scale: 0 }}
//             animate={{
//               opacity: [0, 0.3, 0],
//               scale: [0, 1, 0],
//               rotate: [0, 360],
//             }}
//             transition={{
//               duration: 20 + Math.random() * 20,
//               repeat: Infinity,
//               repeatDelay: Math.random() * 10,
//               ease: "easeInOut",
//             }}
//             className={`absolute ${
//               i % 3 === 0
//                 ? "bg-gold-500"
//                 : i % 2 === 0
//                 ? "bg-black"
//                 : "bg-gold-600"
//             }`}
//             style={{
//               width: `${20 + Math.random() * 40}px`,
//               height: `${20 + Math.random() * 40}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               clipPath:
//                 i % 3 === 0
//                   ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
//                   : i % 2 === 0
//                   ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
//                   : "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
//               borderRadius: i % 4 === 0 ? "50%" : "0",
//             }}
//           />
//         ))}
//       </div>

//       {/* Hero content */}
//       <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//         <div className="space-y-8">
//           <motion.h1
//             initial="hidden"
//             animate={controls}
//             variants={textVariants}
//             className="text-4xl md:text-6xl font-serif font-bold text-gray-800 leading-tight"
//           >
//             {title.map((word, wordIndex) => (
//               <motion.span
//                 key={wordIndex}
//                 className="inline-block mr-2"
//                 variants={textVariants}
//               >
//                 {wordIndex === 1 ? (
//                   <motion.span className="relative inline-block">
//                     {word.split("").map((letter, letterIndex) => (
//                       <motion.span
//                         key={letterIndex}
//                         className="text-amber-700 inline-block"
//                         variants={letterVariants}
//                         custom={letterIndex}
//                         whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
//                         transition={{ duration: 0.5 }}
//                       >
//                         {letter}
//                       </motion.span>
//                     ))}
//                     <motion.span
//                       className="absolute bottom-0 left-0 h-1 bg-amber-700 w-full"
//                       initial={{ scaleX: 0 }}
//                       animate={{ scaleX: 1 }}
//                       transition={{
//                         delay: word.length * 0.05 + 0.3,
//                         duration: 0.5,
//                       }}
//                     />
//                   </motion.span>
//                 ) : (
//                   word
//                 )}
//                 {wordIndex < title.length - 1 ? " " : ""}
//               </motion.span>
//             ))}
//           </motion.h1>

//           <motion.p
//             initial="hidden"
//             animate={controls}
//             variants={textVariants}
//             transition={{ delay: 0.4 }}
//             className="text-lg md:text-xl text-gray-700 max-w-lg"
//           >
//             Discover our exquisite collection of burkas and Islamic clothing,
//             where tradition meets contemporary design.
//           </motion.p>

//           <motion.div
//             initial="hidden"
//             animate={controls}
//             variants={textVariants}
//             transition={{ delay: 0.6 }}
//             className="flex flex-col sm:flex-row gap-4"
//           >
//             <motion.button
//               whileHover={{
//                 scale: 1.05,
//                 boxShadow: "0 10px 25px -5px rgba(180, 83, 9, 0.4)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               className="relative overflow-hidden bg-gray-900 text-amber-50 px-8 py-4 rounded-full font-medium shadow-lg group"
//             >
//               <span className="relative z-10 flex items-center">
//                 Shop Now
//                 <motion.span
//                   className="ml-2"
//                   animate={{
//                     x: [0, 5, 0],
//                   }}
//                   transition={{
//                     duration: 2,
//                     repeat: Infinity,
//                   }}
//                 >
//                   →
//                 </motion.span>
//               </span>
//               <motion.div
//                 initial={{ scaleX: 0, originX: 0 }}
//                 whileHover={{ scaleX: 1, originX: 0 }}
//                 className="absolute inset-0 bg-gradient-to-r from-amber-700/20 via-amber-700/40 to-transparent z-0"
//                 transition={{ duration: 0.4 }}
//               />
//             </motion.button>

//             <motion.button
//               whileHover={{
//                 scale: 1.05,
//                 backgroundColor: "rgba(255, 255, 255, 0.8)",
//               }}
//               whileTap={{ scale: 0.95 }}
//               className="relative overflow-hidden border border-gray-300 px-8 py-4 rounded-full bg-white/50 font-medium group text-gray-800"
//             >
//               <span className="relative z-10 flex items-center">
//                 Explore
//                 <motion.span
//                   className="ml-2"
//                   animate={{
//                     rotate: [0, 360],
//                     transition: {
//                       duration: 4,
//                       repeat: Infinity,
//                       ease: "linear",
//                     },
//                   }}
//                 >
//                   ↻
//                 </motion.span>
//               </span>
//               <motion.div
//                 initial={{ scaleX: 0, originX: 0 }}
//                 whileHover={{ scaleX: 1, originX: 0 }}
//                 className="absolute inset-0 bg-gradient-to-r from-white/60 via-white/40 to-transparent z-0"
//                 transition={{ duration: 0.4 }}
//               />
//             </motion.button>
//           </motion.div>
//         </div>

//         {/* Futuristic Image Slider with Text */}
//         <div className="relative h-96 lg:h-[32rem] w-full">
//           {/* Main Slider with 3D Perspective */}
//           <div className="relative h-full w-full perspective-1000">
//             <AnimatePresence custom={currentSlide}>
//               <motion.div
//                 key={currentSlide}
//                 custom={1}
//                 initial={{ opacity: 0, x: 100, rotateY: 20 }}
//                 animate={{
//                   opacity: 1,
//                   x: 0,
//                   rotateY: 0,
//                   transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
//                 }}
//                 exit={{
//                   opacity: 0,
//                   x: -100,
//                   rotateY: -20,
//                   transition: { duration: 0.6 },
//                 }}
//                 className="absolute inset-0 h-full w-full"
//               >
//                 <motion.div
//                   className="h-full w-full rounded-[1.5rem] overflow-hidden relative"
//                   style={{
//                     transformStyle: "preserve-3d",
//                     boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.3)",
//                   }}
//                   whileHover={{
//                     scale: 1.01,
//                     boxShadow: "0 40px 70px -10px rgba(0, 0, 0, 0.4)",
//                   }}
//                 >
//                   {/* Main Image with Dynamic Lighting Effect */}
//                   <motion.div
//                     className="absolute inset-0 overflow-hidden"
//                     initial={{ scale: 1.1 }}
//                     animate={{
//                       scale: 1,
//                       transition: {
//                         duration: 12,
//                         repeat: Infinity,
//                         repeatType: "reverse",
//                       },
//                     }}
//                   >
//                     <img
//                       src={slides[currentSlide].image}
//                       alt={slides[currentSlide].alt}
//                       className="w-full h-full object-cover object-center"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/40" />
//                   </motion.div>

//                   {/* Animated Text Overlay */}
//                   <motion.div
//                     className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
//                     initial={{ opacity: 0, y: 50 }}
//                     animate={{
//                       opacity: 1,
//                       y: 0,
//                       transition: { delay: 0.4, duration: 0.6 },
//                     }}
//                     exit={{
//                       opacity: 0,
//                       y: 50,
//                       transition: { duration: 0.3 },
//                     }}
//                   >
//                     <motion.h3
//                       className="text-2xl font-bold text-amber-50 mb-2"
//                       initial={{ opacity: 0 }}
//                       animate={{
//                         opacity: 1,
//                         transition: { delay: 0.6, duration: 0.4 },
//                       }}
//                     >
//                       {slides[currentSlide].title || "New Collection"}
//                     </motion.h3>
//                     <motion.p
//                       className="text-amber-100 max-w-md"
//                       initial={{ opacity: 0 }}
//                       animate={{
//                         opacity: 1,
//                         transition: { delay: 0.8, duration: 0.4 },
//                       }}
//                     >
//                       {slides[currentSlide].description ||
//                         "Discover our premium modest wear collection"}
//                     </motion.p>

//                     {/* Slide-specific CTA */}
//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       animate={{
//                         opacity: 1,
//                         transition: { delay: 1.0, duration: 0.4 },
//                       }}
//                       className="mt-4"
//                     >
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="px-6 py-2 bg-amber-600 text-gray-900 rounded-full text-sm font-medium"
//                       >
//                         View Collection
//                       </motion.button>
//                     </motion.div>
//                   </motion.div>

//                   {/* Floating Light Effect */}
//                   <div className="absolute inset-0 pointer-events-none">
//                     <motion.div
//                       className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-amber-600 blur-xl"
//                       animate={{
//                         scale: [1, 1.5, 1],
//                         opacity: [0.3, 0.5, 0.3],
//                       }}
//                       transition={{
//                         duration: 8,
//                         repeat: Infinity,
//                         repeatType: "reverse",
//                       }}
//                     />
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Modern Dots Navigation - Moved Above Text */}
//             <div className="absolute p-2 bottom-0 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
//               {slides.map((_, index) => (
//                 <motion.button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   className={`w-3 h-3 rounded-full ${
//                     currentSlide === index ? "bg-amber-600" : "bg-white/30"
//                   }`}
//                   whileHover={{ scale: 1.3 }}
//                   whileTap={{ scale: 0.9 }}
//                   animate={{
//                     width: currentSlide === index ? 24 : 12,
//                     backgroundColor:
//                       currentSlide === index
//                         ? "#D97706"
//                         : "rgba(255,255,255,0.3)",
//                   }}
//                   transition={{ type: "spring", stiffness: 300, damping: 20 }}
//                 />
//               ))}
//             </div>

//             {/* Navigation Arrows */}
//             <motion.button
//               onClick={() =>
//                 setCurrentSlide(
//                   (prev) => (prev - 1 + slides.length) % slides.length
//                 )
//               }
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center z-20"
//               whileHover={{ backgroundColor: "rgba(0,0,0,0.5)", scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <motion.svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="white"
//                 strokeWidth="2"
//                 animate={{ x: [-2, 0, -2] }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//               >
//                 <path d="M15 18l-6-6 6-6" />
//               </motion.svg>
//             </motion.button>

//             <motion.button
//               onClick={() =>
//                 setCurrentSlide((prev) => (prev + 1) % slides.length)
//               }
//               className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center z-20"
//               whileHover={{ backgroundColor: "rgba(0,0,0,0.5)", scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <motion.svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="white"
//                 strokeWidth="2"
//                 animate={{ x: [2, 0, 2] }}
//                 transition={{ duration: 1.5, repeat: Infinity }}
//               >
//                 <path d="M9 18l6-6-6-6" />
//               </motion.svg>
//             </motion.button>
//           </div>

//           {/* Floating Label - Moved to Top Left */}
//           <motion.div
//             className="absolute top-6 left-6 bg-black/50 backdrop-blur-md text-amber-50 px-4 py-2 rounded-full text-sm font-medium z-20"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//           >
//             {currentSlide + 1} / {slides.length}
//           </motion.div>
//         </div>
//       </div>

//       {/* Animated scroll indicator */}
//       <motion.div
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer flex flex-col items-center z-10"
//         onClick={() =>
//           window.scrollBy({ top: window.innerHeight - 100, behavior: "smooth" })
//         }
//         whileHover={{ scale: 1.1 }}
//       >
//         <motion.div
//           animate={{
//             y: [0, 15, 0],
//             opacity: [0.6, 1, 0.6],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             repeatType: "loop",
//           }}
//           className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center items-start"
//         >
//           <div className="w-1 h-3 bg-gray-500 rounded-full mt-2" />
//         </motion.div>
//         <motion.p
//           animate={{
//             y: [0, 5, 0],
//             opacity: [0.8, 1, 0.8],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             repeatType: "loop",
//             delay: 0.5,
//           }}
//           className="text-sm text-gray-700 mt-2 flex items-center"
//         >
//           Scroll <motion.span className="ml-1">↓</motion.span>
//         </motion.p>
//       </motion.div>
//     </div>
//   );
// };

// export default HeroSection;
