/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["127.0.0.1", ":8000/"], // Agrega el dominio de tu API
  },
};

export default nextConfig;
