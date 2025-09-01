const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-6">
            <h3 className="font-heading text-3xl font-black">
              <span className="text-black">
                Dime Motion
              </span>
            </h3>
            <p className="text-gray-600 mt-2">
              Elevating Ideas Into Motion
            </p>
          </div>

          {/* Copyright */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">
              © 2025 Dime Motion. All rights reserved. | Crafting the future of digital creativity.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;