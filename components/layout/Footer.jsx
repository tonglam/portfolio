"use client";

import {
  EmailIcon,
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  LocationIcon,
  MediumIcon,
  TwitterIcon,
} from "@/components/icons";
import { contactData } from "@/data/contact";
import { navigationLinks } from "@/data/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  const getSocialIcon = (platform) => {
    switch (platform) {
      case "github":
        return (
          <GithubIcon
            size={20}
            className="text-gray-400 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300"
          />
        );
      case "linkedin":
        return (
          <LinkedinIcon
            size={20}
            className="text-gray-400 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300"
          />
        );
      case "twitter":
        return (
          <TwitterIcon
            size={20}
            className="text-gray-400 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300"
          />
        );
      case "medium":
        return (
          <MediumIcon
            size={20}
            className="text-gray-400 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300"
          />
        );
      case "facebook":
        return (
          <FacebookIcon
            size={20}
            className="text-gray-400 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300"
          />
        );
      default:
        return null;
    }
  };

  return (
    <footer className="pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gradient-to-r dark:from-[#0F172A] dark:to-[#1E293B]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/"
                className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8] text-2xl font-bold inline-block mb-4"
              >
                Tong
              </Link>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Full-stack engineer evolving for the new era of tech.
              </p>
              <div className="flex space-x-3">
                {contactData.socialLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.url}
                    target="_blank"
                    className="transition-transform hover:scale-110"
                  >
                    {getSocialIcon(link.platform)}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {navigationLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Contact Info
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <EmailIcon
                    size={18}
                    className="text-[#2563EB] dark:text-[#38BDF8] mt-0.5"
                  />
                  <a
                    href={`mailto:${contactData.email}`}
                    className="text-gray-600 dark:text-gray-400 text-sm hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300"
                  >
                    {contactData.email}
                  </a>
                </li>
                <li className="flex items-start space-x-3">
                  <LocationIcon
                    size={18}
                    className="text-[#2563EB] dark:text-[#38BDF8] mt-0.5"
                  />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      contactData.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 text-sm hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors duration-300 cursor-pointer"
                  >
                    {contactData.address}
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 dark:border-gray-800 my-6"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0 text-center"
          >
            © {new Date().getFullYear()} Developed by{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8]">
              Tong
            </span>
            . All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
