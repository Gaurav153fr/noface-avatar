import sharp from "sharp";
import { mkdirSync } from "fs";
import { join } from "path";

const actionDir = join(process.cwd(), "/public/actionImages");
const outputDir = join(process.cwd(), "/public/output");

async function makeAvatar(overlayPath: string, uid: string) {
  const resultDir = join(outputDir, "result", uid);
  const outputOverlayPath = join(outputDir, "overlay", uid + ".png");
  await createCircularImage(overlayPath, outputOverlayPath);
  mkdirSync(resultDir, { recursive: true });
  console.log(outputOverlayPath, "iiii");

  list.forEach((backgroundPath) => {
    image(backgroundPath, outputOverlayPath, resultDir);
  });
}

export { makeAvatar };

const list = [
  "pointing-man.jpg",
  "yelling-5.jpg",
  "man-explaining.jpg",
  "man-idea.jpg",
];

type ImageInfo = {
  size: { height: number; width: number };
  position: { top: number; left: number };
  rotation: number;
};

type Lookup = {
  [key: string]: ImageInfo;
};

const lookup: Lookup = {
  "pointing-man.jpg": {
    size: { height: 300, width: 300 },
    position: { top: 130, left: 100 },
    rotation: 0,
  },
  "yelling-5.jpg": {
    size: { height: 650, width: 650 },
    position: { top: 200, left: 650 },
    rotation: 0,
  },
  "man-explaining.jpg": {
    size: { height: 350, width: 350 },
    position: { top: 80, left: 770 },
    rotation: 0,
  },
  "man-idea.jpg": {
    size: { height: 400, width: 400 },
    position: { top: 190, left: 450 },
    rotation: 0,
  },
};

async function createCircularImage(inputPath: string, outputPath: string) {
  const { width, height } = await sharp(inputPath).metadata();
  const size = Math.min(width, height);

  return sharp(inputPath)
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
    .toFile(outputPath);
}

async function image(
  backgroundPath: string,
  circularOverlayPath: string,
  resultDir: string
) {
  const resultPath = join(resultDir, `output-${backgroundPath}`);

  try {
    // Read the circular overlay image
    const overlayBuffer = await sharp(circularOverlayPath)
      .rotate(lookup[backgroundPath].rotation, {
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      }) // Make background transparent
      .resize(
        lookup[backgroundPath].size.width,
        lookup[backgroundPath].size.height
      )
      .toBuffer();

    // Composite the resized circular overlay image onto the background image
    await sharp(join(actionDir, backgroundPath)) // Corrected path here
      .composite([
        {
          input: overlayBuffer,
          top: lookup[backgroundPath].position.top,
          left: lookup[backgroundPath].position.left,
        },
      ])
      .toFile(resultPath);

    console.log(`Image ${backgroundPath} saved successfully!`);
  } catch (err) {
    console.error(`Error processing image ${backgroundPath}:`, err);
  }
}
