import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/userAxiosSecure";

const BecomeRider = () => {
  const { user } = useAuth();
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const warehouseData = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const uniqueRegions = [
      ...new Set(warehouseData.map((item) => item.region)),
    ];
    setRegions(uniqueRegions);
  }, [warehouseData]);

  useEffect(() => {
    const filteredDistricts = warehouseData
      .filter((item) => item.region === selectedRegion)
      .map((item) => item.district);
    setDistricts(filteredDistricts);
  }, [selectedRegion]);

  const onSubmit = (data) => {
    const riderApplication = {
      ...data,
      name: user?.displayName || "",
      email: user?.email || "",
      status: "Pending",
      appliedAt: new Date().toISOString(),
    };
    console.log(riderApplication);

    axiosSecure.post("/riders", riderApplication).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Application Submitted!",
          text: "Your rider application has been submitted successfully.",
          confirmButtonColor: "#CAEB66",
          confirmButtonText: "OK",
        });

        reset();
      }
    });

    
  };

  return (
    <div className="max-w-3xl mx-auto p-10 bg-white rounded-2xl shadow-lg my-14 border border-[#CAEB66]">
      <h2 className="text-3xl font-bold text-center mb-8 text-[#1c1c1c]">
        Become a Rider
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Name */}
        <div className="col-span-1 md:col-span-2">
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
        
            defaultValue={user?.displayName || ""}
            className="input input-bordered w-full text-black bg-gray-100"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block font-semibold mb-1">Age</label>
          <input
            {...register("age", { required: true })}
            type="number"
            placeholder="Enter your age"
            className="input input-bordered w-full text-black"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">Age is required</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"

            defaultValue={user?.email || ""}
            className="input input-bordered w-full text-black bg-gray-100"
          />
        </div>

        {/* Region */}
        <div>
          <label className="block font-semibold mb-1">Region</label>
          <select
            {...register("region", { required: true })}
            className="select select-bordered w-full"
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          {errors.region && (
            <p className="text-red-500 text-sm mt-1">Region is required</p>
          )}
        </div>

        {/* District */}
        <div>
          <label className="block font-semibold mb-1">District</label>
          <select
            {...register("district", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-sm mt-1">District is required</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-semibold mb-1">Phone Number</label>
          <input
            type="tel"
            {...register("phone", { required: true })}
            placeholder="e.g. 01XXXXXXXXX"
            className="input input-bordered w-full"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">Phone is required</p>
          )}
        </div>

        {/* NID */}
        <div>
          <label className="block font-semibold mb-1">NID Number</label>
          <input
            type="text"
            {...register("nid", { required: true })}
            placeholder="Enter NID number"
            className="input input-bordered w-full"
          />
          {errors.nid && (
            <p className="text-red-500 text-sm mt-1">NID is required</p>
          )}
        </div>

        {/* Bike Brand */}
        <div>
          <label className="block font-semibold mb-1">Bike Brand</label>
          <input
            type="text"
            {...register("bikeBrand", { required: true })}
            placeholder="e.g. Yamaha, Bajaj"
            className="input input-bordered w-full"
          />
          {errors.bikeBrand && (
            <p className="text-red-500 text-sm mt-1">Bike brand is required</p>
          )}
        </div>

        {/* Bike Reg */}
        <div>
          <label className="block font-semibold mb-1">
            Bike Registration Number
          </label>
          <input
            type="text"
            {...register("bikeReg", { required: true })}
            placeholder="e.g. DHAKA-BA-123456"
            className="input input-bordered w-full"
          />
          {errors.bikeReg && (
            <p className="text-red-500 text-sm mt-1">
              Registration is required
            </p>
          )}
        </div>

        {/* Note */}
        <div className="col-span-1 md:col-span-2">
          <label className="block font-semibold mb-1">Note (Optional)</label>
          <textarea
            rows={5}
            {...register("note")}
            placeholder="Any additional information..."
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold rounded-md"
            style={{ backgroundColor: "#CAEB66", color: "#1c1c1c" }}
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
};

export default BecomeRider;
