import { Link } from "react-router-dom";
import { Button } from "../../components/Button";
import Input from "../../components/Inputs";
import AuthLayout from "./Layout";

const CreateAccount = () => {
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
              <Input
                name="first-name"
                label="First Name"
                value=""
                id="first-name"
                onChange={() => {}}
                placeholder="Enter first name"
                type="text"
                autoComplete="on"
              />
              <Input
                name="last-name"
                label="Last Name"
                value=""
                id="last-name"
                onChange={() => {}}
                placeholder="Enter last name"
                type="text"
                autoComplete="on"
              />
            </div>
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
            <Input
              name="gender"
              label="Gender"
              value=""
              id="gender"
              onChange={() => {}}
              placeholder="Select option"
              type="select"
              options={["Male", "Female", "Other"]}
              autoComplete="on"
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
            <Input
              name="confirm-password"
              label="Confirm Password"
              value=""
              id="confirm-password"
              onChange={() => {}}
              placeholder="Confirm password"
              type="password"
              autoComplete="on"
              password
            />
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
