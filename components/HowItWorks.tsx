import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HowItWorks = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const steps = [
    {
      title: "Initial Consultation",
      description: "We start with a comprehensive discussion about your vision, goals, and requirements to understand exactly what you need."
    },
    {
      title: "Strategy Development",
      description: "Our team creates a detailed plan and strategy tailored to your specific project, ensuring every detail is considered."
    },
    {
      title: "Creative Execution",
      description: "We bring your vision to life with cutting-edge technology and creative expertise, delivering high-quality results."
    },
    {
      title: "Review & Refinement",
      description: "We collaborate with you through multiple review cycles to ensure the final product exceeds your expectations."
    },
    {
      title: "Launch & Support",
      description: "We help you launch successfully and provide ongoing support to ensure continued success and growth."
    }
  ];

  const addCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  }, []);

  // Register ScrollTrigger plugin inside useEffect to avoid SSR issues
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    // Wait for all cards to be rendered
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    // Ensure we have valid cards before proceeding
    if (cards.length !== steps.length) {
      console.warn('HowItWorks: Card count mismatch, waiting for all cards to render');
      return;
    }

    // Set initial positions for all cards
    cards.forEach((card) => {
      if (card) {
        gsap.set(card, {
          x: "100vw", // Start off-screen to the right
          opacity: 0
        });
      }
    });

    // Create the pinned scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "center center",
        end: "+=800%", // Extend scroll distance to 3x
        pin: true, // Pin the section
        scrub: 2, // Smooth scrub duration
        onUpdate: (self) => {
          // Optional: Add any scroll progress logging here
        },
        onRefresh: () => {
          // Re-apply initial positions if ScrollTrigger refreshes
          cards.forEach((card) => {
            if (card) {
              gsap.set(card, {
                x: "100vw",
                opacity: 0
              });
            }
          });
        }
      }
    });

    timelineRef.current = tl;

    // Animate each card one by one
    cards.forEach((card, index) => {
      if (card) {
        // Card enters from right
        tl.to(card, {
          x: "0vw", // Move to center
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }, index * 0.6);

        // Card stays in center
        tl.to(card, {
          x: "0vw",
          opacity: 1,
          duration: 0.6
        }, index * 0.6 + 0.6);

        // Card exits to left
        tl.to(card, {
          x: "-100vw", // Move off-screen to the left
          opacity: 0,
          duration: 0.6,
          ease: "power2.in"
        }, index * 0.6 + 1.2);
      }
    });

    // Cleanup function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [steps.length]);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 text-glow">
            <span className="text-black">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our streamlined process ensures your project is delivered with precision and excellence
          </p>
        </div>

        <div ref={containerRef} className="relative h-96 flex items-center justify-center">
          {steps.map((step, index) => (
            <div
              key={index}
              ref={(el) => addCardRef(el, index)}
              className="card-glass rounded-2xl p-8 hover-lift group cursor-pointer absolute w-full max-w-2xl"
            >
              <div className="mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                  <span className="text-3xl font-bold text-black">{index + 1}</span>
                </div>
              </div>
              
              <h3 className="font-heading text-2xl font-bold mb-4 text-black group-hover:text-gray-700 transition-colors duration-300">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;