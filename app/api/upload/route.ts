import { lookupList } from "@/constants/action-list";
import { makeAvatar } from "@/utils/makeAvatar";
import { upload, zipUpload } from "@/utils/storage";
import JSZip from "jszip";
import { NextRequest, NextResponse } from "next/server";
import { uuid } from "uuidv4";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const uid = uuid();
    const resultImagesBuffer = await makeAvatar(buffer);
    const zip = new JSZip();
    const uploadPromises: Promise<string | null>[] = []; // Array to hold individual upload promises

    resultImagesBuffer.forEach((image, i) => {
      if (image === null) return;
      zip.file(lookupList[i], image);
      const promise = (async () => {
        if (image) {
          const blob = new Blob([image], { type: "image/png" });
          return upload(`/${uid}/${lookupList[i]}`, blob);
        }
        return null;
      })();
      uploadPromises.push(promise);
    });

    // Wait for all individual image uploads to complete
    const imagesUrl = await Promise.all(uploadPromises);
    console.log("✅ uploaded all images");
    // Generate the zip file asynchronously
    const zipContent = await zip.generateAsync({ type: "nodebuffer" });
console.log("✅zip file created");

    // Upload the zip file and wait for the upload to complete
    const downloadURL =  zipUpload(zipContent, uid);

    //console.log(imagesUrl);

    return NextResponse.json({ imagesUrl, uid:uid });
  } catch (error) {
    console.error("Error processing the file:", error);
    return NextResponse.json(
      { error: "Error processing the file." },
      { status: 500 }
    );
  }
}
