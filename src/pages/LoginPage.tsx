import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPageLayout from "../auth/AuthPageLayout";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const API = "http://localhost:3001";

  const handleLogin = async () => {
    setError(null);

    if (!email || !password) {
      setError("Enter email and password");
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
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

  return; // ⛔ VERY IMPORTANT: stop normal website flow
}


      navigate("/app"); // ✅ go to main app after login
    } catch {
      setError("Server error — try again later");
    }
  };

  return (
    <AuthPageLayout
      title="Welcome back"
      subtitle="Log in to continue using SmartReply AI"
    >
      <div className="space-y-4">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm">Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm">Password</label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleLogin}
          className="w-full py-2 rounded bg-blue-600 text-white font-medium"
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
