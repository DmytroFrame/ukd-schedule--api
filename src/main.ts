import express from "express";
import cors from "cors";
import Endpoints from "./routes";

const app = express();
const port = process.env.PORT || 7000;

app.use(
  cors({
    origin: "*",
    credentials: true,
    maxAge: 9999,
  })
);

app.use("/api", Endpoints);

app.listen(port, () => {
  console.log("Server listen port:", port);
});
