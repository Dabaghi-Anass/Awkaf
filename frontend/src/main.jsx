import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import About from './pages/About/About.jsx'
import Home from './pages/Home.jsx';
import ZakatCal from './pages/ZakatCalculator/ZakatCal.jsx';

import { RegisterPage } from './pages/Register/RegisterPage.jsx';

import { DashboardAdmin } from './pages/AdminDashboard/DashboardAdmin.jsx';
import { ZakatProvider } from './Components/ZakatProvider.jsx';
import { AdminRegister } from './pages/AdminRegister.jsx';
import { AdminLogin } from './pages/AdminLogin.jsx';
import { Contact } from './pages/Contact/Contact.jsx';
import { WakfP } from './pages/WakfProject/WakfP.jsx';
import { ManageAwkaf } from './pages/AdminDashboard/Components/ManageAwkaf.jsx';

import { ProtectedRoute } from './ProtectedRoutes.jsx';
import { Contribution } from './pages/Contribution.jsx';
import UserHistory from './pages/UserHistory.jsx';
import { AdminProvider } from './Components/AdminProvider.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import { ForgotPassword } from './Components/ForgotPassword.jsx';
import ZakatSelectionPage from './Components/Unused/ZakatSelectionPage.jsx';
import { Settings } from './pages/AdminDashboard/Components/Settings.jsx';
import { UserInfos } from './pages/UserInfos.jsx';
import { PrivateRouterAdmin } from './PrivateRouterAdmin.jsx';
import {HomePage} from './pages/HomePage.jsx'
import "./i18n";
import ScrollToTop from './Components/ScrollToTop.jsx';
import { Ma7acil } from './Components/Ma7acil.jsx';
import Awkaf from './pages/Awkaf/Awkaf.jsx';
import Ma7acilHistory from './pages/Ma7acilHistory.jsx';
import { LanguageProvider } from './Components/LanguageProvider.jsx';
import Layout from './Layout.jsx'; 

import { ApiProvider } from './ApiProvider.jsx';
import "./index.css";
import { LoginPage } from './pages/Login/LoginPage.jsx';
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
          <Layout>
            <Home />
          </Layout>
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "zakat-corps-history/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Layout>
            <Ma7acilHistory />
          </Layout>
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "settings-page/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Layout>
            <HomePage />
          </Layout>
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "ZakatCalculator/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Layout>
            <ZakatCal />
          </Layout>
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "userInfos/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Layout>
            <UserInfos/>
          </Layout>
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "Awkaf/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Layout>
            <Awkaf />
          </Layout>
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "About/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Layout>
            <About />
          </Layout>
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "Contact/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Layout>
            <Contact />
          </Layout>
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "userhistory/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Layout>
            <UserHistory />
          </Layout>
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
    element: (
      <ScrollToTop>
        <Layout>
          <Contribution />
        </Layout>
      </ScrollToTop>
    ),
  },
  {
    path: "kol/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Layout>
            <ZakatSelectionPage />
          </Layout>
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  {
    path: "wakf/:id",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Layout>
            <WakfP />
          </Layout>
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
  
  {
    path: "ma7acil/",
    element: (
      <ScrollToTop>
        <ProtectedRoute>
          <Layout>
            <Ma7acil />
          </Layout>
        </ProtectedRoute>
      </ScrollToTop>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  <ApiProvider>
  <LanguageProvider>
    <ZakatProvider>  
      <AdminProvider>  
        <RouterProvider router={router} />
      </AdminProvider>
    </ZakatProvider>
  </LanguageProvider>
  </ApiProvider>
);