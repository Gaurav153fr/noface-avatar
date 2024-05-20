import { makeAvatar } from "@/utils/makeAvatar";
import { promises as fsPromises } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    // Validate file type and extension if necessary

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uid = uuidv4();
    const extension = getFileExtension(file.name); // Implement this function
    const path = join(process.cwd(), `/public/temp/${uid}.${extension}`);

    await fsPromises.writeFile(path, buffer);

    await makeAvatar(path, uid);

    return NextResponse.json({
      message: "File uploaded and processed successfully.",
      id:uid
    });
  } catch (error) {
    console.error("Error processing the file:", error);
    return NextResponse.json(new Error("Error processing the file."), {
      status: 500,
    });
  }
}

function getFileExtension(filename: string): string {
  const parts = filename.split(".");
  return parts[parts.length - 1].toLowerCase();
}
