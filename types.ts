import { Timestamp } from "firebase/firestore";

export interface User {
  uid: string;
  username: string;
  email: string;
  balance: number;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: "income" | "expense";
  description: string;
  createdAt: Date | Timestamp;
}

export interface TransactionFormData {
  amount: number;
  description: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface NavItem {
  href: string;
  icon: React.ReactNode;
  text: string;
}

export interface NavbarProps {
  username: string;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface ActionButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
  bgColor: string;
}
