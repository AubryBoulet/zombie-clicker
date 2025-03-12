import { towerList, trapList } from "../canvas_td.js";
import { ressources } from "../hud/main_hud.js";
import { createUpgradeHud, upgradeCost } from "../hud/upgrades_hud.js";

export let weaponUpgrade = 0;
export const trapUpgrades = {
    damageLevel:0,
    radiusLevel:0,
    reloadLevel:0,
    damage:2,
    radius:30,
    reload:500,
}
export const towerUpgrades = {
    damageLevel:0,
    radiusLevel:0,
    reloadLevel:0,
    damage:2,
    radius:100,
    reload:3000,
}

export function upgradeWeapon(){
    if (ressources.researchQuantity >= upgradeCost.weapon){
        weaponUpgrade ++;
        updateCost('weapon');
        createUpgradeHud();
    }
}

export function upgradeTrapDamage(){
    if (ressources.researchQuantity >= upgradeCost.trapDamage){
        trapUpgrades.damageLevel ++;
        trapUpgrades.damage += 2;
        updateCost('trapDamage');
        createUpgradeHud();
        updateTrap();
    }
}

export function upgradeTrapRadius(){
    if (ressources.researchQuantity >= upgradeCost.trapRadius){
        trapUpgrades.radiusLevel ++;
        trapUpgrades.radius += trapUpgrades.radius * 0.05;
        updateCost('trapRadius');
        createUpgradeHud();
        updateTrap();
    }
}

export function upgradeTrapReload(){
    if (ressources.researchQuantity >= upgradeCost.trapReload){
        trapUpgrades.reloadLevel ++;
        trapUpgrades.reload -= trapUpgrades.reload *0.5;
        updateCost('trapReload');
        createUpgradeHud();
        updateTrap();
    }
}

export function upgradeTowerDamage(){
    if (ressources.researchQuantity >= upgradeCost.towerDamage){
        towerUpgrades.damageLevel ++;
        towerUpgrades.damage ++;
        updateCost('towerDamage');
        createUpgradeHud();
        updateTower();
    }
}

export function upgradeTowerRadius(){
    if (ressources.researchQuantity >= upgradeCost.towerRadius){
        towerUpgrades.radiusLevel ++;
        towerUpgrades.radius += towerUpgrades.radius * 0.05;
        updateCost('towerRadius');
        createUpgradeHud();
        updateTower();
    }
}

export function upgradeTowerReload(){
    if (ressources.researchQuantity >= upgradeCost.towerReload){
        towerUpgrades.reloadLevel ++;
        towerUpgrades.reload -= towerUpgrades.reload * 0.05;
        updateCost('towerReload');
        createUpgradeHud();
        updateTower();
    }
}

function updateCost(target){
    ressources.researchQuantity -= upgradeCost[target];
    upgradeCost[target] *= 2;
}

function updateTrap(){
    trapList.forEach((elems) => { 
        elems.damage = trapUpgrades.damage;
        elems.radius = trapUpgrades.radius;
        elems.reload = trapUpgrades.reload;
    })
}

function updateTower(){
    towerList.forEach((elems) => {
        elems.damage = towerUpgrades.damage;
        elems.radius = towerUpgrades.radius;
        elems.reload = towerUpgrades.reload;
    })
}

export function resetUpgrades(){
    weaponUpgrade = 0;
    trapUpgrades.damageLevel = 0;
    trapUpgrades.radiusLevel = 0;
    trapUpgrades.reloadLevel = 0;
    trapUpgrades.damage = 2;
    trapUpgrades.radius = 30;
    trapUpgrades.reload = 500;
    towerUpgrades.damageLevel = 0;
    towerUpgrades.radiusLevel = 0;
    towerUpgrades.reloadLevel = 0;
    towerUpgrades.damage = 2;
    towerUpgrades.radius = 100;
    towerUpgrades.reload = 3000;
}