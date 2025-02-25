import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
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
import { TestForm } from './Components/TestForm.jsx';
import { ZakatInputs } from './Components/ZakatInputs.jsx';
import { RapportCal } from './Components/RapportCal.jsx';
import { DashboardAdmin } from './pages/DashboardAdmin.jsx';
import { ZakatProvider } from './Components/ZakatProvider.jsx';
import { AdminRegister } from './pages/AdminRegister.jsx';
import { AdminLogin } from './pages/AdminLogin.jsx';
import { Contact } from './pages/Contact.jsx';
import { WakfP } from './pages/WakfP.jsx';
import { ManageAwkaf } from './pages/ManageAwkaf.jsx';



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
    path: "Contact/",
    element: <Contact></Contact>,
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
    element: <TestForm></TestForm>,
  },
  {
    path: "test/",
    element: <ManageAwkaf></ManageAwkaf>,
  },
  {
    path: "Admin/",
    element: <Admin></Admin>,
  },
  {
    path: "wakf/",
    element: <WakfP></WakfP>,
  },
  {
    path: "AdminRegister/",
    element: <AdminRegister></AdminRegister>,
  },
  {
    path: "AdminLogin/",
    element: <AdminLogin></AdminLogin>,
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ZakatProvider>  {/* 🔥 Now, all pages inside the router have access to ZakatContext */}
      <RouterProvider router={router} />
    </ZakatProvider>
  </StrictMode>)