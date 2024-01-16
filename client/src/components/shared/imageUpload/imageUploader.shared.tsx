import styles from "./imageUpload.module.scss";
import { RxUpdate } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import ImageUploading, { ImageListType } from "react-images-uploading";
import axios from "axios";
import { API_LIST, BASEURL } from "@/config/api.config";
import { getToken } from "@/utils/helper/localstorage.helper";
import { useState } from "react";
import { DEFAULT_PIC_URL } from "@/config/keys.config";

interface imageUploadProps {
  setImgURL: (e: string) => void;
  imgURL: string;
  setError?: (e: any) => void;
  className?: string;
}

export function ImageUpload({ setError, setImgURL, imgURL }: imageUploadProps) {
  const [images, setImages] = useState<any>();
  const onChange = async (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined,
  ) => {
    setImages(imageList);
    const uploadImageToApi = async (imageData: any) => {
      try {
        const formData = new FormData();
        formData.append("profile_Picture", imageData.file);

        const response = await axios.post(API_LIST.IMAGE_UPLOAD, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (response.data.data.imageUrl) {
          setImgURL(response.data.data.imageUrl);
        }
        // Handle the API response as needed
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle errors here
        if (setError) {
          setError("Error uploading image");
        }
      }
    };

    // Upload each newly added or updated image
    if (addUpdateIndex !== undefined) {
      const index = addUpdateIndex[0]; // Assuming only one image is updated at a time
      const image = imageList[index];

      if (image.file) {
        await uploadImageToApi(image);
      }
    }
  };
  const deleteImage = async () => {
    try {
      const response = await axios.post(
        API_LIST.IMAGE_DELETE,
        { imageUrl: imgURL },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );
      if (
        response?.data?.response?.message ||
        response?.data?.response?.message?.length
      ) {
        setImages([]);
        setImgURL("");
        console.log("Image Deleted...");
      }
    } catch (error) {
      console.error("Error Deleting image:", error);
      if (setError) {
        setError("Error Deleting image");
      }
    }
  };

  return (
    <ImageUploading
      value={images}
      onChange={onChange}
      maxNumber={1}
      acceptType={["jpg", "gif", "png"]}
    >
      {({ onImageUpdate }) => {
        return (
          <div className={styles.uploadWrapper}>
            {
              <div className={styles.imageWrapper}>
                <img
                  src={imgURL ? `${BASEURL}/${imgURL}` : DEFAULT_PIC_URL}
                  className={styles.uploadedImage}
                  alt="logo"
                  width="100"
                />
                <div className={styles.buttonsWrapper}>
                  <button
                    onClick={() => onImageUpdate(0)}
                    className={styles.button}
                  >
                    <RxUpdate size={22} />
                  </button>
                  {imgURL && (
                    <button
                      onClick={() => deleteImage()}
                      className={styles.button}
                      disabled={!imgURL ? true : false}
                    >
                      <AiOutlineDelete size={22} />
                    </button>
                  )}
                </div>
              </div>
            }
          </div>
        );
      }}
    </ImageUploading>
  );
}
