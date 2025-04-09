"use client";

import { Button } from "@/components/ui/Button";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import {
  fundEscrow,
  getEscrowById,
  getTransactionById,
  releaseEscrow,
  updateTransactionStatus,
} from "@/lib/api";
import { Escrow, Transaction, TransactionStatus } from "@/types";
import {
  formatAddress,
  formatCryptoAmount,
  formatCurrency,
  formatDate,
  getTransactionStatusInfo,
} from "@/utils/format";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransactionDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { isAuthenticated, userProfile } = useAuth();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [escrow, setEscrow] = useState<Escrow | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const isBuyer = userProfile && transaction?.buyerId === userProfile.address;
  const isSeller = userProfile && transaction?.sellerId === userProfile.address;

  useEffect(() => {
    const fetchTransactionData = async () => {
      setIsLoading(true);
      try {
        const transactionData = await getTransactionById(params.id);
        setTransaction(transactionData);

        if (transactionData?.escrowId) {
          const escrowData = await getEscrowById(transactionData.escrowId);
          setEscrow(escrowData);
        }
      } catch (error) {
        console.error("Failed to fetch transaction data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchTransactionData();
    }
  }, [params.id]);

  const handleFundEscrow = async () => {
    if (!transaction || !escrow) return;

    setIsProcessing(true);
    try {
      await fundEscrow(escrow.id);
      // Refresh data
      const updatedTransaction = await getTransactionById(transaction.id);
      const updatedEscrow = await getEscrowById(escrow.id);
      setTransaction(updatedTransaction);
      setEscrow(updatedEscrow);
    } catch (error) {
      console.error("Failed to fund escrow:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmCashDelivery = async () => {
    if (!transaction) return;

    setIsProcessing(true);
    try {
      await updateTransactionStatus(
        transaction.id,
        TransactionStatus.CASH_DELIVERED
      );
      // Refresh data
      const updatedTransaction = await getTransactionById(transaction.id);
      setTransaction(updatedTransaction);
    } catch (error) {
      console.error("Failed to confirm cash delivery:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReleaseEscrow = async () => {
    if (!transaction || !escrow) return;

    setIsProcessing(true);
    try {
      await releaseEscrow(escrow.id);
      // Refresh data
      const updatedTransaction = await getTransactionById(transaction.id);
      const updatedEscrow = await getEscrowById(escrow.id);
      setTransaction(updatedTransaction);
      setEscrow(updatedEscrow);
    } catch (error) {
      console.error("Failed to release escrow:", error);
    } finally {
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

  if (!transaction) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">
            Transaction not found
          </h3>
          <div className="mt-4">
            <Button onClick={() => router.push("/dashboard")}>
              Go to Dashboard
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const { label: statusLabel, color: statusColor } = getTransactionStatusInfo(
    transaction.status
  );

  return (
    <Layout>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                Transaction #{transaction.id}
              </h1>
              <p className="text-gray-500">
                Created {formatDate(transaction.createdAt)}
              </p>
            </div>
            <div className="text-right">
              <p className={`text-lg font-medium ${statusColor}`}>
                Status: {statusLabel}
              </p>
              <p className="text-gray-500">
                Last updated: {formatDate(transaction.updatedAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-medium mb-4">Transaction Details</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Amount:</span>{" "}
              {formatCryptoAmount(
                transaction.cryptoAmount,
                transaction.cryptoType
              )}{" "}
              ↔️ {formatCurrency(transaction.cashAmount, transaction.currency)}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Transaction Type:</span>{" "}
              {transaction.transactionType}
            </p>
            {transaction.location && (
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Location:</span>{" "}
                {transaction.location}
              </p>
            )}
          </div>
          <div>
            <h2 className="text-lg font-medium mb-4">Participants</h2>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Seller:</span>{" "}
              {formatAddress(transaction.sellerId)}
              {isSeller && <span className="ml-2 text-blue-600">(You)</span>}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Buyer:</span>{" "}
              {formatAddress(transaction.buyerId)}
              {isBuyer && <span className="ml-2 text-blue-600">(You)</span>}
            </p>
          </div>
        </div>

        {escrow && (
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Escrow Status</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Status:</span>{" "}
                {escrow.status.charAt(0).toUpperCase() + escrow.status.slice(1)}
              </p>
              {escrow.fundedAt && (
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Funded at:</span>{" "}
                  {formatDate(escrow.fundedAt)}
                </p>
              )}
              {escrow.releasedAt && (
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Released at:</span>{" "}
                  {formatDate(escrow.releasedAt)}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-end space-x-4">
            {isAuthenticated ? (
              <>
                {/* Seller actions */}
                {isSeller && (
                  <>
                    {transaction.status === TransactionStatus.PENDING && (
                      <Button
                        onClick={handleFundEscrow}
                        isLoading={isProcessing}
                        disabled={isProcessing}
                      >
                        Fund Escrow
                      </Button>
                    )}
                    {transaction.status ===
                      TransactionStatus.CASH_DELIVERED && (
                      <Button
                        onClick={handleReleaseEscrow}
                        isLoading={isProcessing}
                        disabled={isProcessing}
                      >
                        Release Escrow
                      </Button>
                    )}
                  </>
                )}

                {/* Buyer actions */}
                {isBuyer && (
                  <>
                    {transaction.status === TransactionStatus.ESCROW_FUNDED && (
                      <Button
                        onClick={handleConfirmCashDelivery}
                        isLoading={isProcessing}
                        disabled={isProcessing}
                      >
                        Confirm Cash Delivered
                      </Button>
                    )}
                  </>
                )}

                {/* Completed transaction */}
                {transaction.status === TransactionStatus.COMPLETED && (
                  <Button variant="outline" disabled>
                    Transaction Completed
                  </Button>
                )}
              </>
            ) : (
              <Button disabled>Connect wallet to manage transaction</Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
