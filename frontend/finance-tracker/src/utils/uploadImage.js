import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosinstance';

export const uploadImage = async (imageFile) => { //uploadImage is an asynchronous function that takes one input: imageFile, which is the image you want to upload.
  const formData = new FormData();
  formData.append('image', imageFile);

  try {                                              // path comes from apiPaths.js
    const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data; // response =  uploaded image's URL, sent from backend
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw error;
  }
};
