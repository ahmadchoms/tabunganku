import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { Transaction, TransactionFormData } from "../../types";
import { auth, db } from "./firebase";

export const addTransaction = async (
  data: TransactionFormData & { type: "expense" | "income" }
) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const transaction: Omit<Transaction, "id"> = {
    userId: user.uid,
    amount: data.amount,
    description: data.description,
    type: data.type,
    createdAt: new Date(),
  };

  await addDoc(collection(db, "transaction"), transaction);
};

export const getTransactions = async (): Promise<Transaction[]> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const q = query(
    collection(db, "transaction"),
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp).toDate(),
      } as Transaction)
  );
};
