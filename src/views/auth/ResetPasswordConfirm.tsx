import { Link } from "react-router-dom";
import AuthLayout from "./Layout";

const ResetPasswordConfirm = () => {
  return (
    <AuthLayout>
      <div className="flex gap-y-10 flex-col items-start mt-[90px] max-w-[440px] mx-auto">
        <div className="text-black ">
          <h2 className="text-[18px] font-bold">Forgot Password</h2>
          <p className="text-base">
            Please enter your registered email address to reset your password
          </p>
        </div>

        <div className="border-light-50 w-full bg-normal-300/5 text-center border py-5 px-3 rounded-lg">
          <p className="text-normal-300 text-base">
            Reset password link sent successfully
          </p>
        </div>

        <p className="text-base text-black">
          A link to reset your password has been sent to your email
        </p>

        <div className="text-sm flex items-center justify-center gap-x-1">
          <p className="text-black">Already have an account?</p>
          <Link to="/sign-up" className="text-normal-300 underline">
            {" "}
            Log in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPasswordConfirm;
