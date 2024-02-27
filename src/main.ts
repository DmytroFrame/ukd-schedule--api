import express from "express";
import cors from "cors";
import Endpoints from "./routes";
import { getCacheMiddleware } from "./cache-middleware";
import { loggerMiddleware } from "./logger-middleware";

const port = process.env.PORT || 7000;
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    maxAge: 9999,
  })
);

app.use(loggerMiddleware);
app.use("/ukd", getCacheMiddleware(600), Endpoints);

app.listen(port, () => {
  console.log("Server listen port:", port);
});
