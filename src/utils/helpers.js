import { useState, useEffect } from "react"

export const validateFieldsAndSpaces = (valueToCheck) => {
  const regexp = /^\S.*\S$/;

  for (const [key, value] of Object.entries(valueToCheck)) {
    if(!value){
      throw new Error(`Some fields are missing`);
    }
    if(!value.match(regexp)){
      throw new Error(`Keep trying 😁`);
    }
  };
  return true;
};


export const useResize = () => {
  const [screenSize, setScreenSize] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isResponsive: false
  })

  const updateSize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: window.innerWidth < 768,
      isResponsive: window.innerWidth < 992
    })
  }

  useEffect(() => {
    window.addEventListener("resize", updateSize)
    updateSize()

    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [])

  return screenSize;
};

export const numberWithCommas = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}