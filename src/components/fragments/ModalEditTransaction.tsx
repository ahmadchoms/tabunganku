import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Transaction } from "../../../types";

interface EditTransactionModalProps {
  isOpen: boolean;
  itemTransaction: Transaction | null;
  setItemTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onEditSuccess: () => void;
}

const ModalEditTransaction: React.FC<EditTransactionModalProps> = ({
  isOpen,
  itemTransaction,
  setItemTransaction,
  setEditModalOpen,
  onEditSuccess,
}) => {
  const [amount, setAmount] = useState(itemTransaction?.amount || 0);
  const [description, setDescription] = useState(
    itemTransaction?.description || ""
  );
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (itemTransaction) {
      setAmount(itemTransaction?.amount);
      setDescription(itemTransaction?.description);
    }
  }, [itemTransaction]);

  const handleEdit = async () => {
    if (!itemTransaction) return;
    setIsLoading(true);

    try {
      await updateDoc(doc(db, "transaction", itemTransaction.id), {
        amount,
        description,
      });

      toast({
        title: "Success",
        description: "Transaction updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setIsLoading(false);
      onEditSuccess();
    } catch (error) {
      console.error("Error updating document:", error);
      toast({
        title: "Error",
        description: "Failed to update the transaction.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }

    setItemTransaction(null);
    setEditModalOpen(false);
  };

  return (
    <Modal
      size={{ base: "xs", md: "md", xl: "2xl" }}
      isOpen={isOpen}
      onClose={() => setEditModalOpen(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => setEditModalOpen(false)}
            className="mr-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            {isLoading ? <Spinner /> : "Save Changes"}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalEditTransaction;
