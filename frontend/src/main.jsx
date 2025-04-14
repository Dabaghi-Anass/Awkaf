
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Awkaf from './pages/Awkaf.jsx'
import About from './pages/About.jsx'
import Home from './pages/Home.jsx';
import ZakatCal from './pages/ZakatCal.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { Admin } from './pages/Admin.jsx';
import { DashboardAdmin } from './pages/DashboardAdmin.jsx';
import { ZakatProvider } from './Components/ZakatProvider.jsx';
import { AdminRegister } from './pages/AdminRegister.jsx';
import { AdminLogin } from './pages/AdminLogin.jsx';
import { Contact } from './pages/Contact.jsx';
import { WakfP } from './pages/WakfP.jsx';
import { ManageAwkaf } from './pages/ManageAwkaf.jsx';
import App from './App.jsx';

import { ProtectedRoute } from './ProtectedRoutes.jsx';
import { Contribution } from './pages/Contribution.jsx';

import AdminFormBuilder from './Components/AdminFormBuilder.jsx';
import UserHistory from './pages/UserHistory.jsx';
import { AdminProvider } from './Components/AdminProvider.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import { ForgotPassword } from './Components/ForgotPassword.jsx';
import { Reports } from './Components/Reports.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "Register/",
    element: <RegisterPage />,
  },
  {
    path: "AdminLogin/",
    element: <AdminLogin />,
  },
  {
    path: "AdminRegister/",
    element: <AdminRegister />,
  },
  {
    path: "Home/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "ZakatCalculator/",
    element: (
      <ProtectedRoute>
        <ZakatCal />
      </ProtectedRoute>
    ),
  },
  {
    path: "Awkaf/",
    element: (
      <ProtectedRoute>
        <Awkaf />
      </ProtectedRoute>
    ),
  },
  {
    path: "About/",
    element: (
      <ProtectedRoute>
        <About />
      </ProtectedRoute>
    ),
  },
  {
    path: "Contact/",
    element: (
      <ProtectedRoute>
        <Contact />
      </ProtectedRoute>
    ),
  },
  {
    path: "userhistory/",
    element: (
      <ProtectedRoute>
        <UserHistory />
      </ProtectedRoute>
    ),
  },
  {
    path: "DashboardAdmin/",
    element: (
      <ProtectedRoute>
        <DashboardAdmin />
      </ProtectedRoute>
    ),
  },
  {
    path: "manage-project/",
    element: (
      <ProtectedRoute>
        <ManageAwkaf />
      </ProtectedRoute>
    ),
  },
  {
    path: "Contribution/",
    element: (
   
        <Contribution />
    
    ),
  },
  {
    path: "kol/",
    element: (
      <ProtectedRoute>
        <Reports />
      </ProtectedRoute>
    ),
  },
  {
    path: "wakf/:id",
    element: (
      <ProtectedRoute>
        <WakfP />
      </ProtectedRoute>
    ),
  },
  {
    path: "Admin/",
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "app/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
]);



createRoot(document.getElementById('root')).render(
  <ZakatProvider>  
    <AdminProvider>  
      <RouterProvider router={router} />
    </AdminProvider>
  </ZakatProvider>
);
