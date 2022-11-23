import React from "react";
import { useLoaderData } from "react-router-dom";

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
    </div>
  );
};

export default Payment;
