import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/userAxiosSecure";
import Swal from "sweetalert2";

const ManageAdmins = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["searched-users", searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      const res = await axiosSecure.get(`/users/search?email=${searchTerm}`);
      return res.data;
    },
    enabled: !!searchTerm, // only run when searchTerm has value
  });

  const handleRoleChange = (id, newRole) => {
    axiosSecure.patch(`/users/${id}/role`, { role: newRole }).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", `User role updated to ${newRole}`, "success");
        refetch();
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Management</h2>

      <input
        type="text"
        className="input input-bordered w-full max-w-sm mb-4"
        placeholder="Search by email"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Created At</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "admin"
                        ? "badge-success"
                        : "badge-secondary"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      className="btn btn-sm bg-red-500 text-white"
                      onClick={() => handleRoleChange(user._id, "user")}
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm bg-green-500 text-white"
                      onClick={() => handleRoleChange(user._id, "admin")}
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageAdmins;
