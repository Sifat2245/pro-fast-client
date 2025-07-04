import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/userAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: paymentData = [], isPending } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <span className="loading loading-bars text-center block mx-auto mt-10"></span>
    );
  }

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4">
        Payment History ({paymentData.length})
      </h2>

      <table className="table w-full table-zebra">
        <thead className="bg-[#CAEB66] text-black">
          <tr>
            <th>#</th>
            <th>Parcel</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Transaction ID</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {paymentData.length > 0 ? (
            paymentData.map((payment, index) => (
              <tr key={payment._id}>
                <td>{index + 1}</td>
                <td>
                  <code className="text-xs text-gray-600">
                    {payment.parcelId}
                  </code>
                </td>
                <td>৳ {payment.amount}</td>
                <td>
                  {Array.isArray(payment.paymentMethod)
                    ? payment.paymentMethod.join(", ")
                    : payment.paymentMethod}
                </td>
                <td>
                  <code className="text-xs">{payment.transactionId}</code>
                </td>
                <td>
                  {payment.paymentDate
                    ? format(new Date(payment.paymentDate), "dd MMM yyyy, p")
                    : "N/A"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center text-gray-500 py-6">
                No Payment History Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
