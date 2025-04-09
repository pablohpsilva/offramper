import { Listing } from "@/types";
import {
  formatAddress,
  formatCryptoAmount,
  formatCurrency,
  formatDate,
  getListingTypeLabel,
} from "@/utils/format";
import Link from "next/link";

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const {
    id,
    createdBy,
    createdAt,
    type,
    cryptoType,
    cryptoAmount,
    cashAmount,
    currency,
    transactionType,
    location,
    description,
  } = listing;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 mb-2">
            {getListingTypeLabel(type)}
          </span>
          <h3 className="text-lg font-semibold">
            {formatCryptoAmount(cryptoAmount, cryptoType)} ↔️{" "}
            {formatCurrency(cashAmount, currency)}
          </h3>
        </div>
        <span className="text-xs text-gray-500">{formatDate(createdAt)}</span>
      </div>

      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600">
          <span className="font-medium">Seller:</span>{" "}
          {formatAddress(createdBy)}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Transaction Type:</span>{" "}
          {transactionType}
        </p>
        {location && (
          <p className="text-sm text-gray-600">
            <span className="font-medium">Location:</span> {location}
          </p>
        )}
      </div>

      {description && (
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">{description}</p>
      )}

      <div className="flex justify-end">
        <Link
          href={`/listings/${id}`}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
