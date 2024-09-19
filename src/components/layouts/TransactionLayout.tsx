import { useRouter } from "next/router";

interface TransactionLayoutProps {
  icon: React.ReactNode;
  header: string;
  children: React.ReactNode;
}

export default function TransactionLayout({
  icon,
  header,
  children,
}: TransactionLayoutProps) {
  const { pathname } = useRouter();
  return (
    <div className="h-[calc(100vh-72px)] flex items-center justify-center">
      <div className="max-w-md bg-white rounded-xl shadow-2xl overflow-hidden md:w-full md:max-w-2xl 2xl:max-w-3xl">
        <div className="md:flex">
          <div
            className={`md:flex-shrink-0 bg-gradient-to-r ${
              pathname === "/income"
                ? "from-green-500 to-green-600"
                : "from-red-500 to-red-600"
            } flex items-center justify-center md:w-48`}
          >
            {icon}
          </div>
          <div className="p-8 w-full">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
              {header}
            </h2>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
