import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./Layout";
import { Button } from "../../components/Button";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "sonner";
import { useEffect } from "react";

const EmailVerification = () => {
  const handleResendLink = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        await sendEmailVerification(user);
        toast.success("Verification email sent! Check your inbox.");
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;

    if (user && user.emailVerified) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <AuthLayout>
      <div className="flex gap-y-10 flex-col items-start mt-[90px] max-w-[440px] mx-auto">
        <div className="text-black ">
          <h2 className="text-[18px] font-bold">Email Verification</h2>
          <p className="text-base">
            Activate your account by verifying your email address{" "}
          </p>
        </div>
        <div className="border-light-50 w-full bg-normal-300/5 text-center border py-5 px-3 rounded-lg">
          <p className="text-normal-300 text-base">
            Your account was created successfully{" "}
          </p>
        </div>

        <p className="text-base text-black">
          Thanks for signing up! Please check your email and click the
          activation link to complete your account setup.{" "}
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

export default EmailVerification;
