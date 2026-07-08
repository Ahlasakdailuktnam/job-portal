import { Navigate } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ProtectedRole = ({ children, roles = [] }) => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRole;