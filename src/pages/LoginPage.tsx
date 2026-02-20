import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPageLayout from "../auth/AuthPageLayout";
import { api } from "../Landing/services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  

  const handleLogin = async () => {
  setError(null);

  if (!email || !password) {
    setError("Enter email and password");
    return;
  }

  try {
    const data = await api.login({ email, password });
    console.log("LOGIN RESPONSE:", data);


    if (!data.token) {
      setError(data.error || "Login failed");
      return;
    }

    localStorage.setItem("sr_user", JSON.stringify(data.user));
    localStorage.setItem("sr_token", data.token);

    // 🔁 CHECK IF LOGIN CAME FROM EXTENSION
    const params = new URLSearchParams(window.location.search);
    const fromExtension = params.get("from") === "extension";

    if (fromExtension) {
      const EXTENSION_ID = "ifdgfbffilgkboghknmdongkhjolfdah";

      window.location.href =
        `chrome-extension://${EXTENSION_ID}/auth.html#token=${data.token}`;

      return;
    }

    navigate("/app");

  } catch {
    setError("Server error — try again later");
  }
};

  return (
    <AuthPageLayout
      title="Welcome back"
      subtitle="Log in to continue using DoDraft AI"
    >
      <div className="space-y-4">
        {error && (
         <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-lg">

            {error}
          </div>
        )}

        <div>
          <label className="text-sm">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#5B4DFF] focus:border-[#5B4DFF] transition"

            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#5B4DFF] focus:border-[#5B4DFF] transition"

            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
         className="w-full py-2 rounded bg-[#5B4DFF] text-white font-medium hover:opacity-90 transition"

        >
          Log in
        </button>

        <p className="text-sm text-center text-gray-500">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </AuthPageLayout>
  );
}
