import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// اربط الملف اللي أنشأناه (next-intl.config.ts)
const withNextIntl = createNextIntlPlugin("./next-intl.config.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true
  // تقدر تضيف خيارات ثانية هنا
};

export default withNextIntl(nextConfig);
