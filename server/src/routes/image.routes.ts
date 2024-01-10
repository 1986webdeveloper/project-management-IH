import { Router } from 'express';
import ImageController from '../controllers/Image.controller';
import { upload } from '../middlewares/image.middleware';

export default class Image extends ImageController {
	public router = Router();

	constructor() {
		super();
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post('/upload', upload.single('profile_Picture'), this.saveImage);
		this.router.post('/delete', this.deleteImage);
	}
}
