import React from "react";
import { useForm } from "react-hook-form";

const AddDoctor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddDoctor = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2 className="text-4xl">Add a Doctor</h2>
      <form onSubmit={handleSubmit(handleAddDoctor)} className="mt-9">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            className="input input-bordered w-full mb-2"
          />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
            })}
            className="input input-bordered w-full mb-2"
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password Should be 6 Character or Longer",
              },
              pattern: {
                value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                message:
                  "Password Must Have Uppercase, Number and a Special Character",
              },
            })}
            className="input input-bordered w-full"
          />
          <label className="label">
            <span className="label-text-alt">Forgot Password?</span>
          </label>
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
        </div>
        <input
          type="submit"
          className="btn btn-block btn-accent"
          value="Log In"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
