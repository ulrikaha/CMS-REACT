import authService from "../services/authService";
import { Navigate, useLocation } from "react-router-dom";


const ProtectedRoute = ({ children }) => {

const location = useLocation();
const autenticated = authService.isAuthenticated();

return autenticated 
? children
: <Navigate to="/login" replace state={{ from: location.pathname}}/>



}


export default ProtectedRoute; 