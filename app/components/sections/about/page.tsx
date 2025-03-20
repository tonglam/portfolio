import { aboutData } from '@/data/about.data';
import { AnimatedContent } from './AnimatedContent';

export default function About(): JSX.Element {
  return (
    <section
      id="about"
      className="py-16 md:py-20 bg-white dark:bg-gradient-to-b dark:from-[#1E293B] dark:to-[#0F172A]"
    >
      <div className="container mx-auto px-4">
        <AnimatedContent content={aboutData} />
      </div>
    </section>
  );
}
