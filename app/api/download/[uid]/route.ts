import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import JSZip from "jszip";

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const { uid } = params;
    const folderPath = path.join(process.cwd(), `/public/output/result/${uid}`);
    const zipFileName = `${uid}.zip`;
    const zipFilePath = path.join(process.cwd(), `/public/temp/${zipFileName}`);

    console.log("Creating zip file...");
    console.log("Source folder:", folderPath);
    console.log("Destination file:", zipFilePath);

    // Check if the folder exists
    if (!fs.existsSync(folderPath)) {
      throw new Error(`Folder does not exist: ${folderPath}`);
    }

    const zip = new JSZip();

    // Read files from the folder and add them to the zip archive
    const files = fs.readdirSync(folderPath);
    console.log("Files in folder:", files);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const fileData = fs.readFileSync(filePath);
      zip.file(file, fileData);
      console.log("Added file to zip:", file);
    }

    // Generate the zip file asynchronously
    const zipData = await zip.generateAsync({ type: "nodebuffer" });

    // Write the zip file to disk
    fs.writeFileSync(zipFilePath, zipData);
    console.log("Zip file created successfully.");

    // Send the zip file as a download link to the client
    const fileStream = fs.createReadStream(zipFilePath);
    const headers = {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${zipFileName}"`,
      "content-size":"400kb"
    };

    // Convert the file stream to a buffer
    const fileBuffer = await streamToBuffer(fileStream);

    // Send the buffer in the response
    return new Response(fileBuffer, { headers });
  } catch (error) {
    console.error("Error zipping and sending folder:", error);
    return NextResponse.json(
      { message: "Error zipping and sending folder.", error },
      { status: 500 }
    );
  }
}

// Function to convert a stream to a buffer
async function streamToBuffer(
  stream: NodeJS.ReadableStream
): Promise<Uint8Array> {
  const chunks: Uint8Array[] = [];
  return new Promise((resolve, reject) => {
    stream.on("data", (chunk: Uint8Array) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}
