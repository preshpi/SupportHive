import { MdMail } from "react-icons/md";

const Contact = () => {
  return (
    <div className="px-6 lg:px-20 w-full my-10 ">
      <div className="bg-[#EAF6EC] p-5 lg:p-[100px] rounded-xl flex flex-col items-center justify-center">
        <p className="text-normal-300 font-semibold text-base">Contact </p>
        <h3 className="font-bold text-[32px] pt-2">Get in Touch With Us</h3>
        <p className="text-[24px] font-medium text-center pt-6">
          3rd Floor, Nova Building, Off Awolowo Road, Ikoyi, Lagos.
        </p>
        <div className="flex items-center justify-center pt-3 gap-3 text-[24px] font-light text-center">
          <MdMail className="text-normal-300" />
          <a href="mailto:support@supporthive.com">support@supporthive.com</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
