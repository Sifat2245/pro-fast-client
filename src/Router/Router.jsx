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
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../Routes/AdminRoute";
import AssignRider from "../Pages/Dashboard/AssignRider";
import PendingDeliveries from "../Pages/Dashboard/PendingDeliveries";
import RiderRoute from "../Routes/RiderRoute";
import CompletedDeliveries from "../Pages/Dashboard/CompletedDeliveries";
import MyEarnings from "../Pages/Dashboard/MyEarnings";
import WithdrawalHistory from "../Pages/Dashboard/WithdrawalHistory";
import PaymentRequest from "../Pages/Dashboard/PaymentRequest";

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
        path: 'forbidden',
        Component: Forbidden
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
        path: 'pending-deliveries',
        element: <RiderRoute>
          <PendingDeliveries></PendingDeliveries>
        </RiderRoute>
      },
      {
        path: 'completed-deliveries',
        element: <RiderRoute>
          <CompletedDeliveries></CompletedDeliveries>
        </RiderRoute>
      },
      {
        path: 'my-earnings',
        element: <RiderRoute>
          <MyEarnings></MyEarnings>
        </RiderRoute>
      },
      {
        path: 'withdrawal-history',
        element: <RiderRoute>
          <WithdrawalHistory></WithdrawalHistory>
        </RiderRoute>
      },
      {
        path: "pending-applications",
        element: <AdminRoute>
          <PendingRiders></PendingRiders>
        </AdminRoute>
      },
      {
        path:'assign-rider',
        element: <AdminRoute>
          <AssignRider></AssignRider>
        </AdminRoute>
      },
      {
        path: "active-riders",
        element: <AdminRoute>
          <ActiveRiders></ActiveRiders>
        </AdminRoute>
      },
      {
        path: "inactive-riders",
        element: <AdminRoute>
          <InactiveRiders></InactiveRiders>
        </AdminRoute>
      },
      {
        path: 'payment-requests',
        element: <AdminRoute>
          <PaymentRequest></PaymentRequest>
        </AdminRoute>
      },
      {
        path: "manage-admins",
        element: <AdminRoute>
          <ManageAdmins></ManageAdmins>
        </AdminRoute>
      },
    ],
  },
]);
