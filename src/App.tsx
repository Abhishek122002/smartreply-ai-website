import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import SmartReplyApp from "./SmartReplyApp";
import Landing from "./pages/LandingPage";

export default function App() {
  // ✅ PART-2: SYNC LOGIN STATE TO EXTENSION (Flow-3 fix)
  useEffect(() => {
    // ✅ Your app saves token like sr_token (your screenshot shows it exists)
    const token = localStorage.getItem("sr_token");

    // ✅ If you also want to support Supabase token directly (optional)
    let supabaseToken: string | null = null;
    const supabaseKey = Object.keys(localStorage).find(
      (k) => k.startsWith("sb-") && k.endsWith("-auth-token")
    );

    if (supabaseKey) {
      try {
        const raw = localStorage.getItem(supabaseKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          supabaseToken =
            parsed?.access_token ||
            parsed?.currentSession?.access_token ||
            parsed?.session?.access_token ||
            null;
        }
      } catch {}
    }

    const finalToken = token || supabaseToken;

    if (finalToken) {
      window.postMessage(
        {
          type: "SR_WEBSITE_AUTH",
          token: finalToken,
        },
        "*"
      );
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/app" element={<SmartReplyApp />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
