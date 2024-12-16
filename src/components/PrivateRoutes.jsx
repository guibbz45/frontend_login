import { Navigate } from 'react-router-dom';
import  { useAuth } from "../AuthProvider";
import Layout from './Layout';


const PrivateRoutes =() => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Layout/> : <Navigate to="/login"/>
};

export default PrivateRoutes;