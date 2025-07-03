import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import userAxiosSecure from "../../../Hooks/userAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const stripe = useStripe();
  const Elements = useElements();
  const [error, setError] = useState();
  const { parcelId } = useParams();
  const axiosSecure = userAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  //   console.log(parcelId);

  const { data: parcelInfo, isPending } = useQuery({
    queryKey: ["/parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });
  if (isPending) {
    return "...loading";
  }

  console.log(parcelInfo);

  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;
  //   console.log(amountInCents);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !Elements) {
      return;
    }

    const card = Elements.getElement(CardElement);
    if (!card) {
      return;
    }

    // step 1- validate the card
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("[PaymentMethod]", paymentMethod);
      //step 2- creating payment intent
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });
      //   console.log("res from intent", res);
      const clientSecret = res.data.clientSecret;

      //step 3- confirm payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
      if (result.error) {
        setError(result.error);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment Succeeded!");
          const transactionId = result.paymentIntent.id;
          //step 4- create payment history and mark payment status as paid
          const paymentData = {
            parcelId,
            userEmail: user.email,
            amount,
            transactionId: transactionId,
            paymentMethod: result.paymentIntent.payment_method_types,
          };

          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
           await Swal.fire({
              icon: "success",
              title: "Payment Successful",
              html: `<strong>Transaction ID: </strong> <code>${transactionId}</code>`,
              confirmButtonText: "Go To My Parcels",
            });

            navigate("/dashboard/my-parcels")
          }
        }
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Payment Details
        </h2>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Card Information
          </label>
          <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#333",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#e53e3e",
                  },
                },
              }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-[#CAEB66] hover:bg-[#b9d844] transition text-black font-semibold py-3 rounded-md shadow disabled:opacity-50"
        >
          Pay ৳{amount}
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default CheckoutForm;
