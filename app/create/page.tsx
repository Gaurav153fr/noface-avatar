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

  const input = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setSelectedImage(URL.createObjectURL(selectedFile));
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
          setDownload(data.id); // Assuming the server returns the URL of the processed image
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
    <main className="flex  flex-col gap-5  p-5 justify-center sm:w-96 w-full items-center m-auto">
      <input
        type="file"
        ref={input}
        onChange={handleChange}
        color="primary"
       
        className="w-full h-20 p-4"
      />
      {selectedImage ? (
        <Card shadow="sm" className="h-fit ">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt="Selected"
              className="w-full object-cover h-80"
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
                href={`/api/download/${download}`}
              >
                Download
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
    </main>
  );
}
