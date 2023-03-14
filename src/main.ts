import express from "express";
import cors from "cors";
import Endpoints from "./routes";
import { getCacheMiddleware } from "./cache-middleware";

const port = process.env.PORT || 7000;
const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    maxAge: 9999,
  })
);

app.use("/api", getCacheMiddleware(86400), Endpoints);

app.listen(port, () => {
  console.log("Server listen port:", port);
});
