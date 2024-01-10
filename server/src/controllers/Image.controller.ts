import { Request, Response } from 'express';
import { errorResponseHelper, successResponseHelper } from '../helpers/response.helper';
import { UserValidation } from '../validations/user.validation';
import fs from 'fs';

export default class ImageController {
	protected readonly saveImage = async (req: Request, res: Response) => {
		try {
			const payload: UserValidation = {
				...req.body,
				profile_Picture: req.file.filename,
			};
			console.log('called');

			if (payload) {
				return res.status(200).json(
					successResponseHelper({
						message: 'Image uploaded successfully',
						status: 'Success',
						statusCode: 200,
						data: { imageUrl: req.file.path },
					}),
				);
			} else {
				return res.status(500).json(errorResponseHelper({ message: 'Wrong Token', status: 'Error', statusCode: 500 }));
			}
		} catch (error) {
			return res
				.status(500)
				.json(errorResponseHelper({ message: 'Something went wrong.', status: 'Error', statusCode: 500, error }));
		}
	};

	protected readonly deleteImage = async (req: Request, res: Response) => {
		try {
			const filenameToDelete = req.body.imageUrl;

			if (!filenameToDelete) {
				return res.status(400).json(
					errorResponseHelper({
						message: 'No filename provided',
						status: 'Error',
						statusCode: 400,
					}),
				);
			}

			// Path to the directory where the images are stored
			console.log(filenameToDelete);
			// Construct the full path to the file
			const filePath = filenameToDelete;

			// Check if the file exists
			if (fs.existsSync(filePath)) {
				// Delete the file
				fs.unlinkSync(filePath);

				return res.status(200).json(
					successResponseHelper({
						message: 'Image deleted successfully',
						status: 'Success',
						statusCode: 200,
					}),
				);
			} else {
				return res.status(404).json(
					errorResponseHelper({
						message: 'File not found',
						status: 'Error',
						statusCode: 404,
					}),
				);
			}
		} catch (error) {
			return res.status(500).json(
				errorResponseHelper({
					message: 'Something went wrong.',
					status: 'Error',
					statusCode: 500,
					error,
				}),
			);
		}
	};
}
