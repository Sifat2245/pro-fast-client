import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/userAxiosSecure";
import Swal from "sweetalert2";
import moment from "moment";

const PaymentRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: withdrawals = [], refetch, isLoading } = useQuery({
    queryKey: ["all-withdrawals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/withdrawals");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(`/admin/withdrawals/${id}/status`, { status: "paid" });
    },
    onSuccess: () => {
      Swal.fire("Success", "Marked as Paid", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to update payment status", "error");
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10 text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">Withdrawal Requests</h2>
      <div className="overflow-x-auto  p-4 rounded-xl shadow">
        <table className="table text-black">
          <thead className="bg-[#CAEB66] text-black">
            <tr>
              <th>#</th>
              <th>Rider Email</th>
              <th>Amount</th>
              <th>Requested At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((w, index) => (
              <tr key={w._id}>
                <td>{index + 1}</td>
                <td>{w.riderEmail}</td>
                <td>৳ {parseFloat(w.amount).toFixed(2)}</td>
                <td>{moment(w.timestamp).format("LLL")}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full font-semibold ${
                      w.status === "paid" ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  >
                    {w.status}
                  </span>
                </td>
                <td>
                  {w.status === "pending" ? (
                    <button
                      onClick={() => mutation.mutate(w._id)}
                      className="btn bg-[#CAEB66] hover:bg-[#b3d755] text-black font-semibold btn-sm"
                    >
                      Mark as Paid
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">Already Paid</span>
                  )}
                </td>
              </tr>
            ))}
            {withdrawals.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-400 py-6">
                  No withdrawal requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentRequests;
