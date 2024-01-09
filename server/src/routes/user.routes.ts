import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { upload } from '../helpers/imageUpload';
export default class User extends UserController {
	public router = Router();

	constructor() {
		super();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post('/create', upload.single('profile_Picture'), this.CreateUser);
		this.router.get('/get', this.GetUser);
		this.router.get('/get/:id', this.GetUser);
		this.router.put('/update/:id', this.UpdateUser);
		this.router.delete('/delete/:id', this.DeleteUser);
	}
}
