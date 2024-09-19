import ActionButton from "@/components/ui/ActionButton";
import { useBalance } from "@/hooks/useBalance";
import { formatRupiah } from "@/lib/formatRupiah";
import { useRouter } from "next/router";
import {
  ArrowCircleDown,
  ArrowCircleUp,
  ClockCounterClockwise,
} from "phosphor-react";

export default function HomeView() {
  const router = useRouter();
  const balance = useBalance();

  return (
    <div className="p-14 rounded-lg">
      <h1 className="text-3xl xl:text-4xl text-center xl:text-left font-bold mb-8 text-zinc-800">
        Dashboard Tabungan
      </h1>
      <div className="bg-zinc-100 rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-xl xl:text-2xl font-semibold mb-4 text-gray-700">
          Tabungan Sekarang
        </h2>
        <p className="text-2xl xl:text-5xl font-bold text-zinc-600">
          {formatRupiah(balance)}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ActionButton
          onClick={() => router.push("/income")}
          icon={<ArrowCircleUp size={32} />}
          text="Add Income"
          bgColor="bg-green-500 hover:bg-green-600"
        />
        <ActionButton
          onClick={() => router.push("/expense")}
          icon={<ArrowCircleDown size={32} />}
          text="Add Spending"
          bgColor="bg-red-500 hover:bg-red-600"
        />
        <ActionButton
          onClick={() => router.push("/history")}
          icon={<ClockCounterClockwise size={32} />}
          text="View History"
          bgColor="bg-blue-500 hover:bg-blue-600"
        />
      </div>
    </div>
  );
}
