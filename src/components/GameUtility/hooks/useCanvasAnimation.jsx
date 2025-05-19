import { useEffect } from "react";

const useCanvasAnimation = (canvasRef, renderFn, dependencies = []) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const context = canvas.getContext("2d");
    let animationFrameId;
    const render = (timestamp) => {
      renderFn(context, timestamp); 
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, dependencies);
};

export default useCanvasAnimation;