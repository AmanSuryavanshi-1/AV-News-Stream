import React from 'react';
import { FaCalendarAlt, FaEdit, FaExternalLinkAlt } from 'react-icons/fa';

const NotionDocumentPage = ({ pageData }) => {
  if (!pageData) {
    return (
      <div className="flex items-center justify-center h-screen text-primary-light">
        Loading...
      </div>
    );
  }

  const { cover, icon, properties, created_time, last_edited_time, url } = pageData;

  return (
    <div className="max-w-6xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h2 className="mt-4 font-serif text-3xl font-bold text-primary-light sm:text-4xl lg:text-5xl">
          {properties.title.title[0]?.plain_text || 'Untitled'}
        </h2>
      </div>
      <div className="overflow-hidden shadow-lg bg-primary-bgColor rounded-3xl">
        {cover && (
          <div
            className="w-full h-64 bg-center bg-cover rounded-t-3xl "
            style={{ backgroundImage: `url(${cover.external.url})` }}
          ></div>
        )}
        <div className="px-6 py-8 sm:p-10">
          <div className="flex items-center mb-6">
            {icon && <span className="mr-4 text-5xl">{icon.emoji}</span>}
            <h1 className="text-3xl font-bold text-primary-light max-sm:text-2xl">
              {properties.title.title[0]?.plain_text + " : Transforming News Consumption"|| 'Untitled'}
            </h1>
          </div>
          <div className="mt-8 text-primary-light">
            <p>
              AV NewsStream is the ultimate platform for streaming, reading, and listening to the latest news from diverse sources. It aims to address the limitations of traditional news websites by providing a seamless, hands-free, and engaging news consumption experience.
            </p>
            <p className="mt-4">
              The platform tackles the problems of limited user interaction, reading friction, and information overload that plague traditional news platforms. AV NewsStream offers a solution by integrating seamless text-to-speech capabilities, real-time updates from multiple APIs, and enhanced user interaction through conversational voice control.
            </p>
            <p className="mt-4">
              With a comprehensive coverage of over 80,000 news sources, AV NewsStream delivers a holistic view of global events across various categories and interests. Users can effortlessly navigate, access, and revisit news content through voice commands, while also having the option to save articles and videos for later viewing.
            </p>
            <p className="mt-4">
              The platform's key features, such as advanced search functionality, custom hooks for optimized performance, and accessibility options, ensure a seamless and engaging news consumption experience for all users, including those with visual impairments.
            </p>
          </div>

          <div className="flex items-center justify-between mt-6 text-primary-light">
            <InfoItem
              icon={<FaCalendarAlt />}
              label="Created"
              value={new Date(created_time).toLocaleString()}
            />
            <InfoItem
              icon={<FaEdit />}
              label="Last Edited"
              value={new Date(last_edited_time).toLocaleString()}
            />
          </div>

          <div className="mt-10 text-center">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2 transition-all duration-300 border-2 shadow-sm rounded-3xl shadow-primary-light border-primary-light text-primary-bgColor bg-primary-yellow hover:bg-primary-light hover:text-primary-bgColor hover:border-transparent"
            >
               Learn More
              <FaExternalLinkAlt className="ml-2" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4">
    <span className="text-2xl text-primary-yellow">{icon}</span>
    <span>
      <strong>{label}:</strong> {value}
    </span>
  </div>
);

export default NotionDocumentPage;