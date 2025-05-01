'use client';

import { http, createConfig } from 'wagmi';
import { baseSepolia } from 'viem/chains';

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
  ssr: true,
});
