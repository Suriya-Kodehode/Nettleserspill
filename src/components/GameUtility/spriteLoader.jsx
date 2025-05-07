import { parseGIF, decompressFrames } from "gifuct-js";
import { enemiesData } from "../GameData/enemyData.jsx";

export const preloadStaticSprites = (sprites) => {
  const images = {};
  const loadStatus = {};
  sprites.forEach((sprite) => {
    const spriteData = enemiesData[sprite];
    if (!spriteData) return;
    if (spriteData.src.toLowerCase().endsWith(".gif")) return;
    const img = new Image();
    img.src = spriteData.src;
    images[sprite] = img;
    img.onload = () => {
      loadStatus[sprite] = true;
    };
    img.onerror = () => {
      console.error(`Failed to load static sprite image for ${sprite}`);
    };
  });
  return { images, loadStatus };
};

export const loadAnimatedFrames = async (sprites) => {
  const animatedMapping = {};
  await Promise.all(
    sprites.map(async (sprite) => {
      const spriteData = enemiesData[sprite];
      if (!spriteData) return;
      if (spriteData.src.toLowerCase().endsWith(".gif")) {
        try {
          const response = await fetch(spriteData.src);
          const buffer = await response.arrayBuffer();
          const gif = parseGIF(buffer);
          const frames = decompressFrames(gif, true);
          if (!frames || frames.length === 0) {
            console.error(`No frames extracted for ${sprite}`);
            return;
          }
          const overrideDelay = spriteData.frameDelay;
          const computedDelay =
            overrideDelay !== undefined
              ? overrideDelay
              : frames[0].delay && frames[0].delay > 0
              ? frames[0].delay * 10
              : 100;
          const offscreenFrames = frames.map((frame) => {
            const canvas = document.createElement("canvas");
            canvas.width = spriteData.width;
            canvas.height = spriteData.height;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, spriteData.width, spriteData.height);
            const imageData = ctx.createImageData(frame.dims.width, frame.dims.height);
            imageData.data.set(frame.patch);
            ctx.putImageData(imageData, frame.dims.left, frame.dims.top);
            return canvas;
          });
          offscreenFrames.frameDelay = computedDelay;
          // console.log(
          //   `Loaded animated frames for ${sprite}: ${offscreenFrames.length} frames, delay: ${computedDelay} ms`
          // );
          animatedMapping[sprite] = offscreenFrames;
        } catch (err) {
          console.error(`Error loading animated frames for ${sprite}:`, err);
        }
      }
    })
  );
  return animatedMapping;
};
