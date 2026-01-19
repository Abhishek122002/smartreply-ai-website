import { useEffect, useState } from "react";

export default function AccountModal({ onClose }: { onClose: () => void }) {
  const [usage, setUsage] = useState<{ count: number } | null>(null);

  const user = localStorage.getItem("sr_user")
    ? JSON.parse(localStorage.getItem("sr_user")!)
    : null;

  useEffect(() => {
    const token = localStorage.getItem("sr_token");
    if (!token) return;

    fetch("http://localhost:3001/api/usage", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setUsage(data))
      .catch(() => {});
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[460px] p-6 shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-2">Account</h2>

        <div className="space-y-3 mt-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Plan</p>
            <p className="font-medium">Free Plan</p>
          </div>

          {/* <div>
            <p className="text-sm text-gray-500">Daily Generations</p>
            <p className="font-medium">
              {usage ? `${usage.count}/10` : "Loading..."}
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
