import { Router } from 'express';
import TaskController from '../controllers/task.controller';

export default class Task extends TaskController {
	public router = Router();
	constructor() {
		super();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post('/create', this.CreateTask);
		this.router.get('/get', this.GetTasks);
		this.router.get('/:id', this.GetTasks);
		this.router.put('/update/:id', this.UpdateTasks);
		this.router.delete('/delete/:id', this.DeleteTask);
	}
}
