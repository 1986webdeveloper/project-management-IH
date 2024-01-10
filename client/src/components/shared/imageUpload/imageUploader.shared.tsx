import { Button } from "antd";
import styles from "./imageUpload.module.scss";
import { BiSolidImageAdd } from "react-icons/bi";
import { RxUpdate } from "react-icons/rx";
import { AiOutlineDelete } from "react-icons/ai";
import ImageUploading, { ImageListType } from "react-images-uploading";
import axios from "axios";
import { API_LIST } from "@/config/api.config";
import { getToken } from "@/utils/helper/localstorage.helper";
import { useState } from "react";

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

  const deleteImage = async (imageUrl?: string) => {
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
      {({ imageList, onImageUpload, onImageUpdate, isDragging, dragProps }) => {
        // write your building UI

        return (
          <div className={styles.uploadWrapper}>
            {imageList?.length <= 0 ? (
              <Button
                className={styles.imageSection}
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                <BiSolidImageAdd size={30} />
                Drop an Image here
              </Button>
            ) : (
              imageList?.map((image, index) => {
                return (
                  <div key={`index-${index}`} className={styles.imageWrapper}>
                    <img
                      src={image.dataURL}
                      className={styles.uploadedImage}
                      alt="logo"
                      width="100"
                    />
                    <div className={styles.buttonsWrapper}>
                      <button
                        onClick={() => onImageUpdate(index)}
                        className={styles.button}
                      >
                        <RxUpdate size={22} />
                      </button>
                      <button
                        onClick={() => deleteImage()}
                        className={styles.button}
                      >
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
