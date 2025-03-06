/**
 * About page content
 * Information about me, my background, and professional journey
 */

export interface AboutData {
  title: string;
  content: string;
  image: string;
  imageAlt: string;
}

export const aboutData: AboutData = {
  title: 'WHO I AM?',
  content: `My name is Qitong Lan. I am a professional and enthusiastic programmer in my daily life. 
  I am a quick learner with a self-learning attitude. I love to learn and explore new 
  technologies and am passionate about problem-solving. I love almost all the stacks of 
  web application development and love to make the web more open to the world. My core 
  skill is based on JavaScript and I love to do most of the things using JavaScript. I am 
  available for any kind of job opportunity that suits my skills and interests.`,
  image: '/moonlight-coding.jpg',
  imageAlt: 'About Me',
};

export default aboutData;
