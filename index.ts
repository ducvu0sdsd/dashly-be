import express, { Request, Response } from "express";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import router from "./src/routes";

declare module "express-serve-static-core" {
  interface Request {
    tokens?: {
      accessToken: string;
      refreshToken: string;
    };
    user_id? : string;
  }
  interface Response {
    status(code: number): this;
  }
}

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const baseURL = "http://localhost:3000";
const baseURLDeploy = "https://dashly.vercel.app";
const baseURLRelease = "https://dashly.art";

// Middleware
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));
app.use(compression());

// Cấu hình CORS
const corsOptions = {
  origin: [baseURL, baseURLDeploy, baseURLRelease],
  allowedHeaders: ["Content-Type", "x-refresh-token", "authorization"]
};
app.use(cors(corsOptions));

// init db
require('./src/dbs/init.mongodb')

// init routes
app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
