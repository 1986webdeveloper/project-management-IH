import multer from 'multer';

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, './uploads');
	},
	filename: function (req, file, callback) {
		// callback(null, file.fieldname);
		const uniqueFileName = Date.now() + '-' + file.originalname;
		callback(null, uniqueFileName);
	},
});
export const upload = multer({ storage: storage });
