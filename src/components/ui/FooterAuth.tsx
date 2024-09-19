import Link from "next/link";

interface FooterAuthProps {
  text: string;
  href: string;
  direct: string;
}

export default function FooterAuth({ text, href, direct }: FooterAuthProps) {
  return (
    <p className="mt-6 text-center text-sm text-gray-600">
      {text}
      <Link
        href={href}
        className="font-medium text-blue-600 hover:text-blue-500"
      >
        {direct}
      </Link>
    </p>
  );
}
