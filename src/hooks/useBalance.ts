import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

export const useBalance = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;

      if (user) {
        const userTabunganQuery = query(
          collection(db, "transaction"),
          where("userId", "==", user.uid)
        );

        const unsubscribe = onSnapshot(userTabunganQuery, async (snapshot) => {
          const totalAmount = snapshot.docs.reduce((acc, doc) => {
            const data = doc.data();
            return acc + (data.type === "income" ? data.amount : -data.amount);
          }, 0);

          setBalance(totalAmount);

          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const currentBalance = userDocSnap.data().balance || 0;

            await updateDoc(userDocRef, {
              balance: currentBalance + totalAmount,
            });
          }
        });

        return () => unsubscribe();
      }
    };

    fetchUserData();
  }, []);

  return balance;
};
