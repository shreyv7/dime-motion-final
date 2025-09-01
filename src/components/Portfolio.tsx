import { Play, ExternalLink, Image } from "lucide-react";
import { Button } from "@/components/ui/button";

const Portfolio = () => {
  const portfolioItems = [
    {
      title: "Cinematic Ad Edit",
      type: "Video Editing",
      preview: "video",
      description: "High-impact commercial with dynamic cuts and storytelling"
    },
    {
      title: "Music Video Grading",
      type: "Color Grading", 
      preview: "slider",
      description: "Mood-driven color palette enhancing artistic vision"
    },
    {
      title: "E-commerce Website",
      type: "Web Development",
      preview: "mockup",
      description: "Modern, responsive platform with seamless UX"
    },
    {
      title: "AI Concept Art",
      type: "AI-Powered Design",
      preview: "gallery",
      description: "Generative art collection for brand identity"
    }
  ];

  const getPreviewIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'slider': return Image;
      case 'mockup': return ExternalLink;
      case 'gallery': return Image;
      default: return Image;
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-glow">
            <span className="text-black">
              Our Work
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A glimpse into projects where creativity met technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {portfolioItems.map((item, index) => {
            const IconComponent = getPreviewIcon(item.preview);
            
            return (
              <div
                key={index}
                className="card-glass rounded-2xl overflow-hidden hover-lift group cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Preview Area */}
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200/20 to-gray-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="text-center z-10">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-gray-300 transition-colors duration-300">
                      <IconComponent className="w-10 h-10 text-black" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {item.preview === 'video' && 'Play Video'}
                      {item.preview === 'slider' && 'View Gallery'}
                      {item.preview === 'mockup' && 'Live Preview'}
                      {item.preview === 'gallery' && 'View Collection'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-black font-medium bg-gray-100 px-3 py-1 rounded-full">
                      {item.type}
                    </span>
                  </div>
                  
                  <h3 className="font-heading text-2xl font-bold mb-3 text-black group-hover:text-gray-700 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold"
          >
            View Full Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;