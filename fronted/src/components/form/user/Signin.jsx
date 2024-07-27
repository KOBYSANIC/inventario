// libraries
import { Image } from "@chakra-ui/react";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

// components

// hooks
import NavBarHome from "../../navBar/NavBarHome";
import LoginRegister from "./LoginRegister";
import { useState } from "react";

import Informacion from "./Information";
import Informacion2 from "./Infomration2";
import Footer from "./Footer";

const items = [
  <Image
    bgColor="red"
    src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
    alt="..."
    w="full"
    maxH="600px"
    fit="cover"
    draggable={false}
  />,
  <Image
    bgColor="red"
    src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
    alt="..."
    w="full"
    maxH="600px"
    fit="cover"
    draggable={false}
  />,
  <Image
    bgColor="red"
    src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
    alt="..."
    w="full"
    maxH="600px"
    fit="cover"
    draggable={false}
  />,
  <Image
    bgColor="red"
    src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
    alt="..."
    w="full"
    maxH="600px"
    fit="cover"
    draggable={false}
  />,
  <Image
    bgColor="red"
    src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
    alt="..."
    w="full"
    maxH="600px"
    fit="cover"
    draggable={false}
  />,
];

function Signin() {
  const [showViewLoginRegister, setShowViewLoginRegister] = useState(false);

  return (
    <>
      {showViewLoginRegister == true ? (
        <LoginRegister setShowViewLoginRegister={setShowViewLoginRegister} />
      ) : (
        <>
          <NavBarHome setShowViewLoginRegister={setShowViewLoginRegister} />
          <AliceCarousel
            mouseTracking
            items={items}
            autoPlay
            infinite
            autoPlayInterval={3000}
            disableButtonsControls
          />

          <Informacion />
          <Informacion2 />
          <Footer />
        </>
      )}

      {/* <LoginRegister /> */}
    </>
  );
}

export default Signin;
