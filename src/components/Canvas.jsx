import React from 'react';
import '/src/Canvas.css';

const Canvas = React.forwardRef((props, ref) => {
  const { tool } = props;
  const canvasClassName = `canvas ${tool === 'brush' ? 'brush-cursor' : ''}`;

  return (
    // 800w 600h for the brush to scale correctly - find a way to change so it will be more responsive and the width of the tool bar (or close)

    <canvas className={canvasClassName} ref={ref} width={1000} height={800}></canvas> 
  );
});

export default Canvas;