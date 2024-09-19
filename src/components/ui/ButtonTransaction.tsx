import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface ButtonTransactionProps {
  icon: React.ReactNode;
  label: string;
  isLoading: boolean;
}

export default function ButtonTransaction({
  icon,
  label,
  isLoading,
}: ButtonTransactionProps) {
  const { pathname } = useRouter();
  return (
    <button
      type="submit"
      className={`w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
        pathname === "/income"
          ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
          : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
      } focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-300`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
}
