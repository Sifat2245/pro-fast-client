import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../Hooks/userAxiosSecure";

const generateTrackingId = () => {
  const timestamp = Date.now().toString().slice(-6); // last 6 digits of timestamp
  const random = Math.floor(1000 + Math.random() * 9000); // random 4-digit
  return `TRK-${timestamp}${random}`; // Example: TRK-246781234
};

const SendParcel = () => {
  const { user } = useContext(AuthContext);
  const warehouseData = useLoaderData();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
  } = useForm();

  const [isDocument, setIsDocument] = useState(true);
  // const watchType = watch("type", "document");
  const watchSenderRegion = watch("senderRegion");
  const watchReceiverRegion = watch("receiverRegion");

  const regions = [...new Set(warehouseData.map((w) => w.region))];

  const getDistricts = (region) => {
    return [
      ...new Set(
        warehouseData.filter((w) => w.region === region).map((w) => w.district)
      ),
    ];
  };

  const onSubmit = (data) => {
    const isSameCity =
      data.senderDistrict &&
      data.receiverDistrict &&
      data.senderDistrict === data.receiverDistrict;

    const deliveryType = isSameCity ? "Within City" : "Outside City";
    const isDocument = data.type === "document";
    const weight = parseFloat(data.weight) || 0;

    let base = 0;
    let extraWeight = 0;
    let extraWeightCost = 0;
    let outsideCitySurcharge = 0;
    let finalCost = 0;

    if (isDocument) {
      base = isSameCity ? 60 : 80;
      finalCost = base;
    } else {
      base = isSameCity ? 110 : 150;

      if (weight > 3) {
        extraWeight = weight - 3;
        extraWeightCost = extraWeight * 40;
        if (!isSameCity) {
          outsideCitySurcharge = 40;
        }
      }

      finalCost = base + extraWeightCost + outsideCitySurcharge;
    }

    const receiptHtml = `
    <div style="text-align: left; font-family: monospace;">
      <h3 style="text-align: center; margin-bottom: 0.5rem;">Parcel Pricing Receipt</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem;">
        <tr>
          <td>Parcel Type</td>
          <td style="text-align: right;">${
            isDocument ? "Document" : "Non-Document"
          }</td>
        </tr>
        ${
          !isDocument
            ? `<tr>
          <td>Weight</td>
          <td style="text-align: right;">${weight} kg</td>
        </tr>`
            : ""
        }
        <tr>
          <td>Delivery Zone</td>
          <td style="text-align: right;">${deliveryType}</td>
        </tr>
        <tr>
          <td>Base Price</td>
          <td style="text-align: right;">৳${base}</td>
        </tr>
        ${
          extraWeight > 0
            ? `
        <tr>
          <td>Extra Weight</td>
          <td style="text-align: right;">${extraWeight} kg × ৳40 = ৳${extraWeightCost}</td>
        </tr>`
            : ""
        }
        ${
          outsideCitySurcharge > 0
            ? `
        <tr>
          <td>Outside City Surcharge</td>
          <td style="text-align: right;">৳${outsideCitySurcharge}</td>
        </tr>`
            : ""
        }
        <tr style="border-top: 1px solid #ccc;">
          <td><strong>Total</strong></td>
          <td style="text-align: right;"><strong>৳${finalCost}</strong></td>
        </tr>
      </table>
    </div>
  `;

    Swal.fire({
      title: "Confirm Pricing",
      html: receiptHtml,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Edit Information",
      reverseButtons: true,
      confirmButtonColor: "#10B981",
    }).then((result) => {
      if (result.isConfirmed) {
        const parcel = {
          ...data,
          tracking_id: generateTrackingId(),
          cost: finalCost,
          payment_status: "Unpaid",
          delivery_status: "Not Collected",
          created_by: user.email,
          creation_date: new Date().toISOString(),
        };
        console.log("Final Parcel Data:", parcel);
        axiosSecure.post("/parcels", parcel).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            Swal.fire(
              "Success",
              "Parcel created successfully. Redirecting to payment...",
              "success"
            );
          }
        });

        // Place payment redirection or DB call here
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-2">Add Parcel</h2>
      <p className="mb-6 text-gray-500">Enter your parcel details</p>

      {/* Parcel Type */}
      <div className="flex gap-6 mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="document"
            {...register("type")}
            onChange={() => setIsDocument(true)}
            className="radio radio-success"
          />
          Document
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value="non-document"
            {...register("type")}
            onChange={() => setIsDocument(false)}
            className="radio radio-success"
          />
          Non-Document
        </label>
      </div>

      {/* Title & Weight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          {...register("title", { required: true })}
          placeholder="Parcel Title"
          className="input input-bordered w-full"
        />
        {!isDocument && (
          <input
            {...register("weight")}
            placeholder="Weight (kg)"
            type="number"
            className="input input-bordered w-full"
          />
        )}
      </div>

      {/* Note */}
      <textarea
        {...register("note")}
        placeholder="Write about the parcel"
        className="textarea textarea-bordered w-full mb-6"
      />

      {/* Sender & Receiver */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Sender Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Sender Info</h3>
          <input
            defaultValue={user?.name}
            {...register("senderName", { required: true })}
            placeholder="Name"
            className="input input-bordered w-full mb-2"
          />
          <input
            {...register("senderContact", { required: true })}
            placeholder="Contact"
            className="input input-bordered w-full mb-2"
          />
          <Controller
            control={control}
            name="senderRegion"
            rules={{ required: true }}
            render={({ field }) => (
              <select
                className="select select-bordered w-full mb-2"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setValue("senderDistrict", ""); // Reset dependent
                }}
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            )}
          />
          <Controller
            control={control}
            name="senderDistrict"
            rules={{ required: true }}
            render={({ field }) => (
              <select className="select select-bordered w-full mb-2" {...field}>
                <option value="">Select Service Center</option>
                {getDistricts(watchSenderRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            )}
          />
          <input
            {...register("senderAddress", { required: true })}
            placeholder="Address"
            className="input input-bordered w-full mb-2"
          />
          <textarea
            {...register("senderInstruction", { required: true })}
            placeholder="Pickup Instruction"
            className="textarea textarea-bordered w-full"
          />
        </div>

        {/* Receiver Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Receiver Info</h3>
          <input
            {...register("receiverName", { required: true })}
            placeholder="Name"
            className="input input-bordered w-full mb-2"
          />
          <input
            {...register("receiverContact", { required: true })}
            placeholder="Contact"
            className="input input-bordered w-full mb-2"
          />
          <Controller
            control={control}
            name="receiverRegion"
            rules={{ required: true }}
            render={({ field }) => (
              <select
                className="select select-bordered w-full mb-2"
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  setValue("receiverDistrict", "");
                }}
              >
                <option value="">Select Region</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            )}
          />
          <Controller
            control={control}
            name="receiverDistrict"
            rules={{ required: true }}
            render={({ field }) => (
              <select className="select select-bordered w-full mb-2" {...field}>
                <option value="">Select Service Center</option>
                {getDistricts(watchReceiverRegion).map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            )}
          />
          <input
            {...register("receiverAddress", { required: true })}
            placeholder="Address"
            className="input input-bordered w-full mb-2"
          />
          <textarea
            {...register("receiverInstruction", { required: true })}
            placeholder="Delivery Instruction"
            className="textarea textarea-bordered w-full"
          />
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        * PickUp Time 4pm–7pm Approx.
      </p>

      <button type="submit" className="btn btn-success mt-6">
        Continue
      </button>
    </form>
  );
};

export default SendParcel;
