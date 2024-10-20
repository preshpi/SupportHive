import { useSearchParams } from "react-router-dom";
import {
  applyActionCode,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth"; // Firebase imports
import { auth } from "../firebase";

const HandleFirebaseAction = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");
  const continueUrl = searchParams.get("continueUrl");

  // Handling different actions based on the 'mode'
  switch (mode) {
    case "resetPassword":
      // Redirect to reset password page
      handlePasswordReset(oobCode);
      break;

    case "verifyEmail":
      // Verify the email
      handleEmailVerification(oobCode);
      break;

    // You can add more cases for other actions like recoverEmail, etc.

    default:
      console.error("Unknown mode");
  }

  return <div>Handling Firebase Action...</div>;
};

// Function to handle password reset
const handlePasswordReset = async (oobCode: string | null) => {
  try {
    const email = await verifyPasswordResetCode(auth, oobCode as string);
    console.log("Verified email for password reset:", email);
    // Redirect to your custom reset password page, passing the oobCode
    window.location.href = `/reset-password?oobCode=${oobCode}`;
  } catch (error) {
    console.error("Error verifying password reset code:", error);
  }
};

// Function to handle email verification
const handleEmailVerification = async (oobCode: string | null) => {
  try {
    await applyActionCode(auth, oobCode as string);
    console.log("Email verified successfully");
    // Redirect to the dashboard or a success page
    window.location.href = "/email-verified-success";
  } catch (error) {
    console.error("Error verifying email:", error);
  }
};

export default HandleFirebaseAction;
