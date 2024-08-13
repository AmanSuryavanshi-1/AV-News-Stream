import React from 'react'
import { useSelector } from 'react-redux'
import NewsCard from '../Components/NewsCard';

const Saved = () => {
  const newsArticles = useSelector((store)=>store.save.savedArticles);
  return (
    <div>
    <div className='p-10 m-10 text-center bg-white'>
        <h1 className='text-3xl'>Saved Articles</h1>
        <NewsCard itemCardsData={newsArticles}/>
      </div>
    </div>
  )
}

export default Saved
