import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import Input from "../../components/Inputs";
import AuthLayout from "./Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgtPasswordSchema,
  TforgotPasswordSchema,
} from "../../types/auth/forgotPassword";
import { auth } from "../../firebase";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TforgotPasswordSchema>({
    resolver: zodResolver(forgtPasswordSchema),
  });

  const navigate = useNavigate();
  const onSubmit = async (data: TforgotPasswordSchema) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      reset();
      toast.success("Check your email for the password reset link!");
      navigate("/reset-password-confirm"); // Redirect to reset-password confirm screen
    } catch (error) {
      toast.error((error as { message: string }).message);
    }
  };

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
              label="Email Address"
              {...register("email")}
              id="email"
              placeholder="Enter email address"
              type="email"
              autoComplete="on"
            />

            {errors.email && (
              <span className="text-red-500 text-sm mt-2">{`${errors.email.message}`}</span>
            )}
          </div>

          <div className="mt-[32px] space-y-4">
            <Button
              disabled={isSubmitting}
              loading={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="bg-normal-300 text-white text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              Recover Password
            </Button>
          </div>
        </form>
        <Link to="/login" className="text-normal-300 text-center  underline">
          {" "}
          Back to login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
