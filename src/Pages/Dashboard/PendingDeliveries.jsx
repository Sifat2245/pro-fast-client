import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/userAxiosSecure";

const PendingDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["rider-parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/parcel?email=${user.email}`);
      return res.data;
    },
  });

  const statusMutation = useMutation({
    mutationFn: async ({ parcelId, newStatus }) => {
      const res = await axiosSecure.patch(`/parcels/${parcelId}/status`, {
        delivery_status: newStatus,
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        Swal.fire("Success", "Delivery status updated", "success");
        refetch();
      }
    },
    onError: () => {
      Swal.fire("Error", "Failed to update status", "error");
    },
  });

  const handleStatusUpdate = (parcelId, newStatus) => {
    statusMutation.mutate({ parcelId, newStatus });
  };

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        Loading parcels...
      </p>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Pending Deliveries</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-[#CAEB66] text-black font-semibold">
            <tr>
              <th>#</th>
              <th>Tracking ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>Destination</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className="hover">
                <td>{index + 1}</td>
                <td>{parcel.tracking_id}</td>
                <td>{parcel.title}</td>
                <td>{parcel.type}</td>
                <td>{parcel.senderName}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.receiverDistrict}</td>
                <td>{parcel.cost} ৳</td>
                <td>{parcel.delivery_status}</td>
                <td>
                  {parcel.delivery_status === "Assigned to Rider" && (
                    <button
                      className="btn btn-sm bg-blue-500 text-white p-2"
                      onClick={() =>
                        handleStatusUpdate(parcel._id, "In Transit")
                      }
                    >
                      Mark In Transit
                    </button>
                  )}

                  {parcel.delivery_status === "In Transit" && (
                    <button
                      className="btn btn-sm p-2 bg-green-600 text-white"
                      onClick={() =>
                        handleStatusUpdate(parcel._id, "Delivered")
                      }
                    >
                      Mark Delivered
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {parcels.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-4">
                  No pending deliveries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingDeliveries;
