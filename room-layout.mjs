import{FURNITURE_SPOTS}from'./dust-life.mjs?v=1.13.65-49db833c';
import {isAway} from './adventures.mjs?v=1.13.65-49db833c';
export const DEFAULT_DECOR=FURNITURE_SPOTS;
export const insideKeeper=(box,x,y)=>x>=box.left-12&&x<=box.right+12&&y>=box.top-12&&y<=box.bottom+12;
// Keep the saved surface scale. Negative values extend it into the sky.
export const MIN_ROOM_Y=-75;
const MIN_SCREEN_Y=5;
const horizonAt=x=>52+24*((x-50)/50)**2;
export function toPlanetScreen({x,y}){
 const horizon=horizonAt(x);
 const screenY=y<0?horizon+(horizon-MIN_SCREEN_Y)*y/-MIN_ROOM_Y:horizon+(93-horizon)*y/100;
 return {x,y:screenY};
}
export function fromPlanetScreen({x,y}){
 const horizon=horizonAt(x);
 const offset=y-horizon;
 return {x,y:offset<0?-MIN_ROOM_Y*offset/(horizon-MIN_SCREEN_Y):100*offset/(93-horizon)};
}
export function initRoomLayout(s){
 if(s.roomPositions===undefined)s.roomPositions={dust:{},furniture:{}};
 for(const type of ['dust','furniture']){
  const map=s.roomPositions?.[type];if(!map||typeof map!=='object'||Array.isArray(map))throw Error('invalid room positions');
  for(const [id,p]of Object.entries(map)){
   const exists=type==='dust'?s.dusts.some(d=>String(d.uid)===id):s.ownedFurniture.includes(id);
   if(!exists||!p||!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<5||p.x>95||p.y<MIN_ROOM_Y||p.y>95)throw Error('invalid room position');
  }
 }
 return s;
}
export function moveRoomItem(s,type,id,x,y){
 if(!['dust','furniture'].includes(type)||!Number.isFinite(x)||!Number.isFinite(y))return {ok:false};
 const exists=type==='dust'?s.dusts.some(d=>d.uid===Number(id)&&!d.stored&&!isAway(s,d.uid)):s.decorations.includes(id);
 if(!exists)return {ok:false};
 const p={x:Math.round(Math.max(5,Math.min(95,x))*10)/10,y:Math.round(Math.max(MIN_ROOM_Y,Math.min(95,y))*10)/10};
 s.roomPositions[type][id]=p;return {ok:true,position:p};
}
