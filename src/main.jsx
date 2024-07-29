import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import News from './pages/News.jsx';
import Error from './Components/Error.jsx';

const apiKey = import.meta.env.VITE_API_KEY;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // { path: "/", element: <Body /> },
      { path: "/about", element: <About/> },
      // { path: "/recommended", element: <Recommended /> },
      { path: "/contact", element: <Contact /> },
      { path: "/fav", element: <News /> },
      // { path: "/entertainment", element: <News   apiKey={apiKey} key="entertainment" pageSize={pageSize} country={country} category="entertainment" />},
      // { path: "/business", element: <News   apiKey={apiKey} key="business" pageSize={pageSize} country={country} category="business" />},
      // { path: "/health", element: <News    apiKey={apiKey} key="health" pageSize={pageSize} country={country} category="health" />},
      // { path: "/science", element: <News   apiKey={apiKey} key="science" pageSize={pageSize} country={country} category="science" />},
      // { path: "/sports", element: <News   apiKey={apiKey} key="sports" pageSize={pageSize} country={country} category="sports" />},
      // { path: "/technology", element: <News   apiKey={apiKey} key="technology" pageSize={pageSize} country={country} category="technology" />},
    ],
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={appRouter}/>
  </React.StrictMode>,
)
