import{level}from'./dust-engine.mjs?v=1.11.0-dbbdbd2f';
import{routeUnlocked,routeUnlockLevel}from'./rooms.mjs?v=1.11.0-dbbdbd2f';
import{initDesk}from'./desk-exploration.mjs?v=1.11.0-dbbdbd2f';
import{pauseGoldClock}from'./gold-clock.mjs?v=1.11.0-dbbdbd2f';
import{keepPostcard}from'./dust-life.mjs?v=1.11.0-dbbdbd2f';
import{activeLevel}from'./furniture.mjs?v=1.11.0-dbbdbd2f';
import{goldInterval}from'./gold-rates.mjs?v=1.11.0-dbbdbd2f';
export const MAX_ADVENTURERS=3;
export const QUESTS=[
 {id:'bookshelf',name:'위성 온실',duration:20000,description:'위성 온실에서 풀잎과 응결된 이슬을 채집해요.',color:'#c3b4ec',rewards:[['group','daily',1],['rarity','common',1],['essence','leaf',3],['essence','dew',2]],sparkles:2},
 {id:'window',name:'태양풍 항로',duration:45000,description:'태양풍을 따라 햇살과 잔불 정수를 모아요.',color:'#efdc9e',rewards:[['group','pop',1],['rarity','rare',1],['essence','spark',5],['essence','ember',2]],sparkles:3},
 {id:'moonpath',name:'달 뒤편 성운',duration:90000,description:'달 그림자를 지나 희귀한 별가루를 찾아요.',color:'#d0c5e4',rewards:[['group','dream',1],['rarity','legend',1],['essence','moon',8],['essence','stardust',2]],sparkles:5}
];
export const isAway=(s,uid)=>(s.adventures?.some(q=>q.uid===uid)||s.deskRun?.uid===uid)||false;
export function initAdventures(s){
 if(s.adventures===undefined)s.adventures=[];
 if(s.keeperRoute===undefined)s.keeperRoute='bookshelf';if(!QUESTS.some(q=>q.id===s.keeperRoute))throw Error('invalid keeper route');
 if(s.adventureCount===undefined)s.adventureCount=0;
 if(!Number.isSafeInteger(s.adventureCount)||s.adventureCount<0||!Array.isArray(s.adventures)||new Set(s.adventures.map(q=>q.uid)).size!==s.adventures.length)throw Error('invalid adventures');
 for(const q of s.adventures){const route=QUESTS.find(x=>x.id===q.route),d=s.dusts.find(x=>x.uid===q.uid);if(!route||!d||d.stored||!Number.isFinite(q.start)||q.start<0||!Number.isFinite(q.duration??route.duration)||(q.duration??route.duration)<route.duration*.5||(q.duration??route.duration)>route.duration||q.end!==q.start+(q.duration??route.duration))throw Error('invalid quest');
  for(const [value,max] of [[q.partySize,MAX_ADVENTURERS],[q.starLevel,6]])if(value!==undefined&&(!Number.isInteger(value)||value<1||value>max))throw Error('invalid quest bonus');
 }
 return initDesk(s);
}
export function startAdventure(s,uid,routeId,now=Date.now()){
 return startAdventureParty(s,[uid],routeId,now);
}

export function startAdventureParty(s,uids,routeId,now=Date.now()){
 const route=QUESTS.find(x=>x.id===routeId),party=uids.map(uid=>s.dusts.find(x=>x.uid===uid));
 if(!route||!party.length||new Set(uids).size!==party.length||party.some(d=>!d||d.stored||isAway(s,d.uid)))return {ok:false,message:'은하계에서 쉬고 있는 별을 골라주세요.'};
 if(party.length+s.adventures.length>MAX_ADVENTURERS)return {ok:false,message:'탐험에는 한 번에 최대 3마리까지 갈 수 있어요.'};
 if(!routeUnlocked(s,routeId))return {ok:false,message:'은하계 Lv.'+routeUnlockLevel(routeId)+'에서 열리는 길이에요.'};
 const duration=Math.round(route.duration*(1-activeLevel(s,'windchime')*.05));
 const quests=party.map(d=>({uid:d.uid,route:route.id,start:now,end:now+duration,duration,partySize:party.length,starLevel:level(d.xp)}));
 for(const d of party)pauseGoldClock(d,goldInterval(s,d),now);
 s.adventures.push(...quests);
 if(uids.includes(s.selectedUid))s.selectedUid=roomResidents(s)[0]?.uid??null;
 return {ok:true,quest:quests[0],quests};
}

export function adventureRewards(s,route,partySize=1,starLevel=1){
 const bonus=partySize+starLevel-2;
 return {
  materials:route.rewards.map(([key,id,amount])=>[key,id,amount+(key==='essence'?activeLevel(s,'basket')+bonus:0)]),
  sparkles:route.sparkles+Math.ceil(activeLevel(s,'blanket')/2)+bonus
 };
}
export function claimAdventure(s,uid,now=Date.now()){
 const q=s.adventures.find(x=>x.uid===uid);if(!q||now<q.end)return {ok:false,message:'아직 모험 중이에요. 조금만 기다려주세요.'};
 const d=s.dusts.find(x=>x.uid===uid),route=QUESTS.find(x=>x.id===q.route);
 const rewards=adventureRewards(s,route,q.partySize,q.starLevel);
 for(const [key,id,amount]of rewards.materials)s.materials[key][id]+=amount;
 s.sparkles+=rewards.sparkles;s.adventureCount++;s.adventures=s.adventures.filter(x=>x.uid!==uid);d.goldAt=now+d.goldRemaining;s.selectedUid=uid;
 const letter=keepPostcard(s,d,route.id,now);
 if(letter.isNew){const bonus=activeLevel(s,'postbox');s.sparkles+=bonus;rewards.sparkles+=bonus;}
 return {ok:true,dust:d,route,rewards,...letter};
}

// A click changes the selection, never the individual, its species or its position.
export function selectDust(s,uid){const d=s.dusts.find(x=>x.uid===uid&&!x.stored&&!isAway(s,uid));if(!d)return false;s.selectedUid=uid;return true;}
export function roomResidents(s){return s.dusts.filter(d=>!d.stored&&!isAway(s,d.uid));}

export function chooseKeeperRoute(s,route){if(!QUESTS.some(q=>q.id===route)||!routeUnlocked(s,route))return {ok:false};s.keeperRoute=route;return {ok:true};}
