"use client";
import { ChangeEvent, useRef, useState } from "react";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, Input } from "@nextui-org/react";
import Link from "next/link";
export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [download, setDownload] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imgs, setImgs] = useState<null | string[]>(null);

  const input = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (files[0].size > 5 * 1024 * 1024) {
        alert("File size exceeds the limit of 5MB.");
        return;
      }
      const selectedFile = files[0];
      const selectImgUrl = URL.createObjectURL(selectedFile);
      setSelectedImage(selectImgUrl);
      setDownload(null);
    }
  };

  const handleClick = async () => {
    if (
      input.current &&
      input.current.files &&
      input.current.files.length > 0
    ) {
      const formData = new FormData();
      formData.append("file", input.current.files[0]);

      setIsLoading(true);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();

          console.log(data);
          setDownload(`/api/download/${data.uid}`);
          setImgs(data.imagesUrl);
        } else {
          console.error("Failed to upload image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <main className="flex gap-5  p-5  w-full max-sm:items-center m-auto max-sm:flex-col">
      <div className="min-w-60">
        <input
          accept="image/png, image/webp, image/jpeg, img/jpg"
          type="file"
          ref={input}
          onChange={handleChange}
          color="primary"
          className="w-full h-20 p-4"
        />
        {selectedImage ? (
          <Card shadow="sm" className="h-fit ">
            <CardBody className="overflow-visible p-0 h-60 items-center flex justify-center">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt="Selected"
                className=" object-contain h-40 w-40 rounded-full "
                src={selectedImage}
              />
            </CardBody>
            <CardFooter className="justify-center">
              {!download && (
                <Button
                  onPress={handleClick}
                  isLoading={isLoading}
                  variant="solid"
                  color="primary"
                  className="w-full"
                >
                  {isLoading ? "Processing..." : "Submit"}
                </Button>
              )}
            </CardFooter>
            {download && (
              <CardFooter className="justify-center">
                <Button
                  isLoading={isLoading}
                  variant="solid"
                  color="success"
                  className="w-full"
                  as={Link}
                  href={download}
                >
                  Download zip
                </Button>
              </CardFooter>
            )}
          </Card>
        ) : (
          <Card shadow="sm" className="h-fit w-full">
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt="No image selected"
                className="w-full object-cover h-80"
                src="https://nextui.org/images/fruit-1.jpeg"
              />
            </CardBody>
            <CardFooter className="justify-center">
              <Button
                isDisabled
                variant="solid"
                color="primary"
                className="w-full"
              >
                Select Image to get started
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {imgs &&
          imgs.map((i, index) => (
            <Card key={index} shadow="sm" className="flex grow items-center">
              <CardBody>
                <Image
                  src={i}
                  alt={`result image avatar ${index}`}
                  width="100%"
                  className="object-cover max-sm:object-contain h-60 w-fit m-auto min-w-40 "
                  radius="none"
                />
              </CardBody>
            </Card>
          ))}
      </div>
    </main>
  );
}
