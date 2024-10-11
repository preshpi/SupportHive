import { Link } from "react-router-dom";
import AuthLayout from "./Layout";
import { Button } from "../../components/Button";

const EmailVerification = () => {
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
          <Button className="bg-normal-300 text-white text-sm ">
            Resend Link
          </Button>
          <div className="text-sm flex items-center justify-center gap-x-1">
            <p className="text-black">Already have an account?</p>
            <Link to="/sign-up" className="text-normal-300 underline">
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
