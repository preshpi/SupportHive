import AuthSidebar from "./AuthSidebar";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="flex items-center justify-center w-full h-svh">
      <div className="h-full w-[60%]">
        <div className="h-full">
          <div className="px-[64px] pt-[56px]">
            <h1 className="text-normal-500 font-bold text-[20px] logo">
              SupportHive
            </h1>
          </div>

          {children}
        </div>
      </div>
      <div className="h-full w-[40%]">
        <AuthSidebar />
      </div>
    </main>
  );
};

export default AuthLayout;
