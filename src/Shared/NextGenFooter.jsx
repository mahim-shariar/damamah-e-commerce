import { motion } from "framer-motion";
import {
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiYoutube,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const NextGenFooter = () => {
  const footerLinks = [
    {
      title: "Shop",
      links: ["New Arrivals", "Collections", "Best Sellers", "Sale"],
    },
    {
      title: "Help",
      links: [
        "Customer Service",
        "Track Order",
        "Returns & Exchanges",
        "Shipping Info",
      ],
    },
    {
      title: "About",
      links: ["Our Story", "Sustainability", "Careers", "Press"],
    },
  ];

  const socialLinks = [
    { icon: <FiInstagram />, name: "Instagram" },
    { icon: <FiTwitter />, name: "Twitter" },
    { icon: <FiFacebook />, name: "Facebook" },
    { icon: <FiYoutube />, name: "YouTube" },
  ];

  const contactInfo = [
    { icon: <FiMail />, text: "hello@damamah.com" },
    { icon: <FiPhone />, text: "+966 12 345 6789" },
    { icon: <FiMapPin />, text: "123 Fashion Street, Jeddah, Saudi Arabia" },
  ];

  return (
    <footer className="bg-amber-50 border-t border-amber-100 text-amber-900">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-serif font-bold mb-3">
                Stay Updated
              </h3>
              <p className="text-amber-700">
                Subscribe to our newsletter for the latest collections,
                exclusive offers, and style inspiration.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="w-full md:w-auto flex-1 max-w-lg"
            >
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full py-3 px-5 pr-24 rounded-full border border-amber-200 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 bg-white"
                />
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="absolute right-1 top-1 bg-amber-600 hover:bg-amber-700 text-white py-2 px-5 rounded-full transition-colors"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Logo Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-3xl font-serif font-bold text-amber-900 mb-4">
              Damamah
            </div>
            <p className="text-amber-700 mb-6">
              Elevating modest fashion with contemporary designs rooted in
              tradition.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href="#"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -3, color: "#92400e" }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-amber-900 hover:text-amber-700 text-xl p-2 rounded-full hover:bg-amber-100 transition-all"
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {footerLinks.map((column, colIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + colIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-bold text-lg mb-4 relative inline-block">
                {column.title}
                <motion.span
                  className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-amber-600"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                />
              </h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <motion.li
                    key={link}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: 0.2 + linkIndex * 0.05,
                    }}
                    viewport={{ once: true }}
                  >
                    <a
                      href="#"
                      className="text-amber-700 hover:text-amber-900 transition-colors flex items-center group"
                    >
                      <motion.span
                        className="inline-block w-2 h-2 bg-amber-600 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        whileHover={{ scale: 1.5 }}
                      />
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="font-bold text-lg mb-4 relative inline-block">
              Contact Us
              <motion.span
                className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-amber-600"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-amber-600 mt-1 mr-3">{item.icon}</span>
                  <span className="text-amber-700">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {["Visa", "Mastercard", "Apple Pay", "Mada", "STC Pay"].map(
            (method, index) => (
              <motion.div
                key={method}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-white px-4 py-2 rounded-lg shadow-sm border border-amber-100 text-amber-800 font-medium"
              >
                {method}
              </motion.div>
            )
          )}
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-amber-100 py-4">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-amber-800">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Damamah. All rights reserved.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
              className="flex space-x-4 mt-2 md:mt-0"
            >
              <a href="#" className="hover:text-amber-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-amber-600 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-amber-600 transition-colors">
                Cookie Policy
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NextGenFooter;
