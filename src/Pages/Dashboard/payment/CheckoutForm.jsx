import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const Elements = useElements();
  const [error, setError] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !Elements) {
      return;
    }

    const card = Elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message)
    } else {
      console.log("[PaymentMethod]", paymentMethod);
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
          Pay Now
        </button>
        {
            error && <p className="text-red-500">{error}</p>
        }
      </form>
    </div>
  );
};

export default CheckoutForm;
