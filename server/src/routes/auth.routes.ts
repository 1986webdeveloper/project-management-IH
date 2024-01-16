import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

export default class Auth extends AuthController {
	public router = Router();

	constructor() {
		super();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post('/signup', this.Signup);
		this.router.post('/login', this.Login);
		this.router.post('/forgot-pass', this.ForgotPassword);
		this.router.get('/currentUser', this.CurrentUser);
		this.router.post('/checkEmail', this.CheckEmail);
	}
}
