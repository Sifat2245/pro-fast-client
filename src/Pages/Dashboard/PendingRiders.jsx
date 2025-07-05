import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/userAxiosSecure";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";

const PendingRiders = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedRider, setSelectedRider] = useState(null);

  const {
    data: pendingRiders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  const handleApprove = (id) => {
    axiosSecure.patch(`/riders/${id}/status`, {status: 'active'}).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Approved!", "Rider has been approved.", "success");
        refetch();
      }
    });
  };

  const handleReject = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this application.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Rejected!", "Application has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pending Rider Applications</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-[#CAEB66] text-black font-semibold">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Region</th>
              <th>District</th>
              <th>Bike</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRiders.map((rider, index) => (
              <tr key={rider._id} className="hover">
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.phone}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.bikeBrand}</td>
                <td className="space-x-1 flex items-center">
                  <button
                    onClick={() => setSelectedRider(rider)}
                    className="btn btn-sm bg-blue-500 text-white"
                    title="View Details"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleApprove(rider._id)}
                    className="btn btn-sm bg-green-500 text-white"
                    title="Approve"
                  >
                    <FaCheck />
                  </button>
                  <button
                    onClick={() => handleReject(rider._id)}
                    className="btn btn-sm bg-red-500 text-white"
                    title="Reject"
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Detail Modal */}
      {selectedRider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000057] bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-xl w-full relative">
            <button
              className="absolute top-2 right-2 text-xl font-bold"
              onClick={() => setSelectedRider(null)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-4">Rider Details</h3>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {selectedRider.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedRider.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedRider.phone}
              </p>
              <p>
                <strong>NID:</strong> {selectedRider.nid}
              </p>
              <p>
                <strong>Region:</strong> {selectedRider.region}
              </p>
              <p>
                <strong>District:</strong> {selectedRider.district}
              </p>
              <p>
                <strong>Bike Brand:</strong> {selectedRider.bikeBrand}
              </p>
              <p>
                <strong>Bike Reg No:</strong> {selectedRider.bikeReg}
              </p>
              <p>
                <strong>Note:</strong> {selectedRider.note || "N/A"}
              </p>
              <p>
                <strong>Applied At:</strong>{" "}
                {new Date(selectedRider.appliedAt).toLocaleString()}
              </p>
            </div>
            <div className="mt-4 text-right">
              <button
                className="btn btn-sm bg-[#CAEB66] text-black"
                onClick={() => setSelectedRider(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRiders;
