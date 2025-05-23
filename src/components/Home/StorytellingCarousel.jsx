import { useState, useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const StorytellingCarousel = () => {
  const [activeStory, setActiveStory] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef(null);
  const { scrollXProgress } = useScroll({
    container: carouselRef,
  });

  const x = useTransform(scrollXProgress, [0, 1], ["0%", "-80%"]);

  const stories = [
    {
      id: 1,
      title: "Morning Elegance",
      subtitle: "Starting the day with grace",
      description:
        "Our lightweight chiffon burka is perfect for morning routines, offering comfort without compromising on style.",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      scene: "morning",
      color: "from-amber-50 to-amber-100",
      accent: "bg-amber-600",
      overlay:
        "bg-gradient-to-b from-amber-500/10 via-transparent to-amber-900/20",
    },
    {
      id: 2,
      title: "Urban Sophistication",
      subtitle: "Navigating the city in style",
      description:
        "The structured silhouette of our metropolitan collection provides both coverage and contemporary flair.",
      image:
        "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      scene: "city",
      color: "from-stone-50 to-stone-100",
      accent: "bg-stone-700",
      overlay:
        "bg-gradient-to-b from-stone-600/10 via-transparent to-stone-900/20",
    },
    {
      id: 3,
      title: "Evening Radiance",
      subtitle: "Gathering under the moonlight",
      description:
        "Embellished with delicate embroidery, our evening collection transforms modest wear into luxury.",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      scene: "evening",
      color: "from-indigo-50 to-indigo-100",
      accent: "bg-indigo-900",
      overlay:
        "bg-gradient-to-b from-indigo-500/10 via-transparent to-indigo-900/20",
    },
    {
      id: 4,
      title: "Weekend Serenity",
      subtitle: "Moments of quiet reflection",
      description:
        "Soft, flowing fabrics in our weekend collection provide the perfect balance of comfort and modesty.",
      image:
        "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      scene: "weekend",
      color: "from-teal-50 to-teal-100",
      accent: "bg-teal-800",
      overlay:
        "bg-gradient-to-b from-teal-500/10 via-transparent to-teal-900/20",
    },
    {
      id: 5,
      title: "Professional Poise",
      subtitle: "Confidence in the workplace",
      description:
        "Tailored cuts and premium fabrics make our professional line ideal for the modern working woman.",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
      scene: "work",
      color: "from-slate-50 to-slate-100",
      accent: "bg-slate-900",
      overlay:
        "bg-gradient-to-b from-slate-500/10 via-transparent to-slate-900/20",
    },
  ];

  const handleStoryChange = (index) => {
    setActiveStory(index);
    const container = carouselRef.current;
    const storyWidth = container.scrollWidth / stories.length;
    container.scrollTo({
      left: index * storyWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return;

      const container = carouselRef.current;
      const scrollPosition = container.scrollLeft;
      const storyWidth = container.scrollWidth / stories.length;
      const newActiveStory = Math.round(scrollPosition / storyWidth);

      if (newActiveStory !== activeStory) {
        setActiveStory(newActiveStory);
      }
    };

    const container = carouselRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeStory, isDragging, stories.length]);

  return (
    <section className="relative py-20 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      {/* Premium header with animated gold accent */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <div className="relative inline-block">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 text-center"
            >
              Modern Modesty in Motion
            </motion.h2>
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-amber-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl text-center"
          >
            A day in the life with our collections - where tradition meets
            contemporary design
          </motion.p>
        </div>
      </div>

      {/* Luxury progress indicator */}
      <div className="relative h-2 bg-gray-100 mx-6 mb-12 max-w-6xl mx-auto rounded-full overflow-hidden">
        <motion.div
          className={`absolute top-0 left-0 h-full bg-gradient-to-r from-amber-500 to-amber-700`}
          initial={{ width: 0 }}
          animate={{
            width: `${100 / stories.length}%`,
            x: `${activeStory * (100 / stories.length)}%`,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Premium horizontal carousel */}
      <div className="relative h-[85vh] min-h-[600px]">
        {/* Floating navigation dots - luxury version */}
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 z-20 hidden md:flex flex-col gap-6">
          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => handleStoryChange(index)}
              className="relative group flex items-center justify-center"
              aria-label={`Go to ${story.title}`}
            >
              <motion.div
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStory === index
                    ? story.accent + " scale-150"
                    : "bg-gray-300"
                }`}
                whileHover={{ scale: 1.5 }}
              />
              <motion.span
                className="absolute right-full mr-4 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 whitespace-nowrap"
                initial={{ x: -10 }}
                animate={{ x: activeStory === index ? -10 : 0 }}
              >
                {story.scene}
              </motion.span>
            </button>
          ))}
        </div>

        {/* Magazine strip carousel with enhanced interactions */}
        <motion.div
          ref={carouselRef}
          className="flex h-full overflow-x-auto snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: "x mandatory" }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          {stories.map((story, index) => (
            <div
              key={story.id}
              className="flex-shrink-0 w-full h-full relative snap-center"
              style={{ width: "100vw" }}
            >
              {/* Animated background gradient */}
              <AnimatePresence>
                {activeStory === index && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${story.color} opacity-90`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                )}
              </AnimatePresence>

              {/* Luxury content container */}
              <div className="container mx-auto h-full flex flex-col md:flex-row items-center px-6 relative z-10">
                {/* Text content with enhanced animations */}
                <motion.div
                  className="md:w-1/2 pr-0 md:pr-12 mb-10 md:mb-0"
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.span
                    className={`inline-block px-4 py-1.5 text-xs font-medium mb-6 text-white rounded-full ${story.accent} shadow-md`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    {story.scene.toUpperCase()}
                  </motion.span>
                  <motion.h3
                    className="text-4xl md:text-6xl font-serif font-bold text-gray-900 mb-4 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    {story.title.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        className="inline-block mr-2"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.h3>
                  <motion.h4
                    className="text-xl md:text-2xl font-medium text-gray-700 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.span
                      className="inline-block"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {story.subtitle}
                    </motion.span>
                  </motion.h4>
                  <motion.p
                    className="text-gray-600 mb-8 max-w-md text-lg"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                  >
                    {story.description}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9 }}
                  >
                    <motion.button
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.2)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-8 py-4 rounded-full text-white font-medium ${story.accent} shadow-lg relative overflow-hidden group`}
                    >
                      <span className="relative z-10 flex items-center">
                        Explore the {story.scene} collection
                        <motion.span
                          className="ml-3"
                          animate={{
                            x: [0, 5, 0],
                            transition: {
                              duration: 2,
                              repeat: Infinity,
                            },
                          }}
                        >
                          →
                        </motion.span>
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.8 }}
                      />
                    </motion.button>
                  </motion.div>
                </motion.div>

                {/* Image content with luxury effects */}
                <motion.div
                  className="md:w-1/2 h-2/3 md:h-full relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl border-2 border-white/20">
                    {/* Main image with parallax effect */}
                    <motion.img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover object-center"
                      initial={{ scale: 1.1 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 1.2 }}
                    />

                    {/* Luxury overlay effects */}
                    <div className={`absolute inset-0 ${story.overlay}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10" />

                    {/* Floating embellishments */}
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-amber-400/20 blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />

                    {/* Magazine-style caption with animation */}
                    <motion.div
                      className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full text-sm font-medium shadow-sm flex items-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.span
                        className={`mr-3 inline-block w-3 h-3 rounded-full ${story.accent}`}
                        animate={{
                          scale: [1, 1.2, 1],
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                          },
                        }}
                      />
                      <span className="mr-2">{story.scene} look</span>
                      <motion.span
                        animate={{
                          rotate: [0, 360],
                          transition: {
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                          },
                        }}
                      >
                        ✨
                      </motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Luxury page indicator */}
      <div className="container mx-auto px-6 mt-12 flex justify-center">
        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-full p-2 shadow-lg border border-gray-100">
          {stories.map((story, index) => (
            <button
              key={index}
              onClick={() => handleStoryChange(index)}
              className={`relative rounded-full p-1 group`}
              aria-label={`Go to ${story.scene}`}
            >
              <motion.div
                className={`w-3 h-3 rounded-full ${
                  activeStory === index ? story.accent : "bg-gray-300"
                }`}
                whileHover={{ scale: 1.5 }}
              />
              <motion.div
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 whitespace-nowrap"
                initial={{ y: 5 }}
              >
                {story.scene}
                <div className="absolute top-full left-1/2 w-2 h-2 bg-gray-800 transform -translate-x-1/2 -translate-y-1/2 rotate-45" />
              </motion.div>
            </button>
          ))}
        </div>
      </div>

      {/* Luxury decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        {/* Floating gold particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-amber-500/30 rounded-full"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 15,
              repeat: Infinity,
              repeatDelay: Math.random() * 5,
              ease: "easeInOut",
            }}
            style={{
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Magazine page curl effect - enhanced */}
        <motion.div
          className="absolute top-0 right-0 w-48 h-48"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="absolute top-0 right-0 w-full h-full border-t-[1px] border-r-[1px] border-gray-200" />
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-transparent via-transparent to-gray-100/50" />
          <motion.div
            className="absolute top-8 right-8 w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full shadow-md"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default StorytellingCarousel;
