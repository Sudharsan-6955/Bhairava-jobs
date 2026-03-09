This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment notes for Vercel + Render

1. On Render (backend) set the `CLIENT_URL` environment variable to include your frontend origin(s):

	Example:

	CLIENT_URL=https://bhairava-jobs.vercel.app,http://localhost:3000

2. On Vercel (frontend) set the following environment variables:

	- `NEXT_PUBLIC_API_URL` — the Render backend API base (e.g. `https://bhairava-jobs-backend.onrender.com/api`)
	- Optional: `NEXT_PUBLIC_LOCAL_API_URL` — local backend URL used when developing locally (e.g. `http://localhost:5000/api`)

3. Redeploy the frontend after setting env vars. The frontend will call the Render backend in production.

4. The client includes a lightweight runtime resolver (`src/lib/api.js`) that probes a local backend quickly when running locally and falls back to `NEXT_PUBLIC_API_URL` when local is unavailable. You do not need to run the backend locally for the frontend to function.

5. If you encounter CORS or cookie issues, confirm `CLIENT_URL` on Render contains the exact frontend origin and that the backend is configured to allow credentials (cookies) for that origin.

