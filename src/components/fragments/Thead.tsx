import Th from "../ui/Th";

export default function Thead() {
  return (
    <thead className="bg-gray-50">
      <tr>
        <Th label="Type" />
        <Th label="Amount" />
        <Th label="Description" />
        <Th label="Date" />
        <Th label="Action" />
      </tr>
    </thead>
  );
}
