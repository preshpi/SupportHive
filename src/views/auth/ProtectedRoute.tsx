// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn); // Adjust based on your Redux state

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
