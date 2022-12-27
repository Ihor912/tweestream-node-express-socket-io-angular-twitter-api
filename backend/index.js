import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import dataStreamingHttp from "./src/api/http/data-streaming.js";
import dataStreamingSocket from "./src/api/socket/data-streaming.js";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json());

dataStreamingHttp(app, dotenv);
dataStreamingSocket(server);

const PORT = process.env.DEFAULT_SERVER_PORT || 3000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
