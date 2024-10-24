import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./views/auth/ResetPassword.jsx";
import ResetPasswordConfirm from "./views/auth/ResetPasswordConfirm.js";
import EmailVerification from "./views/auth/EmailVerification.js";
import CreateAccount from "./views/auth/CreateAccount.js";
import ForgotPassword from "./views/auth/ForgotPassword.js";
import VerificationSuccessful from "./views/auth/VerificationSuccessful.js";
import Login from "./views/auth/Login.js";
import LandingPage from "./views/LandingPage/index.js";
import Overview from "./views/Dashboard/Overview.js";
import Dashboardlayout from "./views/Dashboard/layout.js";
import Campaigns from "./views/Dashboard/Campaigns.js";
import Transactions from "./views/Dashboard/Transactions.js";
import Settings from "./views/Dashboard/Settings.js";
import ProtectedRoute from "./views/auth/ProtectedRoute.js";
import HandleFirebaseAction from "./components/HandleFirebaseAction.js";
import CampaignDetails from "./components/campaign/CampaignDetails.js";
import CreateCampaigns from "./components/campaign/CreateCampaigns.js";
import Donate from "./components/donate/donate.js";
import Profile from "./views/Dashboard/Profile.js";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* dashboard */}
        <Route element={<Dashboardlayout />}>
          <Route
            path="/dashboard/overview"
            element={
              <ProtectedRoute>
                <Overview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/campaigns"
            element={
              <ProtectedRoute>
                <Campaigns />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/campaigns/create"
            element={
              <ProtectedRoute>
                <CreateCampaigns />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<p>404 Not Found</p>} />
          <Route
            caseSensitive={false}
            path="/dashboard/campaign/:id"
            element={
              <ProtectedRoute>
                <CampaignDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/campaign/:id/donate"
            element={
              <ProtectedRoute>
                <Donate />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/transactions"
            element={
              <ProtectedRoute>
                <Transactions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Auth Routes */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password-confirm"
          element={<ResetPasswordConfirm />}
        />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/email-verified-success"
          element={<VerificationSuccessful />}
        />
        <Route path="/handle-action" element={<HandleFirebaseAction />} />

        {/* landing page */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
