import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Nate Leathers",
      feedback: "Their storytelling and polish are unmatched.",
      role: "Entrepreneur"
    },
    {
      name: "Erick Martinez",
      feedback: "Got great management skills.",
      role: "Creative Agency Founder"
    },
    {
      name: "Logan Corlette",
      feedback: "Great to work with them. They turn raw into e-motion",
      role: "Owner- Media Company"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section id="testimonials" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-glow">
            <span className="text-black">
              What Our Clients Say
            </span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card-glass rounded-2xl p-12 text-center relative overflow-hidden">
            {/* Background Quote Icon */}
            <div className="absolute top-8 left-8 opacity-10">
              <Quote className="w-24 h-24 text-black" />
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl text-black leading-relaxed mb-8 font-light italic">
                "{testimonials[currentIndex].feedback}"
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="font-heading text-xl font-bold text-black">
                    {testimonials[currentIndex].name.charAt(0)}
                  </span>
                </div>
                <div className="text-left">
                  <h4 className="font-heading text-xl font-bold text-black">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12">
              <Button
                variant="ghost"
                size="lg"
                onClick={goToPrevious}
                className="hover:bg-gray-100 hover:text-black"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-black' 
                        : 'bg-gray-300 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="lg"
                onClick={goToNext}
                className="hover:bg-gray-100 hover:text-black"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;