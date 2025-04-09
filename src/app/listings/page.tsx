"use client";

import { Layout } from "@/components/Layout";
import { ListingCard } from "@/components/ListingCard";
import { getListings } from "@/lib/api";
import { Listing } from "@/types";
import { useEffect, useState } from "react";

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const data = await getListings();
        setListings(data);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Available Listings</h1>
          <div className="flex gap-4">{/* Add filters here later */}</div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">
              No listings found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              Be the first to create a listing!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
