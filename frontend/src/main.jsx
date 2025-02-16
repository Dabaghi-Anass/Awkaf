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
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { CompanyPic } from './Components/CompanyPic.jsx';
import { Zakat1 } from './Components/Zakat1.jsx';
import { Zakat2 } from './Components/Zakat2.jsx';
import { Admin } from './pages/Admin.jsx';
import { ZakatForm } from './Components/ZakatForm.jsx';



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
    path: "Form/",
    element: <ZakatForm></ZakatForm>,
  },
  {
    path: "test/",
    element: <Zakat2></Zakat2>,
  },
  {
    path: "Admin/",
    element: <Admin></Admin>,
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router} />
  </StrictMode>,
)
