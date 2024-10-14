import { Button } from "../../components/Button";
import Input from "../../components/Inputs";
import AuthLayout from "./Layout";

const ForgotPassword = () => {
  return (
    <AuthLayout>
      <div className="flex gap-y-10 flex-col items-start mt-[90px] max-w-[440px] mx-auto">
        <div className="text-black ">
          <h2 className="text-[18px] font-bold">Forgot Password?</h2>
          <p className="text-base">
          Please enter your registered email address to reset your password
          </p>
        </div>

        <form className="w-full">
          <div className="space-y-4">
          <Input
              name="email"
              label="Email Address"
              value=""
              id="email"
              onChange={() => {}}
              placeholder="Enter email address"
              type="email"
              autoComplete="on"
            />
           
          </div>

          <div className="mt-[32px] space-y-4">
            <Button className="bg-normal-300 text-white text-sm ">
              Recover Password
            </Button>
           
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
