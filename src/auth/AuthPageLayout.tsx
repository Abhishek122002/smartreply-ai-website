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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <img src={DoDraftLogo} alt="DoDraft" className="w-10 h-10" />
          <span className="text-2xl font-bold text-[#5B4DFF]">
            DoDraft
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          {title}
        </h2>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-gray-500 text-sm text-center mb-6">
            {subtitle}
          </p>
        )}

        {/* Form Content */}
        {children}

      </div>

    </div>
  );
}
