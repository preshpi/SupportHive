import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./Layout";
import { Button } from "../../components/Button";
import Input from "../../components/Inputs";
import { useForm } from "react-hook-form";
import { LoginSchema, TLogin } from "../../types/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TLogin>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (data: TLogin) => {
    const { email, password } = data;
    console.log(data);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User signed in successfully!");
      reset();
      navigate("/dashboard/overview");
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <AuthLayout>
      <div className="flex gap-y-10 flex-col items-start mt-[70px] max-w-[440px] mx-auto">
        <div className="text-black">
          <h2 className="text-[18px] font-bold">Welcome back!</h2>
          <p className="text-base">Log in to begin and manage your campaign</p>
        </div>

        <form className="w-full">
          <div className="space-y-4">
            <div className="flex flex-col gap-y-1">
              <Input
                label="Email Address"
                {...register("email")}
                id="email"
                placeholder="Enter email address"
                type="email"
                autoComplete="on"
              />

              {errors.email && (
                <span className="text-red-500 text-sm">{`${errors.email.message}`}</span>
              )}
            </div>
            <div className="flex flex-col gap-y-1">
              <Input
                label="Password"
                id="password"
                {...register("password")}
                placeholder="Enter password"
                type="password"
                autoComplete="on"
                password
              />

              {errors.password && (
                <span className="text-red-500 text-sm">{`${errors.password.message}`}</span>
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

export default Login;
