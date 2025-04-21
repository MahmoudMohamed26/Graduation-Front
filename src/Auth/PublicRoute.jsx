import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';


const PublicRoute = ({ children }) => {
    const { isAuthenticated, authChecked } = useAuth();
  
    if (!authChecked) return null;
  
    return isAuthenticated ? <Navigate to="/dashboard" /> : children;
  };
  
export default PublicRoute;
