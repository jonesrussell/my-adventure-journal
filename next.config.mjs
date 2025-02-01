/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode
  reactStrictMode: true,

  // Add Webpack configuration to handle Node.js modules
  webpack: (config, { isServer, nextRuntime }) => {
    // Add custom rules or modify existing ones
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: 'crypto-browserify', // Fallback for crypto
      stream: 'stream-browserify', // Fallback for stream
      // Add any other Node.js modules you need to polyfill
    };

    // Example: Add a custom loader if needed
    // if (isServer) {
    //   config.module.rules.push({
    //     test: /\.mdx$/,
    //     use: [
    //       options.defaultLoaders.babel,
    //       {
    //         loader: '@mdx-js/loader',
    //         options: { /* your options here */ },
    //       },
    //     ],
    //   });
    // }

    // You can also check for the runtime
    if (nextRuntime === 'edge') {
      // Add any specific configurations for Edge Runtime here
    }

    return config; // Important: return the modified config
  },
};

export default nextConfig;
