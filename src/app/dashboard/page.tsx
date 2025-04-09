"use client";

import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { getListings, getUserTransactions } from "@/lib/api";
import { Listing, Transaction } from "@/types";
import {
  formatAddress,
  formatCryptoAmount,
  formatCurrency,
  formatDate,
  getTransactionStatusInfo,
} from "@/utils/format";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, userProfile, isLoading: isAuthLoading } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !userProfile) return;

      setIsLoading(true);
      try {
        // Fetch user's listings
        const allListings = await getListings();
        const userListings = allListings.filter(
          (listing) => listing.createdBy === userProfile.address
        );
        setListings(userListings);

        // Fetch user's transactions
        const userTransactions = await getUserTransactions(userProfile.address);
        setTransactions(userTransactions);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthLoading) {
      fetchData();
    }
  }, [isAuthenticated, userProfile, isAuthLoading]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isAuthLoading, router]);

  if (isAuthLoading || !isAuthenticated) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            {userProfile && (
              <p className="text-gray-600">
                Address: {formatAddress(userProfile.address)}
              </p>
            )}
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/create-listing">
              <Button>Create New Listing</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User's Listings */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Your Listings</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  You haven't created any listings yet.
                </p>
                <Link href="/create-listing">
                  <Button variant="outline">Create Your First Listing</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {formatCryptoAmount(
                            listing.cryptoAmount,
                            listing.cryptoType
                          )}{" "}
                          ↔️{" "}
                          {formatCurrency(listing.cashAmount, listing.currency)}
                        </p>
                        <p className="text-sm text-gray-500">
                          Created: {formatDate(listing.createdAt)}
                        </p>
                      </div>
                      <Link href={`/listings/${listing.id}`}>
                        <span className="text-sm text-blue-600 hover:text-blue-700">
                          View →
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User's Transactions */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Your Transactions</h2>
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : transactions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  You don't have any transactions yet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => {
                  const { label, color } = getTransactionStatusInfo(
                    transaction.status
                  );
                  return (
                    <div
                      key={transaction.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {formatCryptoAmount(
                              transaction.cryptoAmount,
                              transaction.cryptoType
                            )}{" "}
                            ↔️{" "}
                            {formatCurrency(
                              transaction.cashAmount,
                              transaction.currency
                            )}
                          </p>
                          <p className="text-sm text-gray-500">
                            {userProfile?.address === transaction.sellerId
                              ? "Selling to"
                              : "Buying from"}
                            :{" "}
                            {formatAddress(
                              userProfile?.address === transaction.sellerId
                                ? transaction.buyerId
                                : transaction.sellerId
                            )}
                          </p>
                          <p className={`text-sm font-medium ${color} mt-1`}>
                            Status: {label}
                          </p>
                        </div>
                        <Link href={`/transactions/${transaction.id}`}>
                          <span className="text-sm text-blue-600 hover:text-blue-700">
                            View →
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
