import { Video, Palette, Code, Sparkles, Zap, Lightbulb } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Video,
      title: "Video Editing",
      description: "Professional editing for ads, social media, and storytelling projects with cinematic precision."
    },
    {
      icon: Palette,
      title: "Color Grading",
      description: "Polished, mood-driven color grading that amplifies your brand's visual identity."
    },
    {
      icon: Code,
      title: "Web Development",
      description: "Responsive, modern, and scalable websites tailored to your business goals."
    },
    {
      icon: Sparkles,
      title: "AI-Powered Design",
      description: "Harnessing AI to generate unique, scalable design assets and branding elements."
    },
    {
      icon: Zap,
      title: "Video Generation",
      description: "AI-driven generative video creation for marketing, content, and creative storytelling."
    },
    {
      icon: Lightbulb,
      title: "Custom Solutions",
      description: "End-to-end digital solutions for brands, startups, and creators seeking something unique."
    }
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-glow">
            <span className="text-black">
              Our Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive creative solutions to bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="card-glass rounded-2xl p-8 hover-lift group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-black" />
                </div>
              </div>
              
              <h3 className="font-heading text-2xl font-bold mb-4 text-black group-hover:text-gray-700 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;