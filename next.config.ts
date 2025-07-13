import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Improve development experience
  experimental: {
    // Reduce file system watchers conflicts
    turbo: {
      resolveAlias: {
        // Reduce resolution conflicts
        "@": "./src",
      },
    },
  },

  // Optimize webpack for better file handling
  webpack: (config, { dev }) => {
    if (dev) {
      // Reduce file system polling conflicts
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ["**/node_modules/**", "**/.next/**"],
      };
    }
    return config;
  },

  // Optimize dev server
  devIndicators: {
    buildActivity: false, // Reduces file system activity
  },
};

export default nextConfig;
