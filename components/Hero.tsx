import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import testimonial1 from "@/assets/1.png";
import testimonial2 from "@/assets/2.jpeg";
import testimonial3 from "@/assets/3.jpeg";
import testimonial4 from "@/assets/4.jpeg";
import testimonial5 from "@/assets/5.jpeg";

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/45" />
      


      {/* Testimonial Strip - fixed to the bottom grey band */}
      <div className="absolute bottom-0 left-0 right-0 bg-gray-100 py-6 overflow-hidden w-full testimonial-strip">
        {/* Left fade gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-100 via-gray-100/80 to-transparent z-10 pointer-events-none"></div>
        
        {/* Right fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-100 via-gray-100/80 to-transparent z-10 pointer-events-none"></div>
        
        <div className="w-full overflow-hidden relative">
          {/* Duplicate the track to create a seamless loop without gaps */}
          <div className="flex animate-marquee-seamless" style={{ width: 'max-content', maxWidth: 'none' }}>
            <div className="flex items-center gap-8">
              {[
                { image: testimonial1, text: '"Amazing service, highly recommend!"' },
                { image: testimonial2, text: '"They transformed our brand beautifully."' },
                { image: testimonial3, text: '"Professional, creative, and fast!"' },
                { image: testimonial4, text: '"Great team to work with."' },
                { image: testimonial5, text: '"Exceeded all our expectations!"' },
              ].map((t, idx) => (
                <div key={`a-${idx}`} className="flex items-center gap-4 bg-[hsl(var(--card))] border border-[hsl(var(--border)/0.3)] rounded-md px-4 py-3 shadow-[var(--shadow-subtle)] flex-shrink-0 max-w-xl">
                  <img src={t.image} alt="Client" className="h-20 w-20 rounded-full object-cover" loading="lazy" />
                  <p className="text-base text-black whitespace-normal break-words">{t.text}</p>
                </div>
              ))}
            </div>
            <div className="w-8"></div>
            <div className="flex items-center gap-8" aria-hidden>
              {[
                { image: testimonial1, text: '"Amazing service, highly recommend!"' },
                { image: testimonial2, text: '"They transformed our brand beautifully."' },
                { image: testimonial3, text: '"Professional, creative, and fast!"' },
                { image: testimonial4, text: '"Great team to work with."' },
                { image: testimonial5, text: '"Exceeded all our expectations!"' },
              ].map((t, idx) => (
                <div key={`b-${idx}`} className="flex items-center gap-4 bg-[hsl(var(--card))] border border-[hsl(var(--border)/0.3)] rounded-md px-4 py-3 shadow-[var(--shadow-subtle)] flex-shrink-0 max-w-xl">
                  <img src={t.image} alt="" className="h-20 w-20 rounded-full object-cover" loading="lazy" />
                  <p className="text-base text-black whitespace-normal break-words">{t.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6 -mt-20">
        <h1 className="font-heading text-6xl md:text-8xl font-black mb-6 text-glow">
        
          <br />
                      <span className="text-black font-articulateCFBold italic">
              <span className="text-[calc(1em-26px)]"> Forging Content That </span>
                           <span className="italic text-glow font-articulateCFBold relative text-primary text-[calc(1em-26px)]">
                Builds
              </span>
            </span>
            <br className="leading-[0.01]" />
            <span className="text-black font-articulateCFBold italic">
              <span className="text-[calc(1em-19px)]"> Brands and  </span>
                           <span className="italic text-glow font-articulateCFBold relative text-black text-[calc(1em-19px)]">
                Bank Accounts
              {/* Continuously popping dollar notes */}
              <DollarSign className="absolute -top-2 -right-6 w-6 h-6 text-primary animate-bounce opacity-0" style={{ animation: 'popDollar 2s infinite' }} />
              <DollarSign className="absolute -bottom-1 -right-8 w-7 h-7 text-accent animate-bounce opacity-0" style={{ animation: 'popDollar 2s infinite 0.5s' }} />
              <DollarSign className="absolute top-1 -right-12 w-5 h-5 text-primary animate-bounce opacity-0" style={{ animation: 'popDollar 2s infinite 1s' }} />
              <DollarSign className="absolute -top-4 -right-4 w-6 h-6 text-accent animate-bounce opacity-0" style={{ animation: 'popDollar 2s infinite 1.5s' }} />
            </span>
          </span> 
        </h1>

        <p className="text-black text-2xl md:text-2.5xl font-medium mb-8 max-w-4xl mx-auto leading-relaxed">
        Where creativity meets strategy — turning content into wealth.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection('contact')}
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover-glow px-12 py-6 text-xl font-semibold transition-all duration-300 scale-125"
          >
            Get in Touch
          </Button>
        </div>


      </div>




      
    </section>
  );
};

export default Hero;

