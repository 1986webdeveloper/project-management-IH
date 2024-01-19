import { Router } from 'express';
import ProjectController from '../controllers/project.controller';

export default class Project extends ProjectController {
	public router = Router();

	constructor() {
		super();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post('/create', this.CreateProject);
		this.router.get('/get', this.GetProjectList);
		this.router.put('/update/:_id', this.UpdateProject);
		this.router.delete('/delete/:_id', this.DeleteProject);
	}
}
