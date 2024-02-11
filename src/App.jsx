import React, { useState, useRef, useEffect } from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { Palette, Brush, Crop, Undo } from '@mui/icons-material';
import './App.css';
import Canvas from './components/Canvas';

function App() {
  const [tool, setTool] = useState(null); // State to track selected tool
  const canvasRef = useRef(null); // Reference to the canvas element

  useEffect(() => {
    if (tool === 'brush') {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
  
      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;
  
      const startDrawing = (event) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        lastX = event.clientX - rect.left;
        lastY = event.clientY - rect.top;
        draw(event); // Draw a single point at the starting position
      };
      
  
      const draw = (event) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
  
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
          <IconButton style={{color:'salmon'}} onClick={() => setTool('palette')}>
            <Palette />
          </IconButton>
          <IconButton style={{color:'#ffef99'}} onClick={() => setTool('brush')}>
            <Brush />
          </IconButton>
          <IconButton style={{color:'#6fbf73'}} onClick={() => setTool('crop')}>
            <Crop />
          </IconButton>
          <IconButton style={{color:'#ae99ff'}} onClick={() => setTool('undo')}>
            <Undo />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Canvas ref={canvasRef} />
    </div>
  );
}

export default App;
