
import React, { useState, useEffect } from "react";

const StaticImage = ({ src, alt, className }) => {
  const [staticSrc, setStaticSrc] = useState(src);

  useEffect(() => {
    if (src && src.toLowerCase().endsWith(".gif")) {
      const img = new Image();
      img.src = src;
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL();
        setStaticSrc(dataURL);
      };
      img.onerror = () => setStaticSrc(src);
    } else {
      setStaticSrc(src);
    }
  }, [src]);

  return <img src={staticSrc} alt={alt || "Static image"} className={className} />;
};

export default StaticImage;
