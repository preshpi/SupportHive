import AuthSidebar from "./AuthSidebar";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <main className="flex items-center justify-center w-full h-svh">
      <div className="h-full w-[60%]">{children}</div>
      <div className="h-full w-[40%]">
        <AuthSidebar />
      </div>
    </main>
  );
};

export default AuthLayout;
