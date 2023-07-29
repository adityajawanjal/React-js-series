import React, { useEffect, useState } from "react";

const Carousal = () => {
  const images = [
    `https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg`,
    `https://imgd.aeplcdn.com/1056x594/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=75`,
    `https://1.bp.blogspot.com/-kK7Fxm7U9o0/YN0bSIwSLvI/AAAAAAAACFk/aF4EI7XU_ashruTzTIpifBfNzb4thUivACLcBGAsYHQ/s1280/222.jpg`,
  ];

  const [count, setCount] = useState(0);

  const nextImage = () => {
    setCount((pre) => (pre + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 2000);
    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className=" w-11/12 mx-auto flex justify-center">
    <img src={images[count]} alt="pic" className=" w-9/12 h-96 rounded-3xl" />
  </div>
  )
};

export default Carousal;
