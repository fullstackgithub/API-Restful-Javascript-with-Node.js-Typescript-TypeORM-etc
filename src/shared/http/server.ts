import 'reflect-metadata'
import { NextFunction, Request, Response } from 'express';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes'
import AppError from './errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((
  error: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction,) => {
    if(error instanceof AppError){
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        });
    }

    return res.status(500).json({
      status: 'error', 
      message: 'Internal server error'
    });
  } 
);

app.listen(3333, () => {
  console.log('Server running on port 3333')
});
