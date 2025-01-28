import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Project from './Components/Project.jsx'
import WakfPic from './Components/WakfPic.jsx'
import Awkaf from './pages/Awkaf.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx';
import ZakatCal from './pages/ZakatCal.jsx';
import { Header } from './Components/Header.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';




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
    element: <ZakatCal></ZakatCal>,
  },
  {
    path: "Login/",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "Register/",
    element: <RegisterPage></RegisterPage>,
  },
  {
    path: "Header/",
    element: <Header></Header>,
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
