import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/userAxiosSecure";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["assignable-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcel/assignable");
      return res.data
      
    },
  });

  const handleAssignRider = (parcelId) => {
    // You can open a modal or redirect to a rider selection component
    Swal.fire("Assign Rider", `Assign rider for Parcel ID: ${parcelId}`, "info");
  };

  if (isLoading) {
    return <p className="text-center text-lg font-medium">Loading parcels...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Assign Rider to Parcels</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-[#CAEB66] text-black font-semibold">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Destination</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className="hover">
                <td>{index + 1}</td>
                <td>{parcel.title}</td>
                <td>{parcel.senderName}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverDistrict}</td>
                <td>${parcel.cost}</td>
                <td>{parcel.payment_status}</td>
                <td>{parcel.delivery_status}</td>
                <td>
                  <button
                    onClick={() => handleAssignRider(parcel._id)}
                    className="btn btn-sm bg-blue-500 text-white flex items-center gap-1"
                  >
                    <FaUserPlus />
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
            {parcels.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No parcels found to assign
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignRider;
