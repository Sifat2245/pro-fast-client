import React, { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { Menu, X } from "lucide-react";
import ProFastLogo from "../Pages/shared/ProfastLogo/ProFastLogo";
import {
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaUserEdit,
  FaMapMarkedAlt,
  FaClipboardList,
  FaMotorcycle,
  FaUserShield,
  FaUserPlus,
  FaTruckLoading,
  FaCheckCircle,
  FaMoneyBillWave,
  FaHistory,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import useUserRole from "../Hooks/useUserRole";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { role, roleLoading } = useUserRole();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* ===== Overlay Drawer for Mobile/Tablet ===== */}
      <div
        className={`fixed inset-0 z-40 md:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#00000054] bg-opacity-40"
          onClick={() => setSidebarOpen(false)}
        ></div>

        {/* Drawer Panel */}
        <div className="relative w-64 h-full bg-[#1c1c1c] text-white p-4 z-50">
          <div className="flex justify-between items-center mb-6">
            <ProFastLogo></ProFastLogo>
            <button onClick={() => setSidebarOpen(false)}>
              <X />
            </button>
          </div>

          <nav className="flex flex-col gap-3">
            <NavLink
              to="my-parcels"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                  isActive
                    ? "bg-[#CAEB66] text-black font-semibold"
                    : "text-white"
                }`
              }
            >
              <FaBoxOpen className="text-lg" />
              <span className="">My Parcels</span>
            </NavLink>

            {/* Payment History */}
            <NavLink
              to="paymentHistory"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                  isActive
                    ? "bg-[#CAEB66] text-black font-semibold"
                    : "text-white"
                }`
              }
            >
              <FaMoneyCheckAlt className="text-lg" />
              <span className="">Payment History</span>
            </NavLink>

            {/* Track Parcel */}
            <NavLink
              to="tracking"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                  isActive
                    ? "bg-[#CAEB66] text-black font-semibold"
                    : "text-white"
                }`
              }
            >
              <FaMapMarkedAlt className="text-lg" />
              <span className="">Track Parcel</span>
            </NavLink>

            {/* Update Profile */}
            <NavLink
              to="update-profile"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                  isActive
                    ? "bg-[#CAEB66] text-black font-semibold"
                    : "text-white"
                }`
              }
            >
              <FaUserEdit className="text-lg" />
              <span className="">Update Profile</span>
            </NavLink>

            {/* only for admin */}

            {!roleLoading && role === "admin" && (
              <>
                <NavLink
                  to="pending-applications"
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                      isActive
                        ? "bg-[#CAEB66] text-black font-semibold"
                        : "text-white"
                    }`
                  }
                >
                  <FaClipboardList className="text-lg" />
                  <span>Pending Applications</span>
                </NavLink>

                <NavLink
                  to="assign-rider"
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                      isActive
                        ? "bg-[#CAEB66] text-black font-semibold"
                        : "text-white"
                    }`
                  }
                >
                  <FaUserPlus className="text-lg" />
                  <span>Assign Rider</span>
                </NavLink>

                <NavLink
                  to="active-riders"
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                      isActive
                        ? "bg-[#CAEB66] text-black font-semibold"
                        : "text-white"
                    }`
                  }
                >
                  <FaMotorcycle className="text-lg" />
                  <span>Active Riders</span>
                </NavLink>
                <NavLink
                  to="inactive-riders"
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                      isActive
                        ? "bg-[#CAEB66] text-black font-semibold"
                        : "text-white"
                    }`
                  }
                >
                  <FaMotorcycle className="text-lg" />
                  <span>Deactivated Riders</span>
                </NavLink>
                <NavLink
                  to="manage-admins"
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                      isActive
                        ? "bg-[#CAEB66] text-black font-semibold"
                        : "text-white"
                    }`
                  }
                >
                  <FaUserShield className="text-lg" />
                  <span>Manage Admins</span>
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* ===== Static Sidebar for Desktop ===== */}
      <aside className="hidden md:flex md:flex-col w-64 bg-[#1c1c1c] text-white p-4">
        <ProFastLogo></ProFastLogo>
        <nav className="flex flex-col gap-3">
          <NavLink
            to="my-parcels"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                isActive
                  ? "bg-[#CAEB66] text-black font-semibold"
                  : "text-white"
              }`
            }
          >
            <FaBoxOpen className="text-lg" />
            <span className="">My Parcels</span>
          </NavLink>

          {/* Payment History */}
          <NavLink
            to="paymentHistory"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                isActive
                  ? "bg-[#CAEB66] text-black font-semibold"
                  : "text-white"
              }`
            }
          >
            <FaMoneyCheckAlt className="text-lg" />
            <span className="">Payment History</span>
          </NavLink>

          {/* Track Parcel */}
          <NavLink
            to="tracking"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                isActive
                  ? "bg-[#CAEB66] text-black font-semibold"
                  : "text-white"
              }`
            }
          >
            <FaMapMarkedAlt className="text-lg" />
            <span className="">Track Parcel</span>
          </NavLink>

          {/* Update Profile */}
          <NavLink
            to="update-profile"
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                isActive
                  ? "bg-[#CAEB66] text-black font-semibold"
                  : "text-white"
              }`
            }
          >
            <FaUserEdit className="text-lg" />
            <span className="">Update Profile</span>
          </NavLink>

          {!roleLoading && role === "rider" && (
            <>
              <NavLink
                to="pending-deliveries"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                    isActive
                      ? "bg-[#CAEB66] text-black font-semibold"
                      : "text-white"
                  }`
                }
              >
                <FaTruckLoading className="text-lg" />
                <span>Pending Deliveries</span>
              </NavLink>
              <NavLink
                to="completed-deliveries"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                    isActive
                      ? "bg-[#CAEB66] text-black font-semibold"
                      : "text-white"
                  }`
                }
              >
                <FaCheckCircle className="text-lg" />
                <span>Completed Deliveries</span>
              </NavLink>
              <NavLink
                to="my-earnings"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                    isActive
                      ? "bg-[#CAEB66] text-black font-semibold"
                      : "text-white"
                  }`
                }
              >
                <FaMoneyBillWave className="text-lg" />
                <span>My Earnings</span>
              </NavLink>
              <NavLink
                to="withdrawal-history"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                    isActive
                      ? "bg-[#CAEB66] text-black font-semibold"
                      : "text-white"
                  }`
                }
              >
                <FaHistory className="text-lg" />
                <span>Withdrawal History</span>
              </NavLink>
            </>
          )}

          {/* only for admin */}

          {!roleLoading && role === "admin" && (
            <>
              <NavLink
                to="pending-applications"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                    isActive
                      ? "bg-[#CAEB66] text-black font-semibold"
                      : "text-white"
                  }`
                }
              >
                <FaClipboardList className="text-lg" />
                <span>Pending Applications</span>
              </NavLink>

              <NavLink
                to="assign-rider"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                    isActive
                      ? "bg-[#CAEB66] text-black font-semibold"
                      : "text-white"
                  }`
                }
              >
                <FaUserPlus className="text-lg" />
                <span>Assign Rider</span>
              </NavLink>

              <NavLink
                to="active-riders"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                    isActive
                      ? "bg-[#CAEB66] text-black font-semibold"
                      : "text-white"
                  }`
                }
              >
                <FaMotorcycle className="text-lg" />
                <span>Active Riders</span>
              </NavLink>
              <NavLink
                to="inactive-riders"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                    isActive
                      ? "bg-[#CAEB66] text-black font-semibold"
                      : "text-white"
                  }`
                }
              >
                <FaMotorcycle className="text-lg" />
                <span>Deactivated Riders</span>
              </NavLink>
              <NavLink
                to="payment-requests"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                    isActive
                      ? "bg-[#CAEB66] text-black font-semibold"
                      : "text-white"
                  }`
                }
              >
                <FaFileInvoiceDollar className="text-lg" />
                <span>Payment Requests</span>
              </NavLink>
              <NavLink
                to="manage-admins"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded transition hover:bg-[#2c2c2c] ${
                    isActive
                      ? "bg-[#CAEB66] text-black font-semibold"
                      : "text-white"
                  }`
                }
              >
                <FaUserShield className="text-lg" />
                <span>Manage Admins</span>
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* ===== Main Content ===== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button
            className="text-gray-700 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu />
          </button>
          <h1 className="text-lg md:text-2xl font-semibold text-gray-800">
            Dashboard
          </h1>
          <div>{/* User info or future buttons */}</div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
