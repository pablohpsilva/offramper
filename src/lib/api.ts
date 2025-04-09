import {
  mockEscrows,
  mockListings,
  mockTransactions,
  mockUserProfiles,
} from "@/mocks/data";
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

// User Profile API
export const getUserProfile = async (
  address: string
): Promise<UserProfile | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserProfiles[address] || null);
    }, 500);
  });
};

// Listings API
export const getListings = async (): Promise<Listing[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockListings]);
    }, 500);
  });
};

export const getListingById = async (id: string): Promise<Listing | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const listing = mockListings.find((l) => l.id === id);
      resolve(listing || null);
    }, 300);
  });
};

export const createListing = async (
  listing: Omit<Listing, "id" | "createdAt">
): Promise<Listing> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newListing: Listing = {
        ...listing,
        id: `${mockListings.length + 1}`,
        createdAt: new Date(),
      };
      mockListings.push(newListing);
      resolve(newListing);
    }, 700);
  });
};

// Transactions API
export const getUserTransactions = async (
  address: string
): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactions = mockTransactions.filter(
        (t) => t.buyerId === address || t.sellerId === address
      );
      resolve([...transactions]);
    }, 500);
  });
};

export const getTransactionById = async (
  id: string
): Promise<Transaction | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transaction = mockTransactions.find((t) => t.id === id);
      resolve(transaction || null);
    }, 300);
  });
};

export const createTransaction = async (
  listingId: string,
  buyerId: string
): Promise<Transaction> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const listing = await getListingById(listingId);
      if (!listing) {
        reject(new Error("Listing not found"));
        return;
      }

      const newTransaction: Transaction = {
        id: `t${mockTransactions.length + 1}`,
        listingId,
        sellerId: listing.createdBy,
        buyerId,
        escrowId: "",
        cryptoType: listing.cryptoType,
        cryptoAmount: listing.cryptoAmount,
        cashAmount: listing.cashAmount,
        currency: listing.currency,
        transactionType: listing.transactionType,
        location: listing.location,
        status: TransactionStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const newEscrow: Escrow = {
        id: `e${mockEscrows.length + 1}`,
        transactionId: newTransaction.id,
        status: "pending",
      };

      newTransaction.escrowId = newEscrow.id;
      mockTransactions.push(newTransaction);
      mockEscrows.push(newEscrow);

      resolve(newTransaction);
    }, 700);
  });
};

export const updateTransactionStatus = async (
  id: string,
  status: TransactionStatus
): Promise<Transaction> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const transactionIndex = mockTransactions.findIndex((t) => t.id === id);
      if (transactionIndex === -1) {
        reject(new Error("Transaction not found"));
        return;
      }

      mockTransactions[transactionIndex] = {
        ...mockTransactions[transactionIndex],
        status,
        updatedAt: new Date(),
      };

      resolve(mockTransactions[transactionIndex]);
    }, 500);
  });
};

// Escrow API
export const getEscrowById = async (id: string): Promise<Escrow | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const escrow = mockEscrows.find((e) => e.id === id);
      resolve(escrow || null);
    }, 300);
  });
};

export const fundEscrow = async (escrowId: string): Promise<Escrow> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const escrowIndex = mockEscrows.findIndex((e) => e.id === escrowId);
      if (escrowIndex === -1) {
        reject(new Error("Escrow not found"));
        return;
      }

      mockEscrows[escrowIndex] = {
        ...mockEscrows[escrowIndex],
        fundedAt: new Date(),
        status: "funded",
      };

      // Update transaction status
      const transaction = mockTransactions.find((t) => t.escrowId === escrowId);
      if (transaction) {
        await updateTransactionStatus(
          transaction.id,
          TransactionStatus.ESCROW_FUNDED
        );
      }

      resolve(mockEscrows[escrowIndex]);
    }, 700);
  });
};

export const releaseEscrow = async (escrowId: string): Promise<Escrow> => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const escrowIndex = mockEscrows.findIndex((e) => e.id === escrowId);
      if (escrowIndex === -1) {
        reject(new Error("Escrow not found"));
        return;
      }

      mockEscrows[escrowIndex] = {
        ...mockEscrows[escrowIndex],
        releasedAt: new Date(),
        status: "released",
      };

      // Update transaction status
      const transaction = mockTransactions.find((t) => t.escrowId === escrowId);
      if (transaction) {
        await updateTransactionStatus(
          transaction.id,
          TransactionStatus.COMPLETED
        );
      }

      resolve(mockEscrows[escrowIndex]);
    }, 700);
  });
};
