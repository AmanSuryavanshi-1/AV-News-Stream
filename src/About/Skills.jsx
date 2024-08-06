import React from 'react';
import { DiReact, DiJavascript1, DiNpm } from 'react-icons/di';
import { SiReactrouter, SiPostcss, SiVercel } from 'react-icons/si';
import { AiOutlineHtml5 } from 'react-icons/ai';
import { BsFiletypeJson } from 'react-icons/bs';
import { FaBoxOpen } from 'react-icons/fa6';
import { MdOutlineAttachEmail } from 'react-icons/md';
import { RiTailwindCssFill } from 'react-icons/ri';

const TechTools = () => {
    const skills = [
        { name: 'React', icon: DiReact },
        { name: 'JavaScript', icon: DiJavascript1 },
        { name: 'PostCSS', icon: SiPostcss },
        { name: 'NPM', icon: DiNpm },
        { name: 'HTML', icon: AiOutlineHtml5 },
        { name: 'JSON', icon: BsFiletypeJson },
        { name: 'Vercel', icon: SiVercel },
        { name: 'Parcel', icon: FaBoxOpen },
        { name: 'React Router', icon: SiReactrouter },
        { name: 'EmailJS', icon: MdOutlineAttachEmail },
        { name: 'Tailwind CSS', icon: RiTailwindCssFill },
        { name: 'React Icons', icon: DiReact },
    ];

    return (
        <div className="p-8 m-12 overflow-hidden">
            <h3 className="mb-8 font-serif text-3xl font-bold text-center text-primary-light">
                Tools & Technologies 
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-4 lg:gap-6">
                {skills.map((skill, index) => (
                    <div key={index} className="flex flex-col items-center justify-center p-4 m-2 transition-all duration-300 transform rounded-lg shadow-md bg-primary-bgColor hover:scale-105 hover:shadow-md hover:shadow-primary-light">
                        <skill.icon className="text-5xl text-primary-yellow animate-bounce" />
                        <span className="mt-2 text-sm font-semibold text-primary-light">{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechTools;
