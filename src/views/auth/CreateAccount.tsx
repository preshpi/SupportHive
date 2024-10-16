import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import Input from "../../components/Inputs";
import AuthLayout from "./Layout";

const CreateAccount = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("Male"); // Default to Male
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; confirmPassword?: string }>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); 

    
    if (!email.includes('@') || !email.includes('.')) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      return;
    }

    
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    
    console.log("Account created:", { firstName, lastName, email, gender, password });
  };

  return (
    <AuthLayout>
      <div className="flex gap-y-10 flex-col items-start my-[40px] max-w-[440px] mx-auto">
        <div className="text-black">
          <h2 className="text-[18px] font-bold">Welcome to SupportHive</h2>
          <p className="text-base">Get started by creating an account.</p>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input
                name="first-name"
                label="First Name"
                value={firstName}
                id="first-name"
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                type="text"
                autoComplete="on"
              />
              <Input
                name="last-name"
                label="Last Name"
                value={lastName}
                id="last-name"
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                type="text"
                autoComplete="on"
              />
            </div>
            <Input
              name="email"
              label="Email Address"
              value={email}
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              type="email"
              autoComplete="on"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            
            <Input
              name="gender"
              label="Gender"
              value={gender}
              id="gender"
              onChange={(e) => setGender(e.target.value)}
              placeholder="Select option"
              type="select"
              options={["Male", "Female", "Other"]}
              autoComplete="on"
            />
            <Input
              name="password"
              label="Password"
              value={password}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              type="password"
              autoComplete="on"
              password
            />
            <Input
              name="confirm-password"
              label="Confirm Password"
              value={confirmPassword}
              id="confirm-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              type="password"
              autoComplete="on"
              password
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
          </div>
          <div className="flex gap-2 text-black text-sm pt-3">
            <input type="checkbox" name="" id="" />
            <p>I accept SupportHive’s <b>Term of Service</b> and <b>Privacy Policy</b>.</p>
          </div>

          <div className="mt-[32px] space-y-4">
            <Button className="bg-normal-300 text-white text-sm">
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
