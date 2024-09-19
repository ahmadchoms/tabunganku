import { Timestamp } from "firebase/firestore";

export const formatDate = (date: Date | Timestamp) => {
  const jsDate = date instanceof Timestamp ? date.toDate() : date;
  return jsDate.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
