import { nightTimer, daysPassed, incDayPassed, timeOfDay, setTimeOfDay } from "../init.js";
import { monsterlist, squareHeight } from "../canvas_td.js";
import { monster } from "../class/monster.js";
import { decSurvivor, elems, expeditionStarted, killExpedition, ressources, totalSurvivor} from "../hud/main_hud.js";

export const timeOfADay = 300;
export let timeBeforeNight = timeOfADay;
export let dayOn = true;
export let nightTimerTimeout = 0;
export let spawnDelay = 700;

let generateZombieAtDayTimer = Date.now();
let generateZombieAtDayDelay = 10000;

setInterval(generateZombieAtDay,100);
nightTimerTimeout = setTimeout(decNightTimer,1000)

export function decNightTimer(){
    if (!dayOn) return;
    if (timeBeforeNight == 0) { // Start night cycle
        startNightCycle();
        return;
    }
    timeBeforeNight --;
    nightTimer.textContent = timeBeforeNight;
    nightTimerTimeout = setTimeout(decNightTimer,1000);
}

// Generate zombie during the day
function generateZombieAtDay() {
    if (!dayOn) return;
    if (!daysPassed) return;
    if (Date.now() - generateZombieAtDayDelay >= generateZombieAtDayTimer){
        monsterlist.push(new monster({position:{x:0, y:squareHeight},life:daysPassed,speed:3 + (Math.floor(daysPassed/10)),color:'blue'}));
        generateZombieAtDayTimer = Date.now()
    }
}

// Generate zombie's horde for night cycle
function generateZombieHorde() {
    const zombieCount = daysPassed ** 2 * 10;
    for (let i = 0; i < zombieCount; i++){
        monsterlist.push(new monster({position:{x:0, y:squareHeight},life:daysPassed,speed:3 + (Math.floor(daysPassed/10)),color:'blue', spawned:false}));
    }
}

// End of the night, switch to day + 1
export function nightEnd(){
    generateZombieAtDayDelay -= Math.ceil(generateZombieAtDayDelay * 0.02); // reduce delay of zombie's generation by 2%
    spawnDelay -= Math.ceil(spawnDelay * 0.02);
    dayOn = true;
    generateZombieAtDayTimer = Date.now();
    setTimeOfDay();
    nightTimerTimeout = setTimeout(decNightTimer,1000);
}

function startNightCycle() {
    incDayPassed();
    generateZombieHorde();
    dayOn = false;
    timeBeforeNight = timeOfADay;
    timeOfDay.textContent = 'Night has fallen';
    if (expeditionStarted) killExpedition(); // If expedition still running when night happen
    ressources.foodQuantity -= totalSurvivor*10 // 10 food / survivor are needed to pass the night
    if (ressources.foodQuantity < 0){
        const survivorToDec = Math.ceil(ressources.foodQuantity/-10);
        for (let i = 0; i < survivorToDec ; i++){
            decSurvivor();
        }
        ressources.foodQuantity = 0;
    }
    elems.foodElem.textContent = ressources.foodQuantity;
}

export function resetTimer(){
    timeBeforeNight = timeOfADay;
    if (!dayOn){
        nightEnd();
    }
    nightTimerTimeout = 0;
    spawnDelay = 700;
    generateZombieAtDayTimer = Date.now();
    generateZombieAtDayDelay = 10000;
}

