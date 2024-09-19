import { Spinner } from "@chakra-ui/react";

interface ButtonAuthProps {
  icon: React.ReactNode;
  label: string;
  isLoading: boolean;
}
export default function ButtonAuth({
  icon,
  label,
  isLoading,
}: ButtonAuthProps) {
  return (
    <button
      type="submit"
      className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-zinc-950 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500 transition-colors duration-300"
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            {icon}
          </span>
          <p className="text-zinc-400 font-semibold text-md group-hover:font-semibold group-hover:text-zinc-300">
            {label}
          </p>
        </>
      )}
    </button>
  );
}
