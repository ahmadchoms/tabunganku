interface TrProps {
  children: React.ReactNode;
}

export default function Td({ children }: TrProps) {
  return <td className="px-6 py-4 whitespace-nowrap">{children}</td>;
}
