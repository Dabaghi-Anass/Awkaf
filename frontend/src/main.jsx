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
import { Login  } from '../src/Login/Login.jsx'
import App from './App.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "About/",
    element: <About />,
  },
  {
    path: "Contact/",
    element: <Contact />,
  },
  {
    path: "Awkaf/",
    element: <Awkaf />,
  },
  {
    path: "ZakatCalculator/",
    element: <ZakatCal />,
  },
  {
    path: "Login/",
    element: <LoginPage />,
  },
  {
    path: "kol/",
    element: <Login />,
  },
  {
    path: "Register/",
    element: <RegisterPage />,
  },
  {
    path: "Form/",
    element: <TestForm />,
  },
  {
    path: "test/",
    element: <ManageAwkaf />,
  },
  {
    path: "Admin/",
    element: <Admin />,
  },
  {
    path: "wakf/:id",  // ✅ Dynamic route to handle specific project ID
    element: <WakfP />,
  },
  {
    path: "AdminRegister/",
    element: <AdminRegister />,
  },
  {
    path: "AdminLogin/",
    element: <AdminLogin />,
  },
  {
    path: "app/",
    element: <App />,
  },
]);
 




createRoot(document.getElementById('root')).render(
  
    <ZakatProvider>  {/* 🔥 Now, all pages inside the router have access to ZakatContext */}
      <RouterProvider router={router} />
    </ZakatProvider>
  )