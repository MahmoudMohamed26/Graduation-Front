import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PrivateRoute = () => {
    const { isAuthenticated, authChecked } = useAuth();
  
    if (!authChecked) return null;
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  
  export default PrivateRoute;