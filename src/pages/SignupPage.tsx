import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthPageLayout from "../auth/AuthPageLayout";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const API = "http://localhost:3001";

  const handleSignup = async () => {
    setError(null);

    if (!name || !email || !password || !confirm) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      const params = new URLSearchParams(window.location.search);
const fromExtension = params.get("from") === "extension";

if (fromExtension) {
  const EXTENSION_ID = "ifdgfbffilgkboghknmdongkhjolfdah";

  window.location.href =
    `chrome-extension://${EXTENSION_ID}/auth.html#token=${data.token}`;

  return;
}
``


      navigate("/login"); // ✅ go to login after signup
    } catch {
      setError("Server error — try again later");
    }
  };

  return (
    <AuthPageLayout
      title="Create your account"
      subtitle="Sign up to get your free daily replies"
    >
      <div className="space-y-4">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="w-full border rounded px-3 py-2"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full py-2 rounded bg-blue-600 text-white font-medium"
        >
          Create account
        </button>

        <p className="text-sm text-center text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 font-medium">
            Log in
          </a>
        </p>
      </div>
    </AuthPageLayout>
  );
}
