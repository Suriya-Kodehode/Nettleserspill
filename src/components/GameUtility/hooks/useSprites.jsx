import { useEffect, useState, useRef } from "react";
import { preloadStaticSprites, loadAnimatedFrames } from "../spriteLoader.jsx";

export const useSprites = (finalSprites) => {
  const [assetImages, setAssetImages] = useState({});
  const animatedFramesRef = useRef({});
  
  useEffect(() => {
    (async () => {
      const { images } = await preloadStaticSprites(finalSprites);
      setAssetImages(images);
      const mapping = await loadAnimatedFrames(finalSprites);
      animatedFramesRef.current = mapping;
    })();
  }, [finalSprites]);
  
  return { assetImages, animatedFrames: animatedFramesRef };
};
