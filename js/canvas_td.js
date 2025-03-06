import { tower } from "./class/tower.js";
import { monster } from "./class/monster.js";
import { map_td } from "./map/map.js";
import { traps } from "./class/traps.js";

export const squareWidth = 50;
export const squareHeight = 50;
export const canvas = document.querySelector('#Canvas_main');
export const c = canvas.getContext("2d");
export const monsterlist = [];
export const towerList = []; 
export const trapList = [];
let spawnTimer = Date.now();
const spawnDelay = 500;
towerList.push(new tower({position:{x:squareWidth*4,y:squareHeight*2},radius:100,damage:1,reloadTime:1000}));
trapList.push(new traps({position:{x:squareWidth*4, y:squareHeight*1},radius:30,damage:2,reloadTime:1500}))
for (let i=0; i<20;i++){
    monsterlist.push(new monster({position:{x:0, y:squareHeight},life:2,speed:3,color:'blue'}));
}

export function init_td() {
    //initialise canvas
    canvas.width = map_td[0].length*squareWidth;
    canvas.height = map_td.length*squareHeight;

    //Draw map
    const drawMap = () => {
        window.requestAnimationFrame(drawMap);
        map_td.forEach((elem,yIndex) => elem.forEach((elem,xIndex) => drawMapSquares(elem,xIndex,yIndex)));
        updateTower();
        updateTrap();
        updateMonster();
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
                }
            }
        })
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
    drawMap()
}