import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../Landing/services/api";

export default function Pricing() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("sr_token");
    const user = localStorage.getItem("sr_user");

    if (!token || !user) return;

    const parsedUser = JSON.parse(user);

    api
      .getUserById(token, parsedUser.id)
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => {
        console.error("Failed to fetch user:", err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center justify-center px-6 py-20">
      
      {userData && (
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600">
            Logged in as <strong>{userData.name}</strong>
          </p>
          <p className="text-sm text-gray-500">
            Plan Status: {userData.status}
          </p>
        </div>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-semibold mb-4"
      >
        Choose your plan
      </motion.h1>

      <p className="text-gray-500 mb-8 text-sm">
        Upgrade anytime. Cancel anytime.
      </p>

      <div className="flex items-center gap-2 mb-14 bg-gray-100 rounded-full p-1">
        <button
          onClick={() => setBilling("monthly")}
          className={`px-4 py-1 rounded-full text-sm transition ${
            billing === "monthly" ? "bg-blue-600 text-white" : "text-gray-500"
          }`}
        >
          Monthly
        </button>

        <button
          onClick={() => setBilling("yearly")}
          className={`px-4 py-1 rounded-full text-sm transition ${
            billing === "yearly" ? "bg-blue-600 text-white" : "text-gray-500"
          }`}
        >
          Yearly (save 20%)
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-6xl w-full">
        <PlanCard
          title="Basic"
          price="$0"
          subtitle="Starter"
          features={[
            "Limited replies",
            "Standard generation speed",
            "Basic tone options",
            "Manual copy only",
          ]}
          buttonText="Continue Free"
          onClick={() => navigate("/app")}
          outlined
        />

        <PlanCard
          title="Pro"
          price={billing === "monthly" ? "$20 / month" : "$192 / year"}
          subtitle="Most Popular"
          features={[
            "Unlimited replies",
            "Custom tone & length",
            "Save & reuse replies",
            "Faster generation",
            "Priority AI access",
          ]}
          buttonText="Get Pro"
          highlight
          onClick={() => alert("Connect payment gateway")}
        />

        <PlanCard
          title="Pro Max"
          price={billing === "monthly" ? "$50 / month" : "$480 / year"}
          subtitle="Power users"
          features={[
            "Everything in Pro",
            "Advanced AI models",
            "Early feature access",
            "Highest generation speed",
            "Priority support",
          ]}
          buttonText="Get Pro Max"
          onClick={() => alert("Connect payment gateway")}
        />
      </div>
    </div>
  );
}

/* PLAN CARD */

function PlanCard({
  title,
  price,
  subtitle,
  features,
  buttonText,
  onClick,
  highlight = false,
  outlined = false,
}: {
  title: string;
  price: string;
  subtitle: string;
  features: string[];
  buttonText: string;
  onClick: () => void;
  highlight?: boolean;
  outlined?: boolean;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`rounded-xl p-8 flex flex-col justify-between min-h-[440px] transition ${
        highlight
          ? "border-2 border-blue-500 bg-blue-50"
          : outlined
          ? "border border-gray-300 bg-white"
          : "border border-gray-200 bg-white"
      }`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>

          {highlight && (
            <span className="text-xs px-3 py-1 rounded-full bg-blue-600 text-white">
              Popular
            </span>
          )}
        </div>

        <p className="text-3xl font-bold">{price}</p>
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>

        <ul className="mt-6 space-y-2 text-sm text-gray-700">
          {features.map((f) => (
            <li key={f}>✓ {f}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={onClick}
        className={`mt-8 w-full py-3 rounded-lg font-medium transition ${
          highlight
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-gray-900 hover:bg-gray-800 text-white"
        }`}
      >
        {buttonText}
      </button>
    </motion.div>
  );
}