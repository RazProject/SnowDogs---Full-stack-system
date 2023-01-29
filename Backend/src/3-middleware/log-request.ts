import { NextFunction, Request, Response } from "express";

function logRequest(request: Request, response: Response, next: NextFunction) {

    console.log(`Request Method: ${request.method}, Request Route: ${request.originalUrl}`);

    // Transfer flow to next middleware or to controller:
    next();
}

export default logRequest;

