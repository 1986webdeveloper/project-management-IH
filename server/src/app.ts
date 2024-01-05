import express, { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Auth from './routes/auth.routes';
import Project from './routes/project.routes';
import Client from './routes/client.routes';
import Task from './routes/task.routes';
import User from './routes/user.routes';
import Global from './routes/global.routes';
import { TokenMiddleware } from './middlewares/auth.middleware';

export default class App {
	public static instance: express.Application;
	public static port: number;
	private static tokenMiddleware = new TokenMiddleware();

	public static start(port: number) {
		this.instance = express();
		this.port = port;

		this.initializeMiddlewares();
		this.initializeControllers();
	}

	private static initializeMiddlewares() {
		this.instance.use(
			cors({
				origin: true,
				credentials: true,
				exposedHeaders: 'x-auth-token',
			}),
		);

		this.instance.use(cookieParser(process.env.COOKIE_SECRET));
		this.instance.use(express.json({ limit: '50mb' }));
		this.instance.set('views', path.join(__dirname, 'views'));
		this.instance.set('view engine', 'ejs');
		this.instance.use(express.static(process.cwd() + '/public'));
	}

	private static initializeControllers() {
		// Auth routes without token middleware
		this.instance.use('/auth', new Auth().router);

		// Apply token middleware to all routes except '/auth'
		this.instance.use((req, res, next) => {
			if (req.path.startsWith('/auth')) {
				return next(); // Skip token check for auth routes
			}
			this.tokenMiddleware.checkToken(req, res, next);
		});

		// Other routes with token middleware
		this.instance.use('/project', new Project().router);
		this.instance.use('/global', new Global().router);
		this.instance.use('/client', new Client().router);
		this.instance.use('/task', new Task().router);
		this.instance.use('/user', new User().router);
	}
}
