import { EditProfileProps } from "../../types/settings";
import { Button } from "../Button";
import Input from "../Inputs";

const EditProfile = ({
  register,
  errors,
  handleSubmit,
  onSubmit,
  isSubmitting,
}: EditProfileProps) => {
  return (
    <form className="flex flex-col max-w-[440px] gap-y-6 gap-x-4">
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
      <div className="max-w-[200px]">
        <Button
          disabled={isSubmitting}
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className="bg-normal-300 text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save Changes{" "}
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
