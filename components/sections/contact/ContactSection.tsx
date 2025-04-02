import { contactData } from '@/data/contact.data';
import { ContactForm } from './component/ContactForm';
import { ContactInfo } from './component/ContactInfo';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-[#2563EB] to-[#4F46E5] dark:from-[#38BDF8] dark:to-[#818CF8] text-center">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          <ContactForm />
          <ContactInfo contactData={contactData} />
        </div>
      </div>
    </section>
  );
}
