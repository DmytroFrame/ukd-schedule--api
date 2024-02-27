import { NextFunction, Request } from "express";
import NodeCache from "node-cache";

export function loggerMiddleware(req: Request, res: any, next: NextFunction) {
  const { ip, method, originalUrl, body } = req;
  const userAgent = req.get("user-agent") || "";

  res.on("finish", () => {
    const { statusCode } = res;

    const logMessage = JSON.stringify({
      method,
      originalUrl,
      statusCode,
      body,
      ip,
      userAgent,
    });

    if (statusCode >= 500) {
      console.error("#ERROR", logMessage);
    } else if (statusCode >= 400) {
      console.warn("#WARN", logMessage);
    } else {
      console.log("#INFO", logMessage);
    }
  });

  next();
}
