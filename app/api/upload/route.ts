import { lookupList } from "@/constants/action-list";
import { makeAvatar } from "@/utils/makeAvatar";
import { upload } from "@/utils/storage";
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
    console.log(resultImagesBuffer);
    var imagesUrl: string[] = [];
    await Promise.all(
      resultImagesBuffer.map(async (e, i) => {
        if (e) {
          const blob = new Blob([e], { type: "image/jpg" });
          const url = await upload(`/${uid}/${lookupList[i]}`, blob);
          imagesUrl.push(url);
        }
      })
    );
    
    console.log(imagesUrl);
    

    return NextResponse.json({ imagesUrl });
  } catch (error) {
    console.error("Error processing the file:", error);
    return NextResponse.json(
      { error: "Error processing the file." },
      { status: 500 }
    );
  }
}

function getFileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts[parts.length - 1].toLowerCase();
}
