import React from 'react';
import { DiReact, DiJavascript1, DiNpm, DiGithubBadge } from 'react-icons/di';
import { SiReactrouter, SiPostcss, SiVercel, SiVite, SiGnome, SiYoutube, SiDaisyui, SiRedux } from 'react-icons/si';
import { AiOutlineHtml5 } from 'react-icons/ai';
import { BsFiletypeJson } from 'react-icons/bs';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { RiTailwindCssFill } from 'react-icons/ri';
import { GiCorset } from 'react-icons/gi';
import { SlSpeech } from 'react-icons/sl';
import { FaNewspaper, FaReact } from 'react-icons/fa';
import { IoIosGlobe } from 'react-icons/io';
import { BiNetworkChart } from 'react-icons/bi';

const TechTools = () => {
    const skills = [
        { name: 'React', icon: DiReact, link: 'https://reactjs.org/' },
        { name: 'JavaScript', icon: DiJavascript1, link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
        { name: 'PostCSS', icon: SiPostcss, link: 'https://postcss.org/' },
        { name: 'NPM', icon: DiNpm, link: 'https://www.npmjs.com/' },
        { name: 'HTML', icon: AiOutlineHtml5, link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
        { name: 'JSON', icon: BsFiletypeJson, link: 'https://www.json.org/' },
        { name: 'Vercel', icon: SiVercel, link: 'https://vercel.com/' },
        { name: 'Vite', icon: SiVite, link: 'https://vitejs.dev/' },
        { name: 'React Router', icon: SiReactrouter, link: 'https://reactrouter.com/' },
        { name: 'EmailJS', icon: MdOutlineAttachEmail, link: 'https://www.emailjs.com/' },
        { name: 'Tailwind CSS', icon: RiTailwindCssFill, link: 'https://tailwindcss.com/' },
        { name: 'CORS', icon: BiNetworkChart, link: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS' },
        { name: 'Text To Speech', icon: SlSpeech, link: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API' },
        { name: 'React Context', icon: FaReact, link: 'https://reactjs.org/docs/context.html' },
        { name: 'DaisyUI', icon: SiDaisyui, link: 'https://daisyui.com/' },
        { name: 'Redux Toolkit', icon: SiRedux, link: 'https://redux-toolkit.js.org/' },
        { name: 'News API', icon: FaNewspaper, link: 'https://newsapi.org/' },
        { name: 'GNews API', icon: IoIosGlobe, link: 'https://gnews.io/' },
        { name: 'Youtube API', icon: SiYoutube, link: 'https://developers.google.com/youtube/v3' },
        { name: 'GitHub API', icon: DiGithubBadge, link: 'https://docs.github.com/en/rest' },
    
    ];

    return (
        <div className="p-8 m-12 overflow-hidden">
            <h3 className="mb-8 font-serif text-3xl font-bold text-center text-primary-light">
                Tools & Technologies 
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-4 lg:gap-6">
                {skills.map((skill, index) => (
                    <a 
                        href={skill.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        key={index} 
                        className="flex flex-col items-center justify-center p-4 m-2 transition-all duration-300 transform rounded-lg shadow-md bg-primary-bgColor hover:scale-105 hover:shadow-md hover:shadow-primary-light"
                    >
                        <skill.icon className="text-5xl text-primary-yellow animate-bounce" />
                        <span className="mt-2 text-sm font-semibold text-primary-light">{skill.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default TechTools;