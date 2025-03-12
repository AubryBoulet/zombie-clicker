import  { init_td, trapAdd, canvas, towerAdd, clearLists }  from "./canvas_td.js";
import { createMainHud, resetDefaultValues } from "./hud/main_hud.js";
import { buildTower, buildTrap } from "./hud/main_hud.js";
import { resetTimer, timeOfADay } from "./callback/day_cycle.js";
import { resetRssValues } from "./callback/resources.js";
import { resetUpgrades } from "./upgrades/upgrades.js";

export let canvasMouseX;
export let canvasMouseY;
export let nightTimer;
export const timeOfDay = document.querySelector("#timeOfDay");
export let daysPassed;

const init = () => {
    canvas.addEventListener("mousemove", canvasMouseMouveHandler, false);
    canvas.addEventListener("click",canvasMouseClickHandler, false);
    setTimeOfDay();
    resetState();
    init_td();
    createMainHud();
}

// Set games variables to initial values
export const resetState = () => {
    daysPassed = 0;
    resetDefaultValues();
    resetRssValues();
    resetUpgrades();
    resetTimer();
    clearLists();
}

export function setTimeOfDay(){
    timeOfDay.innerHTML = `Night fall in : <span id="nightTimer">${timeOfADay} </span> secondes`;
    nightTimer = document.querySelector('#nightTimer');
}

export function incDayPassed(){
    daysPassed++;
}

// Set mouse position in canvas
const canvasMouseMouveHandler = (e) => {
    canvasMouseX = e.clientX - canvas.offsetLeft;
    canvasMouseY = e.clientY - canvas.offsetTop;
}

const canvasMouseClickHandler = (e) => {
    if (buildTower) {
        towerAdd();
        return
    }
    if (buildTrap) {
        trapAdd();
    }
}

addEventListener("DOMContentLoaded", init)