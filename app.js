import express from "express";
// import { createWriteStream } from "fs";
import morgan from "morgan";
import session from "./session/index.js";
import compression from "compression";
import home from "./routes/home/index.js";
import admin from "./routes/admin/index.js";
import api from "./routes/api/index.js";
import connectToDb from "./db/index.js";
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import helmet from "helmet";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
// const logFile = join(__dirname, "blogchef.log");
const PORT = process.env.PORT || 3000;

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'nonce-ps0QMWhuej5oqzobisuQnA=='"],
        objectSrc: ["'self'"],
        // Add other directives as needed
      },
    },
  }),
);
app.use(compression());
app.use("/assets", express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "public", "client")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/admin", session(app));
app.use(morgan(":method - :url - :date - :response-time ms"));
// app.use(
//   morgan(":method - :url - :date - :response-time ms", {
//     stream: createWriteStream(logFile, { flags: "a" }),
//   }),
// );

app.set("view engine", "pug");

app.use("/admin", admin);
app.use("/api", api);
app.use("/", home);

Promise.all([connectToDb()])
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Blog Chef is cooking on port ${PORT}!`),
    ),
  )
  .catch((error) => {
    console.error(`MongoDB Atlas Error: ${error}`);
    process.exit();
  });
