
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
    path: "manage-project/",
    element: <ManageAwkaf />,
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
    element: <AdminFormBuilder />,
  },
  {
    path: "Register/",
    element: <RegisterPage />,
  },
  {
    path: "userhistory/",
    element: <UserHistory />,
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
    path: "Contribution/",
    element: <Contribution />,
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
  <ZakatProvider>  
    <AdminProvider>  {/* ✅ Now, all pages inside have access to both contexts */}
      <RouterProvider router={router} />
    </AdminProvider>
  </ZakatProvider>
);
