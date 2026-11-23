import{DUSTS}from'./dust-data.mjs?v=1.13.35-9a3a12ca';
import{lampFactor}from'./furniture.mjs?v=1.13.35-9a3a12ca';
export function baseGoldInterval(d){
 const i=DUSTS.findIndex(x=>x.id===d.id);
 return ({common:20,rare:30,legend:40}[DUSTS[i].rarity]+i%3*3)*1000;
}
export const goldInterval=(s,d)=>Math.round(baseGoldInterval(d)*lampFactor(s));
