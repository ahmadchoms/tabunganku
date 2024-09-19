import { NextApiResponse, NextApiRequest } from "next";

type MiddlewareFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  next: (result: unknown) => void
) => void;

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: MiddlewareFunction
): Promise<unknown> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
