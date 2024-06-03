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
    const uid =uuid()
    const resultImagesBuffer = await makeAvatar(buffer);
    const zip = new JSZip();
    resultImagesBuffer.forEach((image, i) => {
      if (image === null) return;
      zip.file(lookupList[i], image);
    });

    const zipContent = await zip.generateAsync({ type: "nodebuffer" });

    const downloadURL = await zipUpload(zipContent, uid);
    
    var imagesUrl: string[] = [];
    await Promise.all(
      resultImagesBuffer.map(async (e, i) => {
        if (e) {
          const blob = new Blob([e], { type: "image/png" });
          const url = await upload(`/${uid}/${lookupList[i]}`, blob);
          imagesUrl.push(url);
        }
      })
    );

    console.log(imagesUrl);

    return NextResponse.json({ imagesUrl, downloadURL });
  } catch (error) {
    console.error("Error processing the file:", error);
    return NextResponse.json(
      { error: "Error processing the file." },
      { status: 500 }
    );
  }
}

