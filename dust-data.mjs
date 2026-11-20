import { SKY_STORIES } from './sky-stories.mjs?v=1.13.24-19494e89';
import{makeMoreDusts}from'./dust-fifty.mjs?v=1.13.24-19494e89';
import{EXTRA_DUSTS}from'./dust-expansion.mjs?v=1.13.24-19494e89';
export const GROUPS=[{id:'daily',name:'포근',icon:'◌'},{id:'pop',name:'몽글',icon:'✿'},{id:'dream',name:'반짝',icon:'✧'}];
export const RARITIES=[{id:'common',name:'보통',cost:3},{id:'rare',name:'특별',cost:5},{id:'legend',name:'희귀',cost:8}];
export const ESSENCES=[{id:'leaf',name:'풀잎',icon:'❋'},{id:'spark',name:'햇살',icon:'☀'},{id:'moon',name:'달빛',icon:'☾'},{id:'dew',name:'이슬',icon:'◉',added:true},{id:'ember',name:'잔불',icon:'♧',added:true},{id:'stardust',name:'별가루',icon:'✦',added:true}];
// 새로운 별은 여기에 종류와 조합법만 추가하면 방·도감·조합 목록에 함께 표시됩니다.
export const DUSTS=[
{id:'crumb',name:'솔라',color:'#f3d447',face:'#273c43',shape:'blob',group:'daily',rarity:'common',essence:'moon',quote:'나 여기 있어.',story:'햇빛 한 줄기 아래에서 발견한 아주 작은 친구. 가끔은 가만히 있는 것만으로도 충분해요.'},
{id:'soot',name:'움브라',color:'#43494b',face:'#f5edd7',shape:'fluff',group:'daily',rarity:'rare',essence:'leaf',quote:'같이 뒹굴자.',story:'소파 아래에서 굴러 나온 별. 무심한 척해도 누가 쓰다듬어주면 몽글몽글해져요.'},
{id:'pink',name:'로제타',color:'#ef83bd',face:'#a52670',shape:'square',group:'pop',rarity:'common',essence:'spark',quote:'조금 부끄러워.',story:'좋아하는 마음이 모여 분홍빛이 됐어요. 표정은 뚱해도 속으로는 늘 반가워하고 있어요.'},
{id:'puff',name:'네뷸라',color:'#7cbeeb',face:'#23638f',shape:'flower',group:'pop',rarity:'rare',essence:'leaf',quote:'기분이 포포해!',story:'바람에 실려 찾아온 작은 파란 별. 웃을 때마다 몸이 꽃처럼 둥글게 피어나요.'},
{id:'violet',name:'리라',color:'#b6a3d5',face:'#5e4887',shape:'ghost',group:'dream',rarity:'rare',essence:'moon',quote:'좋은 꿈 꿨어?',story:'누군가의 포근한 꿈에서 떨어져 나왔어요. 잠이 오지 않는 밤에는 조용히 곁을 지켜줘요.'},
{id:'star',name:'시리온',color:'#efb66e',face:'#805020',shape:'star',group:'dream',rarity:'legend',essence:'spark',quote:'너도 반짝여.',story:'아주 작은 별 부스러기. 소원을 들어주지는 못하지만, 이야기를 끝까지 들어줄 수 있어요.'}
];
DUSTS.push(...EXTRA_DUSTS);
export const STAGES=['씨앗 별','몽글 별','포근 별'];

DUSTS.push(...makeMoreDusts(DUSTS,GROUPS,RARITIES,ESSENCES));
// Lv.2부터 Lv.6까지 순서대로 열립니다.
export const STORIES = SKY_STORIES;
