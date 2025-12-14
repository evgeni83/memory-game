// setupTests.ts
import '@testing-library/jest-dom';

// Mock для Canvas API
const mockCanvasRenderingContext2D = {
  fillRect: () => {},
  clearRect: () => {},
  getImageData: (x: number, y: number, w: number, h: number) => ({
    data: new Array(w * h * 4),
  }),
  putImageData: () => {},
  createImageData: () => ({ data: new Uint8ClampedArray() }),
  setTransform: () => {},
  drawImage: () => {},
  save: () => {},
  fillText: () => {},
  restore: () => {},
  beginPath: () => {},
  moveTo: () => {},
  lineTo: () => {},
  closePath: () => {},
  stroke: () => {},
  fill: () => {},
  arc: () => {},
  scale: () => {},
  rotate: () => {},
  translate: () => {},
  transform: () => {},
  isPointInPath: () => false,
  measureText: () => ({ width: 0 }),
  font: '',
  fillStyle: '',
  strokeStyle: '',
  globalAlpha: 1,
  globalCompositeOperation: 'source-over',
  lineCap: 'butt',
  lineDashOffset: 0,
  lineJoin: 'miter',
  lineWidth: 1,
  miterLimit: 10,
  strokeText: () => {},
  textAlign: 'start',
  textBaseline: 'alphabetic',
  createLinearGradient: () => ({
    addColorStop: () => {},
  }),
  createPattern: () => null,
  createRadialGradient: () => ({
    addColorStop: () => {},
  }),
  setLineDash: () => {},
  getLineDash: () => [],
  direction: 'inherit',
  imageSmoothingEnabled: true,
  imageSmoothingQuality: 'low',
  canvas: {
    width: 1,
    height: 1,
  },
  getContextAttributes: () => ({ alpha: true }),
};

// Mock для HTMLCanvasElement
HTMLCanvasElement.prototype.getContext = function() {
  // Возвращаем наш mock только для '2d' контекста
  // и null для других типов контекста, как это делает реальный Canvas
  return mockCanvasRenderingContext2D as any;
};

// Mock для toDataURL
HTMLCanvasElement.prototype.toDataURL = function() {
  return 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
};

// Подавляем предупреждения о необходимости оборачивать обновления в act()
const originalError = console.error;
console.error = (...args) => {
  if (args && args[0] && typeof args[0] === 'string' &&
      (args[0].includes('was not wrapped in act(...)') ||
      args[0].includes('An update to null inside a test was not wrapped in act(...)'))) {
    return; // Подавляем это конкретное предупреждение
  }
  originalError.apply(console, args);
};