interface ThProps {
  label: string;
}

export default function Th({ label }: ThProps) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {label}
    </th>
  );
}
