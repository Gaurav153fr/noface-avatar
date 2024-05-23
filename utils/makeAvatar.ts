import sharp from "sharp";
import { join } from "path";
import { lookupList, lookupTable } from "@/constants/action-list";

const actionDir = join(process.cwd(), "/public/actionImages");

async function makeAvatar(overLayBuffer: Buffer) {
  try {
    const processedOverLayBuffer = await createCircularImage(overLayBuffer);
    if (!processedOverLayBuffer) {
      throw new Error("Failed to process overlay image");
    }

    const processedActionImagesBuffer = await Promise.all(
      lookupList.map(async (backgroundPath) => {
        try {
          return await mergeOverlayToActionImages(backgroundPath, processedOverLayBuffer);
        } catch (error) {
          console.error(`Error processing action image ${backgroundPath}:`, error);
          return null;
        }
      })
    );

    if (processedActionImagesBuffer.length === 0) {
      throw new Error("No action images processed");
    }

    console.log("%c✅ All action images processed successfully.", "color: green");
    return processedActionImagesBuffer;
  } catch (error) {
    console.error("%c❌ Error processing action images:", "color: red;", error);
    return [];
  }
}

export { makeAvatar };




async function createCircularImage(overLayBuffer: Buffer) {
  try {
    const sharpImage = sharp(overLayBuffer);
    const { width, height } = await sharpImage.metadata();
    const size = Math.min(width ?? 0, height ?? 0);
    const processedOverLayBuffer = await sharpImage
      .resize(size, size, { fit: "cover" })
      .composite([
        {
          input: Buffer.from(
            `<svg><circle cx="${size / 2}" cy="${size / 2}" r="${
              size / 2
            }" fill="black"/></svg>`
          ),
          blend: "dest-in",
        },
      ])
      .png()
      .toBuffer();
    console.log("%c✅ Image processed and uploaded successfully.",'color:green');
    return processedOverLayBuffer;
  } catch (error) {
    console.error("%c❌Error processing and uploading image:","color:red;", error);
    return null
  }
}

async function mergeOverlayToActionImages(
  backgroundPath: string,
  processedOverLayBuffer: Buffer,
  
) {

  try {
    
    const overlayBuffer = await sharp(processedOverLayBuffer)
      .rotate(lookupTable[backgroundPath].rotation, {
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      }) // Make background transparent
      .resize(
        lookupTable[backgroundPath].size.width,
        lookupTable[backgroundPath].size.height
      )
      .toBuffer();

    const processedActionImageBuffer = await sharp(join(actionDir, backgroundPath)) // Corrected path here
      .composite([
        {
          input: overlayBuffer,
          top: lookupTable[backgroundPath].position.top,
          left: lookupTable[backgroundPath].position.left,
        },
      ])
      .png()
      .toBuffer();
   
   return processedActionImageBuffer
  } catch (err) {
    console.error(`Error processing image ${backgroundPath}:`, err);
    return null
  }
}


