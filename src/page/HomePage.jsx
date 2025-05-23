import React from "react";
import HeroSection from "../components/Home/HeroSection";
import NextGenCategories from "../components/Home/NextGenCategories";
import FeaturedProducts from "../components/Home/FeaturedProducts";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <NextGenCategories />
      <FeaturedProducts />
    </>
  );
};

export default HomePage;
