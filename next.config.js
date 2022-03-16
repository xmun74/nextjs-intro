/** @type {import('next').NextConfig} */
const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/old-blog/:path*", //이 url로 가면 밑url로 자동이동함
        destination: "/new-blog/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id", //:id로 적은걸 밑에도 동일하게 해야함
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
        // /api/movies/12153 으로 데이터 받아짐
      },
    ];
  },
};

module.exports = nextConfig;
