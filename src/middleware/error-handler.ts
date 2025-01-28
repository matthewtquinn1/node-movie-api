import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: unknown, _: Request, res: Response, next: NextFunction) => {
    console.error(err); // TODO: Not in production.

    if (res.headersSent) {
        // If headers are already sent, let Express handle it.
        return next(err);
    }

    res.status(500).send({ error: 'Something went wrong.' });
}