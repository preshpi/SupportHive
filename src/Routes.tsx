import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./views/auth/ResetPassword.jsx";
import ResetPasswordConfirm from "./views/auth/ResetPasswordConfirm.js";
import EmailVerification from "./views/auth/EmailVerification.js";
import CreateAccount from "./views/auth/CreateAccount.js";
import ForgotPassword from "./views/auth/ForgotPassword.js";
import Login from './views/auth/login.js'
import VerificationSuccessful from "./views/auth/VerificationSuccessful.js";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/reset-password-confirm"
          element={<ResetPasswordConfirm />}
        />
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Verification-successful" element={ <VerificationSuccessful />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
