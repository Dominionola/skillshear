/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		// allow loading images from builder CDN used in the CallToAction background
		domains: ['cdn.builder.io'],
	},
};

export default nextConfig;
