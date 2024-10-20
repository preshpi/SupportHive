import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import Input from "../../components/Inputs";
import AuthLayout from "./Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordSchema,
  TResetPassword,
} from "../../types/auth/reset-password";
import { toast } from "sonner";
import { auth } from "../../firebase";
import { confirmPasswordReset } from "firebase/auth";

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TResetPassword>({ resolver: zodResolver(ResetPasswordSchema) });

  const location = useLocation();
  const navigate = useNavigate();

  // Parse the query string to get the oobCode
  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get("oobCode");

  const onSubmit = async (data: TResetPassword) => {
    if (oobCode) {
      try {
        await confirmPasswordReset(auth, oobCode, data.newPassword);
        reset();
        toast.success("Password reset successfully! You can now log in.");
        navigate("/login"); // Redirect to your login page or wherever you prefer
      } catch (error) {
        toast.error((error as { message: string }).message);
      }
    }
  };
  return (
    <AuthLayout>
      <div className="flex gap-y-10 flex-col items-start mt-[70px] max-w-[440px] mx-auto">
        <div className="text-black ">
          <h2 className="text-[18px] font-bold">Reset Password</h2>
          <p className="text-base">Log in to begin and manage your campaign</p>
        </div>

        <form className="w-full">
          <div className="space-y-4">
            <div className="flex flex-col gap-y-1">
              <Input
                label="New Password"
                id="new-password"
                {...register("newPassword")}
                autoComplete="on"
                placeholder="Enter new password"
                type="password"
                password
              />
              {errors.newPassword && (
                <span className="text-red-500 text-sm">{`${errors.newPassword.message}`}</span>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <Input
                label="Confirm Password"
                id="confirm-password"
                {...register("confirmPassword")}
                autoComplete="on"
                type="password"
                placeholder="Confirm password"
                password
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">{`${errors.confirmPassword.message}`}</span>
              )}
            </div>
            <button className="flex items-end justify-end text-sm w-full">
              <Link to="/forgot-password">Forgot Password?</Link>
            </button>
          </div>

          <div className="mt-[32px] space-y-4">
            <Button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="bg-normal-300 text-white text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Proceed
            </Button>
            <div className="text-sm flex items-center justify-center gap-x-2">
              <p className="text-black">Don't have an account?</p>
              <Link to="/signup" className="text-normal-300 underline">
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
