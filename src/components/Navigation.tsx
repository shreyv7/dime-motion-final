import React from 'react';
import logo from '@/assets/logo.jpeg';

const Navigation = () => {
  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    // { name: 'Services', href: '#services' }, // TEMPORARILY DISABLED - Services page hidden from live website
    // { name: 'Portfolio', href: '#portfolio' }, // TEMPORARILY DISABLED - Portfolio page hidden from live website
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0">
            <img src={logo} alt="Dime Motion Logo" className="h-8 w-8 object-contain" />
            <div className="text-xl font-bold text-primary">Dime Motion</div>
          </div>
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="text-black hover:text-gray-600 transition-colors duration-200 text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;