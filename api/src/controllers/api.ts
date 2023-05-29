import { Application, Request, Response } from 'express';

export const loadEndpoints = (app: Application): void => {
    app.get("/ping", (req: Request, res: Response) => {
        return res.status(200).send('pong')
    });
};