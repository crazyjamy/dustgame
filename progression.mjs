import{DUSTS}from'./dust-data.mjs?v=1.0.0-504b5635';
import{ROOMS}from'./rooms.mjs?v=1.0.0-504b5635';
import{isAway}from'./adventures.mjs?v=1.0.0-504b5635';
import{goldProduction,FURNITURE,FAIRY_PRICE}from'./economy.mjs?v=1.0.0-504b5635';

export function firstSteps(s){return [
 {id:'birth',label:'먼지 탄생',done:s.nextUid>2||s.dusts.some(d=>d.xp>0)||s.ownedFurniture.length>0||s.roomLevel>1},
 {id:'story',label:'첫 이야기',done:s.dusts.some(d=>d.readStories.length>0)},
 {id:'furniture',label:'첫 가구',done:s.ownedFurniture.length>0}
];}
export function goldOverview(s,now=Date.now()){
 const entries=s.dusts.filter(d=>!d.stored&&!isAway(s,d.uid)).map(d=>({dust:d,...goldProduction(s,d,now)}));
 return {entries,ready:entries.reduce((sum,p)=>sum+p.amount,0),capped:entries.filter(p=>p.capped).length};
}
export function nextGoal(s,now=Date.now()){
 const steps=firstSteps(s),missing=steps.find(x=>!x.done),available=s.dusts.filter(d=>!d.stored&&!isAway(s,d.uid));
 const goldGoal=(goal,cost)=>({...goal,currency:'gold',cost,have:s.gold,missing:Math.max(0,cost-s.gold)});
 if(missing?.id==='birth')return {id:'birth',title:'작은 빛에서 새 친구 만나기',description:'방에는 꼬물이가 먼저 와 있어요. 빛나는 곳에서 두 번째 친구의 탄생을 함께해요.',reward:'새 먼지 1마리 · 같은 종류여도 따로 자라요',action:'birth',cta:s.pending?'탄생 기다리기':'무료로 먼지 만나기',currency:'free',cost:0,have:0,missing:0};
 if(missing?.id==='story'){
  const opened=s.dusts.find(d=>d.xp>=2);
  if(opened)return {id:'story',title:'첫 이야기가 열렸어요',description:'레벨이 오를 때마다 먼지의 이야기가 한 편씩 열려요. 첫 장을 펼쳐볼까요?',reward:'먼지의 첫 이야기 · 언제든 다시 읽기',action:'story',uid:opened.uid,cta:'첫 이야기 읽기',currency:'free',cost:0,have:0,missing:0};
  const d=[...available].sort((a,b)=>b.xp-a.xp||b.uid-a.uid)[0];
  if(!d)return {id:'story',title:'함께 자랄 먼지를 데려와요',description:'보관함의 친구를 꺼내거나 모험에서 돌아오면 반짝이를 줄 수 있어요.',reward:'Lv.2에 첫 이야기 해금',action:s.adventures.length?'adventure':'storage',cta:s.adventures.length?'모험 소식 보기':'보관함 열기',currency:'free',cost:0,have:0,missing:0};
  const cost=2-d.xp,name=DUSTS.find(x=>x.id===d.id).name;
  return {id:'story',title:`${name}의 첫 이야기 열기`,description:s.sparkles?`반짝이 ${cost}개를 주면 Lv.2가 돼요. 한 번에 1개씩 먹어요.`:'먼지 몸을 살살 쓸어 반짝이를 모아요. 길게 가만히 누르면 이동이 되니 계속 쓸어주세요.',reward:'Lv.2 · 첫 이야기 1편 · 몸이 조금 더 몽글하게',action:s.sparkles?'feed':'pet',uid:d.uid,cta:s.sparkles?'반짝이 1개 주기':'쓰다듬으러 가기',currency:'sparkles',cost,have:s.sparkles,missing:Math.max(0,cost-s.sparkles)};
 }
 if(missing?.id==='furniture'){const price=FURNITURE.find(f=>f.id==='rug').price;return goldGoal({id:'furniture',title:'우리 방의 첫 포근함, 러그',description:'새 게임의 시작 골드로 바로 살 수 있어요. 놓는 순간 효과와 가구 이야기가 함께 열려요.',reward:'폭신한 러그 Lv.1 · 반짝이 3번 주면 1개 돌려받기',action:'rug',cta:s.gold>=price?`${price} 골드로 러그 사서 놓기`:'골드 모으러 가기'},price);}
 if(s.adventureCount===0&&s.adventures.length){const ready=s.adventures.some(q=>now>=q.end);return {id:'adventure',title:ready?'돌아온 친구의 선물 받기':'첫 모험을 다녀오는 중이에요',description:ready?'루미가 친구와 함께 기다려요. 귀환 보상을 받으면 첫 엽서가 모은 먼지에 보관돼요.':'창을 닫아도 모험은 이어져요. 돌아오면 루미를 눌러 친구를 맞이하고 선물을 받아요.',reward:'첫 모험 엽서 · 조합 재료 · 반짝이',action:'adventure',cta:ready?'루미에게 귀환 보상 받기':'모험 소식 보기',currency:'free',cost:0,have:0,missing:0};}
 if(s.adventureCount===0)return {id:'adventure',title:'루미와 첫 모험 준비하기',description:'먼지를 루미 앞으로 옮긴 뒤 출발을 확인해요. 자동으로 떠나지 않아요.',reward:'첫 모험 엽서 · 조합 재료 · 반짝이',action:'adventure',cta:'루미에게 목적지 알아보기',currency:'free',cost:0,have:0,missing:0};
 if(s.roomLevel>=2&&!s.fairyOwned)return goldGoal({id:'fairy',title:'골드 모으는 요정 모아 만나기',description:'방에 찾아온 모아를 누르면 준비된 골드를 한 번에 받아요.',reward:'요정 모아 · 골드 모두 받기',action:'shop',cta:s.gold>=FAIRY_PRICE?'작은 상점으로':'골드 모으러 가기'},FAIRY_PRICE);
 if(s.roomLevel<ROOMS.length){const next=ROOMS[s.roomLevel];return goldGoal({id:'room',title:`다음 우리 방, ${next.name}`,description:`방 ${next.capacity}자리 · 보관함 ${next.storage}자리로 늘고, 새로운 방 이야기가 열려요.`,reward:`골드 보상 +${next.bonus}% · ${next.storyTitle}`,action:'room',cta:s.gold>=next.cost?'다음 방 살펴보기':'골드 모으러 가기'},next.cost);}
 if(!s.fairyOwned)return goldGoal({id:'fairy',title:'골드 모으는 요정 모아 만나기',description:'방에 찾아온 모아를 누르면 준비된 골드를 한 번에 받아요.',reward:'요정 모아 · 골드 모두 받기',action:'shop',cta:s.gold>=FAIRY_PRICE?'작은 상점으로':'골드 모으러 가기'},FAIRY_PRICE);
 return {id:'collection',title:'아직 모르는 친구의 단서 찾기',description:'모은 먼지에서 실루엣과 조합 힌트를 살펴보세요. 무료 랜덤 탄생도 계속할 수 있어요.',reward:'먼지 50종 · 각자의 이야기와 모험 엽서',action:'collection',cta:'모은 먼지 보기',currency:'free',cost:0,have:0,missing:0};
}
