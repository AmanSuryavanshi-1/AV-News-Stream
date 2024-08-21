import React from 'react';

const NotionDocumentPage = ({ pageData }) => {
  if (!pageData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="overflow-hidden bg-white rounded-lg shadow-lg">
        {pageData.cover && (
          <div className="w-full h-48 bg-center bg-cover" style={{backgroundImage: `url(${pageData.cover.external.url})`}}></div>
        )}
        <div className="p-6">
          <div className="flex items-center mb-4">
            {pageData.icon && (
              <span className="mr-2 text-4xl">{pageData.icon.emoji}</span>
            )}
            <h1 className="text-2xl font-bold">{pageData.properties.title.title[0]?.plain_text || 'Untitled'}</h1>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <InfoItem label="Created Time" value={new Date(pageData.created_time).toLocaleString()} />
            <InfoItem label="Last Edited Time" value={new Date(pageData.last_edited_time).toLocaleString()} />
            <InfoItem label="Archived" value={pageData.archived ? 'Yes' : 'No'} />
            <InfoItem label="Object Type" value={pageData.object} />
            <InfoItem label="Public URL" value={pageData.public_url || 'None'} />
          </div>
          <div className="mt-4">
            <a
              href={pageData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Open in Notion
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="mb-2">
    <span className="font-semibold">{label}: </span>
    <span className="text-gray-700">{value}</span>
  </div>
);

export default NotionDocumentPage;