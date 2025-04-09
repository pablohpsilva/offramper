import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "viem";
import { mainnet, sepolia } from "wagmi/chains";
import { createConfig } from "wagmi";

const walletConnectProjectId = "YOUR_PROJECT_ID"; // In production, use environment variable

export const config = createConfig({
  appName: "Offramper",
  projectId: walletConnectProjectId,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
