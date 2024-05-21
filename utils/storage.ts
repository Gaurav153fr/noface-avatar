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

export { upload };
