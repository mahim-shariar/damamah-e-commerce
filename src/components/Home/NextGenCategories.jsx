import { motion } from "framer-motion";
import { useState } from "react";

const NextGenCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Abayas",
      description: "Elegant traditional & contemporary designs",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      color: "from-amber-700/20 to-amber-900/10",
    },
    {
      id: 2,
      name: "Hijabs",
      description: "Premium fabrics for every occasion",
      image:
        "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      color: "from-gray-800/20 to-gray-900/10",
    },
    {
      id: 3,
      name: "Evening Wear",
      description: "Modest luxury for special occasions",
      image:
        "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      color: "from-amber-600/20 to-amber-800/10",
    },
    {
      id: 4,
      name: "Accessories",
      description: "Complete your modest look",
      image:
        "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      color: "from-gray-700/20 to-gray-800/10",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-amber-300/20 rounded-full"
            initial={{
              scale: 0,
              opacity: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            animate={{
              scale: [0, 1 + Math.random(), 0],
              opacity: [0, 0.3, 0],
              rotate: Math.random() > 0.5 ? [0, 180] : [0, -180],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
              ease: "easeInOut",
            }}
            style={{
              width: `${50 + Math.random() * 100}px`,
              height: `${50 + Math.random() * 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore Our <span className="text-amber-600">Collections</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Curated categories to elevate your modest wardrobe
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="relative group overflow-hidden rounded-2xl shadow-xl h-80"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Image with slight scale */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: 1.05,
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-b ${category.color}`}
                />
              </motion.div>

              {/* Content always visible in "hover" state */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                <motion.h3
                  className="text-2xl font-bold text-white mb-2"
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                >
                  {category.name}
                </motion.h3>
                <motion.p
                  className="text-amber-100"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {category.description}
                </motion.p>
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium text-sm hover:bg-amber-50 transition-colors">
                    Shop Now
                  </button>
                </motion.div>
              </div>

              {/* Overlay effect */}
              <motion.div
                className="absolute inset-0 bg-black/20"
                animate={{ opacity: 0.7 }}
              />

              {/* Border animation */}
              <motion.div
                className="absolute inset-0 border-2 border-white/30 rounded-2xl pointer-events-none"
                animate={{
                  opacity: 1,
                  scale: 0.95,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <button className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all">
            View All Categories
            <motion.span
              className="ml-2 inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default NextGenCategories;
