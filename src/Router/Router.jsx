import { createBrowserRouter, Navigate } from "react-router";
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
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels";
import Payment from "../Pages/Dashboard/payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import ParcelTracking from "../Pages/Dashboard/ParcelTracking";
import UpdateProfile from "../Pages/Dashboard/UpdateProfile";
import PendingRiders from "../Pages/Dashboard/PendingRiders";
import ActiveRiders from "../Pages/Dashboard/ActiveRiders";
import InactiveRiders from "../Pages/Dashboard/InactiveRiders";
import ManageAdmins from "../Pages/Dashboard/ManageAdmins";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about-us",
        Component: AboutUs,
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: () => fetch("./warehouses.json"),
      },
      {
        path: "/pricing",
        Component: Pricing,
      },
      {
        path: "/become-rider",
        element: (
          <PrivateRoute>
            <BecomeRider></BecomeRider>
          </PrivateRoute>
        ),
        loader: () => fetch("./warehouses.json"),
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel></SendParcel>
          </PrivateRoute>
        ),
        loader: () => fetch("./warehouses.json"),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/forget-password",
        Component: ForgetPass,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "tracking",
        Component: ParcelTracking,
      },
      {
        path: "update-profile",
        Component: UpdateProfile,
      },
      {
        path: "pending-applications",
        Component: PendingRiders,
      },
      {
        path: "active-riders",
        Component: ActiveRiders,
      },
      {
        path: "inactive-riders",
        Component: InactiveRiders,
      },
      {
        path: "manage-admins",
        Component: ManageAdmins,
      },
    ],
  },
]);
