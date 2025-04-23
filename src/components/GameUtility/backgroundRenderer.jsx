
export function createBackgroundCanvas(image, width, height) {
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext("2d");
    ctx.drawImage(image, 0, 0, width, height);
    return offscreen;
  }
  