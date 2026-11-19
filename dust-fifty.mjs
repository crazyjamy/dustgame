// Thirty more friends. Every five-beat arc follows one small, personal discovery.
const rows=[
['linen','타이탄','#d9cbaa','담요의 올 사이에서 나온 별','조금 구겨져도 괜찮아.'],
['cookie','목성','#c7976a','과자 봉지의 마지막 부스러기 옆 별','남은 조각도 소중해.'],
['puddle','은하수','#91cbdc','화분 받침의 물방울을 따라온 별','빠져도 다시 둥실.'],
['breeze','태양풍','#b7d4b6','열린 창문으로 들어온 바람 별','천천히 와도 돼.'],
['honey','황금성','#e7c766','꿀단지 뚜껑 근처의 노란 별','마음은 천천히 녹아.'],
['ash','중성자별','#777c83','오래된 연필 자국에서 묻어난 별','지워져도 남는 게 있어.'],
['bubble','코마','#a2d9cf','비눗방울이 사라진 자리에 남은 별','작은 기쁨도 보글보글.'],
['petal','장미성운','#e9afc6','말린 꽃갈피 사이의 분홍 별','계절이 달라도 피어.'],
['sesame','왜행성','#656660','깨 한 알보다 작은 부엌 별','작아도 잘 보여.'],
['cocoa','유로파','#b68e7d','따뜻한 컵받침에서 쉬던 갈색 별','오늘도 따뜻하게.'],
['lemon','헬리아','#d7d87b','레몬빛 햇살 조각에서 나온 별','조금 새콤해도 좋아.'],
['lavender','스텔라','#c4b0d8','말린 허브 주머니의 향기 별','쉬어가도 노래야.'],
['seafoam','트리톤','#89c2d3','유리병 속 바다 소리를 닮은 별','왔다 갔다 해도 괜찮아.'],
['chestnut','소행성','#ac8868','밤 껍질 옆에서 굴러온 별','가시 안에도 온기가 있어.'],
['lily','아리아','#e1e3c5','종 모양 꽃의 그늘에서 나온 별','작은 소리로 불러줘.'],
['butterfly','나비성운','#c7a6d3','접힌 리본 끝에서 날아온 별','다르게 접혀도 날아.'],
['sugar','얼음위성','#e5e5df','설탕통의 반짝이는 틈에서 나온 별','모서리도 내 모습이야.'],
['mushroom','전파별','#c3aa90','작은 화분 흙 아래에서 자란 별','비 오는 날도 놀자.'],
['aurora','오로라','#b8bfdc','유리 조각의 여러 빛에서 나온 별','한 가지로 정하지 않아도 돼.'],
['comet','아이손','#97b9df','별빛 끝에 달린 꼬리 별','뒤따라온 것도 빛이야.'],
['lullaby','펄서','#8d93b2','밤의 작은 콧노래에서 나온 별','졸리면 기대도 돼.'],
['ripple','중력파','#acd7d3','컵 속의 작은 원을 닮은 별','흔들려도 이어져.'],
['flame','초신성','#e5a17e','식어가는 작은 불빛에서 나온 별','작게 타도 따뜻해.'],
['pearl','스피카','#dfc7d2','조개 모양 장식 속에서 나온 별','천천히 반짝여도 돼.'],
['dandelion','산개성단','#dce1a7','민들레 씨앗 곁을 떠돌던 별','어디에 내려도 시작이야.'],
['mist','암흑성운','#bdceca','차가운 유리창의 흐린 틈에서 나온 별','선명하지 않아도 여기 있어.'],
['ribbon','성간운','#dca6b4','선물 끈의 남은 매듭에서 나온 별','묶지 않아도 이어져.'],
['acorn','칼리스토','#baa180','도토리 모자를 뒤집어쓴 별','딱 맞지 않아도 내 모자야.'],
['echo','우주전파','#b4a8ce','빈 상자 안의 작은 울림에서 나온 별','대답이 늦어도 듣고 있어.'],
['rainbow','프리즘성','#dbbba5','비 갠 창가의 옅은 색을 담은 별','함께 있으면 색이 늘어.']
];
export function makeMoreDusts(existing,groups,rarities,essences){
 const used=new Set(existing.map(d=>[d.group,d.rarity,d.essence].join(':'))),combos=[];
 for(const g of groups)for(const r of rarities)for(const e of [...essences.slice(3),...essences.slice(0,3)])if(!used.has([g.id,r.id,e.id].join(':')))combos.push({group:g.id,rarity:r.id,essence:e.id});
 return rows.map(([id,name,color,story,quote],i)=>({id,name,color,face:i===5||i===8||i===20?'#f6f0dd':'#61716b',shape:'soft-'+(i+1),expression:['smile','shy','wink','sleepy','surprised'][i%5],story:story+'.',quote,...combos[i]}));
}
