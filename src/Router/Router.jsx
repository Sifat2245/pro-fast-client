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
import PrivateRoute from "../Routes/PrivateRoute";
import SendParcel from "../Pages/Send parcel/SendParcel";

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
                Component: Coverage,
                loader: () => fetch('./warehouses.json')
            },
            {
                path: '/pricing',
                Component: Pricing
            },
            {
                path: '/become-rider',
                Component: BecomeRider
            },
            {
                path: '/send-parcel',
                element: <PrivateRoute>
                    <SendParcel></SendParcel>
                </PrivateRoute>,
                loader: () => fetch('./warehouses.json')
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