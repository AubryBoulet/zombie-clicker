import { AddElement, clearElements } from "../dom/dom_management.js";
import { initTimers } from "../callback/resources.js";
import { daysPassed, resetState } from "../init.js";
import {  weaponUpgrade } from "../upgrades/upgrades.js";
import { woodNeededForTrap, woodNeededForTower } from "../callback/resources.js";
import { createUpgradeHud } from "./upgrades_hud.js";

export let totalSurvivor;
// counters (element displaying number of survivors on the task)
export const counter = {
    expeditionCounter:null,
    woodCounter:null,
    trapCounter:null,
    foodCounter:null,
    researchCounter:null,
    trapDispenserCounter:null,
    towerCounter:null,
};
// Counters values (number of survivors on the task)
export const counterValues = {
    woodCounter:0,
    trapCounter:0,
    foodCounter:0,
    researchCounter:0,
    trapDispenserCounter:0,
    towerCounter:0,
    expeditionCounter:0,
};
// Elems (target to display rss)
export const elems = {
    woodElem:null,
    trapElem:null,
    foodElem:null,
    researchElem:null,
    trapDispenserElem:null,
    towerElem:null,
    survivorElem:null,
    scienceElem:null,
}
// Quantitys (Quantity of rss)
export const ressources = {
     woodQuantity : 0,
     trapQuantity : 0, 
     foodQuantity : 0,
     researchQuantity : 0,
     trapDispenserQuantity : 0,
     towerQuantity : 0,
     survivorQuantity : totalSurvivor,
     scienceQuantity : 0,
}
// Prices (target to display ressources needed for actions)
export const prices = {
    expeditionFood:null,
    expeditionSuccess:null,
    foodForNight:null,
    trapWood:null,
    trapDispenserWood:null,
    towerWood:null,
}
// Prices values (ressources needed for actions)
export const pricesValue = {
    expeditionFood:0,
    expeditionSuccess:0,
    foodForNight:totalSurvivor*10,
    trapWood:10,
    trapDispenserWood:woodNeededForTrap,
    towerWood:woodNeededForTower,
}
// Buttons (target to the inc / dec buttons)
export const buttons = {
    expeditionDec:false,
    expeditionInc:false,
    expeditionStart:false,
    woodDec:false,
    woodInc:false,
    trapDec:false,
    trapInc:false,
    foodDec:false,
    foodInc:false,
    researchDec:false,
    researchInc:false,
    trapDispenserDec:false,
    trapDispenserInc:false,
    towerDec:false,
    towerInc:false,
}
// Builders
export let buildTrap = false;
export let buildTower = false;
export let expeditionStarted = false;
let expeditionTimeout;
const expeditionDuration = 120000;


initTimers(); // Initialise wood and food intervals
export function createMainHud(){ // Add css file and generate hud
    clearElements();
    const link = AddElement('link',null,null,document.querySelector('HEAD'))
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './js/hud/style.css';
    makeHud();
}
// Call all the fonctions related to the hud building
function makeHud(){
    const mainHud = document.querySelector('#Container_hud');
    let container;
    makeExpedition(mainHud);
    container = AddElement('div',null,'container_frame_row',mainHud);
    makeGatherWood(container);
    makeCreateTrap(container);
    container = AddElement('div',null,'container_frame_row',mainHud);
    makeGatherFood(container);
    makeCreateResearch(container);
    container = AddElement('div',null,'container_frame_row',mainHud);
    makeCreateTrapDispenser(container);
    makeCreateTower(container);
    container = AddElement('div',null,'container_frame_row',mainHud);
    makeRssDisplayer(container);
    container = AddElement('div',null,'container_frame_row',mainHud);
    makeCostDisplayer(container);
    container = AddElement('div',null,'container_frame_row',mainHud);
    makeBuildButton(container);
    container = AddElement('div',null,'container_frame_row',mainHud);
    makeUpgradeButton(container);
}

function makeExpedition(hud) { // Generate expedition related elements
    let mainElement;
    mainElement = AddElement('div','container_expedition','frame_hud',hud);
    mainElement = AddElement('div','expedition_buttons','frame_hud_button_container',mainElement);
    buttons.expeditionDec = AddElement('button','expedition_dec','frame_hud_button',mainElement,'-');
    buttons.expeditionStart = AddElement('button','expedition_send','frame_hud_button',mainElement,'Start expedition');
    buttons.expeditionInc = AddElement('button','expedition_inc','frame_hud_button',mainElement,'+');
    mainElement = document.querySelector('#container_expedition');
    counter.expeditionCounter = AddElement('div','expedition_count','frame_hud_counter',mainElement,counterValues.expeditionCounter.toString());
    buttons.expeditionDec.dataset.target = 'expeditionCounter';
    buttons.expeditionInc.dataset.target = 'expeditionCounter';
    buttons.expeditionDec.addEventListener('click',buttonDecHandler);
    buttons.expeditionInc.addEventListener('click',buttonIncHandler);
    buttons.expeditionStart.addEventListener('click',expeditionStartHandler);
}

function makeGatherWood(hud) { // Generate wood related elements
    let mainElement;
    mainElement = AddElement('div','container_gather_wood','frame_hud',hud);
    mainElement = AddElement('div','gather_wood_buttons','frame_hud_button_container',mainElement);
    buttons.woodDec = AddElement('button','gather_wood_dec','frame_hud_button',mainElement,'-');
    AddElement('p','gather_wood_send','frame_hud_info',mainElement,'Gather wood');
    buttons.woodInc = AddElement('button','gather_wood_inc','frame_hud_button',mainElement,'+');
    mainElement = document.querySelector('#container_gather_wood');
    counter.woodCounter = AddElement('div','gather_wood_count','frame_hud_counter',mainElement,counterValues.woodCounter.toString());
    buttons.woodDec.dataset.target = 'woodCounter';
    buttons.woodInc.dataset.target = 'woodCounter';
    buttons.woodDec.addEventListener('click',buttonDecHandler);
    buttons.woodInc.addEventListener('click',buttonIncHandler);
}

function makeCreateTrap(hud){ // Generate trap related elements
    let mainElement;
    mainElement = AddElement('div','container_create_trap','frame_hud',hud);
    mainElement = AddElement('div','create_trap_buttons','frame_hud_button_container',mainElement);
    buttons.trapDec = AddElement('button','create_trap_dec','frame_hud_button',mainElement,'-');
    AddElement('p','create_trap_send','frame_hud_info',mainElement,'Create trap');
    buttons.trapInc = AddElement('button','create_trap_inc','frame_hud_button',mainElement,'+');
    mainElement = document.querySelector('#container_create_trap');
    counter.trapCounter = AddElement('div','create_trap_count','frame_hud_counter',mainElement,counterValues.trapCounter.toString());
    buttons.trapDec.dataset.target = 'trapCounter';
    buttons.trapInc.dataset.target = 'trapCounter';
    buttons.trapDec.addEventListener('click',buttonDecHandler);
    buttons.trapInc.addEventListener('click',buttonIncHandler);
}

function makeGatherFood(hud){ // Generate food related elements
    let mainElement;
    mainElement = AddElement('div','container_gather_food','frame_hud',hud);
    mainElement = AddElement('div','gather_food_buttons','frame_hud_button_container',mainElement);
    buttons.foodDec = AddElement('button','gather_food_dec','frame_hud_button',mainElement,'-');
    AddElement('p','gather_food_send','frame_hud_info',mainElement,'Gather food');
    buttons.foodInc = AddElement('button','gather_food_inc','frame_hud_button',mainElement,'+');
    mainElement = document.querySelector('#container_gather_food');
    counter.foodCounter = AddElement('div','gather_food_count','frame_hud_counter',mainElement,counterValues.foodCounter.toString());
    buttons.foodDec.dataset.target = 'foodCounter';
    buttons.foodInc.dataset.target = 'foodCounter';
    buttons.foodDec.addEventListener('click',buttonDecHandler);
    buttons.foodInc.addEventListener('click',buttonIncHandler);
}

function makeCreateResearch(hud){ // Generate research related elements
    let mainElement;
    mainElement = AddElement('div','container_create_research','frame_hud',hud);
    mainElement = AddElement('div','create_research_buttons','frame_hud_button_container',mainElement);
    buttons.researchDec = AddElement('button','create_research_dec','frame_hud_button',mainElement,'-');
    AddElement('p','create_research_send','frame_hud_info',mainElement,'Create research');
    buttons.researchInc = AddElement('button','create_research_inc','frame_hud_button',mainElement,'+');
    mainElement = document.querySelector('#container_create_research');
    counter.researchCounter = AddElement('div','create_research_count','frame_hud_counter',mainElement,counterValues.researchCounter.toString());
    buttons.researchDec.dataset.target = 'researchCounter';
    buttons.researchInc.dataset.target = 'researchCounter';
    buttons.researchDec.addEventListener('click',buttonDecHandler);
    buttons.researchInc.addEventListener('click',buttonIncHandler);
}

function makeCreateTrapDispenser(hud){ // Generate trap dispenser related elements
    let mainElement;
    mainElement = AddElement('div','container_create_trap_dispenser','frame_hud',hud);
    mainElement = AddElement('div','create_trap_dispenser_buttons','frame_hud_button_container',mainElement);
    buttons.trapDispenserDec = AddElement('button','create_trap_dispenser_dec','frame_hud_button',mainElement,'-');
    AddElement('p','create_trap_dispenser_send','frame_hud_info',mainElement,'Create trap dispenser');
    buttons.trapDispenserInc = AddElement('button','create_trap_dispenser_inc','frame_hud_button',mainElement,'+');
    mainElement = document.querySelector('#container_create_trap_dispenser');
    counter.trapDispenserCounter = AddElement('div','create_trap_dispenser_count','frame_hud_counter',mainElement,counterValues.trapDispenserCounter.toString());
    buttons.trapDispenserDec.dataset.target = 'trapDispenserCounter';
    buttons.trapDispenserInc.dataset.target = 'trapDispenserCounter';
    buttons.trapDispenserDec.addEventListener('click',buttonDecHandler);
    buttons.trapDispenserInc.addEventListener('click',buttonIncHandler);
}

function makeCreateTower(hud){ // Generate tower related elements
    let mainElement;
    mainElement = AddElement('div','container_create_tower','frame_hud',hud);
    mainElement = AddElement('div','create_tower_buttons','frame_hud_button_container',mainElement);
    buttons.towerDec = AddElement('button','create_tower_dec','frame_hud_button',mainElement,'-');
    AddElement('p','create_tower_send','frame_hud_info',mainElement,'Create tower');
    buttons.towerInc = AddElement('button','create_tower_inc','frame_hud_button',mainElement,'+');
    mainElement = document.querySelector('#container_create_tower');
    counter.towerCounter = AddElement('div','create_tower_count','frame_hud_counter',mainElement,counterValues.towerCounter.toString());
    buttons.towerDec.dataset.target = 'towerCounter';
    buttons.towerInc.dataset.target = 'towerCounter';
    buttons.towerDec.addEventListener('click',buttonDecHandler);
    buttons.towerInc.addEventListener('click',buttonIncHandler);
}

function makeRssDisplayer(hud){ // Generate ressources displayer related elements
    let mainElement; let currentElement;
    mainElement = AddElement('div','container_create_trap_dispenser','frame_hud rss',hud);
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'wood :');
    elems.woodElem = AddElement('span','wood_counter','frame_hud_counter_value',currentElement,ressources.woodQuantity.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'food :');
    elems.foodElem = AddElement('span','food_counter','frame_hud_counter_value',currentElement,ressources.foodQuantity.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'traps :');
    elems.trapElem = AddElement('span','trap_counter','frame_hud_counter_value',currentElement,ressources.trapQuantity.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'research :');
    elems.researchElem = AddElement('span','research_counter','frame_hud_counter_value',currentElement,ressources.researchQuantity.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'trap dispenser :');
    elems.trapDispenserElem = AddElement('span','trap_dispenser_counter','frame_hud_counter_value',currentElement,ressources.trapDispenserQuantity.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'tower :');
    elems.towerElem = AddElement('span','tower_counter','frame_hud_counter_value',currentElement,ressources.towerQuantity.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'idle survivor :');
    elems.survivorElem = AddElement('span','survivor_counter','frame_hud_counter_value',currentElement,ressources.survivorQuantity.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'science :');
    elems.scienceElem = AddElement('span','science_counter','frame_hud_counter_value',currentElement,ressources.scienceQuantity.toString());
}

function makeCostDisplayer(hud){ // Generate price related elements
    let mainElement; let currentElement;
    mainElement = AddElement('div','container_create_trap_dispenser','frame_hud rss',hud);
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'expedition food :');
    prices.expeditionFood = AddElement('span','expedition_food','frame_hud_counter_value',currentElement,pricesValue.expeditionFood.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'expedition rate :');
    prices.expeditionSuccess = AddElement('span','expedition_success','frame_hud_counter_value',currentElement,`${pricesValue.expeditionSuccess.toString()}%`);
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'food for night :');
    prices.foodForNight = AddElement('span','food_for_night','frame_hud_counter_value',currentElement,pricesValue.foodForNight.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'trap :');
    prices.trapWood = AddElement('span','trap_wood','frame_hud_counter_value',currentElement,`${pricesValue.trapWood.toString()} wood`);
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'trap dispenser :');
    prices.trapDispenserWood = AddElement('span','trap_dispenser_wood','frame_hud_counter_value',currentElement,`${pricesValue.trapDispenserWood.toString()} wood`);
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'tower :');
    prices.towerWood = AddElement('span','tower_cood','frame_hud_counter_value',currentElement,`${pricesValue.towerWood.toString()} wood 1 survivor`);

}

function makeBuildButton(hud){ // Generate tower and trap dispenser building button
    const trapAdd = AddElement('button','place_trap_dispenser','build_button',hud,'Place a trap dispenser');
    const towerAdd = AddElement('button','place_tower','build_button',hud,'Place a tower');
    trapAdd.addEventListener('click',trapAddHandler);
    towerAdd.addEventListener('click',towerAddHandler);
}

function makeUpgradeButton(hud){ // Generate button to switch to the upgrade page
    const upgradeButton = AddElement('button','open_upgrade','build_button',hud,'Upgrades');
    upgradeButton.addEventListener('click',createUpgradeHud);
}

function trapAddHandler(){
    if (ressources.trapDispenserQuantity == 0) return;
    buildTrap = true;
    buildTower = false;
}

function towerAddHandler(){
    if (ressources.towerQuantity == 0) return;
    buildTower = true;
    buildTrap = false;
}

function expeditionStartHandler(){
    if (!counterValues.expeditionCounter) return;
    if (!expeditionStarted){
        if (ressources.foodQuantity >= counterValues.expeditionCounter * 10){
            ressources.foodQuantity -= counterValues.expeditionCounter * 10;
            elems.foodElem.textContent = ressources.foodQuantity;
            expeditionTimeout = Date.now();
            expeditionStarted = true;
            buttons.expeditionStart.textContent = 'Expedition started'
        }
    }
}

export function expeditionAnimation(){
    const element = document.querySelector('#container_expedition')
    if (!element) return;
    const jobProgress = Math.floor((Date.now() - expeditionTimeout)/expeditionDuration * 100)
    element.style.background = `linear-gradient(to right, green ${jobProgress}%, transparent ${jobProgress}%)`
    if (Date.now() - expeditionTimeout >= expeditionDuration) expeditionEnd();
}

export function killExpedition(){
    totalSurvivor -= counterValues.expeditionCounter;
    counterValues.expeditionCounter = 0;
    expeditionEnd();
}

function expeditionEnd(){
    expeditionTimeout = Date.now();
    expeditionAnimation();
    buttons.expeditionStart.textContent = 'Start expedition'
    const eventCount = 3 + daysPassed;
    expeditionStarted = false;
    let event;
    let fightResult;
    let scienceFound = 0; let survivorFound = 0;
    for (let i = 0; i < eventCount ; i++){
        fightResult = true;
        if (counterValues.expeditionCounter + weaponUpgrade < daysPassed){ // level of expedition too low, calculate the fight.
            fightResult = calculateFight();
            if (counterValues.expeditionCounter == 0) expeditionResult(0,0);
            return;
        }
        if (fightResult){
            event = Math.floor(Math.random() * 2);
            if (event){
                scienceFound ++;
            } else {
                survivorFound ++;
            }
        }
    }
    expeditionResult(scienceFound,survivorFound);
}

function calculateFight(){
    if (counterValues.expeditionCounter == 0) return false
    const dice = Math.floor(Math.random()*daysPassed)+1;
    if (dice > counterValues.expeditionCounter + weaponUpgrade){
        counterValues.expeditionCounter --;
        totalSurvivor --;
        return false;
    }
    return true;
}

function expeditionResult(scienceFound, survivorFound){
    ressources.survivorQuantity += counterValues.expeditionCounter + survivorFound;
    totalSurvivor += survivorFound;
    ressources.scienceQuantity += scienceFound;
    counterValues.expeditionCounter = 0;
    counter.expeditionCounter.textContent = counterValues.expeditionCounter;
    elems.scienceElem.textContent = ressources.scienceQuantity;
    elems.survivorElem.textContent = ressources.survivorQuantity;
    pricesValue.foodForNight = totalSurvivor * 10;
    prices.foodForNight.textContent = pricesValue.foodForNight;
    calculateExpeditionFood();
    calculateExpeditionRate();
}

export function decTrapDispenserQte(){
    buildTrap = false;
    ressources.trapDispenserQuantity --;
    elems.trapDispenserElem.textContent = ressources.trapDispenserQuantity;
}

export function decTrapQte(){
    ressources.trapQuantity --;
    elems.trapElem.textContent = ressources.trapQuantity
}

export function decTowerQte(){
    buildTower = false;
    ressources.towerQuantity --;
    elems.towerElem.textContent = ressources.towerQuantity;
}

export function decSurvivor(){
    if (ressources.survivorQuantity){
        ressources.survivorQuantity --;
        elems.survivorElem.textContent = ressources.survivorQuantity;
        totalSurvivor --;
        if (totalSurvivor == 0) death(); // End of game, player have no more survivor
        pricesValue.foodForNight = totalSurvivor * 10;
        prices.foodForNight.textContent = pricesValue.foodForNight;
        return true        
    }
    return decTaskSurvivor();
}

function decTaskSurvivor(){
    for (const prop in counterValues) {
        if (counterValues[prop]){
            counterValues[prop] --;
            counter[prop].textContent = counterValues[prop];
            totalSurvivor --;
            if (totalSurvivor == 0) death(); // End of game, player have no more survivor
            pricesValue.foodForNight = totalSurvivor * 10;
            prices.foodForNight.textContent = pricesValue.foodForNight;
            return true;
        }
    }
    return false;
}

function buttonDecHandler(e){
    const element = e.currentTarget.dataset.target;
    buildTower = false; buildTrap = false;
    if (element == 'expeditionCounter' && expeditionTimeout) return;
    let value = counterValues[element];
    if (value == 0) return;
    const target = counter[element]
    value --;
    counterValues[e.currentTarget.dataset.target] = value;
    target.textContent = value.toString();
    ressources.survivorQuantity ++;
    updateSurvivorCounter();
    if (element == 'expeditionCounter') {
        calculateExpeditionFood();
        calculateExpeditionRate();
    }
}

function buttonIncHandler(e){
    buildTower = false; buildTrap = false;
    if (!ressources.survivorQuantity) return;
    const element = e.currentTarget.dataset.target
    if (element == 'expeditionCounter' && expeditionTimeout ) return
    const target = counter[element];
    let value = counterValues[element];
    value ++;
    ressources.survivorQuantity --;
    counterValues[e.currentTarget.dataset.target] = value;
    target.textContent = value.toString();
    updateSurvivorCounter();
    if (element == 'expeditionCounter') {
        calculateExpeditionFood();
        calculateExpeditionRate();
    }
}

function updateSurvivorCounter(){
    elems.survivorElem.textContent = ressources.survivorQuantity.toString();
}

function calculateExpeditionFood(){
    pricesValue.expeditionFood = counterValues.expeditionCounter * 10;
    prices.expeditionFood.textContent = pricesValue.expeditionFood;
}

function calculateExpeditionRate(){
    let calculedRate = 0;
    if (counterValues.expeditionCounter > 0) {
        calculedRate = (counterValues.expeditionCounter + weaponUpgrade)/daysPassed * 100;
        if (calculedRate > 100) calculedRate = 100;
    }
    pricesValue.expeditionSuccess = calculedRate;
    prices.expeditionSuccess.textContent = `${pricesValue.expeditionSuccess.toString()}%`;
}


export function death(){
    const mainHud = document.querySelector('#Container_main');
    let mainElement;
    mainElement = AddElement('div','container_death',null,mainHud);
    AddElement('h1','death_title',null,mainElement,'You are dead !');
    AddElement('h2','day_passed',null,mainElement,`You survived : ${daysPassed} days`);
    const restartButton = AddElement('button','restart_button','build_button',mainElement,'Start again');
    restartButton.addEventListener('click',resetState());
}

export function resetDefaultValues(){
    // Reset counters
    counterValues.woodCounter=0;
    counterValues.trapCounter=0;
    counterValues.foodCounter=0;
    counterValues.researchCounter=0;
    counterValues.trapDispenserCounter=0;
    counterValues.towerCounter=0;
    counterValues.expeditionCounter=0;
    // Reset ressources
    totalSurvivor = 1;
    ressources.woodQuantity = 0;
    ressources.trapQuantity = 0; 
    ressources.foodQuantity = 0;
    ressources.researchQuantity = 0;
    ressources.trapDispenserQuantity = 0;
    ressources.towerQuantity = 0;
    ressources.survivorQuantity = totalSurvivor;
    ressources.scienceQuantity = 0;
    // Reset prices
    pricesValue.expeditionFood = 0;
    pricesValue.expeditionSuccess = 0;
    pricesValue.foodForNight = totalSurvivor*10;
    pricesValue.trapWood = 10;
    pricesValue.trapDispenserWood = woodNeededForTrap;
    pricesValue.towerWood = woodNeededForTower;
    // Clear expedition
    if (expeditionTimeout) clearTimeout(expeditionTimeout);
    expeditionStarted = false;
    createMainHud();
}
