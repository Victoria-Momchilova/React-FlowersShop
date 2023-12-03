import { useContext } from "react";
import AuthContext from "../contexts/authContext";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
    const {isAuth} = useContext(AuthContext);

    if(!isAuth) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}