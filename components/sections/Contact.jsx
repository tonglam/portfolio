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
import { Button } from "@/components/ui/button";
import { contactData } from "@/data/contact";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Expose a test function to the window object for testing
  useEffect(() => {
    // Expose a test function to the window
    window.testSendEmail = () => {
      // Pre-fill the form with test data
      setFormData({
        name: "Test User",
        email: "test@example.com",
        subject: "Test Email",
        message: "This is a test message from the browser console.",
      });

      // Wait a moment for the state to update, then submit
      setTimeout(() => {
        console.log("Submitting test form data...");
        document
          .querySelector("form")
          .dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
      }, 100);
    };

    return () => {
      // Clean up
      delete window.testSendEmail;
    };
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("Starting email submission process...");

      // Call our server API route instead of Resend directly
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Response received:", response.status);
      console.log("Response data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      // Show success message
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);

      // Show error message
      toast({
        title: "Error sending message",
        description:
          error.message || "Something went wrong. Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSocialIcon = (platform) => {
    switch (platform) {
      case "github":
        return <GithubIcon size={20} className="text-gray-100" />;
      case "linkedin":
        return <LinkedinIcon size={20} className="text-gray-100" />;
      case "twitter":
        return <TwitterIcon size={20} className="text-gray-100" />;
      case "medium":
        return <MediumIcon size={20} className="text-gray-100" />;
      case "facebook":
        return <FacebookIcon size={20} className="text-gray-100" />;
      default:
        return null;
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="contact"
      className="py-16 md:py-20 bg-white dark:bg-gradient-to-b dark:from-[#0F172A] dark:to-[#1E293B]"
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8] text-center"
        >
          GET IN TOUCH
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-xl p-6 md:p-8 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Send Me a Message
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-base">
              {contactData.intro}
            </p>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-[#0F172A] border border-gray-300 dark:border-gray-700 rounded-md p-2 md:p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#38BDF8] text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white dark:bg-[#0F172A] border border-gray-300 dark:border-gray-700 rounded-md p-2 md:p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#38BDF8] text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  placeholder="How can I help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-[#0F172A] border border-gray-300 dark:border-gray-700 rounded-md p-2 md:p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#38BDF8] text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white dark:bg-[#0F172A] border border-gray-300 dark:border-gray-700 rounded-md p-2 md:p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#38BDF8] text-sm"
                ></textarea>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] hover:from-[#6366F1] hover:to-[#3B82F6] dark:hover:from-[#EC4899] dark:hover:to-[#F472B6] text-white text-sm py-6 flex items-center justify-center"
                >
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-6 mb-8">
                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] p-3 rounded-lg shadow-md flex items-center justify-center">
                    <EmailIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Email
                    </h4>
                    <a
                      href={`mailto:${contactData.email}`}
                      className="text-base font-medium text-gray-900 dark:text-white hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                    >
                      {contactData.email}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] p-3 rounded-lg shadow-md flex items-center justify-center">
                    <LocationIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Location
                    </h4>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        contactData.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-medium text-gray-900 dark:text-white hover:text-[#2563EB] dark:hover:text-[#38BDF8] transition-colors"
                    >
                      {contactData.address}
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                Follow Me
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {contactData.socialLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href={link.url} target="_blank">
                      <div className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] hover:from-[#6366F1] hover:to-[#3B82F6] dark:hover:from-[#EC4899] dark:hover:to-[#F472B6] p-3 rounded-lg shadow-md flex items-center justify-center transition-all duration-300">
                        {getSocialIcon(link.platform)}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-[#3B82F6]/10 to-[#6366F1]/10 dark:from-[#F472B6]/10 dark:to-[#EC4899]/10 p-6 rounded-xl border border-[#3B82F6]/20 dark:border-[#F472B6]/20">
              <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                Let's Work Together
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                I'm currently available for freelance work. If you have a
                project that you want to get started or think you need my help
                with something, then get in touch.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
