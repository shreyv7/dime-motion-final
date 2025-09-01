const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-8 text-glow">
            <span className="text-black">
              About Us
            </span>
          </h2>
          
          <div className="card-glass rounded-2xl p-12 hover-lift">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8">
              Dime Motion is a collective of creators, developers, and innovators. We merge cinematic visuals, 
              cutting-edge code, and AI technology to craft unforgettable digital experiences.
            </p>
            
            <p className="text-lg md:text-xl text-black leading-relaxed">
              Our focus is on <span className="text-black font-semibold">quality</span>, 
              <span className="text-gray-600 font-semibold"> precision</span>, and creating a 
              <span className="text-black font-semibold"> long-lasting impact</span> for our clients.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            {[
              { number: "2356", label: "Videos Created" },
              { number: "3+", label: "Years Experience" },
              { number: "100M+", label: "Views" }
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="font-heading text-5xl font-black text-black mb-2 animate-glow-pulse">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;