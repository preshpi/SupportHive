import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./Layout";
import { Button } from "../../components/Button";
import Input from "../../components/Inputs";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    

    
    if (email !== "test@gmail.com" || password !== "password123") {
      setErrorMessage("Incorrect email or password.");
      return;
    }

    
    setErrorMessage(null);
    console.log("Login successful!");
    
  };

  return (
    <AuthLayout>
      <div className="flex gap-y-10 flex-col items-start mt-[70px] max-w-[440px] mx-auto">
        <div className="text-black">
          <h2 className="text-[18px] font-bold">Welcome back!</h2>
          <p className="text-base">Log in to begin and manage your campaign</p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex flex-col gap-y-1">
              <Input
                name="email"
                label="Email Address"
                value={email}
                id="email"
                placeholder="Enter email address"
                type="email"
                autoComplete="on"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />

              <Input
               name="password"
                 label="Password"
                 value=""
                 id="password"
                 onChange={() => {}}
                 placeholder="Enter password"
                 type="password"
                 autoComplete="on"
                 password
              />
              
            </div>

            <button className="flex items-end justify-end text-sm w-full">
              Forgot Password?
            </button>
          </div>

         
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <div className="mt-[32px] space-y-4">
            <Button className="bg-normal-300 text-white text-sm">
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

export default Login;
