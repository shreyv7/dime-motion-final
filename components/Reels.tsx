import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Reels = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const longVideoRef = useRef<HTMLVideoElement | null>(null);
  const [hoveredReel, setHoveredReel] = useState<number | null>(null);
  const [isLongVideoHovered, setIsLongVideoHovered] = useState(false);

  const reels = [
    { 
      id: 1, 
      src: '/v1.mp4', 
      title: "Life is a marathon" 
    },
    { 
      id: 2, 
      src: '/v2.mp4', 
      title: "You don't need motivation" 
    },
    { 
      id: 3, 
      src: '/v3.mp4', 
      title: "Want professional edits?" 
    }
  ];

  // Handle hover events for each reel
  const handleReelHover = (reelId: number, isHovering: boolean) => {
    const video = videoRefs.current[reelId - 1];
    if (!video) return;

    if (isHovering) {
      // Hovering over reel - unmute and play
      setHoveredReel(reelId);
      video.muted = false;
      video.play().catch(() => {
        console.log('Autoplay blocked for video', reelId);
      });
    } else {
      // Not hovering - mute and pause
      setHoveredReel(null);
      video.muted = true;
      video.pause();
    }
  };

  // Handle long video hover
  const handleLongVideoHover = (isHovering: boolean) => {
    if (!longVideoRef.current) return;

    if (isHovering) {
      setIsLongVideoHovered(true);
      longVideoRef.current.muted = false;
      longVideoRef.current.play().catch(() => {
        console.log('Autoplay blocked for long video');
      });
    } else {
      setIsLongVideoHovered(false);
      longVideoRef.current.muted = true;
      longVideoRef.current.pause();
    }
  };

  // Intersection observer for initial autoplay when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          const reelId = parseInt(video.dataset.reelId || '0');
          
          if (entry.isIntersecting && !hoveredReel) {
            // Video is visible and not being hovered - play muted
            video.muted = true;
            video.play().catch(() => {
              console.log('Autoplay blocked for video', reelId);
            });
          } else if (!entry.isIntersecting) {
            // Video is not visible - pause it
            video.pause();
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px'
      }
    );

    // Observe all videos
    videoRefs.current.forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => observer.disconnect();
  }, [hoveredReel]);

  // Initialize video properties
  useEffect(() => {
    reels.forEach((reel, index) => {
      const video = videoRefs.current[index];
      if (video) {
        video.loop = true;
        video.playsInline = true;
        video.muted = true;
        video.dataset.reelId = reel.id.toString();
      }
    });

    // Initialize long video properties
    if (longVideoRef.current) {
      longVideoRef.current.loop = true;
      longVideoRef.current.playsInline = true;
      longVideoRef.current.muted = true;
    }
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 text-glow">
            <span className="text-black">
              Our Reels
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch our latest creative content and behind-the-scenes moments
          </p>
        </motion.div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reels.map((reel, index) => (
            <motion.div
              key={reel.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => handleReelHover(reel.id, true)}
              onHoverEnd={() => handleReelHover(reel.id, false)}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 transition-all duration-300 cursor-pointer ${
                hoveredReel === reel.id ? 'ring-4 ring-black/50 shadow-black/20' : ''
              }`}
            >
              <div className="aspect-[9/16] bg-black relative">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="w-full h-full object-cover"
                  playsInline
                  loop
                  muted
                  preload="auto"
                  controls
                >
                  <source src={reel.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Hover Indicator */}
                {hoveredReel === reel.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg"
                  >
                    🔊 Playing
                  </motion.div>
                )}
                
                {/* Video Title - Styled in Accent Green */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  <h3 className="text-white font-bold text-xl drop-shadow-lg">
                    {reel.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Long Form Video Section */}
        <div className="max-w-6xl mx-auto mt-20 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h3 className="font-heading text-3xl md:text-5xl font-bold mb-4 text-glow">
              <span className="text-black">
                Featured Long Form Content
              </span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dive deeper into our storytelling and creative process with this extended piece
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
            onHoverStart={() => handleLongVideoHover(true)}
            onHoverEnd={() => handleLongVideoHover(false)}
            className={`bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200 transition-all duration-300 cursor-pointer ${
              isLongVideoHovered ? 'ring-4 ring-black/50 shadow-black/20' : ''
            }`}
          >
            <div className="aspect-video bg-black relative">
              <video
                ref={longVideoRef}
                className="w-full h-full object-cover"
                playsInline
                loop
                muted
                preload="auto"
                controls
              >
                <source src="/vl1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Hover Indicator */}
              {isLongVideoHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-6 right-6 bg-black text-white px-4 py-2 rounded-full text-lg font-medium shadow-lg"
                >
                  🔊 Playing
                </motion.div>
              )}
              
              {/* Video Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <h4 className="text-white font-bold text-2xl drop-shadow-lg mb-2">
                  Long Form Storytelling
                </h4>
                <p className="text-white/90 text-lg">
                  Hover to unmute and experience the full narrative
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Instagram Link */}
        <div className="text-center mt-16">
          <a 
            href="https://www.instagram.com/dime.motion/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-black rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span>🎬</span>
            <span>Follow Us On Instagram</span>
            <span>✨</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reels;
