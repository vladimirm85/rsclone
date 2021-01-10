import React, { useRef, useEffect } from 'react';
import { DrawType } from '../../types/types';

const Canvas: React.FC<DrawType> = ({ draw }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount += 1;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return <canvas ref={canvasRef} />;
};

export default Canvas;
