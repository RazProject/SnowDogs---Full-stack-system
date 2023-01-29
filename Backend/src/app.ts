import express from "express";
import expressFileUpload from "express-fileupload";
import cors from "cors";
import appConfig from "./2-utils/app-config";
import catchAll from "./3-middleware/catch-all";
import routeNotFound from "./3-middleware/route-not-found";
import controller from "./6-controllers/controller";
import logRequest from "./3-middleware/log-request";

const server = express();

server.use(express.json());
server.use(cors({ origin: appConfig.frontEndUrl }));

// Binding our middleware:
server.use(logRequest);

server.use(expressFileUpload());

server.use("/api", controller);

server.use("*", routeNotFound);
server.use(catchAll);
server.use(logRequest);
server.listen(appConfig.port, () => console.log(`Listening on http://localhost:${appConfig.port}`));

