import { CookieHelper } from "@/utils/cookie"
import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoute: React.FC = () => {
    const isAuthenticated = CookieHelper.getCookie('token')
    if (!isAuthenticated) {
        return <Navigate to='/login' />
    }
    return <Outlet />
}
