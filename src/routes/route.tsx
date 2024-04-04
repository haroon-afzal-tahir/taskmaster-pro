import { RouteObject } from "react-router-dom";
import MainAppPage from "../pages/app";
import LoginPage from "../pages/login";
import ForgotPasswordPage from "@/pages/forgot-password";
import RegisterPage from "@/pages/register";
import { PrivateRoute } from "./private";

export const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <PrivateRoute />,
        children: [
            {
                path: "/",
                element: <MainAppPage />
            }
        ]
    },
    {
        path: 'login',
        element: <LoginPage />
    },
    {
        path: 'forgot-password',
        element: <ForgotPasswordPage />
    },
    {
        path: 'register',
        element: <RegisterPage />
    }
];
