import React, { useState, useEffect } from 'react';
import ColorPalette from './components/ColorPalette';

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [fontColor, setFontColor] = useState('#000000');
  const [palette, setPalette] = useState([]);

  const generateRandomColor = () => {
    const randomHex = generateDistinctRandomHex(backgroundColor);
    setBackgroundColor(randomHex);
    setFontColor(getContrastingColor(randomHex));
    setPalette(generateColorPalette(randomHex));
  };

  const generateDistinctRandomHex = (currentColor) => {
    let newColor = '';
    do {
      newColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
    } while (newColor.toLowerCase() === currentColor.toLowerCase());
    return newColor;
  };

  const getContrastingColor = (hexColor) => {
    const color = hexColor.replace('#', '');
    const r = parseInt(color.substr(0,2),16);
    const g = parseInt(color.substr(2,2),16);
    const b = parseInt(color.substr(4,2),16);
    const luminance = (0.299*r + 0.587*g + 0.114*b)/255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  const generateColorPalette = (baseColor) => {
    const palette = [];
    const numColors = 11; // Changed from 10 to 11
    const base = hexToHSL(baseColor);
    const step = 360 / numColors;

    for (let i = 0; i < numColors; i++) {
      let hue = (base.h + step * i + step / 2) % 360; // Offset to ensure distinct first color
      let saturation = base.s;
      let lightness = base.l;
      const newColor = hslToHex(hue, saturation, lightness);
      palette.push(newColor);
    }

    return palette;
  };

  const hexToHSL = (H) => {
    let r = 0, g = 0, b = 0;
    if (H.length === 7) {
      r = parseInt(H.substring(1,3),16) / 255;
      g = parseInt(H.substring(3,5),16) / 255;
      b = parseInt(H.substring(5,7),16) / 255;
    }
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max === min){
      h = s = 0; // achromatic
    }
    else{
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch(max){
        case r: h = ((g - b) / d) + (g < b ? 6 : 0); break;
        case g: h = ((b - r) / d) + 2; break;
        case b: h = ((r - g) / d) + 4; break;
        default: break;
      }
      h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToHex = (h, s, l) => {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c/2;
    let r=0, g=0, b=0;

    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

    r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
    g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
    b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
  };

  useEffect(() => {
    // Generate an initial color and palette on mount
    generateRandomColor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Apply background color and font color to body
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = fontColor;
  }, [backgroundColor, fontColor]);

  return (
    <div className="app">
      <button className="generate-button" onClick={generateRandomColor}>
        Generate Random Color
      </button>
      <ColorPalette palette={palette} fontColor={fontColor} />
    </div>
  );
}

export default App;
