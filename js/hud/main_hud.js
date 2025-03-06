import { AddElement, clearElements } from "../dom/dom_management.js";
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
    expeditionCounter:0,
    woodCounter:0,
    trapCounter:0,
    foodCounter:0,
    researchCounter:0,
    trapDispenserCounter:0,
    towerCounter:0,
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
     survivorQuantity : 1,
     scienceQuantity : 0,
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
    // Builders
    buildTrap : false,
    buildTower : false,
}


export function createMainHud(){
    clearElements();
    const link = AddElement('link',null,null,document.querySelector('HEAD'))
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './js/hud/style.css';
    makeHud()
}

function makeHud(){
    const hud = document.querySelector('#Container_hud');
    let container;
    makeExpedition(hud);
    container = AddElement('div',null,'container_frame_row',hud);
    makeGatherWood(container);
    makeCreateTrap(container);
    container = AddElement('div',null,'container_frame_row',hud);
    makeGatherFood(container);
    makeCreateResearch(container);
    container = AddElement('div',null,'container_frame_row',hud);
    makeCreateTrapDispenser(container);
    makeCreateTower(container);
    container = AddElement('div',null,'container_frame_row',hud);
    makeRssDisplayer(container);
    container = AddElement('div',null,'container_frame_row',hud);
    makeBuildButton(container);
}

function makeExpedition(hud) {
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
}

function makeGatherWood(hud) {
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

function makeCreateTrap(hud){
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

function makeGatherFood(hud){
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

function makeCreateResearch(hud){
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

function makeCreateTrapDispenser(hud){
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

function makeCreateTower(hud){
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

function makeRssDisplayer(hud){
    let mainElement; let currentElement;
    mainElement = AddElement('div','container_create_trap_dispenser','frame_hud rss',hud);
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'wood : ');
    elems.woodElem = AddElement('span','wood_counter','frame_hud_counter',currentElement,ressources.woodQuantity.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'food : ');
    elems.foodElem = AddElement('span','food_counter','frame_hud_counter',currentElement,ressources.foodQuantity.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'traps : ');
    elems.trapElem = AddElement('span','trap_counter','frame_hud_counter',currentElement,ressources.trapQuantity.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'research : ');
    elems.researchElem = AddElement('span','research_counter','frame_hud_counter',currentElement,ressources.researchQuantity.toLocaleString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'trap dispenser : ');
    elems.trapDispenserElem = AddElement('span','trap_dispenser_counter','frame_hud_counter',currentElement,ressources.trapDispenserQuantity.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'tower : ');
    elems.towerElem = AddElement('span','rower_counter','frame_hud_counter',currentElement,ressources.towerQuantity.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'survivor : ');
    elems.survivorElem = AddElement('span','survivor_counter','frame_hud_counter',currentElement,ressources.survivorQuantity.toString());
    currentElement = AddElement('p',null,'frame_hud_info',mainElement,'science : ');
    elems.scienceElem = AddElement('span','science_counter','frame_hud_counter',currentElement,ressources.scienceQuantity.toString());
}

function makeBuildButton(hud){
    const trapAdd = AddElement('button','place_trap_dispenser','build_button',hud,'Place a trap dispenser');
    const towerAdd = AddElement('button','place_tower','build_button',hud,'Place a tower');
    trapAdd.addEventListener('click',trapAddHandler);
    towerAdd.addEventListener('click',towerAddHandler);
}

function trapAddHandler(){
    if (trapDispenserQuantity == 0) return;
    buildTrap = true;
}

function towerAddHandler(){
    if (towerQuantity == 0) return;
    buildTower = true;
}

function buttonDecHandler(e){
    let value = counterValues[e.currentTarget.dataset.target];
    if (value == 0) return;
    const target = counter[e.currentTarget.dataset.target]
    value --;
    counterValues[e.currentTarget.dataset.target] = value;
    target.textContent = value.toString();
    ressources.survivorQuantity ++;
    updateSurvivorCounter();
}

function buttonIncHandler(e){
    if (!ressources.survivorQuantity) return;
    const target = counter[e.currentTarget.dataset.target];
    let value = counterValues[e.currentTarget.dataset.target];
    value ++;
    ressources.survivorQuantity --;
    counterValues[e.currentTarget.dataset.target] = value;
    target.textContent = value.toString();
    updateSurvivorCounter();
}

function updateSurvivorCounter(){
    elems.survivorElem.textContent = ressources.survivorQuantity.toString();
}