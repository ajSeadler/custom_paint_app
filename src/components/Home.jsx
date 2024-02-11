import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { Palette, Brush, Crop, Undo } from '@mui/icons-material';
import '../App.css';
import Canvas from './Canvas'

function Home() {
  const [tool, setTool] = useState(null); // State to track selected tool
  const canvasRef = useRef(null); // Reference to the canvas element

  useEffect(() => {
    if (tool === 'brush') {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
  
      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;
  
      // Adjust the scaling of the context
      const scaleCanvas = () => {
        const rect = canvas.getBoundingClientRect();
        const scaleFactorX = canvas.width / rect.width;
        const scaleFactorY = canvas.height / rect.height;
        context.scale(scaleFactorX, scaleFactorY);
      };
  
      const startDrawing = (event) => {
        isDrawing = true;
        scaleCanvas(); // Call scaleCanvas on startDrawing
        const rect = canvas.getBoundingClientRect();
        lastX = (event.clientX - rect.left) * (canvas.width / rect.width); // Scale the coordinates
        lastY = (event.clientY - rect.top) * (canvas.height / rect.height); // Scale the coordinates
      };
  
      const draw = (event) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = (event.clientX - rect.left) * (canvas.width / rect.width); // Scale the coordinates
        const y = (event.clientY - rect.top) * (canvas.height / rect.height); // Scale the coordinates
  
        context.beginPath();
        context.moveTo(lastX, lastY);
        context.lineTo(x, y);
        context.stroke();
  
        lastX = x;
        lastY = y;
      };
  
      const stopDrawing = () => {
        isDrawing = false;
      };
  
      canvas.addEventListener('mousedown', startDrawing);
      canvas.addEventListener('mousemove', draw);
      canvas.addEventListener('mouseup', stopDrawing);
      canvas.addEventListener('mouseout', stopDrawing);
  
      return () => {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseout', stopDrawing);
      };
    }
  }, [tool]);
  
  
  
  
  

  return (
    <div className="App">
    <AppBar position="static" className="appBar">
      <Toolbar>
        <IconButton
          style={{
            backgroundColor: tool === 'palette' ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
            color: 'salmon'
          }}
          onClick={() => setTool('palette')}
        >
          <Palette />
        </IconButton>
        <IconButton
          style={{
            backgroundColor: tool === 'brush' ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
            color: '#ffef99'
          }}
          onClick={() => setTool('brush')}
        >
          <Brush />
        </IconButton>
        <IconButton
          style={{
            backgroundColor: tool === 'crop' ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
            color: '#6fbf73'
          }}
          onClick={() => setTool('crop')}
        >
          <Crop />
        </IconButton>
        <IconButton
          style={{
            backgroundColor: tool === 'undo' ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
            color: '#ae99ff'
          }}
          onClick={() => setTool('undo')}
        >
          <Undo />
        </IconButton>
      </Toolbar>
    </AppBar>
    <Canvas ref={canvasRef} />
  </div>
  );
}

export default Home;
