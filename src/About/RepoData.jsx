import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaCodeBranch, FaGithub, FaStar, FaCode, FaEye } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';

const RepoData = () => {
    const [repoData, setRepoData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const responseRes = await fetch('https://api.github.com/repos/AmanSuryavanshi-1/AV-News-Stream');
            const repoJson = await responseRes.json();
            setRepoData(repoJson);
        };
        fetchData();
    }, []);

    if (!repoData) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 border-4 rounded-full border-primary-yellow border-t-transparent animate-spin"></div>
                    <p className="text-lg text-primary-light">Loading repository data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-8">
                <HiSparkles className="mr-3 text-3xl text-primary-yellow animate-pulse" />
                <h2 className="font-serif text-3xl font-bold text-center sm:text-4xl lg:text-5xl text-primary-light">
                    Featured Repository
                </h2>
                <HiSparkles className="ml-3 text-3xl text-primary-yellow animate-pulse" />
            </div>

            <div className="relative overflow-hidden transition-all duration-500 shadow-xl bg-gradient-to-br from-primary-dark via-primary-bgColor to-primary-grey rounded-3xl hover:shadow-2xl hover:shadow-primary-yellow/30">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 bg-primary-yellow blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 bg-primary-light blur-3xl"></div>
                
                <div className="relative px-6 py-8 sm:p-10">
                    {/* Repository Title */}
                    <div className="mb-6 text-center">
                        <h3 className="mb-2 text-2xl font-bold sm:text-3xl text-primary-yellow">
                            AV NEWS STREAM
                        </h3>
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-primary-yellow animate-pulse"></div>
                            <div className="w-2 h-2 rounded-full bg-primary-light animate-pulse delay-75"></div>
                            <div className="w-2 h-2 rounded-full bg-primary-yellow animate-pulse delay-150"></div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="p-6 mb-8 border-l-4 rounded-lg bg-primary-bgColor/50 backdrop-blur-sm border-primary-yellow">
                        <p className="text-base leading-relaxed sm:text-lg text-primary-light">
                            {repoData.description}
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-4">
                        <div className="p-4 text-center transition-all duration-300 border-2 group rounded-2xl bg-primary-bgColor/50 backdrop-blur-sm border-primary-yellow/30 hover:border-primary-yellow hover:transform hover:scale-105">
                            <FaCode className="mx-auto mb-2 text-3xl transition-transform duration-300 text-primary-yellow group-hover:scale-110" />
                            <p className="mb-1 text-xs font-semibold uppercase text-primary-white/70">Language</p>
                            <p className="text-lg font-bold text-primary-light">{repoData.language}</p>
                        </div>

                        <div className="p-4 text-center transition-all duration-300 border-2 group rounded-2xl bg-primary-bgColor/50 backdrop-blur-sm border-primary-yellow/30 hover:border-primary-yellow hover:transform hover:scale-105">
                            <FaStar className="mx-auto mb-2 text-3xl transition-transform duration-300 text-primary-yellow group-hover:scale-110 group-hover:rotate-12" />
                            <p className="mb-1 text-xs font-semibold uppercase text-primary-white/70">Stars</p>
                            <p className="text-lg font-bold text-primary-light">{repoData.stargazers_count}</p>
                        </div>

                        <div className="p-4 text-center transition-all duration-300 border-2 group rounded-2xl bg-primary-bgColor/50 backdrop-blur-sm border-primary-yellow/30 hover:border-primary-yellow hover:transform hover:scale-105">
                            <FaCodeBranch className="mx-auto mb-2 text-3xl transition-transform duration-300 text-primary-yellow group-hover:scale-110" />
                            <p className="mb-1 text-xs font-semibold uppercase text-primary-white/70">Forks</p>
                            <p className="text-lg font-bold text-primary-light">{repoData.forks_count}</p>
                        </div>

                        <div className="p-4 text-center transition-all duration-300 border-2 group rounded-2xl bg-primary-bgColor/50 backdrop-blur-sm border-primary-yellow/30 hover:border-primary-yellow hover:transform hover:scale-105">
                            <FaEye className="mx-auto mb-2 text-3xl transition-transform duration-300 text-primary-yellow group-hover:scale-110" />
                            <p className="mb-1 text-xs font-semibold uppercase text-primary-white/70">Watchers</p>
                            <p className="text-lg font-bold text-primary-light">{repoData.watchers_count}</p>
                        </div>
                    </div>

                    {/* Last Updated */}
                    <div className="flex items-center justify-center mb-8 space-x-2 text-sm text-primary-white/70">
                        <FaCalendarAlt className="text-primary-yellow" />
                        <span>Last Updated: {new Date(repoData.updated_at).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}</span>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center">
                        <a
                            href={repoData.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-8 py-4 text-lg font-bold transition-all duration-300 border-2 shadow-lg group rounded-2xl shadow-primary-yellow/30 border-primary-yellow text-primary-bgColor bg-primary-yellow hover:bg-primary-light hover:shadow-primary-light/50 hover:transform hover:-translate-y-1"
                        >
                            <FaGithub className="mr-3 text-2xl transition-transform duration-300 group-hover:rotate-12" />
                            View on GitHub
                            <svg 
                                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepoData;
