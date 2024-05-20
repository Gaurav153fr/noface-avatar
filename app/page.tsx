import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-evenly  p-8  h-fit bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
        <h1 className="text-4xl sm:text-6xl font-bold m sm:mb-8 text-center">
          Create Your Avatar! 🎨✨
        </h1>
        <p className="text-xl sm:text-2xl mb-2 sm:mb-3 text-center">
          Unleash your creativity and design a unique avatar that represents
          you. 🌟👩‍🎨
        </p>
        <p className="text-xl font-bold sm:text-2xl mb-4 sm:mb-8 text-center">
          Create faceless videos.  📷😍
        </p>
        <div className="flex  justify-center gap-5 sm:gap-10">
          <div className="w-32 h-48 sm:w-60 sm:h-96">
            <Image
              src="/pointng-man.webp"
              alt="Sample Avatar"
              height={900}
              width={900}
              className="mb-4 sm:mb-8 rounded-full shadow-lg object-contain"
            />
          </div>
          <div className="w-32 h-32 sm:w-60 sm:h-60">
            <Image
              src="/output-pointing-man.jpg"
              alt="Sample Avatar"
              height={500}
              width={500}
              className="mb-4 sm:mb-8 rounded-full shadow-lg object-contain"
            />
          </div>
        </div>
      </main>
      <h1 className="text-4xl sm:text-6xl font-bold mb-4 sm:mb-8 text-center   mt-10">
        20+ different Actions 💁‍♂️🐶
      </h1>
      <section
        id="example"
        className="flex gap-2 justify-center max-sm:flex-col text-center items-center w-full p-4 sm:p-8"
      >
        <Card className="sm:mr-20">
          <CardBody>
          <Image
            src="/6-profile.jpg"
            alt="Sample Avatar"
            height={100}
            width={100}
            className="mb-2 sm:mb-8 rounded-full shadow-lg object-contain"
          /></CardBody>
          <CardFooter>
          <Button variant="flat" color="warning" className="w-full">
            Input Image
          </Button>{" "}</CardFooter>
        </Card>
        <div className="flex flex-col gap-2">
          <Card>
            <CardBody>
              {" "}
              <Image
                src="/output-man-explaining.jpg"
                alt="Sample Avatar"
                height={300}
                width={300}
                className="mb-2 sm:mb-8 rounded-sm shadow-lg object-contain"
              />
            </CardBody>
            <CardFooter>
              {" "}
              <Button variant="flat" color="primary" className="w-full">
            Output: Man Pointing 
          </Button>{" "}            </CardFooter>
          </Card>
          <Card>
            <CardBody>
              {" "}
              <Image
                src="/output-yelling-5.jpg"
                alt="Sample Avatar"
                height={300}
                width={300}
                className="mb-2 sm:mb-8 rounded-sm shadow-lg object-contain"
              />
            </CardBody>
            <CardFooter>
              {" "}
              <Button variant="flat" color="primary" className="w-full">
            Output: Man Angry
          </Button>{" "}
            </CardFooter>
          </Card>
        </div>
        <Card>
          <CardBody>
            {" "}
            <Image
              src="/output-man-idea.jpg"
              alt="Sample Avatar"
              height={300}
              width={300}
              className="mb-2 sm:mb-8 rounded-sm shadow-lg object-contain"
            />
          </CardBody>
          <CardFooter>
            {" "}
            <Button variant="flat" color="primary" className="w-full">
            Output: Man Thinking
          </Button>{" "}          </CardFooter>
        </Card>
      </section>
      <div className="w-full my-4 sm:my-5 flex justify-center items-center">
        <Button
          variant="solid"
          color="primary"
          className="m-auto"
          as={Link}
          href="/create"
        >
          Get Started →
        </Button>
      </div>
    </>
  );
}
