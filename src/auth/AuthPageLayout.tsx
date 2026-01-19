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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        {subtitle && (
          <p className="text-sm text-gray-500 mb-6">{subtitle}</p>
        )}
        {children}
      </div>
    </div>
  );
}
