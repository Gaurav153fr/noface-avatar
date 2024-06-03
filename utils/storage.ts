import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from '../constants/firebase'
const storage = getStorage(app)

const upload = async (path: string, file: Blob) => {
  try {
    const uploadRef = ref(storage, path);
    await uploadBytes(uploadRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
    const downloadUrl = await getDownloadURL(uploadRef).then((url) => { return url })
    return downloadUrl
  } catch (error) {
    console.error(`Error uploading file to path ${path}:`, error);
    throw new Error('File upload failed');
  }
};





const zipUpload = async (file: Buffer, uid: string) => {
  try {
    const currentDate = new Date();
    const localDateString = currentDate.toLocaleString();
    const uploadRef = ref(storage, `/zip/${localDateString}.zip`);

    await uploadBytes(uploadRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
    const downloadUrl = await getDownloadURL(uploadRef).then((url) => { return url })
    return downloadUrl;
  } catch (error) {
    console.error(`Error uploading file to path /zip:`, error);
    throw new Error('File upload failed');
  }
};
export { upload, zipUpload };
