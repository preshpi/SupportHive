import { SecurityProps } from "../../types/settings";
import { Button } from "../Button";
import Input from "../Inputs";

const Security = ({
  registerSecurity,
  errorSecurity,
  handleSubmitSecurity,
  onSecuritySubmit,
  isSubmittingSecurity,
}: SecurityProps) => {
  return (
    <form className="flex flex-col max-w-[440px] gap-y-6 gap-x-4">
      <div className="flex flex-col gap-y-1">
        <Input
          label="Current Password"
          id="currentPassword"
          {...registerSecurity("currentPassword")}
          placeholder="Enter password"
          type="password"
          autoComplete="on"
          password
        />
        {errorSecurity.currentPassword && (
          <span className="text-red-500 text-sm">{`${errorSecurity.currentPassword.message}`}</span>
        )}
      </div>

      <div className="flex flex-col gap-y-1">
        <Input
          label="New Password"
          {...registerSecurity("password")}
          id="password"
          placeholder="Enter new password"
          type="password"
          autoComplete="on"
          password
        />

        {errorSecurity.password && (
          <span className="text-red-500 text-sm">{`${errorSecurity.password.message}`}</span>
        )}
      </div>
      <div className="flex flex-col gap-y-1">
        <Input
          label="Confirm Password"
          {...registerSecurity("confirmPassword")}
          id="confirm-password"
          placeholder="Confirm password"
          type="password"
          autoComplete="on"
          password
        />

        {errorSecurity.confirmPassword && (
          <span className="text-red-500 text-sm">{`${errorSecurity.confirmPassword.message}`}</span>
        )}
      </div>
      <div className="max-w-[200px] ">
        <Button
          disabled={isSubmittingSecurity}
          onClick={handleSubmitSecurity(onSecuritySubmit)}
          loading={isSubmittingSecurity}
          className="bg-normal-300 w-full  text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save Changes{" "}
        </Button>
      </div>
    </form>
  );
};

export default Security;
