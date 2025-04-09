import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { formatAddress } from "@/utils/format";

export function Navbar() {
  const { isAuthenticated, userProfile } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Offramper
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href="/listings"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
            >
              Browse Listings
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/create-listing"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
                >
                  Create Listing
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center">
            {isAuthenticated && userProfile && (
              <div className="mr-4 hidden md:block">
                <span className="text-sm text-gray-500">
                  {formatAddress(userProfile.address)}
                </span>
              </div>
            )}
            <ConnectButton />
          </div>
        </div>
      </div>

      {/* Mobile menu, shown when menu button is clicked */}
      <div className="md:hidden">
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="bg-gray-50 border-l-4 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 text-base font-medium"
          >
            Home
          </Link>
          <Link
            href="/listings"
            className="text-gray-700 hover:bg-gray-50 hover:border-l-4 hover:border-blue-300 block pl-3 pr-4 py-2 text-base font-medium"
          >
            Browse Listings
          </Link>
          {isAuthenticated && (
            <>
              <Link
                href="/dashboard"
                className="text-gray-700 hover:bg-gray-50 hover:border-l-4 hover:border-blue-300 block pl-3 pr-4 py-2 text-base font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/create-listing"
                className="text-gray-700 hover:bg-gray-50 hover:border-l-4 hover:border-blue-300 block pl-3 pr-4 py-2 text-base font-medium"
              >
                Create Listing
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
