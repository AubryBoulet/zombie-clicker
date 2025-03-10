import { tower } from "../class/tower.js";
import { counterValues, ressources, elems, prices, pricesValue } from "../hud/main_hud.js";
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
    tower:null
} 

// Time when timeOut are initiated
const dateOfTimers = {
    trap:null,
    research:null,
    trapDispenser:null,
    tower:null
}

export function initTimers(){
    timers.wood = setInterval(woodRss, delays.wood);
    timers.food = setInterval(foodRss, delays.food);
}

/**
 * Update timeout for rss counter
 * @param {HTMLElement} - counter to update
 * @param {string} - counter name (corresponding to the objet timers element)
 * @param {Function} - the callback to call for the setTimeOut
 */
export function handleChange(value, timer, callback){
    if (value == 0 && timers[timer]) {
        clearTimeout(timers[timer]);
        return
    }
    if (timers[timer]){
        clearTimeout(timers[timer]);
        const newTimer = delays[timer]/value-(Date.now()-dateOfTimers[timer]);
        timers[timer] = setTimeout(callback, newTimer);
        return
    }
    dateOfTimers[timer] = Date.now();
    timers[timer] = setTimeout(callback,delays.trap);
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
export function trapRss(){
    if (!dayOn) return;
    const woodNeeded = 10;
    if (ressources.woodQuantity >= woodNeeded) {
        if (counterValues.trapCounter > 0) {
            // Add trap to rss
            ressources.trapQuantity ++;
            elems.trapElem.textContent = ressources.trapQuantity;
            // Remove wood from rss
            ressources.woodQuantity -= woodNeeded;
            elems.woodElem.textContent = ressources.woodQuantity;
        }
    }
    // Set timer before calling back the function
    dateOfTimers.trap = Date.now();
    timers.trap = setTimeout(trapRss, delays.trap / counterValues.trapCounter);    
}

// Check if survivors work on research and calculate research rss
export function researchRss(){
    if (!dayOn) return;
    if (ressources.scienceQuantity) {
        if (counterValues.researchCounter > 0) {
            // Add research to rss
            ressources.researchQuantity ++;
            elems.researchElem.textContent = ressources.researchQuantity;
            // Remove science from rss
            ressources.scienceQuantity --;
            elems.scienceElem.textContent = ressources.scienceQuantity;
        }
    }
    dateOfTimers.research = Date.now();
    timers.research = setTimeout(researchRss, delays.research / counterValues.researchCounter);
}

// Check if survivors work on trap dispenser
export function trapDispenserRss(){
    if (!dayOn) return;
    if (ressources.woodQuantity >= woodNeededForTrap){
        if (counterValues.trapDispenserCounter > 0) {
            // Add trap dispenser to rss
            ressources.trapDispenserQuantity ++;
            elems.trapDispenserElem.textContent = ressources.trapDispenserQuantity;
            // Remove wood from rss
            ressources.woodQuantity -= woodNeededForTrap;
            elems.woodElem.textContent = ressources.woodQuantity;
        }
    }
    dateOfTimers.trapDispenser = Date.now();
    timers.trapDispenser = setTimeout(trapDispenserRss, delays.trapDispenser / counterValues.trapDispenserCounter);
}

// Check if survivors work on tower
export function towerRss(){
    if (!dayOn) return;
    if (ressources.woodQuantity >= woodNeededForTower){
        if (counterValues.towerCounter > 0) {
            // Add tower to rss
            ressources.towerQuantity ++;
            elems.towerElem.textContent = ressources.towerQuantity;
            // Remove wood from rss
            ressources.woodQuantity -= woodNeededForTower;
            elems.woodElem.textContent = ressources.woodQuantity;
        }
    }
    dateOfTimers.tower = Date.now();
    timers.tower = setTimeout(towerRss, delays.tower / counterValues.towerCounter);
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
}