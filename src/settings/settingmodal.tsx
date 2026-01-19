import React from "react";

export default function SettingsModal({
  onClose,
  onLogout
}: {
  onClose: () => void;
  onLogout: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[460px] p-6 shadow-xl relative">

        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Settings</h2>

        <div className="space-y-4 mt-2">

          <button
            onClick={onLogout}
            className="w-full text-left px-3 py-2 rounded text-red-600 hover:bg-red-50"
          >
            Log out
          </button>

        </div>
      </div>
    </div>
  );
}
