"use client";

import { Button } from "@/components/ui/Button";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { createListing } from "@/lib/api";
import { CashTransactionType, CryptoType, Listing, ListingType } from "@/types";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function CreateListingPage() {
  const router = useRouter();
  const { isAuthenticated, userProfile, isLoading: isAuthLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form state
  const [type, setType] = useState<ListingType>(ListingType.CRYPTO_TO_CASH);
  const [cryptoType, setCryptoType] = useState<CryptoType>(
    CryptoType.STABLE_COIN
  );
  const [cryptoAmount, setCryptoAmount] = useState<string>("");
  const [cashAmount, setCashAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
  const [transactionType, setTransactionType] = useState<CashTransactionType>(
    CashTransactionType.PICKUP
  );
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthLoading && !isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, isAuthLoading, router]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!cryptoAmount || parseFloat(cryptoAmount) <= 0) {
      newErrors.cryptoAmount = "Please enter a valid crypto amount";
    }

    if (!cashAmount || parseFloat(cashAmount) <= 0) {
      newErrors.cashAmount = "Please enter a valid cash amount";
    }

    if (transactionType === CashTransactionType.PICKUP && !location) {
      newErrors.location = "Please provide a location for pickup";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !userProfile) {
      return;
    }

    setIsSubmitting(true);
    try {
      const newListing: Omit<Listing, "id" | "createdAt"> = {
        createdBy: userProfile.address,
        type,
        cryptoType,
        cryptoAmount: parseFloat(cryptoAmount),
        cashAmount: parseFloat(cashAmount),
        currency,
        transactionType,
        location: location || undefined,
        description: description || undefined,
        status: "active",
      };

      const listing = await createListing(newListing);
      router.push(`/listings/${listing.id}`);
    } catch (error) {
      console.error("Failed to create listing:", error);
      setIsSubmitting(false);
    }
  };

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
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Create New Listing</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6"
        >
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Listing Type
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  value={ListingType.CRYPTO_TO_CASH}
                  checked={type === ListingType.CRYPTO_TO_CASH}
                  onChange={() => setType(ListingType.CRYPTO_TO_CASH)}
                />
                <span className="ml-2">Sell Crypto for Cash</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  value={ListingType.CASH_TO_CRYPTO}
                  checked={type === ListingType.CASH_TO_CRYPTO}
                  onChange={() => setType(ListingType.CASH_TO_CRYPTO)}
                />
                <span className="ml-2">Buy Crypto with Cash</span>
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Crypto Type
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  value={CryptoType.STABLE_COIN}
                  checked={cryptoType === CryptoType.STABLE_COIN}
                  onChange={() => setCryptoType(CryptoType.STABLE_COIN)}
                />
                <span className="ml-2">Stable Coin (USDC)</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  value={CryptoType.LIGHTNING_NETWORK}
                  checked={cryptoType === CryptoType.LIGHTNING_NETWORK}
                  onChange={() => setCryptoType(CryptoType.LIGHTNING_NETWORK)}
                />
                <span className="ml-2">Lightning Network (BTC)</span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cryptoAmount"
              >
                Crypto Amount
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.cryptoAmount ? "border-red-500" : ""
                }`}
                id="cryptoAmount"
                type="number"
                step={
                  cryptoType === CryptoType.LIGHTNING_NETWORK
                    ? "0.00000001"
                    : "0.01"
                }
                placeholder={
                  cryptoType === CryptoType.LIGHTNING_NETWORK
                    ? "BTC amount"
                    : "USDC amount"
                }
                value={cryptoAmount}
                onChange={(e) => setCryptoAmount(e.target.value)}
              />
              {errors.cryptoAmount && (
                <p className="text-red-500 text-xs italic">
                  {errors.cryptoAmount}
                </p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cashAmount"
              >
                Cash Amount
              </label>
              <div className="flex">
                <select
                  className="shadow appearance-none border rounded-l w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
                <input
                  className={`shadow appearance-none border rounded-r w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.cashAmount ? "border-red-500" : ""
                  }`}
                  id="cashAmount"
                  type="number"
                  step="0.01"
                  placeholder="Cash amount"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                />
              </div>
              {errors.cashAmount && (
                <p className="text-red-500 text-xs italic">
                  {errors.cashAmount}
                </p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Transaction Type
            </label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  value={CashTransactionType.PICKUP}
                  checked={transactionType === CashTransactionType.PICKUP}
                  onChange={() =>
                    setTransactionType(CashTransactionType.PICKUP)
                  }
                />
                <span className="ml-2">Pickup</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  value={CashTransactionType.DELIVERY}
                  checked={transactionType === CashTransactionType.DELIVERY}
                  onChange={() =>
                    setTransactionType(CashTransactionType.DELIVERY)
                  }
                />
                <span className="ml-2">Delivery</span>
              </label>
            </div>
          </div>

          {transactionType === CashTransactionType.PICKUP && (
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="location"
              >
                Pickup Location
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.location ? "border-red-500" : ""
                }`}
                id="location"
                type="text"
                placeholder="e.g. New York, NY"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              {errors.location && (
                <p className="text-red-500 text-xs italic">{errors.location}</p>
              )}
            </div>
          )}

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description (Optional)
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              rows={4}
              placeholder="Add any additional details about your listing..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Create Listing
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
