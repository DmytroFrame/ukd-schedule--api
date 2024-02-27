import { Response } from "express";

export function sendErrorResponse(res: Response, error: any) {
  console.error("#ERROR", error);

  let message = error.message;

  if (message === "fetch failed") {
    message = "УКД розклад знову здох 💀";
  }

  res.status(500).json({
    message,
    error: "Internal Server Error",
    statusCode: 500,
  });
}
