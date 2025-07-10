import createNextIntlPlugin from "next-intl/plugin";
import { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "e-commerce-nestjs-g12u.onrender.com",
        port: "",
        pathname: "/uploads/**",
      },
    ],
    domains: ["localhost"],
  },
};

export default withNextIntl(nextConfig);
