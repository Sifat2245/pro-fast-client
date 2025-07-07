import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import moment from "moment";
import useAxiosSecure from "../../Hooks/userAxiosSecure";

const WithdrawalHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: withdrawals = [], isLoading } = useQuery({
    queryKey: ["withdrawal-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/withdrawals?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-lg font-semibold text-black">
        Loading withdrawal history...
      </p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-black mb-4">Withdrawal History</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-600 text-black">
          <thead className="bg-[#CAEB66] text-black font-semibold">
            <tr>
              <th>#</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.length > 0 ? (
              withdrawals.map((withdrawal, index) => (
                <tr key={withdrawal._id} className="hover:bg-[#2c2c2c] transition">
                  <td>{index + 1}</td>
                  <td>৳ {parseFloat(withdrawal.amount).toFixed(2)}</td>
                  <td>{moment(withdrawal.timestamp).format("LLL")}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        withdrawal.status === "paid"
                          ? "bg-green-600 text-black"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {withdrawal.status === "paid" ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">
                  No withdrawal history found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawalHistory;
