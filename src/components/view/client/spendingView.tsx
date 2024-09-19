import React, { useState } from "react";
import { ArrowCircleDown, Money, Tag } from "phosphor-react";
import { transactionSchema } from "@/lib/validation";
import { addTransaction } from "@/lib/transaction";
import { TransactionFormData } from "../../../../types";
import InputTransaction from "@/components/ui/InputTransaction";
import ButtonTransaction from "@/components/ui/ButtonTransaction";
import TransactionLayout from "@/components/layouts/TransactionLayout";
import { useToast } from "@chakra-ui/react";

const SpendingView = () => {
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
      await addTransaction({ ...validatedData, type: "expense" });
      setIsLoading(false);
      toast({
        title: "Spending Added",
        description: "You have successfully added spending",
        status: "success",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
      toast({
        title: "Failed Adding Spending",
        description: "An error occurred while adding spending",
        status: "error",
      });
    }
  };

  return (
    <TransactionLayout
      header="Add Spending"
      icon={<ArrowCircleDown size={64} color="white" />}
      color="red"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputTransaction
          color="red"
          type="number"
          label="Amount"
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
          color="red"
          placeholder="Spending Description"
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
          color="red"
          icon={<ArrowCircleDown size={24} />}
          label="Add Spending"
          isLoading={isLoading}
        />
      </form>
    </TransactionLayout>
  );
};

export default SpendingView;
