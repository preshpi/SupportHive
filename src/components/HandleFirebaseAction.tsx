import { useSearchParams } from "react-router-dom";
import { applyActionCode, verifyPasswordResetCode } from "firebase/auth"; // Firebase imports
import { auth } from "../firebase";
import { toast } from "sonner";

const HandleFirebaseAction = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const oobCode = searchParams.get("oobCode");

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
      toast.error("Unknown mode");
  }

  return <div>Handling Firebase Action...</div>;
};

// Function to handle password reset
const handlePasswordReset = async (oobCode: string | null) => {
  try {
    await verifyPasswordResetCode(auth, oobCode as string);
    window.location.href = `/reset-password?oobCode=${oobCode}`;
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};

// Function to handle email verification
const handleEmailVerification = async (oobCode: string | null) => {
  try {
    await applyActionCode(auth, oobCode as string);
    window.location.href = "/email-verified-success";
  } catch (error) {
    toast.error((error as { message: string }).message);
  }
};

export default HandleFirebaseAction;
