# Offramper

Offramper is a POC application that allows users to swap stable coins and lightning network sats for real cash anonymously. It uses an escrow system to ensure secure transactions between parties.

## Features

- Web3 wallet authentication using RainbowKit
- Anonymous crypto-to-cash trading
- Escrow system to guarantee payment
- Support for both stable coins and lightning network sats
- Options for cash delivery or pickup
- Modern UI with Tailwind CSS

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- RainbowKit & wagmi for wallet connection
- Biome for linting and formatting
- Vitest for testing

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended)

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/offramper.git
cd offramper
```

2. Install dependencies

```bash
pnpm install
```

3. Start the development server

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── dashboard/       # User dashboard
│   ├── listings/        # Listings pages
│   ├── transactions/    # Transaction pages
│   ├── create-listing/  # Create listing form
├── components/          # React components
├── context/             # React contexts (auth)
├── hooks/               # Custom hooks
├── lib/                 # Utilities and APIs
├── mocks/               # Mock data
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Notes for Production

This is a proof of concept application. For a production version, consider:

1. Implementing proper backend services and database
2. Adding real wallet integration and smart contracts for escrow
3. Implementing proper authentication and authorization
4. Adding security features for anonymous transactions
5. Adding a dispute resolution mechanism
6. Implementing proper testing

## License

MIT
