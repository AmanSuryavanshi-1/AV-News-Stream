import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import News from './pages/News.jsx';
import Error from './Components/Error.jsx';
import Saved from './pages/Saved.jsx';
import Navbar from './Components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import NavbarCategorySearch from './Components/NavbarCategorySearch.jsx';

const AppLayout = () => {
  return (
    <div className='min-h-screen bg-primary-bgColor'>
        <Navbar/>
        <NavbarCategorySearch/>
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
      { path: "/", element: <HomePage/> },
      { path: "/about", element: <About/> },
      // { path: "/recommended", element: <Recommended /> },
      { path: "/contact", element: <Contact /> },
      { path: "/saved", element: <Saved /> }, //add news to fav to read it later
      { path: "/:category", element: <News /> },
     ],
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>,
)
