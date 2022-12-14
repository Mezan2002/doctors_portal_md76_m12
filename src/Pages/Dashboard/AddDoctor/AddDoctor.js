import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const AddDoctor = () => {
  const imageHostingKey = process.env.REACT_APP_imgBB_key;
  const navigate = useNavigate();
  const { data: specialties, isLoading } = useQuery({
    queryKey: ["specialty"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/appointmentSpecialty");
      const data = await res.json();
      return data;
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddDoctor = (data) => {
    const image = data.photo[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
    fetch(url, {
      method: "POST",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.success) {
          const doctors = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            photo: imageData.data.url,
          };

          fetch("http://localhost:5000/doctors", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctors),
          })
            .then((res) => res.json())
            .then((result) => {
              if (result.acknowledged) {
                toast.success(`${data.name} is added successfully`);
                navigate("/dashboard/manageDoctors");
              }
            });
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="w-96 p-7">
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
            <span className="label-text">Specilty</span>
          </label>
          <select
            {...register("specialty")}
            className="select select-bordered w-full mb-10"
          >
            {specialties.map((specialty) => (
              <option key={specialty._id} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            {...register("photo", {
              required: "Photo is required",
            })}
            className="input input-bordered w-full mb-2 py-36 px-20 border-dotted border-2"
          />
          {errors.photo && (
            <p className="text-red-600">{errors.photo.message}</p>
          )}
        </div>
        <input
          type="submit"
          className="btn btn-block btn-accent"
          value="Add Doctor"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
