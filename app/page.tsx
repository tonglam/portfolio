import { AboutSection } from '@/components/sections/about/AboutSection';
import { BlogSectionWrapper } from '@/components/sections/blogs/server/BlogSectionWrapper';
import { ContactSection } from '@/components/sections/contact/ContactSection';
import { EducationSection } from '@/components/sections/education/EducationSection';
import { ExperienceSection } from '@/components/sections/experience/ExperienceSection';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import { ProjectSection } from '@/components/sections/projects/ProjectSection';
import { SkillsSection } from '@/components/sections/skills/SkillsSection';
import SectionContainer from '@/components/ui/SectionContainer';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Suspense>
        <HeroSection />
      </Suspense>

      <SectionContainer id="about">
        <Suspense>
          <AboutSection />
        </Suspense>
      </SectionContainer>

      <SectionContainer id="experience">
        <Suspense>
          <ExperienceSection />
        </Suspense>
      </SectionContainer>

      <SectionContainer id="projects">
        <Suspense>
          <ProjectSection />
        </Suspense>
      </SectionContainer>

      <SectionContainer id="blogs">
        <Suspense>
          <BlogSectionWrapper initialPage={1} initialCategory="All" initialSearchQuery="" />
        </Suspense>
      </SectionContainer>

      <SectionContainer id="education">
        <Suspense>
          <EducationSection />
        </Suspense>
      </SectionContainer>

      <SectionContainer id="skills">
        <Suspense>
          <SkillsSection />
        </Suspense>
      </SectionContainer>

      <SectionContainer id="contact">
        <Suspense>
          <ContactSection />
        </Suspense>
      </SectionContainer>
    </main>
  );
}
