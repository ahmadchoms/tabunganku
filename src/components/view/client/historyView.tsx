import React, { useState, useEffect } from "react";
import {
  ArrowCircleUp,
  ArrowCircleDown,
  Trash,
  PencilSimple,
} from "phosphor-react";
import { getTransactions } from "@/lib/transaction";
import { formatRupiah } from "@/lib/formatRupiah";
import { Transaction } from "../../../../types";
import { formatDate } from "@/lib/formatDate";
import Td from "@/components/ui/Td";
import Loading from "@/components/ui/Loading";
import Thead from "@/components/fragments/Thead";
import ModalDeleteTransaction from "@/components/fragments/ModalDeleteTransaction";
import ModalEditTransaction from "@/components/fragments/ModalEditTransaction";

const HistoryView = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [IdItemTransactionDelete, setIdItemTransactionDelete] = useState<
    string | null
  >(null);
  const [IdItemTransactionEdit, setIdItemTransactionEdit] =
    useState<Transaction | null>(null);

  const fetchTransactions = async () => {
    try {
      const fetchedTransactions = await getTransactions();
      setTransactions(fetchedTransactions);
    } catch (err) {
      setError("Gagal mendapatkan riwayat transaksi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = (id: string) => {
    setIdItemTransactionDelete(id);
    setDeleteModalOpen(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setIdItemTransactionEdit(transaction);
    setEditModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen">
        <div className="container mx-auto mt-8 p-4">
          <h1 className="text-4xl font-bold mb-8 text-zinc-900">
            Transaction History
          </h1>
          <div className="bg-zinc-100 ring-1 ring-zinc-100 rounded-lg shadow-xl p-8">
            {loading ? (
              <Loading />
            ) : error ? (
              <p className="text-center text-red-500 font-semibold">{error}</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <Thead />
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <Td>
                          {transaction.type === "income" ? (
                            <ArrowCircleUp className="text-green-500 h-5 w-5" />
                          ) : (
                            <ArrowCircleDown className="text-red-500 h-5 w-5" />
                          )}
                        </Td>
                        <Td>
                          <span
                            className={
                              transaction.type === "income"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {formatRupiah(transaction.amount)}
                          </span>
                        </Td>
                        <Td>{transaction.description}</Td>
                        <Td>{formatDate(transaction.createdAt)}</Td>
                        <Td>
                          <button
                            className="text-blue-500 mr-2"
                            onClick={() => handleEdit(transaction)}
                          >
                            <PencilSimple size={24} />
                          </button>
                          <button
                            className="text-red-500"
                            onClick={() => handleDelete(transaction.id)}
                          >
                            <Trash size={24} />
                          </button>
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <ModalEditTransaction
          isOpen={isEditModalOpen}
          itemTransaction={IdItemTransactionEdit}
          setEditModalOpen={setEditModalOpen}
          setItemTransaction={setIdItemTransactionEdit}
          onEditSuccess={fetchTransactions}
        />
      )}

      {isDeleteModalOpen && (
        <ModalDeleteTransaction
          isOpen={isDeleteModalOpen}
          itemTransaction={IdItemTransactionDelete}
          setDeleteModalOpen={setDeleteModalOpen}
          setItemTransaction={setIdItemTransactionDelete}
          onDeleteSuccess={fetchTransactions}
        />
      )}
    </>
  );
};

export default HistoryView;
