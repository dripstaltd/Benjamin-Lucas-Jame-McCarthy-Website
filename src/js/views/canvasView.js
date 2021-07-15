import View from '../view.js';

class CanvasView extends View {
  canvas = document.querySelector('canvas');

  canvasSize = () => {
    this.canvas.width = innerWidth;
    this.canvas.height = innerHeight;
  };

  init = () => {
    this.canvasSize();
  };
}

export default new CanvasView();
