import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const AllUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: "/users",
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      return data;
    },
  });

  const handleMakeAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success("Admin Maked Successfully");
          refetch();
        }
      });
  };

  return (
    <div>
      <h2 className="text-4xl mb-10">All Users</h2>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr className="hover">
                  <th>{idx + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      <>
                        <button className="btn btn-xs text-white btn-disabled">
                          Admin Done
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleMakeAdmin(user._id)}
                          className="btn btn-xs text-white btn-success"
                        >
                          Make Admin
                        </button>
                      </>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-xs text-white btn-error">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
