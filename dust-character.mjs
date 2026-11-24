import{DUSTS}from'./dust-data.mjs?v=1.13.65-49db833c';
export const CHARACTERS={
 crumb:{favorite:'rug',motion:'knead',face:'content',action:'앞발을 번갈아 꾹꾹 누르며 몸을 납작하게 만들어요.',words:'여기, 내 모양으로 폭신해졌어.',cue:'번갈아 꾹꾹 · 반달 눈'},
 soot:{favorite:'cushion',motion:'roll',face:'wink',action:'쿠션을 발견하면 한 바퀴 데굴 구르고 씩 웃어요.',words:'한 바퀴만 더! 진짜 마지막이야.',cue:'한 바퀴 데굴 · 윙크'},
 pink:{favorite:'bookshelf',motion:'peek',face:'blush',action:'작은 손으로 얼굴을 가렸다가 책장 너머를 빼꼼 봐요.',words:'나… 다음 장도 같이 봐도 돼?',cue:'가렸다 빼꼼 · 발그레'},
 puff:{favorite:'windchime',motion:'dance',face:'joy',action:'종소리를 따라 꽃잎처럼 활짝 펴졌다 오므라들며 춤춰요.',words:'딩동! 바람이랑 나랑 합주 중이야.',cue:'활짝 피는 춤 · 웃는 눈'},
 violet:{favorite:'lamp',motion:'sleep',face:'sleep',action:'달빛 아래 몸을 길게 늘였다 웅크리며 새근새근 잠들어요.',words:'불은 조금만… 꿈이 도망가지 않게.',cue:'길게 숨쉬기 · 잠든 눈'}
};
const FIRST_GREETINGS={
  "crumb": "안녕, 나 솔라야. 네 옆에 앉아도 돼?",
  "soot": "안녕! 잠깐만, 한 바퀴만 더 굴러갈게.",
  "pink": "안녕… 나 이 뒤에서 손 흔들고 있어.",
  "puff": "안녕! 잠깐, 방금 들었어? 저 소리에 맞춰 춤춰 봐.",
  "violet": "안녕. 여기 앉아도 돼. 나 아직 조금 졸려.",
  "star": "길 찾는 중이야? 지도 있어. 같이 볼까?",
  "milk": "왔어? 나 이불 안에서 손 흔들고 있어.",
  "toast": "좋은 아침! 다행이다. 오늘은 내가 먼저 인사했네.",
  "sprout": "안녕! 방금 새 파란색을 찾았어. 한 번 볼래?",
  "moss": "왔구나. 천천히 와도 돼. 난 여기 있어.",
  "cloud": "왔어? 쿠션 여기 있어. 잠깐 앉아.",
  "peach": "이 붉은색 어때? 여기, 너도 한 장 가져가.",
  "mint": "오늘 내 얼굴 어때? 어제보다 좀 더 둥글지?",
  "coral": "왔어? 내가 아까 본 거 얘기해도 돼?",
  "clover": "나랑 같이 가면 반짝이는 거 하나쯤은 찾을걸?",
  "snow": "안녕. 가까이 와도 돼. 이쪽 자리가 덜 차가워.",
  "dew": "안녕! 여기까지 굴러왔어. 잠깐 숨 좀 돌릴게.",
  "tangerine": "안녕! 오늘 있었던 일 하나 말해줘. 나도 있어.",
  "night": "안녕. 조용히 있고 싶으면 그냥 옆에 있어도 돼.",
  "opal": "안녕! 예전 사진부터 볼래, 오늘 그린 것부터 볼래?",
  "linen": "지도 좀 접어도 돼? 내 주머니에 넣고 가려고.",
  "cookie": "혹시 작은 그림 조각 하나 못 봤어? 내 상자에서 빠졌나 봐.",
  "puddle": "앗, 물에 빠졌네. 됐어! 이제 다시 떠올랐어.",
  "breeze": "왔어? 짐 다 챙겼어? 나 여기서 기다릴게.",
  "honey": "안녕. 나 대답이 좀 늦을 수 있어. 지금 생각 중이야.",
  "ash": "안녕! 들고 갈 거 있어? 무거운 건 나한테 줘.",
  "bubble": "방울 하나 불어볼까? 이번 건 꽤 클 것 같아.",
  "petal": "이 꽃갈피 봐. 네가 오면 보여주려고 여기 끼워뒀어.",
  "sesame": "안녕! 지도 끝에도 내 이름 있어. 가까이 보면 보여.",
  "cocoa": "안녕. 차 한 잔 줄까? 말은 조금 있다 해도 돼.",
  "lemon": "안녕! 창 너머 볼 거면 이쪽으로 와. 방금 닦았어.",
  "lavender": "오늘 나는 무슨 색 같아? 난 이미 세 개 골랐어.",
  "seafoam": "안녕! 난 이쪽으로 한 바퀴 돌 거야. 저기서 볼까?",
  "chestnut": "안녕. 내 쪽은 모서리가 좀 있어. 옆은 괜찮아.",
  "lily": "안녕. 조금만 가까이 와줄래? 여기서 말할게.",
  "butterfly": "이 리본 내가 접었어. 양쪽 모양이 살짝 다른 거 보여?",
  "sugar": "왔어? 여기 따뜻한 자리 있어. 내가 비워뒀어.",
  "mushroom": "안녕! 귀로 안 들리면 손가락으로도 같이 볼 수 있어.",
  "aurora": "안녕! 오늘 커튼은 무슨 색으로 열까? 네가 골라도 돼.",
  "comet": "안녕! 지도 끝이 좀 구겨졌지? 여기까지 다녀왔어.",
  "lullaby": "안녕. 탁, 탁… 내 박자 들려? 너도 한 번 해봐.",
  "ripple": "방금 물 흔들린 거 봤어? 다음에 또 그러면 같이 보자.",
  "flame": "안녕. 이 등 내가 켰어. 조금 작지만 여기 앉으면 잘 보여.",
  "pearl": "길 안내할까? 나 이 근처는 잘 아는데, 중간에 쉬어도 돼.",
  "dandelion": "안녕! 씨앗 하나 가져갈래? 네 창에 심어도 돼.",
  "mist": "안녕. 잘 안 보여도 이쪽에 있어. 손 흔들어 볼게.",
  "ribbon": "안녕! 노트 읽다 멈췄어? 이 끈 끼워두면 돼.",
  "acorn": "내 모자 봤어? 여기 눌린 데는 지난번 여행에서 생겼어.",
  "echo": "안녕. 네가 남긴 말 봤어. 조금 늦었지만 지금 답해도 돼?",
  "rainbow": "여기 비춰볼래? 네가 들고 온 빛은 어떤 색으로 나뉘나 보자.",
};
export const firstGreeting=d=>Object.hasOwn(FIRST_GREETINGS,d.id)?FIRST_GREETINGS[d.id]:d.quote;

const PET_REACTIONS={
 pink:{motion:'peek',face:'blush',record:'로제타가 손길을 따라 고개를 내밀었어요.'},
 milk:{motion:'curl',face:'sleep',record:'아이오가 눈을 반쯤 뜨고는 다시 잠들었어요.'},
 toast:{motion:'hop',face:'smile',record:'베가가 기다렸다는 듯 먼저 인사했어요.'},
};
export const petReaction=id=>Object.hasOwn(PET_REACTIONS,id)?PET_REACTIONS[id]:null;
export function rememberPetReaction(s,id){
 if(!petReaction(id)||s.life.petReactions.includes(id))return false;
 s.life.petReactions.push(id);
 return true;
}
export const characterProfile=id=>CHARACTERS[id]||null;
export const dustName=d=>d.nickname||DUSTS.find(x=>x.id===d.id)?.name||'별';
export function initNicknames(s){for(const d of s.dusts){if(d.nickname===undefined)d.nickname='';if(typeof d.nickname!=='string'||Array.from(d.nickname).length>12||/[\u0000-\u001f\u007f<>]/u.test(d.nickname))throw Error('invalid nickname');}return s;}
export function renameDust(s,uid,value){const d=s.dusts.find(d=>d.uid===uid);if(!d||typeof value!=='string')return {ok:false,message:'별명을 확인해주세요.'};const name=value.trim();if(Array.from(name).length>12||/[\u0000-\u001f\u007f<>]/u.test(name))return {ok:false,message:'별명은 12자 이내로, 꺾쇠나 줄바꿈 없이 적어주세요.'};d.nickname=name;return {ok:true,name:dustName(d)};}
