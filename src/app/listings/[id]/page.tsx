"use client";

import { Button } from "@/components/ui/Button";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { createTransaction, getListingById } from "@/lib/api";
import { Listing } from "@/types";
import {
  formatAddress,
  formatCryptoAmount,
  formatCurrency,
  formatDate,
  getListingTypeLabel,
} from "@/utils/format";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ListingDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { isAuthenticated, userProfile } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const isOwner = userProfile && listing?.createdBy === userProfile.address;

  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true);
      try {
        const data = await getListingById(params.id);
        setListing(data);
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchListing();
    }
  }, [params.id]);

  const handleCreateTransaction = async () => {
    if (!isAuthenticated || !userProfile || !listing) {
      return;
    }

    setIsProcessing(true);
    try {
      const transaction = await createTransaction(
        listing.id,
        userProfile.address
      );
      router.push(`/transactions/${transaction.id}`);
    } catch (error) {
      console.error("Failed to create transaction:", error);
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  if (!listing) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">
            Listing not found
          </h3>
          <div className="mt-4">
            <Button onClick={() => router.push("/listings")}>
              Back to Listings
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800 mb-2">
                {getListingTypeLabel(listing.type)}
              </span>
              <h1 className="text-2xl font-bold mb-2">
                {formatCryptoAmount(listing.cryptoAmount, listing.cryptoType)}{" "}
                ↔️ {formatCurrency(listing.cashAmount, listing.currency)}
              </h1>
              <p className="text-gray-500">
                Created {formatDate(listing.createdAt)}
              </p>
            </div>
            <p className="text-lg font-medium text-gray-700">
              Rate: 1 {listing.cryptoType === "STABLE_COIN" ? "USDC" : "BTC"} ={" "}
              {formatCurrency(
                listing.cashAmount / listing.cryptoAmount,
                listing.currency
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-medium mb-4">Seller Information</h2>
            <p className="text-gray-700">
              <span className="font-medium">Address:</span>{" "}
              {formatAddress(listing.createdBy)}
            </p>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-4">Transaction Details</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Transaction Type:</span>{" "}
              {listing.transactionType}
            </p>
            {listing.location && (
              <p className="text-gray-700">
                <span className="font-medium">Location:</span>{" "}
                {listing.location}
              </p>
            )}
          </div>
        </div>

        {listing.description && (
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        )}

        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-end">
            {isAuthenticated ? (
              isOwner ? (
                <Button variant="outline" disabled>
                  This is your listing
                </Button>
              ) : (
                <Button
                  onClick={handleCreateTransaction}
                  isLoading={isProcessing}
                  disabled={isProcessing}
                >
                  Start Transaction
                </Button>
              )
            ) : (
              <Button disabled>
                Connect your wallet to start a transaction
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
