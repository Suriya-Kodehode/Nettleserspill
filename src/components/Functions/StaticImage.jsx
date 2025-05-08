import React, { useState, useEffect } from "react";

const StaticImage = ({ src, alt, className, freeze = false }) => {
  const [staticSrc, setStaticSrc] = useState(src);

  useEffect(() => {
    let didCancel = false;
    if (freeze && src && src.toLowerCase().endsWith(".gif")) {
      const img = new Image();
      img.src = src;
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        if (didCancel) return;
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL();
        if (!didCancel) setStaticSrc(dataURL);
      };
      img.onerror = () => {
        if (!didCancel) setStaticSrc(src);
      };
    } else {
      setStaticSrc(src);
    }
    return () => {
      didCancel = true;
    };
  }, [src, freeze]);

  return <img src={staticSrc} alt={alt || "Static image"} className={className} />;
};

export default StaticImage;
