import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import setRoutes from "./routes";
const server = express();

server.use(bodyParser.json());
server.use(cors());
setRoutes(server);
export default server;