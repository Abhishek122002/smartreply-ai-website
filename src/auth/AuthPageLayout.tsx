import DoDraftLogo from "../assets/DoDraft.png";

export default function AuthPageLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gray-100 items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex">

        {/* LEFT SIDE — FORM */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img src={DoDraftLogo} alt="DoDraft" className="w-10 h-10" />
            <span className="text-2xl font-bold text-[#5B4DFF]">
              DoDraft
            </span>
          </div>

          <h2 className="text-2xl font-semibold mb-2">
            {title}
          </h2>

          {subtitle && (
            <p className="text-gray-500 mb-6 text-sm">
              {subtitle}
            </p>
          )}

          {children}
        </div>

        {/* RIGHT SIDE — VISUAL BRAND PANEL */}
        <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-[#5B4DFF] to-[#3C2FE0] text-white p-12 flex-col justify-center">

          <h2 className="text-4xl font-bold leading-tight mb-6">
            Reply in Seconds. <br />
            <span className="opacity-90">Sound Like Yourself.</span>
          </h2>

          <p className="text-white/80 text-lg mb-10">
            No more staring at a blank screen. 
            DoDraft writes clear, natural replies 
            based on what you're responding to.
          </p>

          {/* Floating UI Card */}
          <div className="bg-white rounded-xl shadow-xl p-6 text-gray-800 w-full max-w-md">
            <div className="text-sm text-gray-400 mb-2">
              Generated Reply
            </div>
            <p className="text-sm">
              Hi [Recipient's Name],  
              Thank you for your message. I'll review the details 
              and get back to you shortly.
            </p>
          </div>

          {/* Decorative Glow */}
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        </div>

      </div>
    </div>
  );
}
