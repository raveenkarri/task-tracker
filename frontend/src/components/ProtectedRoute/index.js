import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie"

const ProtectedRoute = () =>{
    const token = Cookies.get("jwtToken")

    return token ? <Outlet/> : <Navigate to="/login" replace/>
 
}
export default ProtectedRoute