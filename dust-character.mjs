import{DUSTS}from'./dust-data.mjs?v=1.13.63-0f23dbc5';
export const CHARACTERS={
 crumb:{favorite:'rug',motion:'knead',face:'content',action:'앞발을 번갈아 꾹꾹 누르며 몸을 납작하게 만들어요.',words:'여기, 내 모양으로 폭신해졌어.',cue:'번갈아 꾹꾹 · 반달 눈'},
 soot:{favorite:'cushion',motion:'roll',face:'wink',action:'쿠션을 발견하면 한 바퀴 데굴 구르고 씩 웃어요.',words:'한 바퀴만 더! 진짜 마지막이야.',cue:'한 바퀴 데굴 · 윙크'},
 pink:{favorite:'bookshelf',motion:'peek',face:'blush',action:'작은 손으로 얼굴을 가렸다가 책장 너머를 빼꼼 봐요.',words:'나… 다음 장도 같이 봐도 돼?',cue:'가렸다 빼꼼 · 발그레'},
 puff:{favorite:'windchime',motion:'dance',face:'joy',action:'종소리를 따라 꽃잎처럼 활짝 펴졌다 오므라들며 춤춰요.',words:'딩동! 바람이랑 나랑 합주 중이야.',cue:'활짝 피는 춤 · 웃는 눈'},
 violet:{favorite:'lamp',motion:'sleep',face:'sleep',action:'달빛 아래 몸을 길게 늘였다 웅크리며 새근새근 잠들어요.',words:'불은 조금만… 꿈이 도망가지 않게.',cue:'길게 숨쉬기 · 잠든 눈'}
};
const FIRST_GREETINGS={
 crumb:'쉿, 빛이 앉을 자리를 찾았어. 네 옆도 괜찮을까?',
 soot:'한 바퀴 굴러서 인사할게. 데굴!',
 pink:'나… 여기서 빼꼼 인사해도 돼?',
 puff:'안녕! 우리 바람이 오는 쪽으로 같이 춤출래?',
 violet:'목소리를 조금만 낮춰 줄래? 아직 꿈이 남아 있거든.',
 milk:'네가 온 소리가 들렸어. 이불 안에서 손 흔들고 있어.',
 toast:'딱 맞춰 왔네! 내가 먼저 인사하려고 기다렸어.',
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
