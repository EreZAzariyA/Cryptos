import { useState, useEffect } from "react"
import Icon from '@ant-design/icons';


export const CoinsTypes = {
  USD: 'USD'
};

export const validateFieldsAndSpaces = (valueToCheck) => {
  const regexp = /^\S.*\S$/;

  for (const value of Object.values(valueToCheck)) {
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
};

export const formatHightPrice = (number) => {
  const units = ["", "K", "M", "B", "T"];
  const suffix = units[Math.floor(Math.log10(Math.abs(number)) / 3)];

  const abbreviatedNumber = `${(number / Math.pow(10, units.indexOf(suffix) * 3)).toFixed(2)} ${suffix}`;

  return abbreviatedNumber;
};


export const customIcon = (imageSrc, props) => {

  const custom = () => (
    <img src={imageSrc} alt="" {...props} />
  );

  return  <Icon component={custom} />;
}