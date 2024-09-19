interface AuthLayoutProps {
  header: string;
  children: React.ReactNode;
}

export default function AuthLayout({ header, children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-10">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden">
        <div className="px-8 py-10">
          <h2 className="text-3xl font-extrabold text-center text-zinc-900 mb-6">
            {header}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}
