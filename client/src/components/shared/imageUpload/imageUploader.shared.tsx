import { Button } from 'antd';
import styles from './imageUpload.module.scss';
import { BiSolidImageAdd } from 'react-icons/bi';
import { RxUpdate } from 'react-icons/rx';
import { AiOutlineDelete } from 'react-icons/ai';
import ImageUploading, { ImageListType } from 'react-images-uploading';

interface imageUploadProps {
	setImages: (e: any) => void;
	images: any;
	setError?: (e: any) => void;
}

export function ImageUpload({ images, setImages, setError }: imageUploadProps) {
	const onChange = (imageList: ImageListType, addUpdateIndex: number[] | undefined) => {
		setImages(imageList);
	};

	return (
		<ImageUploading value={images} onChange={onChange} maxNumber={1} acceptType={['jpg', 'gif', 'png']}>
			{({ imageList, onImageUpload, onImageUpdate, onImageRemove, isDragging, dragProps, errors }) => {
				// write your building UI

				return (
					<div className={styles.uploadWrapper}>
						{imageList?.length <= 0 ? (
							<Button
								className={styles.imageSection}
								style={isDragging ? { color: 'red' } : undefined}
								onClick={onImageUpload}
								{...dragProps}
							>
								<BiSolidImageAdd size={30} />
								Drop an Image here
							</Button>
						) : (
							imageList?.map((image, index) => {
								return (
									<div key={index} className={styles.imageWrapper}>
										<img src={image.dataURL} className={styles.uploadedImage} alt="logo" width="100" />
										<div className={styles.buttonsWrapper}>
											<button onClick={() => onImageUpdate(index)} className={styles.button}>
												<RxUpdate size={22} />
											</button>
											<button onClick={() => onImageRemove(index)} className={styles.button}>
												<AiOutlineDelete size={22} />
											</button>
										</div>
									</div>
								);
							})
						)}
					</div>
				);
			}}
		</ImageUploading>
	);
}
