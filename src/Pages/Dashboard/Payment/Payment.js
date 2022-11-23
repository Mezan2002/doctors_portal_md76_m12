import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckOutForm from "./CheckOutForm/CheckOutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_PK);

const Payment = () => {
  const bookingInfo = useLoaderData();
  const { appointmentTakingFor, appointmentDate, timeOfAppointment, price } =
    bookingInfo;
  return (
    <div>
      <div className="mb-10">
        <h2 className="text-4xl">Payment for {appointmentTakingFor}</h2>
        <p>
          Please pay <strong>{price}$</strong>, your appintment on{" "}
          {appointmentDate} at {timeOfAppointment}
        </p>
      </div>
      <div className="border border-black p-10 w-7/12 rounded-2xl ">
        <h3 className="text-3xl text-center mb-10">Payment Card</h3>
        <Elements stripe={stripePromise}>
          <CheckOutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
