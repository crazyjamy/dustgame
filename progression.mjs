import{mergeCandidates}from'./dust-engine.mjs?v=1.13.81-3f2b718b';
import{DUSTS}from'./dust-data.mjs?v=1.13.81-3f2b718b';
import{ROOMS,ROOM_CHAPTERS}from'./rooms.mjs?v=1.13.81-3f2b718b';
import{isAway}from'./adventures.mjs?v=1.13.81-3f2b718b';
import{goldProduction,FAIRY_PRICE}from'./economy.mjs?v=1.13.81-3f2b718b';

export function firstSteps(s){return [
 {id:'birth',label:'새 별 관측',done:s.nextUid>2||s.dusts.some(d=>d.xp>0)||s.ownedFurniture.length>0||s.roomLevel>1},
 {id:'story',label:'첫 이야기',done:s.dusts.some(d=>d.readStories.length>0)},
 {id:'furniture',label:'첫 장비',done:s.ownedFurniture.length>0}
];}
export function goldOverview(s,now=Date.now()){
 const entries=s.dusts.filter(d=>!d.stored&&!isAway(s,d.uid)).map(d=>({dust:d,...goldProduction(s,d,now)}));
 return {entries,ready:entries.reduce((sum,p)=>sum+p.amount,0),capped:entries.filter(p=>p.capped).length};
}
export function nextGoal(s,now=Date.now()){
 const steps=firstSteps(s),missing=steps.find(x=>!x.done),available=s.dusts.filter(d=>!d.stored&&!isAway(s,d.uid));
 const sparkleGoal=(goal,cost)=>({...goal,currency:'sparkles',cost,have:s.sparkles,missing:Math.max(0,cost-s.sparkles)});
 if(missing?.id==='birth')return {id:'birth',title:'작은 성운에서 새 별 만나기',description:'솔라와 함께 작은 성운을 관측해요. 은하계의 빛나는 곳을 눌러 새 별을 만날 수 있어요.',reward:'새 별 1마리 · 같은 종류여도 따로 자라요',action:'birth',cta:s.pending?'탄생 기다리기':'무료로 별 만나기',currency:'free',cost:0,have:0,missing:0};
 if(missing?.id==='story'){
  const opened=s.dusts.find(d=>d.xp>=2);
  if(opened)return {id:'story',title:'첫 이야기가 열렸어요',description:'레벨이 오를 때마다 별의 이야기가 한 편씩 열려요. 첫 장을 펼쳐볼까요?',reward:'별의 첫 이야기 · 언제든 다시 읽기',action:'story',uid:opened.uid,cta:'첫 이야기 읽기',currency:'free',cost:0,have:0,missing:0};
  const d=[...available].sort((a,b)=>mergeCandidates(s,b.uid).length-mergeCandidates(s,a.uid).length||b.uid-a.uid)[0];
  if(!d)return {id:'story',title:'함께 자랄 별을 데려와요',description:'보관함에서 꺼내거나 모험에서 돌아온 뒤 합칠 수 있어요.',reward:'같은 친구 두 마리 → Lv.2 · 첫 이야기',action:s.adventures.length||s.deskRun?'adventure':'storage',cta:s.adventures.length||s.deskRun?'모험 소식 보기':'보관함 열기',currency:'free',cost:0,have:0,missing:0};
  const matches=mergeCandidates(s,d.uid),name=DUSTS.find(x=>x.id===d.id).name;
  if(!matches.length){
   const partner=s.dusts.filter(x=>x.uid!==d.uid&&x.id===d.id&&x.xp<10).find(x=>x.stored||isAway(s,x.uid));
   if(partner){
    const survey=s.deskRun?.uid===partner.uid;
    return {id:'story',title:`${name}의 친구와 다시 만나기`,description:partner.stored?'보관함에서 같은 별을 꺼내면 합칠 수 있어요.':'같은 별이 돌아오면 합칠 수 있어요.',reward:'Lv.2 한 마리 · 첫 이야기 1편',action:partner.stored?'match-stored':survey?'match-survey':'adventure',uid:d.uid,cta:partner.stored?'같은 별 데려오기':survey?'탐사 이어가기':'루미의 탐험 수첩 열기',currency:'free',cost:0,have:0,missing:0};
   }
  }

  return {id:'story',title:matches.length?`${name} 두 마리를 합쳐 첫 이야기 열기`:`${name}와 같은 종류의 친구 만나기`,description:matches.length?'같은 종류 두 마리를 한 마리로 합쳐요. 남을 친구를 확인한 뒤 레벨을 올려요.':'같은 종류가 태어나는 조합을 미리 골라두었어요. 재료가 모자라면 조합 화면에서 확인할 수 있어요.',reward:'Lv.2 한 마리 · 첫 이야기 1편',action:matches.length?'merge':'duplicate',uid:d.uid,cta:matches.length?'합칠 친구 고르기':'같은 별의 조합 재료 보기',currency:'dust',cost:1,have:matches.length?1:0,missing:matches.length?0:1};
 }
 if(missing?.id==='furniture')return {id:'furniture',title:'첫 궤도 장비 받기',description:'나리가 둥근 러그를 내밀었어요. “사진을 같이 보고 싶은데 바닥이 차네. 여기 행성 고리를 펴 줄래?”',reward:'행성 고리 Lv.1 · 합치기 반짝이 +1',action:'rug',cta:'행성 고리 보상 받기',currency:'free',cost:0,have:0,missing:0};
 const chapter=ROOM_CHAPTERS.find(c=>c.level<=s.roomLevel&&!s.roomGrowth.claimed.includes(c.level));if(chapter)return {id:'room-memory',title:'새 성역의 기록 · '+chapter.title,description:'함께 넓힌 은하계에 새 기억이 열렸어요. 이야기를 읽고 보상 장식을 받아요.',reward:chapter.reward,action:'room-chapter',chapter:chapter.level,cta:'성역의 기록과 보상 보기',currency:'free',cost:0,have:0,missing:0};
 if(s.adventureCount===0&&s.adventures.length){const ready=s.adventures.some(q=>now>=q.end);return {id:'adventure',title:ready?'돌아온 친구의 선물 받기':'첫 모험을 다녀오는 중이에요',description:ready?'루미가 친구와 함께 기다려요. 귀환 보상을 받으면 첫 엽서가 모은 별에 보관돼요.':'창을 닫아도 모험은 이어져요. 돌아오면 루미를 눌러 친구를 맞이하고 선물을 받아요.',reward:'첫 모험 엽서 · 조합 재료 · 반짝이',action:'adventure',cta:ready?'루미에게 귀환 보상 받기':'모험 소식 보기',currency:'free',cost:0,have:0,missing:0};}
 if(s.adventureCount===0&&s.starTrips?.trip){
  const ready=now>=(s.starTrips.trip.end??0);
  return {id:'adventure',title:ready?'돌아온 별의 보상 받기':'첫 랜덤 탐험 중',description:'루미의 수첩에서 귀환 소식을 확인해요.',reward:'골드 · 탐험 재료',action:'adventure',cta:'탐험 수첩 열기',currency:'free',cost:0,have:0,missing:0};
 }
 if(s.adventureCount===0)return {id:'adventure',title:'루미와 첫 랜덤 탐험 떠나기',description:'루미의 수첩에서 별을 보내요. 돌아오는 길에 엽서가 도착할 수도 있어요.',reward:'골드 · 탐험 재료',action:'adventure',cta:'탐험 수첩 열기',currency:'free',cost:0,have:0,missing:0};
 if(s.roomLevel>=2&&!s.fairyOwned)return sparkleGoal({id:'fairy',title:'골드 모으는 요정 모아 만나기',description:'은하계에 찾아온 모아를 누르면 준비된 골드를 한 번에 받아요.',reward:'요정 모아 · 골드 모두 받기',action:'shop',cta:s.sparkles>=FAIRY_PRICE?'작은 상점으로':'반짝이 모으러 가기'},FAIRY_PRICE);
 if(s.roomLevel<ROOMS.length){
  const next=ROOMS[s.roomLevel],chapter=ROOM_CHAPTERS.find(c=>c.level>s.roomLevel);
  return sparkleGoal({id:'room',title:`은하계 Lv.${next.level} · ${next.capacity}마리의 자리`,
   description:'별이 머물 자리가 두 곳 늘어나요.',milestone:chapter,
   action:'room',cta:s.sparkles>=next.cost?'다음 방 살펴보기':'반짝이 모으러 가기'},next.cost);
 }
 if(!s.fairyOwned)return sparkleGoal({id:'fairy',title:'골드 모으는 요정 모아 만나기',description:'은하계에 찾아온 모아를 누르면 준비된 골드를 한 번에 받아요.',reward:'요정 모아 · 골드 모두 받기',action:'shop',cta:s.sparkles>=FAIRY_PRICE?'작은 상점으로':'반짝이 모으러 가기'},FAIRY_PRICE);
 return {id:'collection',title:'아직 모르는 친구의 단서 찾기',description:'모은 별에서 실루엣과 조합 힌트를 살펴보세요. 무료 랜덤 탄생도 계속할 수 있어요.',reward:'별 50종 · 각자의 이야기와 모험 엽서',action:'collection',cta:'모은 별 보기',currency:'free',cost:0,have:0,missing:0};
}
