'use client';

import { sendEmail } from '@/app/actions/email';
import { contactData } from '@/data/contact.data';
import { useToast } from '@/hooks/use-toast';
import type { ToasterToast } from '@/types/toast.type';
import { motion } from 'framer-motion';
import type { ChangeEvent } from 'react';
import { useRef, useState } from 'react';
import { FormInputField } from './FormInputField';
import { FormTextArea } from './FormTextArea';
import { SubmitButton } from './SubmitButton';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
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

  async function handleFormSubmit(formData: FormData): Promise<void> {
    const contactData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

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

      toast({
        title: 'Message sent!',
        description: "Thank you for reaching out. I'll get back to you soon.",
        open: true,
        onOpenChange: () => {},
      } satisfies Omit<ToasterToast, 'id'>);

      if (formRef.current) {
        formRef.current.reset();
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
          <FormInputField
            id="name"
            name="name"
            label="Your Name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
          />

          <FormInputField
            id="email"
            name="email"
            label="Your Email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        <FormInputField
          id="subject"
          name="subject"
          label="Subject"
          type="text"
          placeholder="How can I help you?"
          value={formData.subject}
          onChange={handleChange}
          autoComplete="off"
        />

        <FormTextArea
          id="message"
          name="message"
          label="Your Message"
          placeholder="Write your message here..."
          value={formData.message}
          onChange={handleChange}
          rows={5}
          autoComplete="off"
        />

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <SubmitButton />
        </motion.div>
      </form>
    </motion.div>
  );
}
