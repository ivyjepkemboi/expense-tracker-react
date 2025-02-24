const Footer = () => {
    return (
      <footer className="w-full py-4 bg-white shadow-md mt-10">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
          {/* Left - Copyright */}
          <p className="text-sm text-gray-600 text-center md:text-left">
            © {new Date().getFullYear()} Code Martials Ltd.
          </p>
  
          {/* Right - Links */}
          <ul className="flex flex-wrap items-center gap-4 mt-2 md:mt-0">
            <li>
              <a
                href="mailto:hello@simmmple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-blue-500 transition"
              >
                Support
              </a>
            </li>
            <li>
              <a
                href="https://simmmple.com/licenses"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-blue-500 transition"
              >
                License
              </a>
            </li>
            <li>
              <a
                href="https://simmmple.com/terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-blue-500 transition"
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                href="https://blog.horizon-ui.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 hover:text-blue-500 transition"
              >
                Blog
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  