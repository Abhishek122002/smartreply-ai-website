import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function Pricing() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const calculatePrice = (price: number) => {
    if (price === 0) return "$0";
    if (billing === "monthly") return `$${price}`;
    return `$${(price * 12 * 0.8).toFixed(0)}`;
  };

  const plans = [
    {
      name: "Free",
      price: 0,
      highlight: false,
      features: [
        "20 generations/day",
        "Standard speed",
        "Community support",
      ],
    },
    {
      name: "Pro",
      price: 20,
      highlight: true,
      badge: "Most Popular",
      features: [
        "Unlimited generations",
        "Priority speed",
        "Premium AI models",
        "Email support",
      ],
    },
    {
      name: "Business",
      price: 49,
      highlight: false,
      features: [
        "Everything in Pro",
        "Team collaboration",
        "Dedicated performance",
        "Priority support",
      ],
    },
  ];

  const comparisonRows = [
    ["AI Generations", "20/day", "Unlimited", "Unlimited"],
    ["Advanced Rewriting", "—", "✓", "✓"],
    ["Premium Models", "—", "✓", "✓"],
    ["Team Collaboration", "—", "—", "✓"],
    ["Priority Processing", "—", "✓", "✓"],
    ["Dedicated Performance", "—", "—", "✓"],
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900">

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-16">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-semibold tracking-tight leading-tight">
            Pricing built for scale
          </h1>
          <p className="mt-5 text-lg text-gray-600">
            Flexible plans designed to grow with individuals and teams.
          </p>

          {/* Billing Toggle */}
          <div className="mt-12">
            <div className="relative inline-flex items-center bg-gray-200 rounded-full p-1.5">
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="absolute top-1.5 bottom-1.5 w-[48%] rounded-full bg-[#4f47e6]"
                style={{
                  left: billing === "monthly" ? "6px" : "calc(52% - 6px)",
                }}
              />

              <button
                onClick={() => setBilling("monthly")}
                className={`relative z-10 px-8 py-2.5 text-sm font-medium rounded-full transition ${
                  billing === "monthly" ? "text-white" : "text-gray-700"
                }`}
              >
                Monthly
              </button>

              <button
                onClick={() => setBilling("yearly")}
                className={`relative z-10 px-8 py-2.5 text-sm font-medium rounded-full transition ${
                  billing === "yearly" ? "text-white" : "text-gray-700"
                }`}
              >
                Yearly (Save 20%)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= PRICING SECTION ================= */}
      <div className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`relative rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                  plan.highlight
                    ? "border-[#4f47e6] shadow-2xl"
                    : "border-gray-200 shadow-md hover:border-gray-300"
                } bg-white p-10`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-6 bg-[#4f47e6] text-white text-xs px-3 py-1 rounded-full shadow">
                    {plan.badge}
                  </div>
                )}

                <h2 className="text-lg font-semibold">{plan.name}</h2>

                <div className="mt-6 border-b border-gray-200 pb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={billing}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-4xl font-bold"
                    >
                      {calculatePrice(plan.price)}
                    </motion.div>
                  </AnimatePresence>

                  {plan.price !== 0 && (
                    <div className="text-sm text-gray-500 mt-1">
                      per {billing === "monthly" ? "month" : "year"}
                    </div>
                  )}
                </div>

                <ul className="mt-6 space-y-4 text-sm text-gray-700">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex gap-3 transition-colors duration-200 hover:text-[#4f47e6]"
                    >
                      <span className="text-[#4f47e6]">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => navigate("/app")}
                  className={`mt-10 w-full py-3 rounded-lg font-medium transition-all duration-200 ${
                    plan.highlight
                      ? "bg-[#4f47e6] text-white hover:shadow-lg hover:opacity-95"
                      : "border border-[#4f47e6] text-[#4f47e6] hover:bg-[#4f47e6]/5"
                  }`}
                >
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= COMPARISON ================= */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-2xl font-semibold mb-10">Compare plans</h2>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="py-4 px-6">Features</th>
                <th className="py-4 px-6">Free</th>
                <th className="py-4 px-6 text-[#4f47e6]">Pro</th>
                <th className="py-4 px-6">Business</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={i} className="border-t transition-colors hover:bg-gray-50">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`py-4 px-6 ${
                        j === 2 ? "text-[#4f47e6] font-medium" : ""
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= FAQ ================= */}
      <div className="max-w-4xl mx-auto px-6 pb-28">
        <h2 className="text-2xl font-semibold mb-10">FAQs</h2>

        {[
          {
            q: "Can I switch plans anytime?",
            a: "Yes, you can upgrade or downgrade instantly from your dashboard.",
          },
          {
            q: "What happens if I cancel?",
            a: "You retain access until the end of your billing cycle.",
          },
          {
            q: "Is Business required for teams?",
            a: "Yes, collaboration features are included in the Business plan.",
          },
          {
            q: "How is yearly billing calculated?",
            a: "Yearly plans are billed at a 20% discounted annual rate.",
          },
          {
            q: "Can I upgrade mid-cycle?",
            a: "Yes, upgrades apply immediately and charges are prorated.",
          },
          {
            q: "Is my data secure?",
            a: "All data is encrypted in transit and securely stored.",
          },
          {
            q: "Do you offer enterprise plans?",
            a: "Custom enterprise solutions are available upon request.",
          },
        ].map((item, i) => (
          <motion.div key={i} layout className="border-t">
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              className="w-full flex justify-between items-center py-6 text-left font-medium transition-colors hover:text-[#4f47e6]"
            >
              {item.q}
              <motion.div
                animate={{ rotate: openFaq === i ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>

            <AnimatePresence>
              {openFaq === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden pb-6"
                >
                  <p className="text-sm text-gray-600">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                DoDraft
              </h3>
              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                AI-powered drafting and writing tools built for creators,
                professionals, and teams that want to move faster.
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#4f47e6]">Features</a></li>
                <li><a href="#" className="hover:text-[#4f47e6]">Pricing</a></li>
                <li><a href="#" className="hover:text-[#4f47e6]">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#4f47e6]">About</a></li>
                <li><a href="#" className="hover:text-[#4f47e6]">Careers</a></li>
                <li><a href="#" className="hover:text-[#4f47e6]">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><a href="#" className="hover:text-[#4f47e6]">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#4f47e6]">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#4f47e6]">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <span>© {new Date().getFullYear()} DoDraft. All rights reserved.</span>
            <span className="mt-4 md:mt-0">
              Built with modern AI infrastructure.
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}