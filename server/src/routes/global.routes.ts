import { Router } from 'express';
import GlobalController from '../controllers/global.controller';

export default class Global extends GlobalController {
	public router = Router();

	constructor() {
		super();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get('/get', this.GetAllData);
	}
}
