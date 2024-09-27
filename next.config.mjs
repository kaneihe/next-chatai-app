/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          // github login
          'avatars.githubusercontent.com',
          // google login
          'lh3.googleusercontent.com',
          // twitter login
          'pbs.twimg.com',
        ],
      },
};

export default nextConfig;

