import {petReaction} from './dust-character.mjs?v=1.13.81-4728e3b5';
import {DUSTS,STORIES} from './dust-data.mjs?v=1.13.81-4728e3b5';
import {unlockedStories} from './dust-engine.mjs?v=1.13.81-4728e3b5';
import {personality} from './dust-life.mjs?v=1.13.81-4728e3b5';
import {isAway,roomResidents} from './adventures.mjs?v=1.13.81-4728e3b5';
import {routeUnlocked} from './rooms.mjs?v=1.13.81-4728e3b5';
import {journeyComplete,journeyFor} from './story-journey.mjs?v=1.13.81-4728e3b5';
import {aftermathFor,afterwordRecord,afterwordScene,STORY_ROUTES} from './story-aftermath.mjs?v=1.13.81-4728e3b5';

// A read-only view of existing records. Opening the book does not advance play.
const moments={
 crumb:'보낸 편지의 답장을 기다릴 자리를 만들고 있어요.',soot:'친구가 쉬어갈 그늘을 살펴보고 있어요.',pink:'먼저 인사할 말을 연습하고 있어요.',puff:'친구의 새로운 박자를 들어보고 있어요.',violet:'잠이 오지 않는 친구와 나눌 밤을 그리고 있어요.',star:'작은 빛으로도 찾을 수 있는 길을 표시하고 있어요.',milk:'천천히 걸어서 발견한 길을 적고 있어요.',toast:'조용한 아침에 건넬 인사를 골라보고 있어요.',sprout:'어제보다 조금 자란 부분을 기록하고 있어요.',moss:'빛이 희미한 날의 만남도 기다리고 있어요.',cloud:'친구들 사이에 자기 쉴 자리도 남기고 있어요.',peach:'나눌 마음과 간직할 마음을 함께 담고 있어요.',mint:'매일 달라지는 자기 모습을 그려보고 있어요.',coral:'자기 이야기 뒤에 친구의 말을 기다리고 있어요.',clover:'오늘의 작은 좋은 일을 찾고 있어요.',snow:'조금 달라져도 편안한 자리를 찾아보고 있어요.',dew:'밝은 길 너머의 풍경을 모으고 있어요.',tangerine:'농담 대신 건넬 작은 온기를 준비하고 있어요.',night:'멀리 있는 친구의 소식 칸을 비워두고 있어요.',opal:'작은 빛으로 비출 오늘의 한 걸음을 고르고 있어요.',linen:'낯선 자리에도 편안한 모서리를 만들고 있어요.',cookie:'마음속 소란을 친구에게 꺼낼 준비를 하고 있어요.',puddle:'친구와 만난 자리를 길로 잇고 있어요.',breeze:'친구의 출발에 남길 응원을 준비하고 있어요.',honey:'오래 접어둔 마음을 천천히 펼치고 있어요.',ash:'필요한 곳에 보탤 작은 힘을 골라보고 있어요.',bubble:'함께 웃었던 짧은 순간을 기억하고 있어요.',petal:'다른 계절에도 만날 자리를 남기고 있어요.',sesame:'작은 자기 자리에 이름을 붙이고 있어요.',cocoa:'아직 말하지 못한 마음의 첫 줄을 고르고 있어요.',lemon:'눈에 띄지 않던 작은 수고를 살피고 있어요.',lavender:'오늘의 여러 마음을 다른 색으로 칠하고 있어요.',seafoam:'다른 방향을 돌아도 만날 자리를 정하고 있어요.',chestnut:'자기 모양에 맞는 길을 천천히 찾아보고 있어요.',lily:'작은 목소리 대신 남길 표식을 그리고 있어요.',butterfly:'접힌 자국을 따라 새 날개를 펼쳐보고 있어요.',sugar:'차가운 손으로도 전할 다정함을 준비하고 있어요.',mushroom:'다른 방법으로 들은 하늘을 그림으로 옮기고 있어요.',aurora:'오늘 친구를 맞을 빛깔을 골라보고 있어요.',comet:'돌아온 만큼의 여행을 지도에 남기고 있어요.',lullaby:'친구의 숨에 맞춰 한 박자 쉬어보고 있어요.',ripple:'작은 흔들림을 함께 볼 점으로 남기고 있어요.',flame:'남은 조각으로 다음 표식을 만들고 있어요.',pearl:'길 위에 함께 쉬어갈 점을 표시하고 있어요.',dandelion:'다른 자리에서 본 하늘을 친구에게 보내려 해요.',mist:'흐린 마음에도 함께 볼 여백을 남기고 있어요.',ribbon:'안부를 전할 느슨한 매듭을 묶고 있어요.',acorn:'오래된 자국에서 자기만의 지도를 읽고 있어요.',echo:'늦게 도착한 안부에 오늘의 답장을 쓰고 있어요.',rainbow:'서로 다른 색을 지우지 않고 나란히 놓고 있어요.'
};
const starName=d=>d.nickname||DUSTS.find(x=>x.id===d.id)?.name||'별';
const particle=(name,closed,open)=>name+((name.charCodeAt(name.length-1)-44032)%28?closed:open);
const subject=name=>particle(name,'이','가');
export const RECORD_SECTIONS=[['growth','성장 이야기'],['postcards','도착한 엽서와 여행'],['place','좋아하는 자리의 추억'],['friends','친구와의 기록']];
export function sharedRecords(s,d){
 const favorite=personality(d.id).favorite,open=unlockedStories(d),entries=[];
 STORIES[d.id].forEach((c,index)=>entries.push({key:'growth:'+index,section:'growth',kind:'growth',index,title:index<open?c.title:'아직 잠든 이야기',body:c.body,available:index<open,read:d.readStories.includes(index),label:index<open?d.readStories.includes(index)?'읽은 이야기':'새 이야기':'Lv.'+(index+2)+'에 열려요',observation:c.observation,source:c.source}));
 for(const e of s.life.afterwords||[]){
  if(e.uid!==d.uid)continue;
  const scene=afterwordScene(d,e,favorite);
  entries.push({key:'afterword:'+e.kind,section:{favorite:'place',route:'postcards',friend:'friends',complete:'growth'}[e.kind],kind:'afterword',afterwordKind:e.kind,title:scene.title,body:scene.body,change:scene.change,at:e.at||null,read:e.read,available:true,label:e.read?'읽은 후일담':'새 후일담'});
 }
 // Older postcards are species-wide; never attribute one to a specific copy.
 for(const p of s.life.postcards.filter(p=>p.dustId===d.id))entries.push({key:'postcard:'+p.route,section:'postcards',kind:'postcard',title:p.title,body:p.text,at:p.at,available:true,read:true,label:STORY_ROUTES[p.route]+' · 같은 종류의 별이 함께 모은 엽서',shared:true});
 if(s.life.memories.includes(String(d.uid)))entries.push({key:'memory:favorite',section:'place',kind:'memory',title:particle(favorite.name,'과','와')+' 오래 함께한 자리',body:favorite.memory,available:true,read:true,label:'설치물 Lv.3에서 남긴 추억'});
 for(const pair of s.life.pairs){
  const ids=pair.split(':').map(Number);if(ids.length!==2||!ids.includes(d.uid))continue;
  const other=s.dusts.find(x=>x.uid===ids.find(uid=>uid!==d.uid));
  const name=other?starName(other):'함께 지낸 친구';
  entries.push({key:'friend:'+pair,section:'friends',kind:'friend',title:particle(name,'과','와')+' 함께한 첫 순간',body:particle(starName(d),'과','와')+' '+name+'의 이름이 같은 페이지에 남아 있어요. 처음 가까이 앉아 서로의 시간을 나누었어요. 지금 서로 다른 자리에 있어도 함께 지낸 첫 순간은 이곳에 남아요.',available:true,read:true,label:'처음 가까이 지낸 날의 기록',otherUid:other?.uid});
 }
 const sections=RECORD_SECTIONS.map(([id,title])=>({id,title,entries:entries.filter(e=>e.section===id)}));
 const reaction=petReaction(d.id);
 if(reaction && s.life.petReactions?.includes(d.id)){
  sections.push({id:'care',title:'손길의 기록',entries:[{
   key:'care:first-touch',section:'care',kind:'care',title:'처음 나눈 손길',body:reaction.record,
   available:true,read:true,label:'같은 종류의 별이 함께 간직한 기록',
  }]});
 }
 return sections;
}
export const readableRecords=(s,d)=>sharedRecords(s,d).flatMap(section=>section.entries).filter(e=>e.available);
export function nextStoryClue(s,d){
 const profile=aftermathFor(d),name=starName(d),home=roomResidents(s),favorite=personality(d.id).favorite;
 const pending=(s.life.afterwords||[]).find(e=>e.uid===d.uid&&!e.read);
 const line=journeyComplete(d)?'“'+journeyFor(d).ending+'”':subject(name)+' '+moments[d.id];
 if(pending)return {line,action:'read',key:'afterword:'+pending.kind,label:'새로 남은 후일담 읽어보기'};
 if(d.stored)return {line,action:'book',label:'간직한 기록 다시 펼쳐보기'};
 if(isAway(s,d.uid))return {line:subject(name)+' 돌아와 들려줄 이야기를 모으고 있어요.',action:'book',label:'기다리는 동안 함께 쓴 기록 읽기'};
 if(!d.readStories.includes(0))return {line,action:'book',label:'함께 쓴 이야기 펼쳐보기'};
 if(!afterwordRecord(s,d,'friend')&&home.some(x=>x.id!==d.id))return {line,action:'friend',label:'친구 곁에 함께 놓아보기'};
 if(!afterwordRecord(s,d,'favorite')&&s.decorations.includes(favorite.id))return {line,action:'favorite',label:favorite.name+' 곁에 놓아보기'};
 if(!afterwordRecord(s,d,'route')&&routeUnlocked(s,profile.route))return {line,action:'route',label:STORY_ROUTES[profile.route]+'에 다녀와보기'};
 return {line,action:'book',label:'함께 쓴 기록 다시 펼쳐보기'};
}
