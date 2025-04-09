export enum CryptoType {
  STABLE_COIN = "STABLE_COIN",
  LIGHTNING_NETWORK = "LIGHTNING_NETWORK",
}

export enum CashTransactionType {
  DELIVERY = "DELIVERY",
  PICKUP = "PICKUP",
}

export enum ListingType {
  CRYPTO_TO_CASH = "CRYPTO_TO_CASH", // User wants to sell crypto for cash
  CASH_TO_CRYPTO = "CASH_TO_CRYPTO", // User wants to buy crypto with cash
}

export enum TransactionStatus {
  PENDING = "PENDING",
  ESCROW_FUNDED = "ESCROW_FUNDED",
  CASH_DELIVERED = "CASH_DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  DISPUTED = "DISPUTED",
}

export interface UserProfile {
  address: string;
  completedTransactions: number;
  rating: number;
  joinedAt: Date;
}

export interface Listing {
  id: string;
  createdBy: string;
  createdAt: Date;
  type: ListingType;
  cryptoType: CryptoType;
  cryptoAmount: number;
  cashAmount: number;
  currency: string;
  transactionType: CashTransactionType;
  location?: string; // Optional location for pickup
  description?: string;
  status: "active" | "inactive";
}

export interface Transaction {
  id: string;
  listingId: string;
  sellerId: string;
  buyerId: string;
  escrowId: string;
  cryptoType: CryptoType;
  cryptoAmount: number;
  cashAmount: number;
  currency: string;
  transactionType: CashTransactionType;
  location?: string;
  status: TransactionStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Escrow {
  id: string;
  transactionId: string;
  fundedAt?: Date;
  releasedAt?: Date;
  status: "pending" | "funded" | "released" | "refunded";
}
