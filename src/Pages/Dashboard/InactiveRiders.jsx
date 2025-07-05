import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/userAxiosSecure";
import { FaCheck } from "react-icons/fa";

const InactiveRiders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: inactiveRiders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["inactive-riders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/deactivated");
      return res.data;
    },
  });

  const handleReactivate = (id) => {
    Swal.fire({
      title: "Reactivate Rider?",
      text: "This will approve and reactivate the rider.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#CAEB66",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reactivate",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/riders/${id}/status`, { status: "active" }).then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire("Success", "Rider reactivated successfully!", "success");
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
      <h2 className="text-2xl font-bold mb-4">Inactive Riders</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-red-200 text-black font-semibold">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Region</th>
              <th>District</th>
              <th>Bike</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inactiveRiders.map((rider, index) => (
              <tr key={rider._id} className="hover">
                <td>{index + 1}</td>
                <td>{rider.name}</td>
                <td>{rider.phone}</td>
                <td>{rider.email}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.bikeBrand}</td>
                <td>
                  <span className="badge badge-error">{rider.status}</span>
                </td>
                <td>
                  <button
                    onClick={() => handleReactivate(rider._id)}
                    className="btn btn-sm bg-green-500 text-white"
                    title="Reactivate"
                  >
                    <FaCheck />
                  </button>
                </td>
              </tr>
            ))}
            {inactiveRiders.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center text-gray-500">
                  No inactive riders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InactiveRiders;
