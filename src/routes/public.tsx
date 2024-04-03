import { RouteObject } from "react-router-dom";
import MainAppPage from "../pages/app";
import LoginPage from "../pages/login";
import ForgotPasswordPage from "@/pages/forgot-password";

export const publicRoutes: RouteObject[] = [
    {
        path: "/",
        element: <MainAppPage />,
    },
    {
        path: 'login',
        element: <LoginPage />
    },
    {
        path: 'forgot-password',
        element: <ForgotPasswordPage />
    },
];
