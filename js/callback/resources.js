import { counterValues, ressources, elems, prices, pricesValue, counter } from "../hud/main_hud.js";
import { dayOn } from "./day_cycle.js";

export let woodNeededForTrap = 50;
export let woodNeededForTower = 100;
// Delays for rss calculation loop
const delays = {
    wood:1000,
    food:1000,
    trap:5000,
    research:10000,
    trapDispenser:10000,
    tower:20000,
}

// Timers for rss calculation
const timers = {
    wood:null,
    food:null,
    trap:null,
    research:null,
    trapDispenser:null,
    tower:null,
} 

export const workedTime = {
    trap:null,
    research:null,
    trapDispenser:null,
    tower:null,
}

// Is building started
const workStarted = {
    trap:false,
    research:false,
    trapDispenser:false,
    tower:false,
}

export function initTimers(){
    timers.wood = setInterval(woodRss, delays.wood);
    timers.food = setInterval(foodRss, delays.food);
}

// Check if survivors work on wood and calculate wood rss
function woodRss(){
    if (!dayOn) return;
    if (counterValues.woodCounter > 0) {
        ressources.woodQuantity += counterValues.woodCounter;
        elems.woodElem.textContent = ressources.woodQuantity;
    }
}

// Check if survivors work on food and calculate food rss
function foodRss(){
    if (!dayOn) return;
    if (counterValues.foodCounter > 0) {
        ressources.foodQuantity += counterValues.foodCounter;
        elems.foodElem.textContent = ressources.foodQuantity;
    }
}

// Check if survivors work on trap and calculate traps rss
function trapRss(){
    if (!dayOn) return;
    if (!counterValues.trapCounter) {
        if (workStarted.trap) timers.trap = Date.now();
        return;
    }
    const woodNeeded = 10
    if (workStarted.trap){
        workedTime.trap += (Date.now() - timers.trap) * counterValues.trapCounter;
        timers.trap = Date.now();
        if (workedTime.trap >= delays.trap){
            ressources.trapQuantity ++;
            elems.trapElem.textContent = ressources.trapQuantity;
            workStarted.trap = false;
            workedTime.trap = 0;
        }
        updateBackGround(document.querySelector('#container_create_trap'),workedTime.trap,delays.trap);
        return;
    } 
    if (ressources.woodQuantity >= woodNeeded){
        ressources.woodQuantity -= woodNeeded;
        elems.woodElem.textContent = ressources.woodQuantity;
        workStarted.trap = true;
        timers.trap = Date.now();
        workedTime.trap = 0;
    }
}

// Check if survivors work on research and calculate research rss
function researchRss(){
    if (!dayOn) return;
    if (!counterValues.researchCounter) {
        if (workStarted.research) timers.research = Date.now();
        return;
    }
    if (workStarted.research){
        workedTime.research += (Date.now() - timers.research) * counterValues.researchCounter;
        timers.research = Date.now();
        if (workedTime.research >= delays.research){
            ressources.researchQuantity ++;
            elems.researchElem.textContent = ressources.researchQuantity;
            workStarted.research = false;
            workedTime.research = 0;
        }
        updateBackGround(document.querySelector('#container_create_research'),workedTime.research,delays.research);
        return;
    } 
    if (ressources.scienceQuantity >= 1){
        ressources.scienceQuantity -= 1;
        elems.scienceElem.textContent = ressources.scienceQuantity;
        workStarted.research = true;
        timers.research = Date.now();
        workedTime.research = 0;
    }
}

// Check if survivors work on trap dispenser
function trapDispenserRss(){
    if (!dayOn) return;
    if (!counterValues.trapDispenserCounter) {
        if (workStarted.trapDispenser) timers.trapDispenser = Date.now();
        return;
    }
    if (workStarted.trapDispenser){
        workedTime.trapDispenser += (Date.now() - timers.trapDispenser) * counterValues.trapDispenserCounter;
        timers.trapDispenser = Date.now();
        if (workedTime.trapDispenser >= delays.trapDispenser){
            ressources.trapDispenserQuantity ++;
            elems.trapDispenserElem.textContent = ressources.trapDispenserQuantity;
            workStarted.trapDispenser = false;
            workedTime.trapDispenser = 0;
            survivorEndTask('trapDispenserCounter');
            incTrapeDispenserPrice();
        }
        updateBackGround(document.querySelector('#container_create_trap_dispenser'),workedTime.trapDispenser,delays.trapDispenser);
        return;
    } 
    if (ressources.woodQuantity >= woodNeededForTrap){
        ressources.woodQuantity -= woodNeededForTrap;
        elems.woodElem.textContent = ressources.woodQuantity;
        workStarted.trapDispenser = true;
        timers.trapDispenser = Date.now();
        workedTime.trapDispenser = 0;
    }
}

// Check if survivors work on tower
function towerRss(){
    if (!dayOn) return;
    if (!counterValues.towerCounter) {
        if (workStarted.tower) timers.tower = Date.now();
        return;
    }
    if (workStarted.tower){
        workedTime.tower += (Date.now() - timers.tower) * counterValues.towerCounter;
        timers.tower = Date.now();
        if (workedTime.tower >= delays.tower){
            ressources.towerQuantity ++;
            elems.towerElem.textContent = ressources.towerQuantity;
            workStarted.tower = false;
            workedTime.tower = 0;
            survivorEndTask('towerCounter');
            incTowerPrice();
        }
        updateBackGround(document.querySelector('#container_create_tower'),workedTime.tower,delays.tower);
        return;
    } 
    if (ressources.woodQuantity >= woodNeededForTower){
        ressources.woodQuantity -= woodNeededForTower;
        elems.woodElem.textContent = ressources.woodQuantity;
        workStarted.tower = true;
        timers.tower = Date.now();
        workedTime.tower = 0;
    }
}

// Move worker on tower or dispenser to idle
function survivorEndTask(task){
    ressources.survivorQuantity += counterValues[task];
    counterValues[task] = 0;
    counter[task].textContent = counterValues[task];
    elems.survivorElem.textContent = ressources.survivorQuantity;
}

// Update ressources
export function updateRessources(){
    trapRss();
    researchRss();
    trapDispenserRss();
    towerRss();
}

// Increase price of a trap dispenser
export function incTrapeDispenserPrice(){
    woodNeededForTrap *= 2;
    pricesValue.trapDispenserWood = woodNeededForTrap;
    prices.trapDispenserWood.textContent = `${woodNeededForTrap} wood`;
}

// Increase price of a tower
export function incTowerPrice(){
    woodNeededForTower *= 2;
    pricesValue.towerWood = woodNeededForTower;
    prices.towerWood.textContent = `${woodNeededForTower} wood 1 survivor`;
}

// Update background for working jobs statment
export function updateBackGround(element,currentValue,targetValue){
    if (!element) return;
    const jobProgress = Math.floor(currentValue / targetValue * 100)
    element.style.background = `linear-gradient(to right, green ${jobProgress}%, transparent ${jobProgress}%)`
}

// Reset rss needed
export function resetRssValues(){
    woodNeededForTower = 100;
    woodNeededForTrap = 50;
    delays.wood = 1000;
    delays.food = 1000;
    delays.trap = 5000;
    delays.research = 10000;
    delays.trapDispenser = 10000;
    delays.tower = 20000;
    workStarted.research = false;
    workStarted.tower = false;
    workStarted.trap = false;
    workStarted.trapDispenser = false;
}