import React, { useState } from "react";
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
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface DeleteTransactionModalProps {
  isOpen: boolean;
  itemTransaction: string | null;
  setItemTransaction: React.Dispatch<React.SetStateAction<string | null>>;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteSuccess: () => void;
}

const ModalDeleteTransaction: React.FC<DeleteTransactionModalProps> = ({
  isOpen,
  itemTransaction,
  setItemTransaction,
  setDeleteModalOpen,
  onDeleteSuccess,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleDelete = async () => {
    if (!itemTransaction) return;
    setIsLoading(true);

    try {
      await deleteDoc(doc(db, "transaction", itemTransaction));
      toast({
        title: "Success",
        description: "Tabungan berhasil dihapus.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setIsLoading(false);
      onDeleteSuccess();
    } catch (error) {
      console.error("Error deleting document:", error);
      toast({
        title: "Error",
        description: "Gagal menghapus tabungan.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    }
    setItemTransaction(null);
    setDeleteModalOpen(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setDeleteModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Are you sure you want to delete this transaction?</p>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => setDeleteModalOpen(false)}
            className="mr-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            {isLoading ? <Spinner /> : "Delete"}
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDeleteTransaction;
