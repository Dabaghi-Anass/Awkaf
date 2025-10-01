// First, create the ScrollToTop component
// Create a new file: Components/ScrollToTop.jsx
// Updated main.jsx with ScrollToTop integration
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import About from './pages/About/About.jsx'
import Home from './pages/Home.jsx';
import ZakatCal from './pages/ZakatCalculator/ZakatCal.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { Admin } from './pages/Admin.jsx';
import { DashboardAdmin } from './pages/DashboardAdmin.jsx';
import { ZakatProvider } from './Components/ZakatProvider.jsx';
import { AdminRegister } from './pages/AdminRegister.jsx';
import { AdminLogin } from './pages/AdminLogin.jsx';
import { Contact } from './pages/Contact/Contact.jsx';
import { WakfP } from './pages/WakfP.jsx';
import { ManageAwkaf } from './pages/ManageAwkaf.jsx';
import App from './App.jsx';
import { ProtectedRoute } from './ProtectedRoutes.jsx';
import { Contribution } from './pages/Contribution.jsx';
import UserHistory from './pages/UserHistory.jsx';
import { AdminProvider } from './Components/AdminProvider.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import { ForgotPassword } from './Components/ForgotPassword.jsx';
import ZakatSelectionPage from './Components/ZakatSelectionPage.jsx';
import { Settings } from './Components/Settings.jsx';
import { UserInfos } from './Components/UserInfos.jsx';
import { PrivateRouterAdmin } from './pages/PrivateRouterAdmin.jsx';

import "./i18n"; //
import ScrollToTop from './Components/ScrollToTop.jsx'; // Import the ScrollToTop component
import { Ma7acil } from './Components/Ma7acil.jsx';
import Awkaf from './pages/Awkaf.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <ScrollToTop><LoginPage /></ScrollToTop>,
  },
  {
    path: "*",
    element: <ScrollToTop><ErrorPage /></ScrollToTop>,
  },
  {
    path: "/forgot-password",
    element: <ScrollToTop><ForgotPassword /></ScrollToTop>,
  },
  {
    path: "Register/",
    element: <ScrollToTop><RegisterPage /></ScrollToTop>,
  },
  {
    path: "AdminLogin/",
    element: <ScrollToTop><AdminLogin /></ScrollToTop>,
  },
  {
    path: "AdminRegister/",
    element: <ScrollToTop><AdminRegister /></ScrollToTop>,
  },
  {
    path: "Home/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "settings-page/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "ZakatCalculator/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <ZakatCal />
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "userInfos/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <UserInfos/>
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "Awkaf/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Awkaf />
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "About/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <About />
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "Contact/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Contact />
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "userhistory/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <UserHistory />
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "DashboardAdmin/",
    element: (
      <ScrollToTop>
        <PrivateRouterAdmin>
          <DashboardAdmin />
        </PrivateRouterAdmin>
      </ScrollToTop>
    ),
  },
  {
    path: "manage-project/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <ManageAwkaf />
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "Contribution/",
    element: <ScrollToTop><Contribution /></ScrollToTop>,
  },
  {
    path: "kol/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <ZakatSelectionPage />
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "wakf/:id",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <WakfP />
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "Admin/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Admin />
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "ma7acil/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Ma7acil />
        </ProtectedRoute>
      </ScrollToTop>
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