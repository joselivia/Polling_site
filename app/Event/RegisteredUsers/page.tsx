"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL2 } from "@/config/baseUrl";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  model: string;
  created_at: string;
  attended?: boolean;
}

export default function RegisteredUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${baseURL2}/api/users`);
        setUsers(res.data);
      } catch (err: any) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAttendance = async (id: number) => {
    try {
      const res = await axios.patch(`${baseURL2}/api/users/${id}/attend`);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, attended: res.data.attended } : u))
      );
    } catch (err) {
      console.error("Error updating attendance", err);
    }
  };

  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.phone]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) return <p className="text-center mt-10">Loading users...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Registered Users</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-3 py-2 border border-gray-300 rounded-md w-full sm:w-1/2"
      />

      {filteredUsers.length === 0 ? (
        <p className="text-gray-600">No users match your search.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Name</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">Phone</th>
                <th className="py-2 px-4 text-left">BMW Model</th>
                <th className="py-2 px-4 text-left">Registered At</th>
                <th className="py-2 px-4 text-center">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{user.phone}</td>
                  <td className="py-2 px-4">{user.model}</td>
                  <td className="py-2 px-4">
                    {new Date(user.created_at).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {user.attended ? (
                      <span className="text-green-600 font-semibold">✔ Attended</span>
                    ) : (
                      <button
                        onClick={() => handleAttendance(user.id)}
                        className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                      >
                        Confirm
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
