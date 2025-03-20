'use client';

import { sendEmail } from '@/app/actions/email';
import { contactData } from '@/data/contact.data';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { ContactFormData } from '@/types/components/contact.type';
import type { ToasterToast } from '@/types/hooks/toast.type';
import { motion } from 'framer-motion';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';

// Button component that shows proper loading state
function SubmitButton(): JSX.Element {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-[#3B82F6] to-[#6366F1] dark:from-[#F472B6] dark:to-[#EC4899] hover:from-[#6366F1] hover:to-[#3B82F6] dark:hover:from-[#EC4899] dark:hover:to-[#F472B6] text-white text-sm py-6 flex items-center justify-center"
    >
      {pending ? 'SENDING...' : 'SEND MESSAGE'}
    </Button>
  );
}

export function ContactForm(): JSX.Element {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  // Client action that wraps the server action
  async function handleFormSubmit(formData: FormData): Promise<void> {
    // Get values from the form data
    const contactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    // Validate form
    if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
      toast({
        title: 'Error',
        description: 'Please fill in all fields',
        open: true,
        onOpenChange: () => {},
      } satisfies Omit<ToasterToast, 'id'>);
      return;
    }

    try {
      const result = await sendEmail(contactData);

      if (!result.success) {
        throw new Error(result.error.message || 'Failed to send email');
      }

      // Show success message
      toast({
        title: 'Message sent!',
        description: "Thank you for reaching out. I'll get back to you soon.",
        open: true,
        onOpenChange: () => {},
      } satisfies Omit<ToasterToast, 'id'>);

      // Reset form using the ref
      if (formRef.current) {
        formRef.current.reset();
        // Also reset the state
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    } catch (error: unknown) {
      toast({
        title: 'Error sending message',
        description:
          error instanceof Error ? error.message : 'Something went wrong. Please try again later.',
        open: true,
        onOpenChange: () => {},
      } satisfies Omit<ToasterToast, 'id'>);
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    void handleFormSubmit(formData);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6 },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gray-50 dark:bg-gradient-to-br dark:from-[#1E293B] dark:to-[#2D3748] rounded-xl p-6 md:p-8 shadow-lg"
    >
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Send Me a Message</h3>
      <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm md:text-base">
        {contactData.intro}
      </p>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
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
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
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
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
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
            name="subject"
            placeholder="How can I help you?"
            value={formData.subject}
            onChange={handleChange}
            autoComplete="off"
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
            name="message"
            rows={5}
            placeholder="Write your message here..."
            value={formData.message}
            onChange={handleChange}
            autoComplete="off"
            className="w-full bg-white dark:bg-[#0F172A] border border-gray-300 dark:border-gray-700 rounded-md p-2 md:p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#38BDF8] text-sm"
          ></textarea>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <SubmitButton />
        </motion.div>
      </form>
    </motion.div>
  );
}
