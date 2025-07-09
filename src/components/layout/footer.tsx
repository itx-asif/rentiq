import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Properties", href: "/properties" },
      { label: "Calculator", href: "/calculator" },
      { label: "Chat Assistant", href: "/chat" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">RentIQ</h2>
          <p className="text-sm text-primary-foreground/60">
            Smart real estate solutions powered by AI. Buy, rent, or build with confidence.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="mailto:sdevelopedbyasif@gmail.com" aria-label="Email">
              <Mail className="w-5 h-5 hover:text-teal-500" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="w-5 h-5 hover:text-teal-500" />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook className="w-5 h-5 hover:text-teal-500" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="w-5 h-5 hover:text-teal-500" />
            </a>
          </div>
        </div>

        {/* Footer Links */}
        {footerLinks.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {section.links.map((link, i) => (
                <li key={i}>
                  <Link to={link.href} className="hover:text-teal-500 transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom copyright */}
      <div className="mt-12 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} RentIQ. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
