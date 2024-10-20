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
import Creator from "./components/campaign/Creator.js";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* dashboard */}

        <Route element={<Dashboardlayout />}>
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route path="/dashboard/campaigns" element={<Campaigns />} />
          <Route path="/dashboard/transactions" element={<Transactions />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/campaigns/creator" element={<Creator />} />
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
          path="/Verification-successful"
          element={<VerificationSuccessful />}
        />

        {/* landing page */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
