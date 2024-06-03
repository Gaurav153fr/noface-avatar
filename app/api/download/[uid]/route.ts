import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { app } from "@/constants/firebase";// Assuming you have defined your Firebase app instance here
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } }
) {
  const storage = getStorage(app); // Pass your Firebase app instance to getStorage
  const uploadRef = ref(storage, `/zip/${params.uid}.zip`);
  const downloadUrl = await getDownloadURL(uploadRef);
 
  return NextResponse.redirect(downloadUrl); // No need to create a new URL object
}
