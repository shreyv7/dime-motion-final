import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Reels from "@/components/Reels";
// import Services from "@/components/Services"; // TEMPORARILY DISABLED - Services page hidden from live website
import HowItWorks from "@/components/HowItWorks";
// import Portfolio from "@/components/Portfolio"; // TEMPORARILY DISABLED - Portfolio page hidden from live website
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FaqBot from "@/components/FaqBot";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <div id="hero" className="overflow-x-hidden">
        <Hero />
      </div>
      <div id="about" className="overflow-x-hidden">
        <About />
      </div>
      <div id="reels" className="overflow-x-hidden">
        <Reels />
      </div>
      {/* <div id="services">
        <Services />
      </div> */}
      <div id="how-it-works" className="overflow-x-hidden">
        <HowItWorks />
      </div>
      {/* <div id="portfolio">
        <Portfolio />
      </div> */}
      <div id="testimonials" className="overflow-x-hidden">
        <Testimonials />
      </div>
      <div id="contact" className="overflow-x-hidden">
        <Contact />
      </div>
      <Footer />
      <FaqBot />
    </main>
  );
};

export default Index;
