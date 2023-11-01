import express from "express";
import cors from "cors";
import Endpoints from "./routes";
import { getCacheMiddleware } from "./cache-middleware";

const port = process.env.PORT || 7000;
const app = express();

// app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    maxAge: 9999,
  })
);
app.use("/ukd", getCacheMiddleware(1800), Endpoints);

app.listen(port, () => {
  console.log("Server listen port:", port);
});
