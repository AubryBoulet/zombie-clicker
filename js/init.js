import  { init_td }  from "./canvas_td.js";
import { canvas } from "./canvas_td.js";
import { createMainHud } from "./hud/main_hud.js";
export let canvasMouseX;
export let canvasMouseY;
let daysPassed;
const init = () => {
    canvas.addEventListener("mousemove", mouseMouveHandler, false);
    resetState();
    init_td();
    createMainHud();
}

// Set games variables to initial values
const resetState = () => {
    daysPassed = 0;
}

// Set mouse position in canvas
const mouseMouveHandler = (e) => {
    canvasMouseX = e.clientX - canvas.offsetLeft;
    canvasMouseY = e.clientY - canvas.offsetTop;
}
addEventListener("DOMContentLoaded", init)