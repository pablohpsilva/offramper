import { CryptoType, ListingType, TransactionStatus } from "@/types";

// Format address to display first and last few characters
export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
    address.length
  )}`;
};

// Format date to readable string
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// Format currency with symbol
export const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

// Format crypto amount with appropriate symbol
export const formatCryptoAmount = (
  amount: number,
  type: CryptoType
): string => {
  switch (type) {
    case CryptoType.STABLE_COIN:
      return `${amount.toFixed(2)} USDC`;
    case CryptoType.LIGHTNING_NETWORK:
      return `${amount.toFixed(8)} BTC`;
    default:
      return `${amount}`;
  }
};

// Get human-readable listing type
export const getListingTypeLabel = (type: ListingType): string => {
  switch (type) {
    case ListingType.CRYPTO_TO_CASH:
      return "Sell Crypto for Cash";
    case ListingType.CASH_TO_CRYPTO:
      return "Buy Crypto with Cash";
    default:
      return "Unknown";
  }
};

// Get human-readable transaction status with appropriate color
export const getTransactionStatusInfo = (
  status: TransactionStatus
): { label: string; color: string } => {
  switch (status) {
    case TransactionStatus.PENDING:
      return { label: "Pending", color: "text-yellow-500" };
    case TransactionStatus.ESCROW_FUNDED:
      return { label: "Escrow Funded", color: "text-blue-500" };
    case TransactionStatus.CASH_DELIVERED:
      return { label: "Cash Delivered", color: "text-orange-500" };
    case TransactionStatus.COMPLETED:
      return { label: "Completed", color: "text-green-500" };
    case TransactionStatus.CANCELLED:
      return { label: "Cancelled", color: "text-red-500" };
    case TransactionStatus.DISPUTED:
      return { label: "Disputed", color: "text-purple-500" };
    default:
      return { label: "Unknown", color: "text-gray-500" };
  }
};
