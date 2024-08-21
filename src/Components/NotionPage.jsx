import React, { useState, useEffect } from 'react';
import NotionDocumentPage from './NotionDocumentPage';

const NotionPage = () => {
  const [pageData, setPageData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageData = async () => {
      const pageId = import.meta.env.VITE_NOTION_DATABASE_ID;
      try {
        const response = await fetch(`http://localhost:3001/api/notion-page/${pageId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPageData(data);
      } catch (error) {
        console.error("Error fetching Notion page:", error);
        setError("Failed to load Notion page. Please try again later.");
      }
    };

    fetchPageData();
  }, []);

  if (error) {
    return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
  }

  if (!pageData) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="App">
      <NotionDocumentPage pageData={pageData} />
    </div>
  );
}

export default NotionPage;