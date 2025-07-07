import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/userAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const MyEarnings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isCashoutProcessing, setIsCashoutProcessing] = useState(false);

  const {
    data: completedParcels = [],
    isLoading,
    refetch,
  } = useQuery({
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
    return parseFloat(cost) * percentage;
  };

  const totalEarning = completedParcels
  .filter(parcel => !parcel.is_earning_cashed_out) // only uncached earnings
  .reduce((sum, parcel) => sum + calculateEarning(parcel), 0) || 0;

  const handleCashout = async () => {
    setIsCashoutProcessing(true);
    try {
      const cashoutData = {
        riderEmail: user?.email,
        amount: totalEarning.toFixed(2),
        timestamp: new Date(),
      };
      const res = await axiosSecure.post("/rider/withdraw", cashoutData);
      if (res.data.success) {
        Swal.fire("Success", "Cash out request submitted!", "success");
        refetch();
      } else {
        Swal.fire("Error", res.data.message || "Cashout failed", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Something went wrong during cash out", "error");
    } finally {
      setIsCashoutProcessing(false);
    }
  };


   if (isLoading) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">
        Loading parcels...
      </p>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-black">My Earnings</h2>
        <div className="bg-[#CAEB66] text-black px-4 py-2 rounded font-semibold shadow">
          ৳ {totalEarning.toFixed(2)}
        </div>
      </div>

      <div className="bg-[#1f1f1f] p-6 rounded-xl shadow-lg space-y-4">
        <h3 className="text-xl font-semibold mb-2 text-white">Cash Out</h3>

        <div>
          <p className="text-gray-300 mb-2">
            Minimum balance required:{" "}
            <span className="text-[#CAEB66] font-medium">৳ 5000</span>
          </p>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs bg-[#2c2c2c] border-gray-600 text-white"
            value={`৳ ${totalEarning.toFixed(2)}`}
            readOnly
          />
        </div>

        <button
          onClick={handleCashout}
          className={`btn bg-[#CAEB66] hover:bg-[#b3d755] transition-all font-semibold ${
            totalEarning < 5000 || isCashoutProcessing
              ? "text-white cursor-not-allowed"
              : "text-black"
          }`}
          disabled={totalEarning < 5000 || isCashoutProcessing}
        >
          {isCashoutProcessing
            ? "Processing..."
            : totalEarning < 5000
            ? "Minimum ৳5000 required"
            : "Cash Out Now"}
        </button>
      </div>
    </div>
  );
};

export default MyEarnings;
