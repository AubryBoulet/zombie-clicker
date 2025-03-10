import { monsterlist } from "../canvas_td.js";
import { c, squareHeight, squareWidth } from "../canvas_td.js";
import { canvasMouseX, canvasMouseY } from "../init.js";
import { decTrapQte, ressources } from "../hud/main_hud.js";

export class traps {
    constructor ({ position, damage, reloadTime, radius }){
        this.position = position;
        this.damage = damage;
        this.reloadTime = reloadTime;
        this.radius = radius;
        this.reloadTimer = Date.now();
        this.armed = true;
    }

    // Display the trap dispenser on the map
    draw(){
        c.fillStyle = 'yellow';
        c.beginPath();
        c.arc(this.position.x+squareWidth/2, this.position.y+squareHeight/2, squareWidth/3, squareHeight/3,0, Math.PI+2,false);
        c.lineWidth = 1;
        c.fill();
        c.stroke();
    }

    update(){
        this.draw();
        if (this.loaded == false) this.checkReload();
        this.checkColision();
        this.checkMouseCursor();
    }

    // Check if a monster is walking on the trap
    checkColision(){
        if (this.loaded == false) return;
        if (ressources.trapQuantity) {
            monsterlist.forEach((elem) => {
                if (elem.spawned == false) return;
                if (Math.abs(elem.position.x - this.position.x) <= this.radius && Math.abs(elem.position.y - this.position.y) <= this.radius) {
                    elem.life -= this.damage;
                    decTrapQte();
                    this.loaded = false;
                    this.reloadTimer = Date.now();
                    return;
                }
            })
        }
    }

    checkReload(){
        if (Date.now() - this.reloadTimer >= this.reloadTime) {
            this.loaded = true;
        }
    }    

    // Check if the mouse cursor is over the trap
    checkMouseCursor(){
        if (Math.abs(canvasMouseX - this.position.x - squareWidth/3 ) <= squareWidth/2 && Math.abs(canvasMouseY - this.position.y - squareHeight/3) <= squareHeight/2) {
            c.fillStyle = 'yellow';
            c.globalAlpha = 0.3;
            c.beginPath();
            c.arc(this.position.x+squareWidth/2, this.position.y+squareHeight/2, this.radius, this.radius,0, Math.PI+2,false);
            c.lineWidth = 1;
            c.fill();
            c.stroke();  
            c.globalAlpha = 1;
        }
    }

}