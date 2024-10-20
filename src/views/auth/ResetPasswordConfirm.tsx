import { Link } from "react-router-dom";
import AuthLayout from "./Layout";
import { Button } from "../../components/Button";
import { auth } from "../../firebase";
import { toast } from "sonner";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPasswordConfirm = () => {
  const user = auth.currentUser;
  const email = user ? user.email : null;

  const handleResendLink = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success("Check your email for the password reset link!");
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    }
  };
  return (
    <AuthLayout>
      <div className="flex gap-y-10 flex-col items-start mt-[90px] max-w-[440px] mx-auto">
        <div className="text-black ">
          <h2 className="text-[18px] font-bold">Forgot Password</h2>
          <p className="text-base">Don't panic, it happens to most of us. </p>
        </div>

        <div className="border-light-50 w-full bg-normal-300/5 text-center border py-5 px-3 rounded-lg">
          <p className="text-normal-300 text-base">
            Reset password link sent successfully
          </p>
        </div>

        <p className="text-base text-black">
          A link to reset your password has been sent to your email
        </p>
        <div className="space-y-4 w-full">
          <Button
            onClick={handleResendLink}
            className="bg-normal-300 text-white text-sm "
          >
            Resend Link
          </Button>
          <div className="text-sm flex items-center justify-center gap-x-1">
            <p className="text-black">Already have an account?</p>
            <Link to="/login" className="text-normal-300 underline">
              {" "}
              Log in
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordConfirm;
