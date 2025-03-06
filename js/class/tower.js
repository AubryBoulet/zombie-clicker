import { monsterlist } from "../canvas_td.js";
import { c, squareHeight, squareWidth } from "../canvas_td.js";
import { canvasMouseX, canvasMouseY } from "../init.js";
export class tower {
    constructor ({position, radius, damage, reloadTime}) {
        this.position = position;
        this.radius = radius;
        this.damage = damage;
        this.reloadTime = reloadTime;
        this.pointTo = {x:0, y:0};
        this.loaded = true;
        this.shootTime = Date.now();
        this.target = 0;
    }

    // Display the tower on the map
    draw(){
        c.fillStyle = 'brown';
        c.beginPath();
        c.arc(this.position.x+squareWidth/2, this.position.y+squareHeight/2, squareWidth/2, squareHeight/2,0, Math.PI+2,false);
        c.lineWidth = 1;
        c.fill();
        c.stroke();

        // Draw the line representing the cannon
        const cannonData = this.calculateDirection()
        c.beginPath();
        c.moveTo(cannonData.centerX, cannonData.centerY);
        c.lineTo(cannonData.endX, cannonData.endY);
        c.lineWidth = 3;
        c.stroke();
    }

    calculateDirection(){
        // Calculate the direction and limit the length of the line
        const centerX = this.position.x + squareWidth / 2;
        const centerY = this.position.y + squareHeight / 2;
        const maxLength = squareWidth/2+5;

        const deltaX = this.pointTo.x - centerX;
        const deltaY = this.pointTo.y - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        let endX = centerX;
        let endY = centerY;

        if (distance > 0) {
            endX += (deltaX / distance) * maxLength;
            endY += (deltaY / distance) * maxLength;
        }
        return {centerX:centerX,centerY:centerY,endX:endX,endY,endY}
    }

    update(){
        this.draw();
        this.findTarget();
        if (this.loaded == false) this.checkReload();
        this.shootTarget();
        this.checkMouseCursor();
    }

    // Function to find the closest monster from the tower
    findTarget(){
        let target = 0;
        let targetx = 0;
        let targety = 0
        monsterlist.forEach((elem,index) => {
            if (elem.spawned) {
                if (Math.abs(elem.position.x + elem.position.y - this.position.x - this.position.y) < Math.abs(targetx + targety - this.position.x - this.position.y)){
                targetx = elem.position.x;
                targety = elem.position.y;
                target = index+1;
                }
            }
        })
        this.pointTo.x = targetx;
        this.pointTo.y = targety
        this.target = target
    }

    // Function to check if the target is in the tower range of shoot, if yes shoot at the target
    shootTarget(){
        if (this.target == 0) return;
        if (this.loaded == false) return;
        if (Math.abs(monsterlist[this.target-1].position.x - this.position.x) <= this.radius && Math.abs(monsterlist[this.target-1].position.y - this.position.y) <= this.radius){
            monsterlist[this.target-1].life -= this.damage;
            this.loaded = false;
            this.shootTime = Date.now();
        }
    }

    checkReload(){
        if (Date.now() - this.shootTime >= this.reloadTime) {
            this.loaded = true;
        }
    }

    // Check if the mouse cursor is over the tower
    checkMouseCursor(){
        if (Math.abs(canvasMouseX - this.position.x - squareWidth/2 ) <= squareWidth/2 && Math.abs(canvasMouseY - this.position.y - squareHeight/2) <= squareHeight/2) {
            c.fillStyle = 'brown';
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