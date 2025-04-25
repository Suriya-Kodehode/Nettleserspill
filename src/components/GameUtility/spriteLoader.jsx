// spriteLoader.jsx
import { parseGIF, decompressFrames } from "gifuct-js";
import { enemySprites } from "../GameData/enemySprites.jsx";

export const preloadStaticSprites = (sprites) => {
  const images = {};
  const loadStatus = {};
  sprites.forEach((sprite) => {
    const spriteData = enemySprites[sprite];
  
    if (spriteData && spriteData.src.toLowerCase().endsWith(".gif")) return;
    const img = new Image();
    img.src = spriteData.src;
    images[sprite] = img;
    img.onload = () => {
      loadStatus[sprite] = true;
    };
    img.onerror = () => {
      console.error(`Failed to load sprite image: ${sprite}`);
    };
  });
  return { images, loadStatus };
};

export const loadAnimatedFrames = async (sprites) => {
  const animatedMapping = {};
  await Promise.all(
    sprites.map(async (sprite) => {
      const spriteData = enemySprites[sprite];
      if (spriteData && spriteData.src.toLowerCase().endsWith(".gif")) {
        try {
          const response = await fetch(spriteData.src);
          const buffer = await response.arrayBuffer();
          const gif = parseGIF(buffer);
          const frames = decompressFrames(gif, true);
          const offscreenFrames = frames.map((frame) => {
            const offscreen = document.createElement("canvas");
            offscreen.width = spriteData.width;
            offscreen.height = spriteData.height;
            const ctx = offscreen.getContext("2d");
            const imageData = ctx.createImageData(frame.dims.width, frame.dims.height);
            imageData.data.set(frame.patch);
            ctx.putImageData(imageData, frame.dims.left, frame.dims.top);
            return offscreen;
          });
          animatedMapping[sprite] = offscreenFrames;
        } catch (err) {
          console.error(`Error decoding GIF for sprite ${sprite}:`, err);
        }
      }
    })
  );
  return animatedMapping;
};
