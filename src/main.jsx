import React, { lazy, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import News from './pages/News.jsx';
import Error from './Components/Error.jsx';
import Saved from './pages/Saved.jsx';
import Notes from './pages/Notes.jsx';
import Auth from './pages/Auth.jsx';
import AppLayout from './pages/AppLayout.jsx';
import YTNews from './pages/YTNews.jsx';
import ShimmerAbout from './pages/ShimmerAbout.jsx';
import NotionPage from './Components/NotionPage.jsx';

const About = lazy(() => import("./pages/About.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // { path: "", element: <HomePage/> },
      { path: "", element: <News/> },
      { path: "/about", 
        element: ( 
        <Suspense fallback={
            <div className="loading-fallback"> <ShimmerAbout/></div>}>
          <About/> 
        </Suspense>) 
      },
      { path: "/notes", element: <Notes /> },
      { path: "/auth", element: <Auth /> },
      { path: "/contact", element: <Contact /> },
      { path: "/saved", element: <Saved /> }, //add news to fav to read it later
      { path: "/news/:category", element: <News /> },
      { path: "/watchNews", element: <YTNews/> },
      { path: "/NotionPage", element: <NotionPage/> },
     ],
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>,
)
