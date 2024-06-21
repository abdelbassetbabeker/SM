import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRole }) => {

    const { userInfo } = useSelector(state => state.userLogin);
    return (
        userInfo
            ? <Outlet />
            : <Navigate to="/login" />
    );
}



export default RequireAuth;