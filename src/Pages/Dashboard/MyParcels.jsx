import React from "react";
import useAuth from "../../Hooks/useAuth";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/userAxiosSecure";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["/my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user?.email}`);
      return res.data;
    },
  });
//   console.log(parcels);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "You Want to cancel it?",
      text: "This parcel will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/parcels/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Parcel has been deleted.", "success");
          refetch(); // refresh list
        }
      } catch (err) {
        Swal.fire("Error", "Failed to delete parcel.", err);
      }
    }
  };

  const handlePayment = (id) =>{
        navigate(`/dashboard/payment/${id}`)
  }

  if (isLoading) {
    return (
      <span className="loading loading-bars text-center mx-auto block mt-10"></span>
    );
  }

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">My Parcels ({parcels.length})</h2>

      <table className="table w-full table-zebra">
        {/* Head */}
        <thead className="bg-[#CAEB66] text-black">
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Type</th>
            <th>Created At</th>
            <th>Cost</th>
            <th>Payment</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {parcels.map((parcel, index) => (
            <tr key={parcel._id}>
              <th>{index + 1}</th>
              <td>{parcel.title}</td>
              <td>
                {parcel.type === "document" ? "📄 Document" : "📦 Non-document"}
              </td>
              <td>{format(new Date(parcel.creation_date), "dd MMM yyyy")}</td>
              <td>৳ {parcel.cost}</td>
              <td>
                {parcel.payment_status === "Paid" ? (
                  <span className="badge badge-success">Paid</span>
                ) : (
                  <span className="badge badge-error">Unpaid</span>
                )}
              </td>
              <td className="flex gap-2">
                <button className="btn btn-sm btn-outline btn-info">
                  View
                </button>
                {parcel.payment_status === "Unpaid" && (
                  <button onClick={() => handlePayment(parcel._id)} className="btn btn-sm btn-outline btn-success">
                    Pay
                  </button>
                )}
                <button onClick={()=>handleDelete(parcel._id)} className="btn btn-sm btn-outline btn-error">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcels;
