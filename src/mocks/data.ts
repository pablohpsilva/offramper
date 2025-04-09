import {
  CashTransactionType,
  CryptoType,
  Escrow,
  Listing,
  ListingType,
  Transaction,
  TransactionStatus,
  UserProfile,
} from "@/types";

// Mock user profiles
export const mockUserProfiles: Record<string, UserProfile> = {
  "0x1234567890abcdef1234567890abcdef12345678": {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    completedTransactions: 15,
    rating: 4.8,
    joinedAt: new Date("2023-01-15"),
  },
  "0xabcdef1234567890abcdef1234567890abcdef12": {
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    completedTransactions: 7,
    rating: 4.5,
    joinedAt: new Date("2023-03-22"),
  },
  "0x7890abcdef1234567890abcdef1234567890abcd": {
    address: "0x7890abcdef1234567890abcdef1234567890abcd",
    completedTransactions: 3,
    rating: 4.0,
    joinedAt: new Date("2023-06-10"),
  },
};

// Mock listings
export const mockListings: Listing[] = [
  {
    id: "1",
    createdBy: "0x1234567890abcdef1234567890abcdef12345678",
    createdAt: new Date("2024-05-01"),
    type: ListingType.CRYPTO_TO_CASH,
    cryptoType: CryptoType.STABLE_COIN,
    cryptoAmount: 1000,
    cashAmount: 950,
    currency: "USD",
    transactionType: CashTransactionType.PICKUP,
    location: "New York, NY",
    description: "Selling USDC for cash. Meet up in Manhattan.",
    status: "active",
  },
  {
    id: "2",
    createdBy: "0xabcdef1234567890abcdef1234567890abcdef12",
    createdAt: new Date("2024-05-02"),
    type: ListingType.CASH_TO_CRYPTO,
    cryptoType: CryptoType.LIGHTNING_NETWORK,
    cryptoAmount: 0.025,
    cashAmount: 1200,
    currency: "USD",
    transactionType: CashTransactionType.DELIVERY,
    description: "Looking to buy Bitcoin via Lightning Network with cash.",
    status: "active",
  },
  {
    id: "3",
    createdBy: "0x7890abcdef1234567890abcdef1234567890abcd",
    createdAt: new Date("2024-05-03"),
    type: ListingType.CRYPTO_TO_CASH,
    cryptoType: CryptoType.LIGHTNING_NETWORK,
    cryptoAmount: 0.01,
    cashAmount: 500,
    currency: "EUR",
    transactionType: CashTransactionType.PICKUP,
    location: "Berlin, Germany",
    description: "Selling BTC for cash in Berlin city center.",
    status: "active",
  },
  {
    id: "4",
    createdBy: "0x1234567890abcdef1234567890abcdef12345678",
    createdAt: new Date("2024-05-02"),
    type: ListingType.CASH_TO_CRYPTO,
    cryptoType: CryptoType.STABLE_COIN,
    cryptoAmount: 500,
    cashAmount: 490,
    currency: "USD",
    transactionType: CashTransactionType.DELIVERY,
    description:
      "Looking to buy USDC with cash. Can meet anywhere in Brooklyn.",
    status: "active",
  },
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    listingId: "1",
    sellerId: "0x1234567890abcdef1234567890abcdef12345678",
    buyerId: "0xabcdef1234567890abcdef1234567890abcdef12",
    escrowId: "e1",
    cryptoType: CryptoType.STABLE_COIN,
    cryptoAmount: 1000,
    cashAmount: 950,
    currency: "USD",
    transactionType: CashTransactionType.PICKUP,
    location: "New York, NY",
    status: TransactionStatus.ESCROW_FUNDED,
    createdAt: new Date("2024-05-04"),
    updatedAt: new Date("2024-05-04"),
  },
  {
    id: "t2",
    listingId: "3",
    sellerId: "0x7890abcdef1234567890abcdef1234567890abcd",
    buyerId: "0x1234567890abcdef1234567890abcdef12345678",
    escrowId: "e2",
    cryptoType: CryptoType.LIGHTNING_NETWORK,
    cryptoAmount: 0.01,
    cashAmount: 500,
    currency: "EUR",
    transactionType: CashTransactionType.PICKUP,
    location: "Berlin, Germany",
    status: TransactionStatus.COMPLETED,
    createdAt: new Date("2024-05-03"),
    updatedAt: new Date("2024-05-05"),
  },
];

// Mock escrows
export const mockEscrows: Escrow[] = [
  {
    id: "e1",
    transactionId: "t1",
    fundedAt: new Date("2024-05-04"),
    status: "funded",
  },
  {
    id: "e2",
    transactionId: "t2",
    fundedAt: new Date("2024-05-03"),
    releasedAt: new Date("2024-05-05"),
    status: "released",
  },
];
