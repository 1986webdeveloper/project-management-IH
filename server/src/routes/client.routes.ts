import { Router } from 'express';
import ClientController from '../controllers/client.controller';

export default class Client extends ClientController {
	public router = Router();

	constructor() {
		super();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post('/create', this.CreateClient);
		this.router.get('/', this.GetClient);
		this.router.get('/:id', this.GetClient);
		this.router.put('/update/:id', this.UpdateClient);
		this.router.delete('/delete/:id', this.DeleteClient);
	}
}
