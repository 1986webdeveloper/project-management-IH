import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

export default class User extends AuthController {
	public router = Router();

	constructor() {
		super();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post('/signup', this.Signup);
		this.router.post('/login', this.Login);
		this.router.post('/forgot-pass', this.ForgotPassword);
	}
}
