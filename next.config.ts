import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['fakestoreapi.com',
      'cdn.dummyjson.com',
      'm.media-amazon.com',
    ],
  },
};

export default nextConfig;
