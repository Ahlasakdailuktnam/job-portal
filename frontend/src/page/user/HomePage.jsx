import Footer from "../../components/Footer";
import FeaturedJobs from "../../components/Home/FeaturedJobs";
import HeroSection from "../../components/Home/HeroSection";
import PopularCategories from "../../components/Home/PopularCategories";
import TrustedCompanies from "../../components/Home/TrustedCompanies";
import WhyChooseUs from "../../components/Home/WhyChooseUs";
import Navbar from "../../components/Navbar";

const HomePage = () => {
  return (
    <main className="relative w-full">
      
      <HeroSection />
      <WhyChooseUs/>
      <PopularCategories/>
      <FeaturedJobs/>
      <TrustedCompanies />
    </main>
  );
};

export default HomePage;