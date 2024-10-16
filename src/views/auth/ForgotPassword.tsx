import { useForm } from "react-hook-form";
import { Button } from "../../components/Button";
import Input from "../../components/Inputs";
import AuthLayout from "./Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgtPasswordSchema,
  TforgotPasswordSchema,
} from "../../types/auth/forgotPassword";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TforgotPasswordSchema>({
    resolver: zodResolver(forgtPasswordSchema),
  });

  const onSubmit = (data: TforgotPasswordSchema) => {
    console.log(data, "datatta");
    reset();
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
              onClick={handleSubmit(onSubmit)}
              className="bg-normal-300 text-white text-sm "
            >
              Recover Password
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
