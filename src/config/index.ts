import { ConfigFactory } from '@nestjs/config';
import app from './app';
import bull from './bull';
import database from './database';

export const config: ConfigFactory[] = [app, database, bull];
