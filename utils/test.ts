"use server"
import sharp from "sharp";

async function Test(inputBuffer:Buffer){
  console.log(inputBuffer,'color:red;');
  
if(!inputBuffer){
  console.log('%c No inputBuuffer','color:red;');
  return
  
}
    const result =await sharp(inputBuffer).resize(100, 500, { fit: "cover" })
    .composite([
      {
        input: Buffer.from(
          `<svg><circle cx="${100 / 2}" cy="${100 / 2}" r="${
            100 / 2
          }" fill="black"/></svg>`
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();
  return result
  }

  export {Test}