/**
 * About page content
 * Information about me, my background, and professional journey
 */

export interface AboutData {
  title: string;
  content: string;
}

export const aboutData: AboutData = {
  title: 'Who am I',
  content: `I'm Qitong Lan (Tong), a professional Full-Stack Engineer with 9+ years of experience at leading tech firms in China like <a href="https://www.ctyun.cn/" target="_blank" rel="noopener noreferrer">eSurfing Cloud</a>, <a href="https://www.netease.com/" target="_blank" rel="noopener noreferrer">NetEase</a>, and <a href="https://www.chinatelecom-h.com/" target="_blank" rel="noopener noreferrer">China Telecom</a>. I architect and deliver complete cloud-native solutions that power mission-critical systems processing millions of daily transactions. My expertise spans the entire development lifecycle - from designing scalable cloud infrastructures and optimizing DevOps pipelines to crafting modern frontend interfaces and high-performance backend services. Passionate about the AI revolution in software development, I leverage cutting-edge technologies to build intelligent, adaptive systems while maintaining enterprise-grade reliability. I specialize in transforming complex business requirements into scalable technical solutions that drive measurable impact across various domains.`,
};

export default aboutData;
