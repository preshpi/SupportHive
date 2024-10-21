import { useFormContext } from "react-hook-form";
import Input from "../Inputs";
import { Button } from "../Button";
import { TCampaignSchema } from "../../types/campaign";
import { useSelector } from "react-redux";
import { createCampaign } from "../../utils/requests/campaign.request";
import { RootState } from "../../redux/store";

interface ContactInformationProps {
  hideForm: () => void; // Add hideForm as a prop
}

const ContactInformation: React.FC<ContactInformationProps> = ({
  hideForm,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<TCampaignSchema>();

  const userDetails = useSelector((state: RootState) => state.user);

  const sanityID = userDetails.userDetails._id;

  const onSubmit = async (data: TCampaignSchema) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);

    const campaignData = {
      ...data,
      startDate,
      endDate,
      userId: sanityID,
      images: data.images
        ? Array.isArray(data.images)
          ? data.images
          : [data.images]
        : [],
      supportingDocuments: data.supportingDocuments
        ? Array.isArray(data.supportingDocuments)
          ? data.supportingDocuments
          : [data.supportingDocuments]
        : [],
    };

    if (sanityID) {
      await createCampaign(campaignData);
    }

    hideForm();
  };

  return (
    <div className="lg:w-[70%] space-y-5">
      <div className="flex flex-col gap-y-1">
        <Input
          label="Name"
          {...register("name")}
          placeholder="Enter your name"
          type="text"
          id="name"
          autoComplete="on"
        />
        {errors.name && (
          <span className="text-red-500 text-sm">{`${errors.name.message}`}</span>
        )}
      </div>

      <div className="flex flex-col gap-y-1">
        <Input
          label="Email Address"
          {...register("email")}
          placeholder="Enter your Email Address"
          type="text"
          id="email"
          autoComplete="on"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{`${errors.email.message}`}</span>
        )}
      </div>

      <div className="flex flex-col gap-y-1">
        <Input
          label="Phone Number"
          {...register("phone")}
          placeholder="Enter your phone number"
          type="text"
          id="number"
          autoComplete="on"
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">{`${errors.phone.message}`}</span>
        )}
      </div>

      <div className="flex gap-7 w-full items-center mt-5">
        {/* <div className="max-w-[200px]">
          <button className="rounded-lg w-full text-[#28A745] hover:bg-[#28A745] py-3 px-16 hover:text-[#FFFFFF] border-2 border-[#28A745] transition-colors duration-300 hover:border-[#28A745]">
            Preview
          </button>
        </div> */}

        <div className="w-[200px]">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="bg-normal-300 w-full  text-white text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Submit</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
