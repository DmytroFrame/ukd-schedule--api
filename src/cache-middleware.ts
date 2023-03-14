import { NextFunction, Request } from "express";
import NodeCache from "node-cache";

export function getCacheMiddleware(durationSec: number) {
  const cache = new NodeCache({ stdTTL: durationSec, checkperiod: 120 });

  return function cacheMiddleware(req: Request, res: any, next: NextFunction) {
    const key = "__express__" + req.originalUrl || req.url;
    const cachedBody = cache.get(key);

    if (cachedBody) {
      res.send(cachedBody);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        cache.set(key, body);
        res.sendResponse(body);
      };
      next();
    }
  };
}
