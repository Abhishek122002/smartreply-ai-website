import { useEffect, useState } from "react";
import { api } from "../Landing/services/api";

export default function AccountModal({ onClose }: { onClose: () => void }) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("sr_token");
    const user = localStorage.getItem("sr_user");

    if (!token || !user) {
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(user);

    api
      .getUserDetails(token, parsedUser.id)
      .then((data) => {
        setUserData(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[500px] p-6 shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-6">Account Details</h2>

        {loading && <p>Loading...</p>}

        {!loading && userData && (
          <div className="space-y-3 text-sm">
            <div>
              <strong>Name:</strong> {userData.name}
            </div>

            <div>
              <strong>Email:</strong> {userData.email}
            </div>

            <div>
              <strong>Phone:</strong> {userData.phone || "Not provided"}
            </div>

            <div>
              <strong>Status:</strong> {userData.status}
            </div>

            <div>
              <strong>Created At:</strong> {userData.createdAt}
            </div>
          </div>
        )}

        {!loading && !userData && (
          <p className="text-red-500">Failed to load user data.</p>
        )}
      </div>
    </div>
  );
}