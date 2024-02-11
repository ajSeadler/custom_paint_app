import React from 'react';
import '/src/Canvas.css';

const Canvas = React.forwardRef((props, ref) => {
  return (
    <canvas className="canvas" ref={ref} width={800} height={600}></canvas> 
  );
});

export default Canvas;
