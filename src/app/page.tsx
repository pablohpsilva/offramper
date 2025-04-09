"use client";

import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <div className="relative">
        {/* Hero Section */}
        <div className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Anonymous Crypto-to-Cash</span>
              <span className="block text-blue-600">Trading Platform</span>
            </h1>
            <p className="mt-6 text-xl text-gray-500">
              Offramper lets you swap stable coins and lightning network sats
              for real cash, anonymously and securely with our escrow system.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Link href="/listings">
                    <Button size="lg">Browse Listings</Button>
                  </Link>
                  <Link href="/create-listing">
                    <Button variant="outline" size="lg">
                      Create a Listing
                    </Button>
                  </Link>
                </>
              ) : (
                <Button size="lg">Connect Your Wallet to Start</Button>
              )}
            </div>
          </div>
        </div>

        {/* Feature Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">
                Features
              </h2>
              <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
                A better way to trade crypto for cash
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Secure, anonymous, and convenient crypto-to-cash trading.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Secure Escrow
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Crypto held in escrow until cash delivery is confirmed,
                    protecting both parties.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Anonymous Trading
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Trade without revealing personal information beyond your
                    wallet address.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Flexible Options
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Choose between cash delivery or pickup, and trade stable
                    coins or lightning network sats.
                  </dd>
                </div>

                <div className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      Lightning Fast
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Support for Lightning Network provides near-instant
                    transactions with minimal fees.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
