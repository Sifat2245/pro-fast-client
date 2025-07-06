import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaUserPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/userAxiosSecure";

const AssignRider = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignable-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcel/assignable");
      return res.data;
    },
  });

  const assignMutation = useMutation({
    mutationFn: async ({ parcelId, rider }) => {
      const res = await axiosSecure.patch(`/parcel/${parcelId}/assigned`, rider);
      return res.data;
    },

    onSuccess: (data) => {
      if (data.parcelModified > 0) {
        Swal.fire("Success", "Rider assigned successfully!", "success");
        refetch();
        setSelectedParcel(null);
        document.getElementById("riderModal").close();
      } else {
        Swal.fire("Error", "Failed to assign rider", "error");
      }
    },

    // onError: (error) => {
    //   console.error(error);
    //   Swal.fire("Error", "Something went wrong", "error");
    // },
  });

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [loadingRiders, setLoadingRiders] = useState(false);

  const handleAssignRider = async (parcel) => {
    setSelectedParcel(parcel);
    setLoadingRiders(true);
    try {
      const res = await axiosSecure.get(
        `/riders/available?district=${parcel.receiverDistrict}`
      );
      setRiders(res.data);
    } catch (error) {
      console.error("Failed to load riders", error);
      Swal.fire("Error", "Could not load riders", "error");
    } finally {
      setLoadingRiders(false);
    }

    // Open modal manually
    const modal = document.getElementById("riderModal");
    if (modal) modal.showModal();
  };

  const confirmAssign = (riderId) => {
  const selectedRider = riders.find((rider) => rider._id === riderId);
  if (!selectedRider) return;

  assignMutation.mutate({
    parcelId: selectedParcel._id,
    rider: {
      riderId: selectedRider._id,
      riderName: selectedRider.name,
      riderEmail: selectedRider.email,
    },
  });
};

  if (isLoading) {
    return (
      <p className="text-center text-lg font-medium">Loading parcels...</p>
    );
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
                    onClick={() => handleAssignRider(parcel)}
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
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No parcels found to assign
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog id="riderModal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-lg mb-2">
            Assign Rider for Parcel: {selectedParcel?.title}
          </h3>
          {loadingRiders ? (
            <p className="text-center">Loading available riders...</p>
          ) : (
            <>
              {riders.length > 0 ? (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {riders.map((rider) => (
                    <li
                      key={rider._id}
                      className="flex justify-between items-center border p-2 rounded"
                    >
                      <div>
                        <p className="font-semibold">{rider.name}</p>
                        <p className="text-sm text-gray-600">{rider.email}</p>
                      </div>
                      <button
                        className="btn btn-sm bg-green-500 text-white"
                        onClick={() => confirmAssign(rider._id)}
                        disabled={assignMutation.isLoading}
                      >
                        {assignMutation.isLoading ? "Assigning..." : "Assign"}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>
                  No available riders found in{" "}
                  {selectedParcel?.receiverDistrict}
                </p>
              )}
            </>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
