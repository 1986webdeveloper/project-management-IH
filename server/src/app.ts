import express from 'express';
import * as path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';

//controllers
import User from './routes/auth.routes';
import Project from './routes/project.routes';
import Client from './routes/client.routes';

export default class App {
	public static instance: express.Application;
	private static port: number;
	public static start(port: number) {
		this.instance = express();
		this.port = port;

		// Add middlewares.
		this.initializeMiddlewares();

		// Add controllers
		this.initializeControllers();
	}

	private static initializeMiddlewares() {
		// CORS
		this.instance.use(
			cors({
				origin: true,
				credentials: true,
				exposedHeaders: 'x-auth-token',
			}),
		);

		// Cookie parser.
		this.instance.use(cookieParser(process.env.COOKIE_SECRET));

		// Body Parser
		this.instance.use(express.json({ limit: '50mb' }));
		// support json encoded bodies
		this.instance.set('views', path.join(__dirname, 'views'));
		this.instance.set('view engine', 'ejs');
		this.instance.use(express.static(process.cwd() + '/public'));
	}
	private static initializeControllers() {
		this.instance.use('/auth', new User().router);
		this.instance.use('/project', new Project().router);
		this.instance.use('/client', new Client().router);
	}
}
