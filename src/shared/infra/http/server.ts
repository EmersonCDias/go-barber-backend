/* eslint-disable no-console */
import 'reflect-metadata';
import express, { Request, Response, NextFunction, response } from 'express';
import 'express-async-errors';
import cors from 'cors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppErrors';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/files', express.static(uploadConfig.directory));

app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      msg: err.msg,
    });
  }

  console.log('==========>', err);

  return response.status(500).json({
    status: 'error',
    msg: 'Internal server erro',
  });
});

app.listen(3333, () => console.log('Server running at port 3333!'));