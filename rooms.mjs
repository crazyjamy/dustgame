export const ROOMS=[
 {name:'작은 쉼터',cost:0,bonus:0,color:'#f2f2e9',capacity:6,storage:20,storyTitle:'바닥의 작은 동그라미',story:'처음에는 아무것도 없는 바닥이었어요. 먼지 하나가 앉고, 다른 먼지가 그 옆에 몸을 누였어요. 둘 사이에 생긴 작은 빈틈을 두고 누군가 집이라고 불렀어요. 가장 작은 쉼터의 이야기는 그렇게 시작되었어요.'},
 {name:'햇살이 드는 방',cost:80,bonus:10,color:'#f7f0dc',capacity:9,storage:40,storyTitle:'문틈으로 온 아침',story:'닫힌 줄 알았던 문틈으로 아침 햇살이 들어왔어요. 먼지들은 빛이 닿는 곳을 조금씩 넓혀가며 앉았어요. 혼자만 따뜻한 자리에 있지 않아도 된다는 걸 알게 된 날, 이 방에는 창문이 생겼어요.'},
 {name:'초록빛 아지트',cost:220,bonus:20,color:'#eaf0df',capacity:12,storage:70,storyTitle:'잎사귀가 들려준 주소',story:'모험을 다녀온 먼지가 작은 잎사귀를 문 옆에 놓았어요. 뒤따라온 친구들은 그 잎을 이정표 삼아 방을 찾았어요. 새로 온 친구에게 자리를 내줄 때마다 벽에 초록빛이 한 겹씩 더해졌어요.'},
 {name:'별빛 다락방',cost:480,bonus:35,color:'#ebe8f4',capacity:18,storage:120,storyTitle:'낮은 천장의 별자리',story:'다락방 천장에 반짝이가 하나 붙었어요. 먼지들이 저마다 소중한 기억을 얹어놓자 빛들은 별자리처럼 이어졌어요. 길고 멀었던 모험도 이 천장 아래에서는 조용히 쉬어가는 이야기가 되었어요.'},
 {name:'바람의 온실',cost:900,bonus:50,color:'#e3eee6',capacity:24,storage:180,storyTitle:'멀리 가지 않는 바람',story:'한때 먼지를 멀리 데려가던 바람이 이번에는 창가에서 멈췄어요. 밖을 궁금해하는 친구에게는 길을, 돌아오는 친구에게는 향기를 전해주고 싶었대요. 열린 창이 있어도 아무도 외롭지 않은 온실이 되었어요.'},
 {name:'달구름의 집',cost:1500,bonus:70,color:'#e7e5f1',capacity:30,storage:250,storyTitle:'돌아올 자리가 있는 우주',story:'먼지들은 달구름 위에 집을 세웠어요. 더 멀리 보려는 집이 아니라 더 많은 친구의 귀가를 기다리는 집이었어요. 오늘도 문 앞의 루미는 작은 지도를 펴고, 모아는 돌아온 반짝임을 세어요. 누구에게나 돌아올 자리가 있는 우주예요.'}
];
export const roomCapacity=s=>ROOMS[s.roomLevel-1].capacity;
export const storageCapacity=s=>ROOMS[s.roomLevel-1].storage;
export const homeCount=s=>s.dusts.filter(d=>!d.stored).length;
export const storedCount=s=>s.dusts.filter(d=>d.stored).length;
export const hasHomeSpace=s=>homeCount(s)<roomCapacity(s);
export const hasStorageSpace=s=>storedCount(s)<storageCapacity(s);
