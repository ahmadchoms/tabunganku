import { runMiddleware } from "@/lib/middleware";
import rateLimit from "express-rate-limit";
import { NextApiRequest, NextApiResponse } from "next";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit req limit
  max: 100,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, limiter);

  res.status(200).json({ message: "Hello, world!" });
}
