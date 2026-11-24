import{activeLevel,dailySparkleBonus,jarInterval}from'./furniture.mjs?v=1.13.81-4728e3b5';
import{DUSTS}from'./dust-data.mjs?v=1.13.81-4728e3b5';
import{isAway}from'./adventures.mjs?v=1.13.81-4728e3b5';
import{MIN_ROOM_Y}from'./room-layout.mjs?v=1.13.81-4728e3b5';
export const sparkleDay=now=>Math.floor((now+9*60*60*1000)/86400000);
export function startDailySparkle(d,now=Date.now()){d.sparkleDropDay=sparkleDay(now);}
export function initDailySparkles(s,now=Date.now()){
 if(s.dailySparkles===undefined)s.dailySparkles={version:1,drops:[]};
 const p=s.dailySparkles;
 if(!p||p.version!==1||!Array.isArray(p.drops)||p.drops.length>10000||new Set(p.drops.map(d=>d.uid)).size!==p.drops.length)throw Error('invalid daily sparkles');
 for(const d of s.dusts){if(d.sparkleDropDay===undefined)d.sparkleDropDay=sparkleDay(now)-1;if(!Number.isSafeInteger(d.sparkleDropDay)||d.sparkleDropDay< -1)throw Error('invalid sparkle day');}
 for(const drop of p.drops){if(drop.amount===undefined)drop.amount=1;if(!Number.isInteger(drop.amount)||drop.amount<1||drop.amount>11)throw Error('invalid daily sparkle amount');}
 for(const drop of p.drops)if(!Number.isSafeInteger(drop.uid)||drop.uid<1||drop.uid>=s.nextUid||!Number.isSafeInteger(drop.day)||drop.day<0||!DUSTS.some(d=>d.id===drop.dustId)||!Number.isFinite(drop.x)||drop.x<5||drop.x>95||!Number.isFinite(drop.y)||drop.y<MIN_ROOM_Y||drop.y>95||s.dusts.some(d=>d.uid===drop.uid&&d.sparkleDropDay<drop.day))throw Error('invalid sparkle drop');
 return s;
}
export function dropDailySparkles(s,now=Date.now(),positionForDust=()=>({x:50,y:65})){
 const today=sparkleDay(now),pending=new Set(s.dailySparkles.drops.map(d=>d.uid)),created=[];
 s.dusts.forEach((d,i)=>{if(d.stored||isAway(s,d.uid)||pending.has(d.uid)||d.sparkleDropDay>=today)return;const p=positionForDust(d,i),drop={amount:1+dailySparkleBonus(s),uid:d.uid,dustId:d.id,day:today,x:Math.max(6,Math.min(94,Number.isFinite(p?.x)?p.x+5:50)),y:Math.max(MIN_ROOM_Y,Math.min(90,Number.isFinite(p?.y)?p.y+12:65))};s.dailySparkles.drops.push(drop);d.sparkleDropDay=today;created.push(drop);});
 return created;
}
export function collectDailySparkle(s,uid,now=Date.now()){
 const i=s.dailySparkles.drops.findIndex(d=>d.uid===uid);if(i<0)return {ok:false};
 const [drop]=s.dailySparkles.drops.splice(i,1),d=s.dusts.find(d=>d.uid===uid);if(d)d.sparkleDropDay=Math.max(d.sparkleDropDay,sparkleDay(now));const amount=drop.amount||1;s.sparkles+=amount;return {ok:true,amount,drop};
}

export function autoCollectDailySparkles(s,now=Date.now()){
 const interval=jarInterval(s),timer=s.furnitureDaily;
 if(!interval){const changed=timer.jarAt!==0;timer.jarAt=0;return {amount:0,count:0,changed};}
 if(!timer.jarAt){timer.jarAt=now+interval;return {amount:0,count:0,changed:true};}
 if(now<timer.jarAt)return {amount:0,count:0,changed:false};
 timer.jarAt=now+interval;let amount=0,count=0;for(const d of [...s.dailySparkles.drops]){const r=collectDailySparkle(s,d.uid,now);if(r.ok){amount+=r.amount;count++;}}
 return {amount,count,changed:true};
}
