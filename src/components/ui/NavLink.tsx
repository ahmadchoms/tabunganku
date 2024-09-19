import Link from "next/link";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
}

export default function NavLink({ href, icon, text, active }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`text-lg md:text-base flex items-center space-x-1 text-zinc-800 font-semibold hover:text-zinc-500 transition-colors duration-200 ${
        active
          ? "bg-zinc-300 md:bg-transparent md:border-b-2 border-zinc-800 md:pb-1 p-2 rounded-md md:rounded-none"
          : ""
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
}
