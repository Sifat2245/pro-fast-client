import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ForgetPass from "../Pages/FOrget/ForgetPass";
import AboutUs from "../Pages/AboutUs/AboutUs";
import Coverage from "../Pages/Coverage/Coverage";
import Pricing from "../Pages/Pricing/Pricing";
import BecomeRider from "../Pages/BecomeRider/BecomeRider";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: '/about-us',
                Component: AboutUs
            },
            {
                path: '/coverage',
                Component: Coverage
            },
            {
                path: '/pricing',
                Component: Pricing
            },
            {
                path: '/become-rider',
                Component: BecomeRider
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children:[
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            },
            {
                path: '/forget-password',
                Component: ForgetPass
            }
        ]
    }
])