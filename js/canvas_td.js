import { tower } from "./class/tower.js";
import { map_td } from "./map/map.js";
import { traps } from "./class/traps.js";
import { buildTower, buildTrap, decTowerQte, decTrapDispenserQte, decSurvivor, expeditionStarted, expeditionAnimation } from "./hud/main_hud.js";
import { canvasMouseX, canvasMouseY } from "./init.js";
import { spawnDelay, nightEnd } from "./callback/day_cycle.js";
import { updateRessources } from "./callback/resources.js";
import { trapUpgrades, towerUpgrades } from "./upgrades/upgrades.js";

export const squareWidth = 50;
export const squareHeight = 50;
export const canvas = document.querySelector('#Canvas_main');
export const c = canvas.getContext("2d");
export const monsterlist = [];
export const towerList = []; 
export const trapList = [];

const timeBeforDay = 15000;
let spawnTimer = Date.now();


export function init_td() {
    //initialise canvas
    canvas.width = map_td[0].length*squareWidth;
    canvas.height = map_td.length*squareHeight;

    // Main loop
    const mainLoop = () => {
        window.requestAnimationFrame(mainLoop);
        drawMap();
        updateTower();
        updateTrap();
        updateMonster();
        updateRessources();
        if (expeditionStarted) expeditionAnimation();
    }

    //Draw map
    const drawMap = () => {
        map_td.forEach((elem,yIndex) => elem.forEach((elem,xIndex) => drawMapSquares(elem,xIndex,yIndex)));
        if (buildTrap) trapBuild();
        if (buildTower) towerBuild();
    }
    
    // draw map squares
    const drawMapSquares = (elem,xIndex,yIndex) => {
        switch (elem) {
            case 0: // Draw buildable square
                c.fillStyle = 'gray';
                break;
        
            case 1: // draw path square
                c.fillStyle = 'green';
                break;
        }
        c.fillRect(xIndex*squareWidth,yIndex*squareHeight,squareWidth,squareHeight);

    }

    // Update monster stats
    const updateMonster = () => {
        monsterlist.forEach((elem, index) => {
            if (elem.spawned) {
                if (elem.life <= 0) {
                    monsterlist.splice(index,1);
                }else elem.update()
            } else {
                if (Date.now() - spawnTimer >= spawnDelay) {
                    elem.spawned = true;
                    spawnTimer = Date.now();
                    elem.update;
                    if (index == monsterlist.length - 1) setTimeout(callNightEnd,timeBeforDay)
                }
            }
        })
    }

    // call nightEnd function after a delay
    function callNightEnd(){
        nightEnd();
    }

    // Update tower stats
    const updateTower = () => {
        towerList.forEach((elem) => {
            elem.update()
        })
    }

    // Update trap stats
    const updateTrap = () => {
        trapList.forEach((elem) => {
            elem.update()
        })
    }
    mainLoop();
}

function towerBuild(){
    if (canvasMouseX){
        const x = Math.floor(canvasMouseX/squareWidth);
        const y = Math.floor(canvasMouseY / squareHeight);
        if (map_td[y][x] == 0){
            c.fillStyle = 'brown';
        } else {
            c.fillStyle = 'red';
        }
        c.beginPath();
        c.arc(x*squareWidth+squareWidth/2, y*squareHeight+squareHeight/2, squareWidth/2, squareHeight/2,0, Math.PI+2,false);
        c.lineWidth = 1;
        c.fill();
        c.stroke();
    }
}
function trapBuild(){
    if (canvasMouseX){
        const x = Math.floor(canvasMouseX/squareWidth);
        const y = Math.floor(canvasMouseY / squareHeight);
        if (map_td[y][x] == 1){
            c.fillStyle = 'yellow';
        } else {
            c.fillStyle = 'red';
        }
        c.beginPath();
        c.arc(x*squareWidth+squareWidth/2, y*squareHeight+squareHeight/2, squareWidth/3, squareHeight/3,0, Math.PI+2,false);
        c.lineWidth = 1;
        c.fill();
        c.stroke();
    }
}

export function towerAdd(){
    const x = Math.floor(canvasMouseX/squareWidth);
    const y = Math.floor(canvasMouseY / squareHeight);
    let buildable = true;
    if (map_td[y][x] == 0){
        towerList.forEach((elem) => {
            if (elem.position.x == x*squareWidth && elem.position.y == y*squareHeight) buildable = false;
        })
        if (buildable){
            towerList.push(new tower({position:{x:squareWidth*x,y:squareHeight*y},radius:towerUpgrades.radius,damage:towerUpgrades.damage,reloadTime:towerUpgrades.reload}));
            decTowerQte();
            decSurvivor();
        }
    }
}

export function trapAdd(){
    const x = Math.floor(canvasMouseX/squareWidth);
    const y = Math.floor(canvasMouseY / squareHeight);
    let buildable = true;
    if (map_td[y][x] == 1){
        trapList.forEach((elem) => {
            if (elem.position.x == x*squareWidth && elem.position.y == y*squareHeight) buildable = false;
        })
        if (buildable){
            trapList.push(new traps({position:{x:squareWidth*x,y:squareHeight*y},radius:trapUpgrades.radius,damage:trapUpgrades.damage,reloadTime:trapUpgrades.reload}));
            decTrapDispenserQte();
        }
    }
}

export function clearLists(){
    monsterlist.length = 0;
    towerList.length = 0;
    trapList .length = 0;
}