import { Link } from "react-router-dom";
import AuthSidebar from "./AuthSidebar";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="flex-grow h-full w-[60%] overflow-hidden lg:px-0 px-5">
        <div className="h-full overflow-y-auto no-scrollbar">
          <div className="lg:px-[64px] pt-[56px]">
            <h1 className="text-normal-500 font-bold text-[20px] logo">
              <Link to="/">SupportHive</Link>
            </h1>
          </div>

          {children}
        </div>
      </div>
      <div className="h-full w-[40%] hidden lg:block">
        <AuthSidebar />
      </div>
    </main>
  );
};

export default AuthLayout;
