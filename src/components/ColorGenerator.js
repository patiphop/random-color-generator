import React, { useState } from 'react';
import './ColorGenerator.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ColorGenerator = () => {
  const [color, setColor] = useState('#ffffff');

  const generateRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor(randomHex);
    toast.success(`Color ${randomHex} copied to clipboard!`);
    navigator.clipboard.writeText(randomHex);
  };

  return (
    <div className="color-generator" style={{ backgroundColor: color }}>
      <h1>Random Color Generator</h1>
      <p>{color}</p>
      <button onClick={generateRandomColor}>Generate Color</button>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ColorGenerator;
