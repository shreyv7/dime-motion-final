import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, Instagram, Linkedin, Users, Calendar } from "lucide-react";
import { toast } from "sonner"; // Assuming you're using sonner for notifications
import { supabase } from "@/lib/supabase";

// Function to open Calendly in new tab (fallback)
const openCalendlyInNewTab = () => {
  window.open('https://calendly.com/shrey07feb/30min', '_blank');
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const calendlyRef = useRef<HTMLDivElement>(null);
  const [calendlyInitialized, setCalendlyInitialized] = useState(false);

  // Add loading state for Calendly
  const [isCalendlyLoading, setIsCalendlyLoading] = useState(true);
  const [calendlyLoadError, setCalendlyLoadError] = useState(false);

  // Initialize Calendly widget
  useEffect(() => {
    if (calendlyInitialized || !calendlyRef.current) return;

    const timeoutId = setTimeout(() => {
      // If loading takes more than 5 seconds, show error
      if (!window.Calendly) {
        setCalendlyLoadError(true);
        setIsCalendlyLoading(false);
      }
    }, 5000);

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    script.onload = () => {
      clearTimeout(timeoutId);
      // @ts-expect-error - Calendly types not available
      if (window.Calendly && calendlyRef.current) {
        // @ts-expect-error - Calendly types not available
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/shrey07feb/30min?hide_event_type_details=1&hide_gdpr_banner=1',
          parentElement: calendlyRef.current,
          minWidth: '320px',
          height: '700px'
        });
        setCalendlyInitialized(true);
        setIsCalendlyLoading(false);
      }
    };

    script.onerror = () => {
      clearTimeout(timeoutId);
      setCalendlyLoadError(true);
      setIsCalendlyLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      clearTimeout(timeoutId);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [calendlyInitialized]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Debug log - Form Data
      console.log('Form Data being submitted:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        project_type: formData.projectType, // Note: Converting to snake_case for DB
        message: formData.message,
        created_at: new Date().toISOString()
      });

      // Attempt database insertion
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          project_type: formData.projectType,
          message: formData.message,
          created_at: new Date().toISOString()
        }])
        .select();

      // Debug log - Supabase Response
      console.log('Supabase Response:', { data, error });

      if (error) {
        console.error('Supabase Error Details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        throw error;
      }

      // Success case
      toast.success('Message sent successfully!');
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        message: ""
      });
      
    } catch (error) {
      // Detailed error logging
      console.error('Full Error Object:', error);
      
      let errorMessage = 'Failed to send message: ';
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Unknown error occurred';
      }
      
      toast.error(errorMessage);
      console.error('Detailed error message:', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      platform: "Instagram",
      icon: Instagram,
      link: "https://instagram.com/dimemotion",
      color: "hover:text-pink-400"
    },
    {
      platform: "LinkedIn", 
      icon: Linkedin,
      link: "https://linkedin.com/company/dimemotion",
      color: "hover:text-blue-400"
    },
    {
      platform: "Behance",
      icon: Users,
      link: "https://behance.net/dimemotion",
      color: "hover:text-purple-400"
    }
  ];

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-6 text-glow">
            <span className="text-black">
              Get in Touch
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Let's create something amazing together
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card-glass rounded-2xl p-8 flex flex-col justify-center">

            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-black"
                />
              </div>
              
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-black"
                />
              </div>

              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone Number (Optional)"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-black"
                />
              </div>

              <div>
                <Input
                  type="text"
                  name="company"
                  placeholder="Company/Organization (Optional)"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-black"
                />
              </div>

              <div>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-300 text-black focus:border-black focus:ring-black rounded-md px-3 py-2"
                >
                  <option value="">Select Project Type</option>
                  <option value="video-editing">Video Editing & Storytelling</option>
                  <option value="color-grading">Professional Color Grading</option>
                  <option value="web-development">Custom Web Development</option>
                  <option value="ai-design">AI-Powered Design</option>
                  <option value="video-generation">AI Video Generation</option>
                  <option value="custom-solution">Custom Solution</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <Textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500 focus:border-black focus:ring-black resize-none"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-black text-white hover:bg-gray-800 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card-glass rounded-2xl p-8 hover-lift">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-black">Email Us</h3>
                  <p className="text-gray-600">krish@dimemotion.com</p>
                </div>
              </div>
              <p className="text-gray-600">
                Drop us a line and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="card-glass rounded-2xl p-8 hover-lift">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-black">Call Us</h3>
                  <p className="text-gray-600">+91 70602 25281</p>
                </div>
              </div>
              <p className="text-gray-600">
                Give us a call for immediate assistance or urgent inquiries.
              </p>
            </div>

            <div className="card-glass rounded-2xl p-8 hover-lift">
              <h3 className="font-heading text-xl font-bold text-black mb-6">Follow Our Journey</h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-4 text-gray-600 ${social.color} transition-colors duration-300 hover-lift`}
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <social.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="card-glass rounded-2xl p-8 hover-lift">
              <h3 className="font-heading text-xl font-bold text-black mb-4">Ready to Start?</h3>
              <p className="text-gray-600 leading-relaxed">
                Whether it's a simple video edit or a complete digital transformation, 
                we're here to make your vision come to life with creativity and precision.
              </p>
            </div>
          </div>
        </div>

        {/* Calendly Inline Widget Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="card-glass rounded-2xl p-12 text-center hover-lift">
            <div className="mb-8">
              <h3 className="font-heading text-3xl font-bold text-black mb-4">
                Ready to Schedule a Meeting?
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Book a free consultation call to discuss your project and see how we can help bring your vision to life.
              </p>
            </div>
            
            {/* Calendly inline widget */}
            <div className="relative min-h-[400px] w-full">
              {isCalendlyLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50">
                  <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
                    <p className="text-sm text-gray-600">Loading calendar...</p>
                  </div>
                </div>
              )}
              
              {calendlyLoadError ? (
                <div className="flex flex-col items-center justify-center gap-4 p-8 border rounded-lg">
                  <p className="text-gray-600">Unable to load calendar widget</p>
                  <Button 
                    onClick={() => window.open('https://calendly.com/shrey07feb/30min', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Meeting
                  </Button>
                </div>
              ) : (
                <div ref={calendlyRef} className="w-full h-[700px]" />
              )}
            </div>
            
            <p className="text-sm text-gray-600 mt-4">
              ⚡ 30-minute call • No commitment • Free consultation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;