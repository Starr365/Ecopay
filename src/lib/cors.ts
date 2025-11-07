import NextCors from "nextjs-cors";
import { NextApiRequest, NextApiResponse } from "next";

export async function handleCors(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  await NextCors(req, res, {
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    origin:
      process.env.NODE_ENV === "production"
        ? "https://ecopay-eight.vercel.app" // ✅ your production domain
        : "*", // allow all during local dev
    optionsSuccessStatus: 200,
  });
}