import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "../pages/LandingPage";
import AppPage from "../pages/AppPage";
import Pricing from "../pages/Pricing";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landing />} />

        {/* Main SmartReply App */}
        <Route path="/app" element={<AppPage />} />

        {/* Pricing */}
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/login" element={<LoginPage />} />  

        
        <Route path="/signup" element={<SignupPage />} />


        {/* Fallback (ALWAYS LAST) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
