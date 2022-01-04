import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import config from '@src/config';
import api from '@src/api';
import morgan from '@src/api/middleware/morgan';
import { errors } from 'celebrate';
import HttpException from '@src/exceptions/HttpException';
import bearerToken from 'express-bearer-token';
import logger from './logger';

const expressLoader = ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   */
  app.all('/status', (req, res) => {
    res.status(200).end();
  });
  app.use(morgan);
  app.use(cors());
  app.use(bearerToken());
  app.use(express.json());
  app.use(config.api.prefix, api());
  app.use(errors());
  app.use(
    (err: HttpException, req: Request, res: Response, next: NextFunction) => {
      err.status ??= 500;
      res.status(err.status).json({
        message: err.status === 500 ? 'unknown server error' : err.message,
      });
      if (err.status === 500) {
        logger.error(err.stack);
      }
    },
  );
};

export default expressLoader;
