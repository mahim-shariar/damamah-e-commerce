// import { motion, useAnimation, AnimatePresence } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import { useInView } from "react-intersection-observer";
// import { FiSearch, FiX, FiChevronRight } from "react-icons/fi";

// const HeroSection = () => {
//   const controls = useAnimation();
//   const [ref, inView] = useInView({ threshold: 0.1 });
//   const containerRef = useRef(null);
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const searchInputRef = useRef(null);

//   const products = [
//     {
//       id: 1,
//       image:
//         "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
//       alt: "Elegant black abaya with gold embroidery",
//       title: "Signature Abaya",
//       price: "$149",
//       size: "large",
//     },
//     {
//       id: 2,
//       image:
//         "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
//       alt: "Luxurious silk hijab in emerald green",
//       title: "Silk Hijab",
//       price: "$79",
//       size: "medium",
//     },
//     {
//       id: 3,
//       image:
//         "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
//       alt: "Modern modest evening gown",
//       title: "Evening Gown",
//       price: "$199",
//       size: "medium",
//     },
//     {
//       id: 4,
//       image:
//         "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
//       alt: "Casual modest summer dress",
//       title: "Summer Dress",
//       price: "$89",
//       size: "medium",
//     },
//     {
//       id: 5,
//       image:
//         "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
//       alt: "Traditional Islamic attire",
//       title: "Classic Collection",
//       price: "$129",
//       size: "medium",
//     },
//     {
//       id: 6,
//       image:
//         "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
//       alt: "Traditional Islamic attire",
//       title: "Classic Collection",
//       price: "$129",
//       size: "medium",
//     },
//     {
//       id: 7,
//       image:
//         "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
//       alt: "Elegant black abaya with gold embroidery",
//       title: "Signature Abaya",
//       price: "$149",
//       size: "large",
//     },
//     {
//       id: 8,
//       image:
//         "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
//       alt: "Luxurious silk hijab in emerald green",
//       title: "Silk Hijab",
//       price: "$79",
//       size: "medium",
//     },
//     {
//       id: 9,
//       image:
//         "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
//       alt: "Modern modest evening gown",
//       title: "Evening Gown",
//       price: "$199",
//       size: "medium",
//     },
//   ];

//   const gridProducts = [...products].map((product, index) => ({
//     ...product,
//     key: `${product.id}-${index}`,
//   }));

//   const suggestions = [
//     { id: 1, name: "Silk Abaya Collection", category: "Abayas" },
//     { id: 2, name: "Embroidered Hijabs", category: "Hijabs" },
//     { id: 3, name: "Evening Gowns", category: "Dresses" },
//     { id: 4, name: "Casual Summer Dresses", category: "Dresses" },
//   ];

//   const filteredSuggestions = searchQuery
//     ? suggestions.filter((item) =>
//         item.name.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : suggestions;

//   useEffect(() => {
//     if (inView) {
//       controls.start({
//         y: ["0%", "-90%"],
//         transition: {
//           y: {
//             duration: 50,
//             repeat: Infinity,
//             ease: "linear",
//           },
//         },
//       });
//     } else {
//       controls.stop();
//     }
//   }, [controls, inView]);

//   useEffect(() => {
//     if (isSearchFocused) {
//       searchInputRef.current?.focus();
//     }
//   }, [isSearchFocused]);

//   const getGridClass = (size) => {
//     switch (size) {
//       case "large":
//         return "md:col-span-2 md:row-span-2";
//       case "medium":
//         return "md:col-span-1 md:row-span-1";
//       default:
//         return "md:col-span-1 md:row-span-1";
//     }
//   };

//   return (
//     <div
//       ref={ref}
//       className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
//       style={{ height: "80vh", minHeight: "600px" }}
//     >
//       {/* Background texture */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0xMCAwdjIwTTAgMTBoMjAiIHN0cm9rZT0icmdiYSgxODQsMTM0LDExLDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"></div>
//       </div>

//       {/* Scrolling grid container with blur effect */}
//       <motion.div
//         animate={{
//           filter: isSearchFocused ? "blur(8px)" : "blur(0px)",
//           opacity: isSearchFocused ? 0.7 : 1,
//         }}
//         className="absolute inset-0"
//       >
//         <div className="absolute inset-0 overflow-hidden">
//           <motion.div ref={containerRef} className="w-full" animate={controls}>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 h-full auto-rows-min">
//               {gridProducts.map((product) => (
//                 <div
//                   key={product.key}
//                   className={`relative rounded-xl overflow-hidden shadow-lg ${getGridClass(
//                     product.size
//                   )}`}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-10" />
//                   <img
//                     src={product.image}
//                     alt={product.alt}
//                     className="w-full h-full object-cover"
//                   />
//                   <div className="absolute p-6 w-full bottom-0 left-0 bg-black/35 z-20 text-white">
//                     <h3 className="text-3xl font-bold">{product.title}</h3>
//                     <p className="text-4xl">{product.price}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Overlay for better text visibility */}
//       <div className="absolute inset-0 bg-black/10 z-15 pointer-events-none" />

//       {/* Centered headline and CTA */}
//       <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
//         {/* Search bar positioned above the heading */}
//         <motion.div
//           className="w-full max-w-md mb-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//         >
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search collections..."
//               className="w-full bg-white/50 backdrop-blur-sm text-gray-800 py-4 px-6 pr-12 rounded-full border border-white/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
//               onClick={() => setIsSearchFocused(true)}
//             />
//             <FiSearch
//               className="absolute right-6 top-1/2 transform -translate-y-1/2 text-amber-600"
//               size={24}
//             />
//           </div>
//         </motion.div>

//         <motion.h1
//           className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.8 }}
//         >
//           <span className="block">Damamah</span>
//           <span className="text-amber-300">Collections</span>
//         </motion.h1>
//         <motion.button
//           className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium text-lg shadow-xl"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1 }}
//         >
//           View Collection
//           <motion.span
//             className="ml-2 inline-block"
//             animate={{ x: [0, 5, 0] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             →
//           </motion.span>
//         </motion.button>
//       </div>

//       {/* Search overlay */}
//       <AnimatePresence>
//         {isSearchFocused && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
//             onClick={() => setIsSearchFocused(false)}
//           >
//             <motion.div
//               initial={{ y: -50, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               exit={{ y: -50, opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {/* Search input */}
//               <div className="relative p-4 border-b border-amber-100">
//                 <div className="flex items-center">
//                   <FiSearch className="text-amber-600 mr-3" size={24} />
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search our collections..."
//                     className="flex-1 text-amber-900 text-lg focus:outline-none placeholder-amber-400"
//                   />
//                   <button
//                     onClick={() => setIsSearchFocused(false)}
//                     className="ml-3 text-amber-600 hover:text-amber-800"
//                   >
//                     <FiX size={24} />
//                   </button>
//                 </div>
//               </div>

//               {/* Search suggestions */}
//               <div className="max-h-[60vh] overflow-y-auto">
//                 {filteredSuggestions.length > 0 ? (
//                   <ul>
//                     {filteredSuggestions.map((item) => (
//                       <motion.li
//                         key={item.id}
//                         whileHover={{ backgroundColor: "#FEF3C7" }}
//                         className="border-b border-amber-50 last:border-b-0"
//                       >
//                         <a
//                           href="#"
//                           className="flex items-center justify-between p-4 text-amber-900 hover:text-amber-700 transition-colors"
//                         >
//                           <div>
//                             <h3 className="font-medium">{item.name}</h3>
//                             <p className="text-sm text-amber-600">
//                               {item.category}
//                             </p>
//                           </div>
//                           <FiChevronRight className="text-amber-500" />
//                         </a>
//                       </motion.li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <div className="p-8 text-center text-amber-800">
//                     <p>No results found for "{searchQuery}"</p>
//                     <p className="text-sm mt-2 text-amber-600">
//                       Try different keywords
//                     </p>
//                   </div>
//                 )}
//               </div>

//               {/* Popular searches */}
//               <div className="p-4 bg-amber-50">
//                 <h4 className="text-sm font-medium text-amber-800 mb-2">
//                   Popular Searches
//                 </h4>
//                 <div className="flex flex-wrap gap-2">
//                   {["Abayas", "Hijabs", "Dresses", "New Arrivals"].map(
//                     (term) => (
//                       <motion.button
//                         key={term}
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => setSearchQuery(term)}
//                         className="px-3 py-1.5 bg-white text-amber-800 text-sm rounded-full border border-amber-200 hover:border-amber-300"
//                       >
//                         {term}
//                       </motion.button>
//                     )
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default HeroSection;
