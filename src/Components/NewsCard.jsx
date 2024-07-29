import React from 'react'

const NewsCard = ({ newsInfo }) => {
  const { title, description, content, urlToImage, source, author, publishedAt, url } = newsInfo;
console.log(description)
  // Function to truncate text
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden">
      <figure className="relative">
        <img
          src={urlToImage || 'https://placehold.co/600x400'}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 badge badge-secondary text-xs font-bold">
          {source?.name || 'News Source'}
        </div>
        {content && content.includes('Breaking') && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs font-bold rounded">
            BREAKING NEWS
          </div>
        )}
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold mb-2">{truncate(title, 60)}</h2>
        <p className="text-sm mb-4">{truncate(description, 100)}</p>
        <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
          <span>{author ? `By ${author}` : 'Unknown Author'}</span>
          <span>{formatDate(publishedAt)}</span>
        </div>
        <div className="card-actions justify-between items-center">
          <div className="flex flex-wrap gap-2">
            {content && content.split(' ').slice(0, 3).map((tag, index) => (
              <div key={index} className="badge badge-outline">{tag}</div>
            ))}
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
            Read More
          </a>
        </div>
      </div>
    </div>
  )
}

export default NewsCard