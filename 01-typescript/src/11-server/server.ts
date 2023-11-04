import express, { Express } from 'express';
import path from 'path';
import cors from 'cors';
import apiRouter from '..routes/api';
import mongoApi from '../routes/mongoApi';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

const app: Express = express();
const port: number = parseInt(process.env.PORT as string, 10) || 3000;
