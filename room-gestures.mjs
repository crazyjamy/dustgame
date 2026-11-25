export const HOLD_MS=650;
export const DRAG_DISTANCE=10;
export function beginGesture(x,y,time,placement=false){return {phase:placement?'moving':'holding',x,y,time,maxDistance:0};}
export function advanceGesture(g,x,y){
 return {...g,maxDistance:Math.max(g.maxDistance,Math.hypot(x-g.x,y-g.y))};
}
export function armGesture(g,now){return g.phase==='holding'&&g.maxDistance<DRAG_DISTANCE&&now-g.time>=HOLD_MS?{...g,phase:'moving'}:g;}
export const shouldPlace=g=>g.phase==='moving'&&g.maxDistance>=DRAG_DISTANCE;
// The centre must be inside the gate, not merely near its outside edge.
export const insideAdventureGate=(box,x,y)=>x>=box.left+10&&x<=box.right-10&&y>=box.top+12&&y<=box.bottom-8;
