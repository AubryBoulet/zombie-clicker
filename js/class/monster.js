import { map_td } from "../map/map.js"
import { squareWidth, squareHeight, c } from "../canvas_td.js"
import { decSurvivor } from "../hud/main_hud.js";

export class monster {
    constructor({position, life, speed, color, spawned = true}) {
        this.position = position;
        this.life = life;
        this.speed = speed;
        this.direction = 3;
        this.color = color;
        this.spawned = spawned;
    }

    // Display the monster on the map
    draw(){
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.position.x+squareWidth/2, this.position.y+squareHeight/2, squareWidth/2, squareHeight/2,0, Math.PI+2,false);
        c.fill();
        c.lineWidth = 1;
        c.stroke();
    }

    // Update monster state
    update(){
        this.move();
        this.draw();
    }

    // Monster move in map
    move(){
        switch (this.direction) {
            case 0: // move up or down
            case 1:
                if (this.position.y % squareHeight < this.speed){
                    if (this.direction == 0){
                        if (map_td[Math.floor(this.position.y / squareHeight)-1][Math.floor(this.position.x / squareWidth)] == 0){ // next square is a wall
                            this.position.y = Math.floor(this.position.y / squareHeight) * squareHeight;
                            this.direction = this.switchDirection(this.direction);
                        } else this.position.y -= this.speed
                    } else {
                        if (Math.floor(this.position.y/squareHeight+1) == map_td.length) { // reach the end of the map
                            decSurvivor()
                            this.life = 0;
                            break
                            }
                        if (map_td[Math.floor(this.position.y / squareHeight)+1][Math.floor(this.position.x / squareWidth)] == 0){ // next square is a wall
                            this.position.y = Math.floor(this.position.y / squareHeight) * squareHeight;
                            this.direction = this.switchDirection(this.direction);
                        } else this.position.y += this.speed
                    }
                } else {
                    if (this.direction == 0) {
                        this.position.y -= this.speed;
                    } else this.position.y += this.speed;
                }
                break;
            case 2: // move left or right
            case 3:
            if (this.position.x % squareWidth < this.speed){
                if (this.direction == 2){
                    if (map_td[Math.floor(this.position.y / squareHeight)][Math.floor(this.position.x / squareWidth)-1] == 0){ // next square is a wall
                        this.position.x = Math.floor(this.position.x / squareHeight) * squareHeight;
                        this.direction = this.switchDirection(this.direction);
                    } else this.position.x -= this.speed
                } else {
                    if (map_td[Math.floor(this.position.y / squareHeight)][Math.floor(this.position.x / squareWidth)+1] == 0){ // next square is a wall
                        this.position.x = Math.floor(this.position.x / squareHeight) * squareHeight;
                        this.direction = this.switchDirection(this.direction);
                    } else this.position.x += this.speed
                }
            } else {
                if (this.direction == 2) {
                    this.position.x -= this.speed;
                } else {this.position.x += this.speed;}
            }

                break;
        }
    }

    // Change current direction (if enconter a wall)
    switchDirection(currentDirection,newDirection=0){
        if (currentDirection == newDirection) newDirection = this.switchDirection(currentDirection,newDirection+1)
        switch (newDirection) {
            case 0: // Test if can go up
                if (this.direction == 1) { newDirection = this.switchDirection(currentDirection,newDirection+1); break}
                if (map_td[Math.floor(this.position.y/squareHeight)-1][Math.floor(this.position.x/squareWidth)]) return newDirection
                newDirection = this.switchDirection(currentDirection,newDirection+1)
                break;        
            case 1: // Test if can go down
            if (this.direction == 0) { newDirection = this.switchDirection(currentDirection,newDirection+1); break}
                if (map_td[Math.floor(this.position.y/squareHeight)+1][Math.floor(this.position.x/squareWidth)]) return newDirection
                newDirection = this.switchDirection(currentDirection,newDirection+1)
                break;
            case 2: // Test if can go left
            if (this.direction == 3) { newDirection = this.switchDirection(currentDirection,newDirection+1); break}
                if (map_td[Math.floor(this.position.y/squareHeight)][Math.floor(this.position.x/squareWidth)-1]) return newDirection
                newDirection = this.switchDirection(currentDirection,newDirection+1)
                break;
            case 3: // Test if can go right
            if (this.direction == 2) { newDirection = this.switchDirection(currentDirection,newDirection+1); break}
                if (map_td[Math.floor(this.position.y/squareHeight)][Math.floor(this.position.x/squareWidth)+1]) return newDirection
                newDirection = this.switchDirection(currentDirection,newDirection+1)
            break;
        }
        return newDirection;
    }

}