import React, { useState } from "react";
import { ArrowCircleUp, Money, Tag } from "phosphor-react";
import { transactionSchema } from "@/lib/validation";
import { addTransaction } from "@/lib/transaction";
import InputTransaction from "@/components/ui/InputTransaction";
import { TransactionFormData } from "../../../../types";
import ButtonTransaction from "@/components/ui/ButtonTransaction";
import TransactionLayout from "@/components/layouts/TransactionLayout";
import { useToast } from "@chakra-ui/react";

const IncomeView = () => {
  const [formData, setFormData] = useState<TransactionFormData>({
    amount: 0,
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const validatedData = transactionSchema.parse(formData);
      await addTransaction({ ...validatedData, type: "income" });
      setIsLoading(false);
      toast({
        title: "Income Added",
        description: "You have successfully added income",
        status: "success",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
      toast({
        title: "Failed Adding Income",
        description: "An error occurred while adding income",
        status: "error",
      });
    }
  };

  return (
    <TransactionLayout
      header="Add Income"
      icon={<ArrowCircleUp size={64} color="white" />}
      color="green"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputTransaction
          type="number"
          label="Amount"
          color="green"
          icon={<Money className="h-5 w-5 text-gray-500" />}
          name="amount"
          onChange={(e) =>
            setFormData({
              ...formData,
              amount: Number(e.target.value),
            })
          }
          value={formData.amount}
        />
        <InputTransaction
          label="Description"
          type="text"
          color="green"
          placeholder="Income Description"
          icon={<Tag className="h-5 w-5 text-gray-500" />}
          name="description"
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          value={formData.description}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <ButtonTransaction
          icon={<ArrowCircleUp size={24} />}
          label="Add Income"
          isLoading={isLoading}
        />
      </form>
    </TransactionLayout>
  );
};

export default IncomeView;
