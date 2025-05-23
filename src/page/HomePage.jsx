import React from "react";
import HeroSection from "../components/Home/HeroSection";
import NextGenCategories from "../components/Home/NextGenCategories";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import StorytellingCarousel from "../components/Home/StorytellingCarousel";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      {/* <StorytellingCarousel /> */}
      <NextGenCategories />
      <FeaturedProducts />
    </>
  );
};

export default HomePage;
