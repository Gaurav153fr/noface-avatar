import { put } from "@vercel/blob";

const upload = async (path: string, file: Blob) => {
  try {
    const { url } = await put(path, file, { access: 'public' });
    return url;
  } catch (error) {
    console.error(`Error uploading file to path ${path}:`, error);
    throw new Error('File upload failed');
  }
};
const zipUpload = async (file:Buffer,uid:string) => {
  try {
    const { url } = await put(`/zip/${Date.now()}-${uid}.zip`, file, { access: 'public' });
    return url;
  } catch (error) {
    console.error(`Error uploading file to path /zip:`, error);
    throw new Error('File upload failed');
  }
};
export { upload,zipUpload };
