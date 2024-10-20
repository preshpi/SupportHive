import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import Input from "../../components/Inputs";
import AuthLayout from "./Layout";
import { useForm } from "react-hook-form";
import {
  createAccountSchema,
  TcreateAccountSchema,
} from "../../types/auth/createAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "sonner";
import { createUserOnSanity } from "../../utils/requests/user.request";
import { useAppDispatch } from "../../hook/redux.hook";

const CreateAccount = () => {
  const router = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TcreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
  });

  const onSubmit = async (data: TcreateAccountSchema) => {
    const { firstname, lastname, gender, email, terms, password } = data;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const { uid, email: userEmail, emailVerified } = user;

      if (uid) {
        const userData = {
          uid,
          firstname,
          lastname,
          email: userEmail,
          gender,
          terms,
          emailVerified: emailVerified,
        };

        const res = await createUserOnSanity({ userData, dispatch, router });

        if (res?.success) {
          // Send email verification
          await sendEmailVerification(user);

          // Notify the user and redirect to email verification page
          toast.success("Account created! Please verify your email.");
          reset();

          // Redirect to the email verification page
          router("/email-verification");
          reset();
        }
      }
    } catch (error) {
      toast.error((error as { message: string }).message);
    }
  };
  return (
    <AuthLayout>
      <div className="flex gap-y-10 flex-col items-start my-[40px] max-w-[440px] mx-auto">
        <div className="text-black">
          <h2 className="text-[18px] font-bold">Welcome to SupportHive</h2>
          <p className="text-base">Get started by creating an account.</p>
        </div>

        <form className="w-full">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex flex-col gap-y-1">
                <Input
                  label="First Name"
                  id="first-name"
                  {...register("firstname")}
                  placeholder="Enter first name"
                  type="text"
                  autoComplete="on"
                />
                {errors.firstname && (
                  <span className="text-red-500 text-sm">{`${errors.firstname.message}`}</span>
                )}
              </div>

              <div className="flex flex-col gap-y-1">
                <Input
                  label="Last Name"
                  {...register("lastname")}
                  id="last-name"
                  placeholder="Enter last name"
                  type="text"
                  autoComplete="on"
                />
                {errors.lastname && (
                  <span className="text-red-500 text-sm">{`${errors.lastname.message}`}</span>
                )}
              </div>
            </div>

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
                label="Gender"
                id="gender"
                {...register("gender")}
                placeholder="Select option"
                type="select"
                options={["Male", "Female", "Other"]}
                autoComplete="on"
              />
              {errors.gender && (
                <span className="text-red-500 text-sm">{`${errors.gender.message}`}</span>
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

            <div className="flex flex-col gap-y-1">
              <Input
                label="Confirm Password"
                {...register("confirmPassword")}
                id="confirm-password"
                placeholder="Confirm password"
                type="password"
                autoComplete="on"
                password
              />

              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">{`${errors.confirmPassword.message}`}</span>
              )}
            </div>
          </div>
          <div className="flex gap-2 text-black text-sm pt-3">
            <input type="checkbox" {...register("terms")} id="terms" />
            <p>
              I accept SupportHive's <b>Term of Service</b> and{" "}
              <b>Privacy Policy</b>.
            </p>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-2">{errors.terms.message}</p>
          )}

          <div className="mt-[32px] space-y-4">
            <Button
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="bg-normal-300 text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Proceed
            </Button>
            <div className="text-sm flex items-center justify-center gap-x-2">
              <p className="text-black">Already have an account?</p>
              <Link to="/login" className="text-normal-300 underline">
                Log in.
              </Link>
            </div>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default CreateAccount;
