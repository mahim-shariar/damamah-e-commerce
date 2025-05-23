import FeaturedProducts from "./components/Home/FeaturedProducts";
import HeroSection from "./components/Home/HeroSection";
import NextGenCategories from "./components/Home/NextGenCategories";

import StorytellingCarousel from "./components/Home/StorytellingCarousel";
import NextGenNavbar from "./Shared/NextGenNavbar";

function App() {
  return (
    <div className="font-sans antialiased text-gray-900 relative overflow-x-hidden">
      {/* Custom cursor effect */}
      <div className="mb-20">
        <NextGenNavbar />
      </div>
      <HeroSection />
      {/* <StorytellingCarousel /> */}
      <NextGenCategories />
      <FeaturedProducts />

      {/* More sections would go here */}
    </div>
  );
}

export default App;
