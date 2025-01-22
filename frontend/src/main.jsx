import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Project from './Components/Project.jsx'
import WakfPic from './Components/WakfPic.jsx'
import Awkaf from './pages/Awkaf.jsx'
import Login from './pages/Login.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx';
import ZakactCal from './pages/ZakactCal.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "About/",
    element: <About></About>,
  },
  {
    path: "Awkaf/",
    element: <Awkaf></Awkaf>,
  },
  {
    path: "ZakatCalculator/",
    element: <ZakactCal></ZakactCal>,
  },
  {
    path: "Login/",
    element: <Login></Login>,
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
