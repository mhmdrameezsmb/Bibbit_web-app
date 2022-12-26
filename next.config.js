/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
    domains: ['bibbits3.s3.us-east-1.amazonaws.com'],
  },
  env: {
  accessKeyId: "AKIAUGKQC7AGEJLJXUOS",
  secretAccessKey: "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",
  //dev
  basePathUrl:"https://api-dev.bibbitnow.com/"
  //qa
  // baseUrl:"https://api-dev.bibbitnow.com/api-docs"
  }
  
}

module.exports = nextConfig
