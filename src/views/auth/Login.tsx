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
import { getUserOnSanity } from "../../utils/requests/user.request";
import { useAppDispatch } from "../../hook/redux.hook";
import { config } from "../../helpers/config";
import Cookies from "js-cookie";
import { getErrorMessage } from "../../utils/errorMapping";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TLogin>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = async (data: TLogin) => {
    const { email, password } = data;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const { uid } = user;

      if (uid) {
        const sanityFetched = await getUserOnSanity({ email, dispatch });
        if (sanityFetched?.success) {
          toast.success("Login Successful");
          reset();
          Cookies.set(config.key.userId, uid);
          const getLastPageVisit = Cookies.get(config.key.lastPath);
          if (getLastPageVisit) {
            navigate(getLastPageVisit);
            return;
          }
          navigate("/dashboard/overview");
        }
      }
    } catch (err: any) {
      const errMsg = getErrorMessage(err?.code);
      toast.error(errMsg);
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

            <button className="flex items-end justify-end text-sm w-full hover:underline transition-all duration-300">
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
