import React from "react";
import useAxiosSecure from "../../Hooks/userAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

const CompletedDeliveries = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: completedParcels = [], isLoading } = useQuery({
    queryKey: ["completed-deliveries", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/rider/completed-parcel?email=${user.email}`
      );
      return res.data;
    },
  });

  const calculateEarning = (parcel) => {
    const { senderDistrict, receiverDistrict, cost } = parcel;
    const percentage = senderDistrict === receiverDistrict ? 0.7 : 0.4;
    return parseFloat(cost || 0) * percentage; 
  };

  const totalEarning = completedParcels
    .reduce((sum, parcel) => {
      return sum + calculateEarning(parcel);
    }, 0)
    .toFixed(2);

  if (isLoading) {
    return <p className="text-center text-lg font-medium">Loading Data</p>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Completed Deliveries</h2>
        <p className="text-xl font-semibold text-green-600">
          Total Earning: ৳ {totalEarning}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border border-gray-300">
          <thead className="bg-[#CAEB66] text-black font-semibold">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Sender</th>
              <th>Receiver</th>
              <th>From → To</th>
              <th>Picked At</th>
              <th>Delivered At</th>
              <th>Status</th>
              <th>Earning</th>
            </tr>
          </thead>
          <tbody>
            {completedParcels.map((parcel, index) => (
              <tr key={parcel._id} className="hover">
                <td>{index + 1}</td>
                <td>{parcel.title}</td>
                <td>{parcel.senderName}</td>
                <td>{parcel.receiverName}</td>
                <td>
                  {parcel.senderDistrict} → {parcel.receiverDistrict}
                </td>
                <td>{moment(parcel.picked_at).format("LLL") || "N/A"}</td>
                <td>{moment(parcel.delivered_at).format("LLL") || "N/A"}</td>
                <td>{parcel.delivery_status}</td>
                <td className="font-semibold text-green-600">
                  ৳ {calculateEarning(parcel)}
                </td>
              </tr>
            ))}
            {completedParcels.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No completed deliveries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDeliveries;
