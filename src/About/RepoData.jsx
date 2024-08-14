import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaCodeBranch, FaGithub, FaStar, FaCode } from 'react-icons/fa';

import Skills from './Skills'

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
        return <div className="flex items-center justify-center h-64 text-primary-light">Loading...</div>;
    }

    return (
        <div className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8 max-sm:w-screen max-md:p-4">
            <h2 className="mt-4 font-serif text-xl font-bold text-center text-primary-light sm:text-4xl lg:text-5xl">
                Featured Repository: AV NEWS STREAM
            </h2>
            <div className="overflow-hidden shadow-sm bg-primary-bgColor rounded-3xl">
                <div className="px-6 py-8 sm:p-10 max-md:p-2">
                    <div className="space-y-6 text-primary-light max-md:space-y-1">
                        <p className="text-lg leading-7">
                            <strong className="font-semibold text-primary-yellow">Description:</strong> {repoData.description}
                        </p>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex items-center space-x-2">
                                <FaCode className="text-2xl text-primary-yellow" />
                                <span><strong>Language:</strong> {repoData.language}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaStar className="text-2xl text-primary-yellow" />
                                <span><strong>Stars:</strong> {repoData.stargazers_count}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCodeBranch className="text-2xl text-primary-yellow" />
                                <span><strong>Forks:</strong> {repoData.forks_count}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCalendarAlt className="text-2xl text-primary-yellow" />
                                <span><strong>Last Updated:</strong> {new Date(repoData.updated_at).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 text-center">
                        <a
                            href={repoData.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-5 py-2 transition-all duration-300 border-2 shadow-sm rounded-3xl shadow-primary-light border-primary-light text-primary-bgColor bg-primary-yellow hover:bg-primary-light hover:text-primary-bgColor hover:border-transparent"
                        >
                            View Repository
                            <FaGithub className="ml-2 text-2xl" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-12">
                <Skills />
            </div>
        </div>
    );
};

export default RepoData;
