// next.config.js
const { NextConfig } = require('next');

/** @type {NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,  // Enable Server Actions
    turbopack: true,      // Enable Turbopack (optional)
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
