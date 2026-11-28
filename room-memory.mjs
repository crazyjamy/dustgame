export const ROOM_MEMORY=[
 {title:'아무도 읽지 못한 별무늬',body:'솔라는 작은 쉼터에서 희미한 점 셋을 찾아냈어요. 루미는 별무늬를 찾는 일이 하늘의 길을 익히는 첫걸음이라며 지도를 펼쳤어요.',condition:'처음부터 읽을 수 있어요'},
 {title:'같은 구름에서 태어난 별',body:'친구가 한 단계 자란 날 첫 점이 켜졌어요. 같은 가스 구름에서 비슷한 시기에 태어난 별들이 산개성단을 이룰 수 있대요. 솔라는 함께 자란 이름을 점 옆에 적었어요.',condition:'별 한 마리를 Lv.2까지 키우기'},
 {title:'고리의 작은 조각들',body:'가구를 손본 날 둘째 점이 빛났어요. 솔라는 토성의 고리 사진을 가져왔어요. 매끈한 띠처럼 보여도 고리는 얼음과 암석 조각들이 모인 거래요.',condition:'나리에게 받은 설치물 하나를 Lv.2로 강화하기'},
 {title:'서로 다른 자리의 세 별',body:'모험에서 돌아온 친구가 점 셋의 이름을 알아냈어요. 베가, 데네브, 알타이르. 서로 다른 별자리의 별이지만 지구에서 보면 여름철 대삼각형을 이뤄요.',condition:'모험을 마치고 루미에게 귀환 보상 받기'},
 {title:'다시 돌아오는 길',body:'루미는 완성된 삼각형을 귀환 지도에 그렸어요. 눈에 익은 별무늬는 하늘에서 다음 별을 찾는 데 도움이 돼요. 솔라도 모험에서 돌아오는 친구를 위해 지도 한 장을 베꼈어요.',condition:'앞의 기억을 모두 읽으면 완성돼요'}
];
export function initRoomMemory(s){
 if(s.roomMemory===undefined)s.roomMemory={version:1,unlocked:[],read:[],claimed:false,placed:false};
 const m=s.roomMemory;
 if(!m||m.version!==1||!Array.isArray(m.unlocked)||!Array.isArray(m.read)||!['claimed','placed'].every(k=>typeof m[k]==='boolean'))throw Error('invalid room memory');
 for(const [key,max]of[['unlocked',3],['read',4]])if(new Set(m[key]).size!==m[key].length||!m[key].every(i=>Number.isInteger(i)&&i>=0&&i<=max))throw Error('invalid memory chapters');
 if(m.read.some((v,i)=>v!==i)||m.read.some(i=>i>0&&i<4&&!m.unlocked.includes(i))||m.claimed!==m.read.includes(4)||m.placed&&!m.claimed)throw Error('invalid memory progress');
 return syncRoomMemory(s);
}
export function syncRoomMemory(s){const m=s.roomMemory;if(!m)return s;const done=[true,s.dusts.some(d=>d.xp>=2),Object.values(s.furnitureLevels||{}).some(l=>l>=2),s.adventureCount>0];done.forEach((yes,i)=>{if(yes&&!m.unlocked.includes(i))m.unlocked.push(i);});m.unlocked.sort();return s;}
export function memoryProgress(s){syncRoomMemory(s);const m=s.roomMemory,next=m.read.length;return {pieces:m.unlocked.filter(i=>i>0).length,read:m.read.length,next,canRead:next===0||next===4?next===0||m.unlocked.length===4:m.unlocked.includes(next),complete:m.claimed};}
export function readRoomMemory(s,index){const p=memoryProgress(s),m=s.roomMemory;if(!Number.isInteger(index)||index<0||index>4)return {ok:false};if(m.read.includes(index))return {ok:true,reward:false,chapter:ROOM_MEMORY[index]};if(index!==p.next||!p.canRead)return {ok:false};m.read.push(index);if(index===4){m.claimed=true;m.placed=true;}return {ok:true,reward:index===4,chapter:ROOM_MEMORY[index]};}
export function toggleMemoryDecor(s){if(!s.roomMemory.claimed)return false;s.roomMemory.placed=!s.roomMemory.placed;return true;}
