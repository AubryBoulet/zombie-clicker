import { AddElement, clearElements } from "../dom/dom_management.js";
import { towerUpgrades, trapUpgrades, upgradeTowerDamage, upgradeTowerRadius, upgradeTowerReload, upgradeTrapDamage, upgradeTrapRadius, upgradeTrapReload, upgradeWeapon, weaponUpgrade } from "../upgrades/upgrades.js";
import { createMainHud } from "./main_hud.js";

export const upgradeLevel = { // element to display the current level
    weapon:null,
    trapReload:null,
    trapDamage:null,
    TrapRadius:null,
    towerReload:null,
    towerDamage:null,
    towerRadius:null,
}

export const upgradeCostTarget = { // element to display the cost to upgrade
    weapon:null,
    trapReload:null,
    trapDamage:null,
    TrapRadius:null,
    towerReload:null,
    towerDamage:null,
    towerRadius:null,
}

export const upgradeCost = { // cost in research to upgrade
    weapon:1,
    trapReload:1,
    trapDamage:1,
    trapRadius:1,
    towerReload:1,
    towerDamage:1,
    towerRadius:1,

}

export function createUpgradeHud(){ // Add css file and generate hud
    clearElements();
    const link = AddElement('link',null,null,document.querySelector('HEAD'))
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = './js/hud/style.css';
    makeHud();
}
// Call all the fonctions related to the hud building
function makeHud(){
    const hud = document.querySelector('#Container_hud');
    let container;
    container = AddElement('div',null,'container_frame_row',hud);
    makeUpgradeElements(container,'Upgrade weapon',upgradeLevel.weapon,weaponUpgrade,upgradeCostTarget.weapon,upgradeCost.weapon,'Increase expedition strength by 1 per level',upgradeWeapon)
    container = AddElement('div',null,'container_frame_row',hud);
    makeUpgradeElements(container,'Upgrade trap damage',upgradeLevel.trapDamage,trapUpgrades.damageLevel,upgradeCostTarget.trapDamage,upgradeCost.trapDamage,'Increase trap damages by 2 per level',upgradeTrapDamage)
    container = AddElement('div',null,'container_frame_row',hud);
    makeUpgradeElements(container,'Upgrade trap radius',upgradeLevel.TrapRadius,trapUpgrades.radiusLevel,upgradeCostTarget.TrapRadius,upgradeCost.trapRadius,'Increase trap radius by 5% per level',upgradeTrapRadius)
    container = AddElement('div',null,'container_frame_row',hud);
    makeUpgradeElements(container,'Upgrade trap reload time',upgradeLevel.trapReload,trapUpgrades.reloadLevel,upgradeCostTarget.trapReload,upgradeCost.trapReload,'Decrease trap reloading by 5% per level',upgradeTrapReload)
    container = AddElement('div',null,'container_frame_row',hud);
    makeUpgradeElements(container,'Upgrade Tower damage',upgradeLevel.towerDamage,towerUpgrades.damageLevel,upgradeCostTarget.towerDamage,upgradeCost.towerDamage,'Increase Tower damages by 2 per level',upgradeTowerDamage)
    container = AddElement('div',null,'container_frame_row',hud);
    makeUpgradeElements(container,'Upgrade Tower radius',upgradeLevel.towerRadius,towerUpgrades.radiusLevel,upgradeCostTarget.towerRadius,upgradeCost.towerRadius,'Increase Tower radius by 5% per level',upgradeTowerRadius)
    container = AddElement('div',null,'container_frame_row',hud);
    makeUpgradeElements(container,'Upgrade Tower reload time',upgradeLevel.towerReload,towerUpgrades.reloadLevel,upgradeCostTarget.towerReload,upgradeCost.towerReload,'Decrease Tower reloading by 5% per level',upgradeTowerReload)
    
    container = AddElement('div',null,'container_frame_row',hud);
    makeMainButton(container);
}

/**
 * Create a new upgrade related element
 * @param {HTMLElement} hud - The parent element.
 * @param {string} buttonStr - Text of the button.
 * @param {Parameters} levelTarget - Parameter name of the upgradeLevel object, use to target the level value element.
 * @param {Parameters} levelValue - Parameter containing the value of the level to display.
 * @param {Parameters} costTarget - Parameter name of the upgradeCostTarget object, use to target the cast value element.
 * @param {Parameters} costValue - Parameter containing the value of the upgrade cost.
 * @param {string} description - Description of the upgrade.
 * @param {Function} callback - Function to call when user click the button.
 * @returns {void}
 */
function makeUpgradeElements(hud, buttonStr, levelTarget, levelValue, costTarget, costValue, description, callback){
    let mainElement;
    mainElement = AddElement('div',null,'frame_hud rss',hud);
    mainElement = AddElement('div',null,'frame_hud_button_container',mainElement);
    const button = AddElement('button',null,'build_button',mainElement,buttonStr);
    const level = AddElement('p',null,'frame_hud_info',mainElement,'Current level :');
    levelTarget = AddElement('span',null,'frame_hud_counter_value',level,levelValue.toString());
    const cost = AddElement('p',null,'frame_hud_info',mainElement,'Research needed :');
    costTarget = AddElement('span',null,'frame_hud_counter_value',cost,costValue.toString());
    AddElement('p',null,'frame_hud_info',mainElement,description);
    button.addEventListener('click',callback)
}


function makeMainButton(hud){ // Generate button to switch to the main menu page
    const mainButton = AddElement('button','open_main_hud','build_button',hud,'main menu');
    mainButton.addEventListener('click',createMainHud);
}