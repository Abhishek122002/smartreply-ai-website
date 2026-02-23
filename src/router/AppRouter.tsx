import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "../pages/LandingPage";
import AppPage from "../pages/AppPage";
import Pricing from "../pages/Pricing";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import AccountPage from "../account/AccountPage";


export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<Landing />} />

        {/* Main DoDraft App */}
        <Route path="/app" element={<AppPage />} />

        {/* Pricing */}
        <Route path="/pricing" element={<Pricing />} />

        <Route path="/login" element={<LoginPage />} />  

        
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/account" element={<AccountPage />} />


        {/* Fallback (ALWAYS LAST) */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
