import Imagedndnd from "../../assets/union.svg";

const AuthSidebar = () => {
  return (
    <main className="w-full h-full bg-[#28A745]/15 flex items-center justify-center">
      <div className="px-[50px]">
        <h1 className="text-[#4F4F4F] font-bold text-[32px]">
          Empowering Ideas, One Contribution at a Time
        </h1>
        <p className="text-base pt-1 text-[#333333]">
          Join a community of changemakers and fuel the future.
        </p>

        <img src={Imagedndnd} width={300} height={300} alt="support-img" />
      </div>
    </main>
  );
};

export default AuthSidebar;