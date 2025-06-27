import React from "react";
import { FaTruckMoving } from "react-icons/fa";

const steps = [
  {
    title: "Booking Pick & Drop",
    description: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Cash On Delivery",
    description: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Delivery Hub",
    description: "From personal packages to business shipments — we deliver on time, every time.",
  },
  {
    title: "Booking SME & Corporate",
    description: "From personal packages to business shipments — we deliver on time, every time.",
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-gray-100 max-w-11/12 mx-auto  py-12 px-4 md:px-8 lg:px-16 pb-24">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-10">
        How it Works
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border hover:border-blue-400 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <div className="mb-4 bg-transparent">
              <FaTruckMoving size={32} />
            </div>
            <h3 className="font-semibold text-lg text-slate-800 mb-2">
              {step.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
