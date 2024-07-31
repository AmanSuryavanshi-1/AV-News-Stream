import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import News from './pages/News.jsx';
import Error from './Components/Error.jsx';
import Saved from './pages/Saved.jsx';
import Navbar from './Components/Navbar.jsx';
import Notes from './pages/Notes.jsx';
import Auth from './pages/Auth.jsx';

const AppLayout = () => {
  return (
    <div className='min-h-screen bg-primary-bgColor'>
        <Navbar/>
        <Outlet /> 
        {/* <Footer/> */}
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      // { path: "", element: <HomePage/> },
      { path: "", element: <News/> },
      { path: "/about", element: <About/> },
      { path: "/notes", element: <Notes /> },
      { path: "/auth", element: <Auth /> },
      { path: "/contact", element: <Contact /> },
      { path: "/saved", element: <Saved /> }, //add news to fav to read it later
      { path: "/news/:category", element: <News /> }
     ],
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>,
)
