import React from 'react';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string; // Optional prop to allow additional custom classes per section
  id?: string; // Optional prop for section ID/linking
}

/**
 * A reusable server component wrapper for content sections,
 * providing consistent padding and max-width.
 */
const SectionContainer: React.FC<SectionContainerProps> = ({ children, className = '', id }) => {
  // Common styles: max-width container, horizontal auto margins, horizontal padding, vertical padding
  const commonStyles = 'container mx-auto px-4 py-16 md:py-20';

  return (
    <section id={id} className={`${commonStyles} ${className}`}>
      {children}
    </section>
  );
};

export default SectionContainer;
