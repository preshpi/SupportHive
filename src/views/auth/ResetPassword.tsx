import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import Input from "../../components/Inputs";
import AuthLayout from "./Layout";

const ResetPassword = () => {
  return (
    <AuthLayout>
      <div className="flex gap-y-10 flex-col items-start mt-[90px] max-w-[440px] mx-auto">
        <div className="text-black ">
          <h2 className="text-[18px] font-bold">Reset Password</h2>
          <p className="text-base">Log in to begin and manage your campaign</p>
        </div>

        <form className="w-full">
          <div className="space-y-4">
            <Input
              name="new-password"
              label="New Password"
              value=""
              id="new-password"
              onChange={() => {}}
              autoComplete="on"
              placeholder="Enter new password"
              type="password"
              password
            />
            <Input
              name="new-password"
              label="Confirm Password"
              value=""
              id="new-password"
              onChange={() => {}}
              autoComplete="on"
              type="password"
              placeholder="Confirm password"
              password
            />
            <button className="flex items-end justify-end text-sm w-full">
              Forgot Password?
            </button>
          </div>

          <div className="mt-[32px] space-y-4">
            <Button className="bg-normal-300 text-white text-sm ">
              Proceed
            </Button>
            <div className="text-sm flex items-center justify-center gap-x-2">
              <p className="text-black">Don't have an account?</p>
              <Link to="/sign-up" className="text-normal-300 underline">
                {" "}
                Create Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
