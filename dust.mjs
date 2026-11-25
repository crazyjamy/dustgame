import{destinations,recipeQuantity,journal,depart,tripSeconds,collectTrip,tripGold,tripUpgradePrice,workshop}from'./star-trips.mjs?v=1.13.81-3dfe0d36';
import{journeyFor,hasJourney,journeyComplete,journeyHint}from'./story-journey.mjs?v=1.13.81-3dfe0d36';
import{AFTERWORD_KINDS,AFTERWORD_LABELS,STORY_ROUTES,aftermathFor,afterwordRecord,afterwordScene,readAfterword,roomStoryReaction}from'./story-aftermath.mjs?v=1.13.81-3dfe0d36';
import{storyParagraph}from'./story-text.mjs?v=1.13.81-3dfe0d36';
import{connectStoryEffects}from'./story-effects.mjs?v=1.13.81-3dfe0d36';
import{sharedRecords,readableRecords,nextStoryClue}from'./star-records.mjs?v=1.13.81-3dfe0d36';
import{questPage,roomPage,memoryPage}from'./field-book.mjs?v=1.13.81-3dfe0d36';
import { starLight, starFace, starAppearance, starLevelScale } from './star-art.mjs?v=1.13.81-3dfe0d36';
import{dropDailySparkles,collectDailySparkle,autoCollectDailySparkles}from'./daily-sparkles.mjs?v=1.13.81-3dfe0d36';
import{pickMergeDropTarget}from'./merge-drop.mjs?v=1.13.81-3dfe0d36';
import{startDesk,finishDesk,DESK_ITEMS,deskProgress}from'./desk-exploration.mjs?v=1.13.81-3dfe0d36';
import{mountDeskScene}from'./desk-scene.mjs?v=1.13.81-3dfe0d36';
import{APP_VERSION,PREFS_KEY,BACKUP_KEY,loadPreferences}from'./player-settings.mjs?v=1.13.81-3dfe0d36';
import{encodeSave,decodeSave,saveSummary,commitImport,MAX_SAVE_BYTES}from'./save-files.mjs?v=1.13.81-3dfe0d36';
import{createSound}from'./sound.mjs?v=1.13.81-3dfe0d36';
import{THEMES,knownDust,syncCollection,themeProgress,setCollectionTarget,targetDust,materialNeeds,essenceRoute,claimTheme,toggleThemeDecor,routeCollection}from'./collection-book.mjs?v=1.13.81-3dfe0d36';
import{CHARACTERS,characterProfile,dustName,firstGreeting,renameDust,petReaction,rememberPetReaction}from'./dust-character.mjs?v=1.13.81-3dfe0d36';
import{ROOM_MEMORY,syncRoomMemory,memoryProgress,readRoomMemory,toggleMemoryDecor}from'./room-memory.mjs?v=1.13.81-3dfe0d36';
import{firstSteps,nextGoal,goldOverview}from'./progression.mjs?v=1.13.81-3dfe0d36';
import{furnitureQuest,claimFurnitureQuest}from'./furniture-quests.mjs?v=1.13.81-3dfe0d36';
import{HOLD_MS,beginGesture,advanceGesture,armGesture,shouldPlace,insideAdventureGate}from'./room-gestures.mjs?v=1.13.81-3dfe0d36';
import{personality,roomSpot,nearFavorite,companionship,storyCompanion,recipeHint,observeLife,smallWish,claimWish,resumeLife,readLife}from'./dust-life.mjs?v=1.13.81-3dfe0d36';
import{roomCapacity,storageCapacity,homeCount,hasHomeSpace,hasStorageSpace,storedCount,currentRoom,ROOM_CHAPTERS,readRoomChapter,claimRoomChapter,equipRoomDecor,roomGuest,claimRoomGuest,routeUnlocked,routeUnlockLevel}from'./rooms.mjs?v=1.13.81-3dfe0d36';
import{FURNITURE_STORIES,MAX_FURNITURE_LEVEL,furnitureCategory,activeLevel,furnitureLevel,furnitureEffect,upgradeCost}from'./furniture.mjs?v=1.13.81-3dfe0d36';
import{DEFAULT_DECOR,moveRoomItem,insideKeeper,toPlanetScreen,fromPlanetScreen}from'./room-layout.mjs?v=1.13.81-3dfe0d36';
import{QUESTS,MAX_ADVENTURERS,isAway,startAdventureParty,adventureRewards,chooseKeeperRoute,claimAdventure,selectDust,roomResidents}from'./adventures.mjs?v=1.13.81-3dfe0d36';
import{icon,furnitureArt}from'./icons.mjs?v=1.13.81-3dfe0d36';
import{uiIcon}from'./ui-icons.mjs?v=1.13.81-3dfe0d36';

for (const placeholder of document.querySelectorAll('[data-ui-icon]')) {
 placeholder.outerHTML = uiIcon(placeholder.dataset.uiIcon, placeholder.className);
}
import{ROOMS,FURNITURE,FAIRY_PRICE,GOLD_PRODUCTION_DIVISOR,buyFairy,materialPrice,installed,GOLD_CAP_MS,baseGoldInterval,goldInterval,goldAmount,goldProduction,collectGold,collectAllGold,buyMaterial,upgradeRoom,toggleFurniture,upgradeFurniture}from'./economy.mjs?v=1.13.81-3dfe0d36';
import{DUSTS,GROUPS,RARITIES,ESSENCES,STAGES,STORIES}from'./dust-data.mjs?v=1.13.81-3dfe0d36';
import{createState,restore,migrateCats,getDust,stage,recipe,checkMix,mix,finishMix,mergeDust,mergeCandidates,mergeResultLevel,pet,level,unlockedStories,inRoom,storeDust,takeOutDust,swapStoredDust,readStory}from'./dust-engine.mjs?v=1.13.81-3dfe0d36';
const KEY='tiny-dust-club-v1',$=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));let state,saveBlocked=false,damagedRaw=null;try{const raw=localStorage.getItem(KEY);if(raw){try{state=restore(raw)}catch{saveBlocked=true;damagedRaw=raw;state=createState()}}else{try{state=migrateCats(localStorage.getItem('meow-mix-v2'))}catch{state=createState()}}}catch{state=createState()}
let userPrefs=loadPreferences(readLocal(PREFS_KEY),!!readLocal(KEY)),introOpen=false;
const sounds=createSound(()=>userPrefs,window.AudioContext||window.webkitAudioContext);
let offlineReturn=Date.now()-state.life.lastSeen>=60000,goalHTML='';
resumeLife(state);
let dustFilter='all',postcardRoute='all',postcardShowMissing=false;
let roomDialogOpen=false,lifeLastTick=0,hidePlacementStars=false,placementMode=false;
let collectionTab='dust',shopTab='furniture',storageTab='stars',adventureDialogOpen=false;
const expeditionParty=new Set();
let deskScene=null;
let furnitureFilter='all';
let page='room',selection={group:'',rarity:'',essence:''},mixDialogOpen=false,toastTimer,happyUid=null,happyTimer,lastFocus;
const selected=()=>state.dusts.find(d=>d.uid===state.selectedUid&&!d.stored&&!isAway(state,d.uid))||inRoom(state)[0]||null,copies=id=>state.dusts.filter(d=>d.id===id),find=(list,id)=>list.find(x=>x.id===id),systemReduced=window.matchMedia('(prefers-reduced-motion: reduce)'),reduced={get matches(){return userPrefs.motionReduced||systemReduced.matches;}};
let dustArtSequence=0;
const growthName = rank => STAGES[Math.min(rank,STAGES.length)-1];
function dustArt(id, s=0, extra='', rank=[1,2,4][s]){
 const d=getDust(id);
 const hidden=extra.includes('silhouette'),mature=s===2,calm=mature&&extra.includes('story-finished');
 const glowing=d.rarity==='legend'&&!hidden;
 const {path,pattern}=starAppearance(d.shape,s,rank);
 const showPattern=!hidden&&!!pattern;
 const artId=hidden?0:++dustArtSequence;
 const gradientId='dust-glow-'+artId;
 const reflectionId='dust-reflection-'+artId;
 const face=starFace;
 const clipId='dust-pattern-'+artId;
 const mouth=s===1?'M47 58Q50 61 53 58':!calm&&d.shape==='square'?'M46 59Q50 54 54 59':'M45 57Q50 63 55 57';
 const moon=mature&&d.shape==='moon';
 const openEye=x=>`<ellipse cx="${x}" cy="48" rx="2.5" ry="3.6"/>`;
 const closedEye=x=>`<path d="M${x-3} 48Q${x} 51 ${x+3} 48" fill="none" stroke="${face}" stroke-width="2.2" stroke-linecap="round"/>`;
 const eyes=calm||mature&&d.expression==='sleepy'?closedEye(41)+closedEye(59):mature&&d.expression==='wink'?openEye(41)+closedEye(59):openEye(41)+openEye(59);
 const expression=s===0?'':mature&&!calm&&d.expression==='surprised'?`<ellipse cx="50" cy="59" rx="2.5" ry="3.2" fill="${face}"/>`:`<path class="dust-mouth" d="${mouth}" stroke="${face}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
 return `<span class="dust-art ${extra} ${hidden?'':'pastel-star'} ${glowing?'rare-glow':''}" role="img" aria-label="${hidden?'아직 만나지 못한 별':d.name+' '+growthName(rank)}" style="--dust-color:${d.color};--dust-face:${face}"><svg viewBox="0 0 100 100" aria-hidden="true">
 ${!hidden?`<defs>
 <linearGradient id="${gradientId}" x1="14%" y1="5%" x2="82%" y2="100%">${starLight(d.color,d.rarity).map(([offset,color])=>`<stop offset="${offset}" stop-color="${color}"/>`).join('')}</linearGradient>
 <radialGradient id="${reflectionId}" cx="24%" cy="17%" r="58%">
 <stop offset="0" stop-color="#fff" stop-opacity=".72"/><stop offset=".38" stop-color="#f6fcff" stop-opacity=".27"/><stop offset="1" stop-color="#f6fcff" stop-opacity="0"/>
 </radialGradient>
 </defs>`:''}
 ${showPattern?`<defs><clipPath id="${clipId}"><path d="${path}"/></clipPath></defs>`: ''}
 <g transform="translate(50 50) scale(${starLevelScale(rank)}) translate(-50 -50)"><g class="dust-body"><path d="${path}" fill="${hidden?d.color:'url(#'+gradientId+')'}"/>
 ${hidden?'':`<path d="${path}" fill="url(#${reflectionId})" stroke="${glowing?'#fff8':'#fff4'}" stroke-width="${glowing?'1.3':'.75'}" stroke-linejoin="round"/>`}
 ${hidden?'':`${showPattern?`<g class="star-pattern" clip-path="url(#${clipId})" fill="currentColor" color="${face}" opacity=".24">${pattern}</g>`: ''}
 ${mature&&!calm&&d.expression==='shy'?`<g fill="${face}" opacity=".18"><ellipse cx="35" cy="55" rx="4" ry="2"/><ellipse cx="65" cy="55" rx="4" ry="2"/></g>`:''}
 <g ${moon?'transform="translate(-8 8)"':''}><g class="dust-eyes" fill="${face}">${eyes}</g>${expression}</g>`}</g></g></svg></span>`;
}
function dustPortrait(d,settled=false){return dustArt(d.id,stage(d.xp),settled?'story-finished':'',level(d.xp));}
function save(){if(saveBlocked){$('#saveStatus').textContent='기존 기록 보호 중 · 작은 기록을 열어주세요';return;}syncCollection(state);syncRoomMemory(state);state.life.lastSeen=Date.now();try{localStorage.setItem(KEY,JSON.stringify(state));$('#saveStatus').textContent='● 이 브라우저에 저장했어요';return true}catch{$('#saveStatus').textContent='저장 공간을 확인해주세요'}}
const toastCard=$('#toast'),toastClose=$('#toastDismiss');
let toastReturnFocus=null;
function dismissToast(){
 clearTimeout(toastTimer);
 toastCard.classList.remove('show');
 toastClose.tabIndex=-1;
 $('#toastMessage').textContent='';
 if(document.activeElement===toastClose){
  const fallback=$('#modal .close')||$('#settings');
  if(toastReturnFocus?.isConnected&&!toastReturnFocus.closest('[inert]'))toastReturnFocus.focus();
  else fallback?.focus();
 }
 toastClose.inert=true;
}
function resumeToast(){
 clearTimeout(toastTimer);
 if(toastCard.classList.contains('show')&&!toastCard.matches(':hover, :focus-within')){
  toastTimer=setTimeout(dismissToast,2500);
 }
}
function toast(message,kind='notice'){
 toastCard.dataset.kind=kind;
 toastCard.querySelector('.toast-mark').innerHTML=uiIcon(kind);
 if(!toastCard.contains(document.activeElement))toastReturnFocus=document.activeElement;
 $('#toastMessage').textContent=message;
 toastCard.classList.add('show');
 toastClose.inert=false;
 toastClose.tabIndex=0;
 resumeToast();
}
toastClose.onclick=dismissToast;
toastCard.addEventListener('pointerenter',()=>clearTimeout(toastTimer));
toastCard.addEventListener('pointerleave',resumeToast);
toastCard.addEventListener('focusin',()=>clearTimeout(toastTimer));
toastCard.addEventListener('focusout',()=>queueMicrotask(resumeToast));

const tooltip=$('#uiTooltip');
let tooltipTarget=null,tooltipTimer;
function hideTooltip(){
 clearTimeout(tooltipTimer);
 if(tooltipTarget?.getAttribute('aria-describedby')===tooltip.id)tooltipTarget.removeAttribute('aria-describedby');
 tooltipTarget=null;
 tooltip.hidden=true;
}
function showTooltip(target,delay=0){
 if(tooltipTarget===target&&(!tooltip.hidden||delay))return;
 hideTooltip();
 tooltipTarget=target;
 tooltipTimer=setTimeout(()=>{
  if(!target.isConnected)return hideTooltip();
  tooltip.textContent=target.dataset.tooltip;
  tooltip.hidden=false;
  if(!target.hasAttribute('aria-describedby'))target.setAttribute('aria-describedby',tooltip.id);
  const anchor=target.getBoundingClientRect(),size=tooltip.getBoundingClientRect(),gap=8;
  const left=Math.max(gap,Math.min(anchor.left+(anchor.width-size.width)/2,document.documentElement.clientWidth-size.width-gap));
  const top=anchor.top>=size.height+2*gap?anchor.top-size.height-gap:anchor.bottom+gap;
  tooltip.style.left=left+'px';
  tooltip.style.top=top+'px';
 },delay);
}
document.addEventListener('pointerover',e=>{
 const target=e.target.closest?.('[data-tooltip]');
 if(target&&e.pointerType!=='touch')showTooltip(target,350);
});
document.addEventListener('pointerout',e=>{
 if(tooltipTarget?.contains(e.target)&&!tooltipTarget.contains(e.relatedTarget)&&!tooltipTarget.matches(':focus-visible')){
  clearTimeout(tooltipTimer);
  tooltipTimer=setTimeout(hideTooltip,150);
 }
});
tooltip.addEventListener('pointerenter',()=>clearTimeout(tooltipTimer));
tooltip.addEventListener('pointerleave',e=>{
 if(!tooltipTarget?.contains(e.relatedTarget)&&!tooltipTarget?.matches(':focus-visible'))hideTooltip();
});
document.addEventListener('focusin',e=>{
 if(e.target.matches('[data-tooltip]:focus-visible'))showTooltip(e.target);
});
document.addEventListener('focusout',e=>{if(e.target===tooltipTarget)hideTooltip();});
document.addEventListener('pointerdown',hideTooltip);
document.addEventListener('scroll',hideTooltip,true);
window.addEventListener('resize',hideTooltip);
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&!tooltip.hidden){
  hideTooltip();
  e.preventDefault();
  e.stopImmediatePropagation();
 }
},true);
document.addEventListener('keydown',event=>{
 const current=event.target.closest?.('[role="tab"]');
 if(!current||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
 const list=current.closest('[role="tablist"]');
 const tabs=Array.from(list.querySelectorAll('[role="tab"]:not(:disabled)'));
 const index=tabs.indexOf(current);
 const next=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
 event.preventDefault();const target=tabs[next],id=target.id;target.click();document.getElementById(id)?.focus({preventScroll:true});
});
function counts(){return{types:state.collectionBook.discovered.length,total:state.dusts.length,grown:state.dusts.filter(d=>stage(d.xp)===2).length,active:inRoom(state).length,stored:state.dusts.filter(d=>d.stored).length,away:Number(!!state.starTrips?.trip)+state.adventures.length+(state.deskRun?1:0)}}
function heading(tag,title,sub){return `<section class="heading"><div><span class="kicker">${tag}</span><h1>${title}</h1><p>${sub}</p></div></section>`}
let dustPopupUid=null;
function renderRoom(){if(!selected())return renderEmptyRoom();const active=selected(),visible=roomResidents(state);return `<section class="dust-room ${placementMode?(hidePlacementStars?'placement-mode stars-hidden':'placement-mode'):'care-mode'} room-level-${state.roomLevel} room-theme-${currentRoom(state).theme}" style="--room-color:${currentRoom(state).color};--tier-accent:${currentRoom(state).accent};--room-growth:${currentRoom(state).detail};--room-floor:${2+currentRoom(state).detail}px" aria-label="별이 머무는 곳 · 나의 은하계"><div class="planet-landscape" aria-hidden="true"></div><div class="room-playfield">${roomDecor()}${roomOrnament()}${guestButton()}${memoryDecor()}${themeDecorations()}${questGuide()}${roomGestureTools()}${adventureDoor()}<div id="expeditionRack">${partyRack()}</div>${roomFairy()}${windowSpot()}${glowButton()}<div id="dailySparkleDrops" class="daily-sparkle-drops" aria-label="별들이 흘린 반짝이">${dailySparkleButtons()}</div><div class="merge-drop-status" id="mergeDropStatus" role="status" aria-live="polite"></div><span class="room-speck s1">✦</span><span class="room-speck s2">·</span><span class="room-speck s3">✧</span><span class="room-speck s4">·</span>${visible.map((v,i)=>{const saved=state.roomPositions.dust[v.uid],spot=toPlanetScreen(roomSpot(state,v,i)),p=[spot.x,spot.y];return `<button class="room-dust ${lifeClass(v)} ${saved?'positioned':''} ${v.uid===active.uid?'selected':''} ${expeditionParty.has(v.uid)?'expedition-selected':''} ${v.uid===happyUid?'happy':''}" data-dust="${v.uid}" data-room-item="dust" data-room-id="${v.uid}" aria-pressed="${v.uid===active.uid}" aria-expanded="${v.uid===dustPopupUid&&!placementMode}" aria-controls="dustPopup" aria-label="${esc(dustName(v))} ${growthName(level(v.xp))} 선택" style="left:${p[0]}%;top:${p[1]}%;--delay:${-i*1.7}s;--duration:${10+i*1.3}s;--drift:${i%2?-22:22}px;--color:${getDust(v.id).color}"><span class="dust-hit-area" aria-hidden="true"></span><span class="selection-aura" aria-hidden="true"></span><span class="dust-lift">${characterArt(v,journeyComplete(v))}</span>${storyKeepsake(v)}${lifeBubble(v)}<span class="dust-shadow"></span><span class="dust-name">${esc(dustName(v))}</span><span class="hearts" aria-hidden="true">♡</span></button><span class="gold-slot ${saved?'positioned':''}" data-gold-slot="${v.uid}" style="left:${p[0]}%;top:${p[1]}%;--delay:${-i*1.7}s;--duration:${10+i*1.3}s;--drift:${i%2?-22:22}px"></span>`}).join('')}<div id="dustPopup">${!placementMode&&dustPopupUid===active.uid?careDock(active):''}</div></div></section>`}
function glowButton(){
 const hasSpace=hasHomeSpace(state);
 const needsStar=hasSpace && !state.pending;
 const label=state.pending ? '몽글몽글 모이는 중' : '새 별 만나기';
 const hint=hasSpace ? label : label+' · 은하계 자리가 가득 찼어요. 모험 중인 별의 귀환 자리도 포함돼요.';
 return `<button class="birth-glow${needsStar?' needs-star':''}${hasSpace?'':' room-full'}${state.pending?' busy':''}" id="glowTrigger" aria-label="${hint}" title="${hint}"><span class="glow-aura"></span><span class="glow-orbit"></span><span class="glow-glyph">${uiIcon('sparkle')}</span><small>${label}</small></button>`;
}
function mixContent(){const keys=['group','rarity','essence'],selectedCount=keys.filter(k=>selection[k]).length,random=selectedCount===0,d=selectedCount===3?recipe(selection):null,check=checkMix(state,selection),cost=find(RARITIES,selection.rarity)?.cost||0,missing=selectedCount>0&&selectedCount<3,mode=state.pending?.mode|| (random?'random':'recipe');
 const status=state.pending?'작은 빛이 별이 되는 중이에요…':random?`재료 없이 ${DUSTS.length}종 중 한 친구가 랜덤으로 태어나요.`:missing?'남은 재료도 골라주세요. 모두 비우면 랜덤으로 만나요.':d?`태어날 별 · ${d.name} ${check.ok?'재료를 조합해 만나보세요.':'재료가 모자라요.'}`:'이 조합은 아직 비어 있어요. 아래 조합법을 골라주세요.';
 return `<p class="mix-intro">재료를 고르면 그에 맞는 별이,<br>아무것도 넣지 않으면 랜덤한 별이 찾아와요.</p><section class="mix-box popup-mix"><div class="birth-mode ${mode}">${mode==='random'?'✧ 재료 없이 · 랜덤 탄생':'◌ 재료 조합 · 정해진 친구'}</div><div class="recipe-inputs">${[['group',GROUPS,'그룹'],['rarity',RARITIES,'희귀도'],['essence',ESSENCES,'정수']].map(([key,items,label],i)=>`<div class="ingredient ${selection[key]?'filled':''}">${selection[key]?icon(selection[key]):'<span class="ingredient-empty" aria-hidden="true"></span>'}<label for="pick-${key}">${label}</label><div class="select-field"><select id="pick-${key}" data-pick="${key}" ${state.pending?'disabled':''}><option value="" ${!selection[key]?'selected':''}>없음</option>${items.map(x=>`<option value="${x.id}" ${selection[key]===x.id?'selected':''}>${x.name}</option>`).join('')}</select></div>${selection[key]?`<small>보유 ${state.materials[key][selection[key]]} · ${key==='essence'?(cost?'사용 '+cost:'희귀도도 골라주세요'):'사용 1'}</small>`:''}</div>${i<2?'<span class="recipe-plus">+</span>':''}`).join('')}</div><div class="mix-preview ${state.pending?'mixing':''}">${d&&!state.pending?dustArt(d.id,0):'<span class="random-seed"><i></i><b>?</b></span>'}<i class="orbit-dot"></i><i class="orbit-dot o2"></i><i class="orbit-dot o3"></i></div><p id="mixStatus">${status}</p><button class="button primary summon" id="summon" ${check.ok?'':'disabled'}>${state.pending?'작은 별이 태어나는 중…':random?'✧ 랜덤으로 만나기':check.ok?`${d.name} 조합해서 만나기`:'재료 조합을 확인해주세요'}</button><div class="mix-tools"><button class="text-button" id="clearMix" ${state.pending||random?'disabled':''}>재료 비우고 랜덤으로</button><button class="text-button" id="materials">재료 가방 ↗</button></div></section><details class="recipe-drawer"><summary>별 조합법 보기 <small>${DUSTS.length}종</small></summary><p>만난 친구의 조합법은 다시 쓸 수 있어요. 미발견 친구는 작은 단서를 읽어보세요.</p><div class="recipes">${DUSTS.map(d=>`<button class="recipe" ${copies(d.id).length?'data-recipe':'data-detail'}="${d.id}" ${state.pending?'disabled':''}>${dustArt(d.id,copies(d.id).length?0:2,copies(d.id).length?'':'silhouette')}<span><b>${copies(d.id).length?d.name:'아직 모르는 별'}</b><small>${copies(d.id).length?find(GROUPS,d.group).name+' · '+find(RARITIES,d.rarity).name+' · '+find(ESSENCES,d.essence).name:recipeHint(d.id)}</small></span><i>↗</i></button>`).join('')}</div></details>`;
}
function openMix(preset=null){if(!state.pending)selection=preset?{...preset}:{group:'',rarity:'',essence:''};modal('작은 빛에서 태어나는 친구.',`<div id="mixContent">${mixContent()}</div>`);mixDialogOpen=true;$('.modal-card').classList.add('mix-dialog');}
function refreshMix(focusId=null){if(!mixDialogOpen||!$('#mixContent'))return;const recipesOpen=$('.recipe-drawer')?.open;$('#mixContent').innerHTML=mixContent();if(recipesOpen&&$('.recipe-drawer'))$('.recipe-drawer').open=true;if(focusId)$('#'+focusId)?.focus();}
function renderMix(){return renderRoom();}
function renderCollection(){
 const tabs=[['dust','collection','모은 별'],['recipes','recipe','조합 기록',state.collectionBook.discovered.length],['postcards','mail','모험 엽서',state.life.postcards.length+'/150'],['themes','sparkle','테마 수집',state.collectionBook.claimed.length+'/'+THEMES.length]];
 return `<header class="collection-heading"><h1>모은 기록</h1><p>별들과 함께 남긴 발견을 모아요.</p></header><div class="collection-switch collection-four" role="tablist" aria-label="모은 기록">${tabs.map(([id,glyph,label,count])=>`<button id="collection-tab-${id}" role="tab" data-collection-tab="${id}" aria-selected="${collectionTab===id}" aria-controls="collectionPanel" tabindex="${collectionTab===id?0:-1}" class="${collectionTab===id?'active':''}">${uiIcon(glyph)}<span class="tab-label">${label}</span>${id==='dust'?'':`<small>${count}</small>`}</button>`).join('')}</div><section id="collectionPanel" role="tabpanel" tabindex="0" aria-labelledby="collection-tab-${collectionTab}">${collectionTab==='dust'?renderDustCollection():collectionTab==='recipes'?renderRecipeJournal():collectionTab==='themes'?renderThemes():renderPostcards()}</section>`;
}

function renderDustCollection(){
 const c=counts(), grownTypes=new Set(state.dusts.filter(d=>stage(d.xp)===2).map(d=>d.id));
 const filters=[
  ['all','전체',DUSTS.length],
  ['found','발견',c.types+'/'+DUSTS.length],
  ['missing','미발견',DUSTS.length-c.types],
  ['grown','성장',grownTypes.size],
 ];
 return `<div class="collection-filters dust-filters selection-filters" role="group" aria-label="별 도감 필터">${filters.map(([id,name,count])=>`<button type="button" class="filter-choice" aria-controls="dustFilterResults" data-dust-filter="${id}" aria-pressed="${dustFilter===id}"><span>${name}</span><small>${count}</small></button>`).join('')}</div><p class="dust-owned-summary">보유 <b>${c.total}마리</b> · Lv.4 이상 <b>${c.grown}마리</b></p><div id="dustFilterResults">${renderDustFilterResults(grownTypes)}</div>`;
}

function renderDustFilterResults(grownTypes=new Set(state.dusts.filter(d=>stage(d.xp)===2).map(d=>d.id))){
 const list=DUSTS.filter(d=>{
  if(dustFilter==='grown')return grownTypes.has(d.id);
  if(dustFilter==='all')return true;
  return knownDust(state,d.id)===(dustFilter==='found');
 });
 const emptyMessage=dustFilter==='grown'?'아직 아기별까지 자란 별이 없어요.':dustFilter==='missing'?'모든 별을 발견했어요.':'아직 발견한 별이 없어요.';
 return list.length?`<div class="dust-grid">${list.map(d=>{const all=copies(d.id),known=knownDust(state,d.id),xp=Math.max(0,...all.map(x=>x.xp)),s=stage(xp);return `<button class="dust-card ${known?'':'undiscovered'}" data-detail="${d.id}"><span class="card-num">${String(DUSTS.indexOf(d)+1).padStart(2,'0')}</span><span class="card-count">${known?all.length+'마리 · 조합 기록됨':'작은 단서'}</span>${dustArt(d.id,known?s:2,known?'':'silhouette',known?level(xp):5)}<h2>${known?d.name:'아직 모르는 별'}</h2><p>${known?'♡ '+personality(d.id).favorite.name:recipeHint(d.id)}</p></button>`}).join('')}</div>`:`<p class="dust-filter-empty">${emptyMessage}</p>`;
}

function renderStorage(){
 const tabs=[['stars','보유 별'],['furniture','보유 가구']].map(([id,label])=>{
  const active=id===storageTab;
  return `<button id="storage-tab-${id}" role="tab" data-storage-tab="${id}" aria-selected="${active}" aria-controls="storagePanel" tabindex="${active?0:-1}" class="${active?'active':''}">${label}</button>`;
 }).join('');
 return `<div class="collection-tabs" role="tablist" aria-label="보관함 분류">${tabs}</div><section id="storagePanel" role="tabpanel" aria-labelledby="storage-tab-${storageTab}">${storageTab==='stars'?storedStars():ownedFurnitureShelf()}</section>`;
}
function storedStars(){const all=state.dusts.filter(d=>d.stored);return `<div class="storage-note"><span>보관한 별 <b>${all.length}</b> / ${storageCapacity(state)}마리</span><small>꺼내면 이어서 키울 수 있어요.</small></div>${all.length?`<div class="storage-grid">${all.map(d=>{const info=getDust(d.id),num=copies(d.id).findIndex(x=>x.uid===d.uid)+1;return `<article class="storage-card">${dustPortrait(d,journeyComplete(d))}<div><h2>${esc(dustName(d))}${copies(d.id).length>1?' #'+num:''}</h2><p>Lv.${level(d.xp)} · ${growthName(level(d.xp))}</p><span class="storage-story-count">이야기 ${unlockedStories(d)} / 5</span></div><div class="storage-actions"><button class="text-button" data-rename="${d.uid}" aria-label="${esc(dustName(d))} · 별명 짓기" title="별명 짓기">${uiIcon('edit')}</button><button class="text-button" data-shared-story="${d.uid}" aria-label="${esc(dustName(d))} · 함께 쓴 이야기" title="함께 쓴 이야기">${uiIcon('story')}</button><button class="button primary" data-take-out="${d.uid}" aria-label="${esc(dustName(d))} · 꺼내서 키우기" title="꺼내서 키우기">${uiIcon('home')}</button></div></article>`}).join('')}</div>`:`<div class="empty-storage"><span>${uiIcon('storage')}</span><h2>아직 쉬고 있는 별이 없어요.</h2><p>별의 은하계에서 ‘보관하기’를 눌러보세요.<br>모든 성장 기록은 그대로 남아요.</p><button class="button secondary" data-page="room">별의 은하계로 →</button></div>`}`;}
function renderEmptyRoom(){
 const c=counts();
 const action=c.away ? '' : '<button class="button primary" data-open-storage>보관함에서 꺼내기 →</button>';
 return `<section style="--room-color:${currentRoom(state).color}" class="dust-room empty-room ${placementMode?(hidePlacementStars?'placement-mode stars-hidden':'placement-mode'):'care-mode'} room-level-${state.roomLevel} room-theme-${currentRoom(state).theme}" aria-label="별들이 보관함에서 쉬는 빈 은하계"><div class="planet-landscape" aria-hidden="true"></div><div class="room-playfield">${roomDecor()}${roomOrnament()}${guestButton()}${memoryDecor()}${themeDecorations()}${questGuide()}${roomGestureTools()}${adventureDoor()}<div id="expeditionRack">${partyRack()}</div>${roomFairy()}${windowSpot()}${glowButton()}<div id="dailySparkleDrops" class="daily-sparkle-drops" aria-label="별들이 흘린 반짝이">${dailySparkleButtons()}</div>${action?`<div class="empty-room-message">${action}</div>`:''}<div id="dustPopup"></div></div></section>`;}
function archiveDust(uid){const r=storeDust(state,uid);if(!r.ok)return toast(r.message);save();close();render();toast('보관함에서 쉬는 별 · '+dustName(r.dust)+' · 레벨과 이야기는 그대로예요.','storage');}
function bringBack(uid){const r=takeOutDust(state,uid);if(!r.ok)return toast(r.message);save();close();go('room');toast('다시 만난 별 · '+dustName(r.dust)+' · Lv.'+level(r.dust.xp)+'부터 이어서 키워주세요.');}
function openStorage(){storageTab='stars';go('storage');}
function storyList(uid){const d=state.dusts.find(x=>x.uid===uid);if(!d)return;const info=getDust(d.id),count=unlockedStories(d);modal(info.name+'의 우주 이야기',`${dustPortrait(d,journeyComplete(d))}${hasJourney(d)?`<p class="journey-question">${esc(journeyFor(d).question)}</p>`:''}<p>Lv.${level(d.xp)} · 열린 이야기 ${count} / 5<br>관측 주제 · ${esc(STORIES[d.id][0].topic)}</p><div class="story-chapters">${STORIES[d.id].map((story,i)=>{const open=i<count,read=d.readStories.includes(i);return `<button data-chapter="${uid}:${i}" ${open?'':'disabled'} class="${read?'read':''}"><span class="chapter-number">${String(i+1).padStart(2,'0')}</span><span><b>${open?story.title:'아직 잠든 이야기'}</b><small>${open?read?'읽은 이야기':'새로운 이야기':'Lv.'+(i+2)+'에 열려요'}</small></span><i>${uiIcon(open?'arrow':'lock')}</i></button>`}).join('')}</div>${journeyExtra(d)}`);}
function unreadAfterwords(d){return (state.life.afterwords||[]).filter(e=>e.uid===d.uid&&!e.read).length;}
function journeyCue(d){
 const clue=nextStoryClue(state,d);
 const text=clue.action==='book'
  ? unlockedStories(d)?'별 상세에서 열린 이야기를 읽어보세요.':'같은 종류의 별을 합쳐 첫 이야기를 열어보세요.'
  : clue.label;
 return renderStoryCue(text);
}
function renderStoryCue(text){
 const label=esc(text);
 return `<p class="journey-cue"><span>다음 단서</span><strong class="journey-cue-text">${label}<span class="journey-cue-shimmer" aria-hidden="true">${label}</span></strong></p>`;
}
function sharedRecordSummary(d){const sections=sharedRecords(state,d);return `성장 ${d.readStories.length}/5 · 엽서 ${sections[1].entries.filter(e=>e.kind==='postcard').length} · 자리 ${sections[2].entries.length} · 친구 ${sections[3].entries.length}`;}
function sharedStoryEntrance(d,all){
 return `<section class="shared-story-entrance" aria-label="선택한 별의 기록"><header><h3>함께 쓴 이야기</h3>${all.length>1?`<label class="record-copy-label">기록을 볼 별<select id="recordCopy" data-record-copy="${d.id}" aria-label="기록을 볼 별">${all.map((v,i)=>`<option value="${v.uid}" ${v.uid===d.uid?'selected':''}>${esc(dustName(v))} #${i+1} · Lv.${level(v.xp)}</option>`).join('')}</select></label>`:`<small>${esc(dustName(d))}의 기록</small>`}</header><p>${esc(nextStoryClue(state,d).line)}</p><button class="button secondary full" data-shared-story="${d.uid}">함께 쓴 이야기 읽기</button><small>${sharedRecordSummary(d)}</small></section>`;
}
function sharedStoryBook(uid){
 const d=state.dusts.find(x=>x.uid===uid);if(!d)return;
 const sections=sharedRecords(state,d),clue=nextStoryClue(state,d),empty={growth:'아직 열린 성장 이야기가 없어요.',postcards:'아직 도착한 엽서와 여행 이야기가 없어요.',place:'함께 쌓은 자리의 추억이 여기에 남아요.',friends:'친구와 나눈 순간이 여기에 남아요.'};
 modal('함께 쓴 이야기',`<header class="shared-book-profile">${dustPortrait(d,journeyComplete(d))}<div><h3>${esc(dustName(d))}</h3><p>${sharedRecordSummary(d)}</p></div></header><div class="shared-book-clue"><p>${esc(clue.line)}</p>${clue.action==='book'?`<small>${esc(clue.label)}</small>`:`<button class="text-button" data-record-clue="${uid}">다음 단서 · ${esc(clue.label)}</button>`}<small class="optional-story-note">추가 발견은 천천히 해도 괜찮아요. 성장 이야기는 기존 레벨대로 열려요.</small></div><div class="shared-record-sections">${sections.map(section=>`<section class="shared-record-section" aria-labelledby="record-heading-${section.id}"><header><h3 id="record-heading-${section.id}">${section.title}</h3><small>${section.entries.filter(e=>e.available).length}편</small></header>${section.entries.length?section.entries.map(e=>e.available?`<button class="shared-record-row ${e.read?'':'is-unread'}" data-shared-entry="${uid}|${e.key}"><span><b>${esc(e.title)}</b><small>${esc(e.label)}</small></span>${uiIcon('story')}</button>`:`<div class="shared-record-row is-locked"><span><b>${esc(e.title)}</b><small>${esc(e.label)}</small></span>${uiIcon('lock')}</div>`).join(''):`<p class="shared-record-empty">${empty[section.id]}</p>`}</section>`).join('')}</div><button class="text-button shared-detail-return" data-detail="${d.id}" data-detail-uid="${uid}">별 상세보기</button>`);
 $('.modal-card').classList.add('shared-story-dialog');
}
function sharedStoryEntry(uid,key){
 const d=state.dusts.find(x=>x.uid===uid);if(!d)return;
 const entry=readableRecords(state,d).find(e=>e.key===key);if(!entry)return;
 let firstRead=false;
 if(entry.kind==='growth'){firstRead=!entry.read;const result=readStory(state,uid,entry.index);if(!result.ok)return toast(result.message);observeLife(state);save();render();}
 else if(entry.kind==='afterword'){const result=readAfterword(state,uid,entry.afterwordKind);if(!result.ok)return;firstRead=result.firstRead;save();render();}
 const sequence=readableRecords(state,d),index=sequence.findIndex(e=>e.key===key),current=sequence[index],prev=sequence[index-1],next=sequence[index+1];
 modal(entry.title,`<div class="shared-reader-context"><span>${esc(dustName(d))} · 함께 쓴 이야기</span><small>${index+1} / ${sequence.length}</small></div>${entry.shared?'<p class="shared-postcard-note">같은 종류의 별이 함께 모은 엽서예요.</p>':''}${storyParagraph(entry.body,firstRead,'story-body')}<div class="story-reader-footer">${entry.observation?observationNote(entry.observation,entry.source[1],true):''}${entry.change?`<aside class="afterword-change"><b>은하계에 남은 변화</b><p>${esc(entry.change)}</p></aside>`:''}<nav class="story-page-nav" aria-label="함께 쓴 기록 넘기기"><button class="button secondary" ${prev?`data-shared-entry="${uid}|${prev.key}"`:'disabled'}>이전 기록</button><button class="text-button" data-shared-story="${uid}">전체 기록</button><button class="button secondary" ${next?`data-shared-entry="${uid}|${next.key}"`:'disabled'}>다음 기록</button></nav><small class="shared-reader-label">${esc(current.label)}</small></div>`);
 $('.modal-card').classList.add('shared-record-reader');
}
function followRecordClue(uid){const d=state.dusts.find(x=>x.uid===uid);if(!d)return;const clue=nextStoryClue(state,d);if(clue.action==='read')sharedStoryEntry(uid,clue.key);else if(clue.action==='friend')placeStoryFriend(uid);else if(clue.action==='favorite'){close();placeFavorite(uid);}else if(clue.action==='route')openStoryRoute(uid);else sharedStoryBook(uid);}
function journeyExtra(d,compact=false){
 if(!hasJourney(d))return '';
 const p=personality(d.id),profile=aftermathFor(d),started=d.readStories.includes(0),entries=state.life.afterwords.filter(e=>e.uid===d.uid);
 const hints={favorite:`${p.favorite.name} 가까이에 놓기 · 설치물 레벨 무관`,route:`${STORY_ROUTES[profile.route]}에서 돌아오기`,friend:'다른 종류의 별과 가까이 지내기',complete:'다섯 이야기를 모두 읽기'};
 const canPlace=started&&!d.stored&&!isAway(state,d.uid);
 const content=`<section class="journey-afterword afterword-collection" aria-label="함께 남긴 후일담"><header><h3>함께 남긴 후일담</h3><small>열린 장면 ${entries.length} / 4</small></header>${!started?'<p>첫 이야기를 읽으면 플레이한 일이 작은 후일담으로 이어져요.</p>':''}<div class="afterword-rows">${AFTERWORD_KINDS.map(kind=>{
  const e=afterwordRecord(state,d,kind);
  return e?`<button class="afterword-row ${e.read?'is-read':'is-new'}" data-afterword="${d.uid}:${kind}"><span><b>${AFTERWORD_LABELS[kind]}</b><small>${esc(afterwordScene(d,e,p.favorite).title)}</small></span><em>${e.read?'다시 읽기':'새 장면'}</em></button>`:`<div class="afterword-row is-locked"><span><b>${AFTERWORD_LABELS[kind]}</b><small>${esc(started?hints[kind]:'첫 이야기 뒤에 이어져요')}</small></span>${uiIcon('lock')}${canPlace&&kind==='favorite'?`<button class="text-button" data-cozy-place="${d.uid}">${state.decorations.includes(p.favorite.id)?'곁에 놓기':'설치물 찾기'}</button>`:canPlace&&kind==='route'?`<button class="text-button" data-story-route="${d.uid}">${routeUnlocked(state,profile.route)?'항로 보기':'은하계 Lv.'+routeUnlockLevel(profile.route)}</button>`:canPlace&&kind==='friend'?`<button class="text-button" data-story-friend="${d.uid}">곁에 놓기</button>`:''}</div>`;
 }).join('')}</div><p class="afterword-footnote">읽은 후일담은 은하계의 말과 작은 반응으로 남아요.</p></section>`;
 return compact?`<details class="journey-afterword afterword-disclosure"><summary>함께 남긴 후일담 <small>${entries.length} / 4${unreadAfterwords(d)?` · 새 장면 ${unreadAfterwords(d)}`:''}</small></summary>${content}</details>`:content;
}
function afterwordBook(uid,kind='favorite'){
 const r=readAfterword(state,uid,kind);if(!r.ok)return;
 const d=r.dust,p=personality(d.id),scene=afterwordScene(d,r.entry,p.favorite);save();render();
 modal(scene.title,`<div class="story-cover field-cover">${dustPortrait(d,journeyComplete(d))}<span>${esc(getDust(d.id).name)}와 함께 남긴 후일담</span></div>${storyParagraph(scene.body,r.firstRead,'story-body')}<aside class="afterword-change"><b>은하계에 남은 변화</b><p>${esc(scene.change)}</p></aside><div class="afterword-actions"><button class="button secondary" data-shared-story="${uid}">함께 쓴 이야기</button><button class="button primary" data-afterword-room="${uid}">은하계에서 만나기</button></div>`);
}
function placeStoryFriend(uid){
 const d=roomResidents(state).find(x=>x.uid===uid),other=d&&roomResidents(state).find(x=>x.id!==d.id);
 if(!d)return;if(!other)return toast('다른 종류의 친구가 은하계에 돌아오면 가까이 놓아주세요.');
 const at=roomSpot(state,other),x=at.x>82?at.x-9:at.x+9;
 if(moveRoomItem(state,'dust',uid,x,at.y).ok){observeLife(state);save();close();go('room');toast('서로의 다른 속도를 알아갈 자리에 놓았어요.');}
}
function openStoryRoute(uid){const d=state.dusts.find(x=>x.uid===uid);if(!d)return;const route=aftermathFor(d).route;if(!routeUnlocked(state,route))return toast('은하계 Lv.'+routeUnlockLevel(route)+'에서 열리는 항로예요.');prepareCollectionAdventure(route,uid);}
function returnFromAfterword(uid){const d=state.dusts.find(x=>x.uid===uid);close();go('room');if(d&&!d.stored&&!isAway(state,uid))focusRoomDust(uid,true);else toast('후일담은 간직했어요. 별이 은하계에 돌아오면 변화를 만날 수 있어요.','story');}
function storyNotePanel(title,content,open=false){
 return `<details class="observation-note observation-disclosure"${open?' open':''}><summary>${esc(title)}</summary><div class="observation-content">${content}</div></details>`;
}
function observationNote(fact,source,collapsible=false){
 const content=`${storyParagraph(fact,collapsible,"observation-copy")}<a href="${esc(source)}" target="_blank" rel="noopener noreferrer">관측 자료 읽기 ↗</a>`;
 return collapsible
  ? storyNotePanel('루미의 관측 노트',content)
  : `<aside class="observation-note"><b>루미의 관측 노트</b>${content}</aside>`;
}
function fieldPage(entry,firstRead=false){if(!entry)return '';const [title,story,fact,source]=entry;return `<section class="field-page"><h3>${esc(title)}</h3>${storyParagraph(story,firstRead)}${observationNote(fact,source,true)}</section>`; }
function storyBook(uid,index=null){const d=state.dusts.find(x=>x.uid===uid);if(!d)return;const count=unlockedStories(d);if(!count)return storyList(uid);if(index===null)index=Array.from({length:count},(_,i)=>i).find(i=>!d.readStories.includes(i))??count-1;const firstRead=!d.readStories.includes(index),result=readStory(state,uid,index);if(!result.ok)return toast(result.message);observeLife(state);save();render();modal(result.story.title,`<div class="story-cover field-cover">${dustPortrait(d,journeyComplete(d))}<span>${esc(result.story.topic)} · ${index+1} / 5</span></div>${storyParagraph(result.story.body,firstRead,'story-body')}<div class="story-reader-footer">${result.story.observation?observationNote(result.story.observation,result.story.source[1],true):`<a class="story-source" aria-label="관측 자료" href="${esc(result.story.source[1])}" target="_blank" rel="noopener noreferrer">${esc(result.story.source[0])} ↗</a>`}<nav class="story-page-nav" aria-label="이야기 페이지">
  <button class="button secondary" data-chapter="${uid}:${index-1}" ${index===0?'disabled':''}><span aria-hidden="true">‹</span> 이전</button>
  <button class="text-button" data-shared-story="${uid}">전체 기록</button>
  <button class="button secondary story-next" data-chapter="${uid}:${index+1}" ${index+1>=count?'disabled':''}>다음 <span aria-hidden="true">›</span></button>
 </nav>${index+1>=count&&count<5?`<p class="next-story-hint">다음 이야기는 Lv.${count+2}에 열려요.</p>`:'<p class="next-story-hint">작은 이야기는 언제든 다시 읽을 수 있어요.</p>'}${journeyExtra(d,true)}</div>`);}
let roomDrag=null,moveReady=null,suppressRoomClickUntil=0;
let suppressDustClickUntil=0;
function playPetReaction(button,dust){
 const reaction=petReaction(dust.id);
 if(!reaction)return false;
 const art=button.querySelector('.dust-lift');
 if(art && !art.dataset.petMotion){
  const face={
   blush:'<g opacity=".35"><ellipse cx="34" cy="54" rx="5" ry="3"/><ellipse cx="66" cy="54" rx="5" ry="3"/></g><path d="M38 48h4m16 0h4m-16 8q4 4 8 0"/>',
   sleep:'<path class="pet-drowsy" d="M37 48q4-3 8 0m10 0q4-3 8 0"/><path class="pet-sleepy" d="M37 47q4 4 8 0m10 0q4 4 8 0"/><path d="M48 56q2 2 4 0"/>',
   smile:'<path d="M37 48q4-5 8 0m10 0q4-5 8 0m-18 6h10q-5 10-10 0Z"/>',
  }[reaction.face];
  if(stage(dust.xp)===2)art.insertAdjacentHTML('beforeend',`<svg class="pet-expression" viewBox="0 0 100 100" aria-hidden="true" style="color:${getDust(dust.id).face}"><g fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">${face}</g></svg>`);
  art.dataset.petMotion=reaction.motion;
  setTimeout(()=>{
   art.querySelector('.pet-expression')?.remove();
   delete art.dataset.petMotion;
  },1050);
 }
 return rememberPetReaction(state,dust.id);
}
function render(){if(dustPopupUid!==null&&(page!=='room'||placementMode||selected()?.uid!==dustPopupUid))hideDustPopup();if(page==='room'&&!saveBlocked&&dropDailySparkles(state,Date.now(),d=>roomSpot(state,d)).length)save();deskScene?.dispose();deskScene=null;cancelRoomInteraction();if(page==='explore'&&!state.deskRun)page='room';document.documentElement.classList.toggle('desk-open',page==='explore');document.documentElement.classList.toggle('room-open',page==='room');const c=counts();renderHeader();$('#sparkles').textContent=state.sparkles;$('#gold').textContent=state.gold;$('.gold-wallet').setAttribute('aria-label',`골드 ${state.gold} · 상점 열기`);$('#collectionCount').textContent=c.types;$('#storageCount').textContent=c.stored;$('#main').innerHTML=page==='explore'?renderDesk():page==='room'?renderRoom():page==='mix'?renderMix():page==='shop'?renderShop():page==='storage'?renderStorage():renderCollection();document.querySelectorAll('.navigation button').forEach(button=>{const active=button.dataset.page===page;button.classList.toggle('active',active);if(active)button.setAttribute('aria-current','page');else button.removeAttribute('aria-current');});tick(false);if(page==='explore')attachDesk();}
function refreshGame(){
 if(saveBlocked||save())window.location.reload();
 else toast('기록을 저장할 수 없어 새로고침을 멈췄어요.');
}
let refreshPull=null;
function endRefreshPull(){
 refreshPull?.feedback?.remove();
 refreshPull=null;
}
function canPullRefresh(){
 return page==='room'&&!placementMode&&!$('#dustPopup .care-dock')&&$('#modal').classList.contains('hidden');
}
function pullDistance(e){
 const down=e.clientY-refreshPull.y;
 return down>Math.abs(e.clientX-refreshPull.x)*1.5?down:0;
}
document.addEventListener('pointerdown',e=>{
 if(e.pointerType!=='touch')return;
 if(!e.isPrimary){endRefreshPull();return;}
 if(!matchMedia('(max-width: 700px)').matches||!canPullRefresh())return;
 if(!e.target.closest('.dust-room, .topbar')||
    e.target.closest('button, a, [data-room-item], #dustPopup'))return;
 refreshPull={id:e.pointerId,x:e.clientX,y:e.clientY,feedback:null};
});
document.addEventListener('pointermove',e=>{
 if(refreshPull?.id!==e.pointerId)return;
 if(!canPullRefresh()){endRefreshPull();return;}
 const distance=pullDistance(e);
 if(distance<28){refreshPull.feedback?.remove();refreshPull.feedback=null;return;}
 if(!refreshPull.feedback){
  const feedback=document.createElement('div');
  feedback.className='pull-refresh-feedback';
  feedback.setAttribute('aria-hidden','true');
  $('.dust-room').append(feedback);
  refreshPull.feedback=feedback;
 }
 refreshPull.feedback.textContent=distance>=80?'놓으면 새로고침':'아래로 당겨 새로고침';
});
document.addEventListener('pointerup',e=>{
 if(refreshPull?.id!==e.pointerId)return;
 const refresh=canPullRefresh()&&pullDistance(e)>=80;
 endRefreshPull();
 if(refresh){e.preventDefault();refreshGame();}
});
document.addEventListener('pointercancel',e=>{
 if(refreshPull?.id===e.pointerId)endRefreshPull();
});
let navigationArrival;
function animateNavigation(button){
 navigationArrival?.cancel();
 const nav=button.closest('.navigation');
 nav.querySelector('.nav-drops')?.remove();
 if(document.documentElement.matches('.reduce-motion, .simple-effects')||
    matchMedia('(prefers-reduced-motion: reduce)').matches)return;

 const selection=nav.querySelector('.nav-selection');
 navigationArrival=selection?.animate?.([
  {scale:'1'},
  {scale:'1.08 .91',offset:.48},
  {scale:'.98 1.04',offset:.75},
  {scale:'1'},
 ],{duration:480,easing:'ease-out'});

 const drops=document.createElement('span');
 drops.className='nav-drops';
 drops.setAttribute('aria-hidden','true');
 // Start just outside the pill and ease the droplets back into its center.
 const radiusX=button.clientWidth/2+8;
 const radiusY=button.clientHeight/2+7;
 for(let index=0;index<8;index++){
  const angle=(index+.4)*Math.PI/4;
  const drop=document.createElement('i');
  drop.style.setProperty('--drop-x',Math.round(Math.cos(angle)*radiusX)+'px');
  drop.style.setProperty('--drop-y',Math.round(Math.sin(angle)*radiusY)+'px');
  drop.style.setProperty('--drop-size',3+(index%3)*2+'px');
  drop.style.animationDelay=index%3*36+'ms';
  drops.append(drop);
 }
 button.append(drops);
 setTimeout(()=>drops.remove(),620);
}
function go(next){endRefreshPull();hideDustPopup();cancelRoomInteraction();placementMode=false;if(next==='mix')return openMix();close();page=next;render();window.scrollTo(0,0)}
const storyEffects=connectStoryEffects($('#modal'));
function modal(title,html,after){storyEffects.reset();cancelRoomInteraction();roomDialogOpen=false;adventureDialogOpen=false;mixDialogOpen=false;hideTooltip();if($('#modal').classList.contains('hidden'))lastFocus=document.activeElement;$('#modal').innerHTML=`<div class="modal-card" tabindex="0"><header class="modal-heading"><div><h2 id="modalTitle">${title}</h2></div><button class="close" aria-label="닫기">${uiIcon('close')}</button></header><div class="modal-body">${html}</div></div>`;$('#modal').classList.remove('hidden');document.body.style.overflow='hidden';document.body.classList.add('modal-open');$('.app-shell').inert=true;$('.close').onclick=close;$('#modal').onclick=e=>{if(e.target===$('#modal'))close()};$('.close').focus({preventScroll:true});after?.();storyEffects.refresh()}
function close(){storyEffects.reset();const wasOpen=!$('#modal').classList.contains('hidden');if(introOpen){introOpen=false;userPrefs.introSeen=true;persistPreferences();}roomDialogOpen=false;adventureDialogOpen=false;mixDialogOpen=false;$('#modal').classList.add('hidden');$('#modal').innerHTML='';document.body.style.overflow='';document.body.classList.remove('modal-open');$('.app-shell').inert=false;if(wasOpen){
 const opener=lastFocus?.isConnected?lastFocus:lastFocus?.id?document.getElementById(lastFocus.id):null;
 lastFocus=null;
 if(opener?.matches('a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),summary,[tabindex]')&&opener.getClientRects().length)opener.focus({preventScroll:true});
 else $('.navigation .active')?.focus({preventScroll:true});
 }}
function makeHappy(uid){happyUid=uid;clearTimeout(happyTimer);render();happyTimer=setTimeout(()=>{happyUid=null;$('.room-dust.happy')?.classList.remove('happy')},1800)}
function openMerge(uid){const d=state.dusts.find(d=>d.uid===uid);if(!d||d.stored||isAway(state,uid))return toast('은하계에 있는 별을 골라주세요.');const matches=mergeCandidates(state,uid),info=getDust(d.id);modal('온기를 모아, 한 뼘 더.',`<div class="merge-intro">${dustPortrait(d,journeyComplete(d))}<h3>${esc(dustName(d))} · Lv.${level(d.xp)}</h3><p>같은 종류 두 마리를 합치면 더 높은 쪽보다 한 레벨 올라요.<br>지금 고른 친구의 별명과 자리는 그대로 남아요.</p></div>${matches.length?`<h3 class="merge-list-title">함께 합칠 친구를 골라주세요</h3><div class="merge-options">${matches.map(x=>`<button class="merge-option" data-merge-preview="${uid}:${x.uid}">${dustPortrait(x)}<span><b>${esc(dustName(x))} · Lv.${level(x.xp)}</b><small>별 #${x.uid} · 이야기 ${x.readStories.length}편 읽음</small></span><i>선택 →</i></button>`).join('')}</div>`:`<p class="merge-empty">은하계에 같은 종류의 ${info.name} 친구가 한 마리 더 필요해요.<br>보관함에서 꺼내거나, 작은 빛에서 같은 친구를 만나보세요.<br>모험 중인 친구는 돌아온 뒤 합칠 수 있어요.</p><button class="button primary full" data-recipe="${d.id}">이 친구의 탄생 재료 고르기 →</button><button class="text-button" data-page="storage">보관함 살펴보기 →</button>`}<p class="merge-footnote">합치면 두 마리가 한 마리가 돼요. 골드·반짝이 비용은 없어요.</p>`);}
function previewMerge(uid,otherUid){
 const d=state.dusts.find(d=>d.uid===uid),other=mergeCandidates(state,uid).find(x=>x.uid===otherUid);
 if(!other)return openMerge(uid);
 modal('이 두 친구를 합칠까요?',`<div class="merge-confirm">
  <div class="merge-preview">
   <div>${dustPortrait(d,journeyComplete(d))}<b>${esc(dustName(d))}</b><small>#${uid} · Lv.${level(d.xp)}</small><small>남을 친구</small></div>
   <span aria-hidden="true">+</span>
   <div>${dustPortrait(other)}<b>${esc(dustName(other))}</b><small>#${otherUid} · Lv.${level(other.xp)}</small><small>합쳐질 친구</small></div>
  </div>
  <div class="merge-result-preview"><b>${esc(dustName(d))} Lv.${mergeResultLevel(d,other)} 한 마리</b>
   <p>#${uid}가 자라고 #${otherUid}는 합쳐져요.<br>읽은 이야기는 모두 남고, 쌓인 골드는 받아요.<br>별명과 위치는 #${uid}의 기록을 사용해요.</p>
  </div>
  <div class="merge-actions">
   <button class="button primary full" data-confirm-merge="${uid}:${otherUid}">합치기</button>
   <button class="button secondary full" data-open-merge="${uid}">다시 고르기</button>
  </div>
 </div>`);
}
function confirmMerge(uid,otherUid){
 const r=mergeDust(state,uid,otherUid);
 if(!r.ok){toast(r.message);return openMerge(uid);}
 sounds.play('birth');save();render();makeHappy(uid);
 const chapter=STORIES[r.dust.id][r.chapter];
 modal('Lv.'+level(r.dust.xp)+' · 새 이야기가 열렸어요.',`<div class="merge-complete">
  <div class="merge-success">${dustPortrait(r.dust,journeyComplete(r.dust))}<span class="merge-spark" aria-hidden="true">✦</span></div>
  <h3>${esc(chapter.title)}</h3>
  ${r.gold||r.bonus?`<p>${r.gold?'쌓여 있던 '+r.gold+' 골드를 받았어요.':''}${r.gold&&r.bonus?'<br>':''}${r.bonus?'러그의 선물 · 반짝이 +'+r.bonus:''}</p>`:''}
  <div class="merge-actions">
   <button class="button primary full" data-chapter="${uid}:${r.chapter}">새 이야기 읽기 →</button>
   <button class="text-button" id="readLater">나중에 읽을게요</button>
  </div>
 </div>`,()=>$('#readLater').onclick=close);
}


function showMaterials(){modal('작은 재료 가방',`<p>조합할 때 그룹 1개 + 희귀도 1개 + 정수를 써요.<br>별을 모험에 보내면 재료를 모아 돌아와요.</p>${[['group',GROUPS,'그룹'],['rarity',RARITIES,'희귀도'],['essence',ESSENCES,'정수']].map(([key,items,label])=>`<div class="material-set"><h3>${label}</h3><div>${items.map(x=>`<span>${icon(x.id)}${x.name}<b>${state.materials[key][x.id]}</b></span>`).join('')}</div></div>`).join('')}<button class="button secondary full" data-shop-materials>골드로 재료 사기 ↗</button><button class="button primary full" data-open-adventure>작은 모험으로 재료 모으기 ↗</button><button class="text-button return-mix" id="returnMix">조합 팝업으로 돌아가기 ↗</button>`,()=>{$('#returnMix').onclick=()=>openMix(selection)})}
function detail(id,uid=null){const d=getDust(id),found=knownDust(state,id),all=copies(id),recordStar=all.find(v=>v.uid===uid)||all.find(v=>v.uid===state.selectedUid)||all[0],xp=Math.max(0,...all.map(x=>x.xp)),max=all.length?stage(xp):-1;modal(found?d.name:'아직 만나지 못했어요.',`${dustArt(id,found?Math.max(0,max):2,found?'':'silhouette',found?level(xp):5)}<div class="detail-tags"><span>${find(GROUPS,d.group).name}</span><span>${find(RARITIES,d.rarity).name}</span><span>보유 ${all.length}마리</span></div><p>${found?d.story:recipeHint(id)}</p>${found?preferenceDetails(id,roomResidents(state).find(v=>v.uid===recordStar?.uid&&v.id===id)):'<span class="hint-caption">단서에서 그룹 · 희귀도 · 정수를 떠올려보세요.</span>'}${recordStar?sharedStoryEntrance(recordStar,all):''}${knownDust(state,id)?recipeRecord(getDust(id)):`<div class="detail-collect-target"><button class="button primary full" data-collect-target="${id}">이 친구를 다음 수집 목표로 →</button><p>정수 단서에 맞는 재료는 ${find(QUESTS,essenceRoute(d.essence)).name}에서 모을 수 있어요.</p></div>`}<div class="growth-pair growth-preview" aria-label="성장 단계">${STAGES.map((name,i)=>{
 const rank=i+1, unlocked=found&&all.length>0&&level(xp)>=rank;
 return `<div class="${unlocked?'':'unseen'}">${dustArt(id,stage(i*2),found?'':'silhouette',rank)}<span>${name}</span><small>Lv.${rank}${rank===5?'+':''}</small></div>`;
}).join('')}</div>${all.length?`<div class="copies">${all.map((v,i)=>`<div class="copy-row"><button data-copy="${v.uid}"><span style="background:${d.color}"></span>${esc(dustName(v))}${all.length>1?' #'+(i+1):''}<small>Lv.${level(v.xp)} · ${v.stored?'보관 중':isAway(state,v.uid)?'모험 중':growthName(level(v.xp))}</small></button><button class="copy-story" data-rename="${v.uid}" aria-label="${esc(dustName(v))} 별명 짓기">${uiIcon('edit')}</button><button class="copy-story" data-shared-story="${v.uid}" aria-label="${esc(dustName(v))} ${i+1} 함께 쓴 이야기">${uiIcon('story')}</button><button class="copy-store" ${v.stored?'data-take-out':'data-store'}="${v.uid}">${v.stored?'꺼내기':'보관'}</button></div>`).join('')}</div>`:''}<button class="button primary full" id="detailMix">${found?'같은 별 한 마리 더':'단서로 직접 조합해보기'} →</button>`,()=>$('#detailMix').onclick=()=>{close();openMix(found?{group:d.group,rarity:d.rarity,essence:d.essence}:null)})}
function tick(finish=true){
 updateGoldUI();updateGoalUI();updateAdventureUI();
 const trip=state.starTrips?.trip,clock=$('#tripClock');
 if(trip){const seconds=Math.max(0,Math.ceil(((trip.end??0)-Date.now())/1000));
 const door=$('#adventureDoorStatus');if(door)door.textContent=seconds?'탐험 중 · '+seconds+'초':'돌아온 별 맞이하기';
 if(clock){if(seconds){clock.textContent=seconds+'초 뒤 돌아와요';clock.previousElementSibling.value=tripSeconds[Math.floor(trip.q/2)]-seconds;}else openTrips();}}
 if(finish&&!document.hidden)tickLife();
 if(!finish||page==='explore'||!state.pending)return;
 const result=finishMix(state);
 if(!result)return;
 sounds.play('birth');save();render();
 welcomeNewStar(result);
}
function welcomeNewStar({dust,isNew,mode}){
 const info=getDust(dust.id),goal=nextGoal(state);
 const preparing=goal.id==='story';
 modal((isNew?'안녕, ':'반가워, ')+info.name+(isNew?'!':'.'),
  `<div class="star-greeting">${dustArt(info.id,0)}<p>“${esc(isNew?firstGreeting(info):info.quote)}”</p></div`
  +`<span class="new-badge">${mode==='random'?'빛에서 우연히 만났어요':'재료 조합으로 만났어요'} · ${isNew?'새로운 종류 발견':'보유 '+copies(info.id).length+'마리'}</span>
  <button class="button primary full" id="welcome">${preparing?'첫 이야기 준비하기':dust.stored?'보관함에서 만나기':'우리 은하계로 데려가기'}</button>
  ${dust.stored?'<p>은하계가 가득 차서 보관함에서 쉬고 있어요.</p>':''}`,()=>{
   $('#welcome').onclick=()=>{
    if(preparing)return goal.action==='story'?followGoal():prepareFirstStory(dust.uid);
    go(dust.stored?'storage':'room');
   };
  });
}

function guide(){modal('별은 이렇게 자라요.',`<div class="guide-list"><p><b>◌ + ◌ 별 합치기</b>같은 종류의 별을 길게 눌러 다른 친구 위에 놓으면 합쳐져요.<br>빛나는 테두리와 ‘놓으면 레벨업’ 표시를 확인하세요. 겹쳐 놓은 대상의 별명·자리를 유지해요.<br>별을 선택한 뒤 ‘별 합치기’에서 함께할 친구와 결과를 확인해요.<br>쓰다듬기는 반짝이를 모으는 행동이며 레벨을 올리지 않아요.</p><p><b>♡ 별의 취향과 작은 부탁</b>좋아하는 설치물 가까이에 놓으면 특별한 반응을 보여요.<br>설치물을 Lv.3까지 키우고 곁에 두면 작은 추억이 열려요.<br>부탁은 한국 시간 매일 바뀌고, 들어주면 반짝이 3개를 받아요.</p><p><b>▤ 생활 수첩</b>모험에서 돌아오면 성격이 담긴 엽서를 가져와요.<br>같은 종류·장소의 엽서는 한 장씩, 총 150장을 모아요.<br>친구들을 가까이 두면 첫 만남도 기록돼요.<br>접속하지 않은 동안의 기록은 배치와 취향으로 엮은 작은 이야기예요.</p><p><b>↔ 별과 설치물 옮기기</b>몸이나 설치물을 잠깐(약 0.7초) 가만히 누른 뒤 테두리가 나타나면 끌어주세요.<br>원하는 곳에 놓으면 위치가 저장돼요.<br>가만히 누르다 손을 떼면 이동은 취소돼요.<br>‘배치하기’에서는 기다리지 않고 끌 수 있어요.<br>키보드는 선택 후 Alt + 방향키로 옮길 수 있어요.</p><p><b>◉ 별이 모아주는 골드</b>별마다 기본 20~46초에 한 번 골드가 준비돼요.<br>머리 위 골드를 눌러 받아요.<br>상점에서 요정 모아를 데려오면 은하계에 찾아와요.<br>은하계의 모아를 누르거나 상점에서 한 번에 받을 수 있어요.<br>접속 중이든 쉬는 중이든, 별마다 최대 30분의 완성된 생산분을 보관해요.<br>가득 차면 생산이 멈추고, 받아야 다시 모여요.<br>보관함·모험 중에는 생산이 멈추며 이미 모인 골드는 유지돼요.<br>자세한 수치는 ‘성장과 골드 안내’에서 확인할 수 있어요.</p><p><b>⌂ 방과 작은 설치물</b>반짝이로 은하계를 업그레이드하면 보상과 방·보관함 자리가 늘어요.<br>은하계 이름을 누르면 다음 은하계와 이야기를 볼 수 있어요.<br>별빛 임무에서 설치물을 받아 은하계에 놓으면 효과가 적용돼요.<br>설치물은 Lv.10까지 자라고 단계마다 이야기가 열려요.<br>넣어둔 설치물은 효과가 멈추고 다시 무료로 놓을 수 있어요.<br>재료도 골드로 살 수 있어요.</p><p><b>✧ 반짝이 쓰기</b>쓰다듬어서 모은 반짝이는 재료 구매, 은하계 확장, 요정 구매에 써요.</p><p><b>▤ 레벨마다 열리는 이야기</b>같은 종류 두 마리를 합치면 더 높은 쪽보다 한 레벨 올라요.<br>Lv.2부터 Lv.6까지 한 편씩, 총 5편을 읽을 수 있어요.</p><p><b>◌ 잠시 보관하기</b>방의 ‘보관하기’로 쉬게 해주세요.<br>하단 ‘보관함’에서 꺼내면 레벨과 이야기가 이어져요.</p><p><b>♡ 살짝 쓰다듬기</b>별을 눌러 하트 버튼으로 쓰다듬으면 반짝이를 받아요. 별을 끌면 위치를 옮겨요.</p><p><b>+ 새로운 별 만나기</b>은하계의 빛나는 곳을 눌러 팝업을 열어요.<br>세 재료를 조합하면 정해진 별, 모두 비우면 랜덤한 별이 태어나요.<br>같은 별이 와도 각각 따로 자라요.</p><p><b>⚑ 작은 모험</b>모험 관리인 루미를 누르면 별에게 맞는 목적지와 임무를 무작위로 만나요.<br>별을 길게 눌러 루미 앞으로 옮기고 출발을 확인하면 모험을 떠나요.<br>루미를 다시 누르면 모험 소식과 돌아온 선물을 확인해요.<br>모험 중에는 돌보기·보관·골드 생산을 잠시 쉬어요.<br>창을 닫아도 모험은 계속되고 보상은 한 번만 받을 수 있어요.</p></div><button class="button primary full" id="guideDone">별 보러 가기</button><button class="text-button return-mix" id="guideBack">작은 기록으로 돌아가기</button>`,()=>{$('#guideDone').onclick=close;$('#guideBack').onclick=settings;})}
function settingsSwitch(id,label,description,checked){
 return `<label class="setting-switch"><span><span id="${id}Label">${label}</span><small id="${id}Description">${description}</small></span><span class="switch-control"><input id="${id}" type="checkbox" role="switch" aria-labelledby="${id}Label" aria-describedby="${id}Description" ${checked?'checked':''}><span class="switch-track" aria-hidden="true"></span></span></label>`;
}
function furnitureEffectsGuide(){
 return `<details class="player-options furniture-effects-guide"><summary>설치물 효과와 중첩 규칙 보기</summary><p>같은 설치물은 한 개씩, 다른 설치물 효과는 함께 적용돼요. 골드는 설치물에만 사용해요. 하루 반짝이 수량은 생성할 때 정해져요. 유리병은 은하계를 보는 동안만 자동으로 주워요. 새 엽서와 오늘 첫 수확 보상은 한 번만 받아요.</p>${economyTable(['설치물','Lv.1','Lv.10'],FURNITURE.map(f=>[f.name,furnitureEffect({...state,ownedFurniture:[f.id],furnitureLevels:{[f.id]:1}},f.id),furnitureEffect({...state,ownedFurniture:[f.id],furnitureLevels:{[f.id]:10}},f.id)]))}</details>`;
}
function settings(){modal('작은 기록과 설정',`<p class="settings-note">${counts().types}종 · ${state.dusts.length}마리와 함께하고 있어요.<br>기록은 이 브라우저에 자동 저장돼요. 다른 기기·주소로 옮기기 전에는 내보내주세요.</p>${saveBlocked?'<p class="save-error">기존 기록을 읽지 못해 덮어쓰기를 멈췄어요. 원본을 먼저 내보내주세요.</p>':''}<button class="record-help" data-refresh-game><span>${uiIcon('reload')}</span><b>게임 새로고침</b></button><button class="record-help" data-quick-start><span>${uiIcon('heart')}</span><b>처음 안내 다시 보기</b><i>${uiIcon('arrow')}</i></button><details class="player-options"><summary>소리와 화면 효과</summary>${settingsSwitch('soundEnabled','효과음 켜기','음악 없이 작은 반응 소리만 나요.',userPrefs.sound)}<label for="soundVolume">효과음 음량 <b id="volumeValue">${userPrefs.volume}%</b></label><input id="soundVolume" type="range" min="0" max="100" step="1" value="${userPrefs.volume}"><button class="button secondary" id="testSound">소리 들어보기</button>${settingsSwitch('reduceMotion','움직임 줄이기','기기에서 줄이도록 설정한 경우에도 적용돼요.',userPrefs.motionReduced)}${settingsSwitch('visualEffects','반짝이 장식 효과','꺼도 획득량과 선택 표시는 유지돼요.',userPrefs.visualEffects)}<p id="optionsStatus" role="status">설정은 이 브라우저에 저장돼요.</p></details>${furnitureEffectsGuide()}<button class="record-help" data-economy><span>${uiIcon('gold')}</span><b>성장과 골드 안내</b><i>${uiIcon('arrow')}</i></button><button class="record-help" id="guide"><span>${uiIcon('help')}</span><b>자세한 게임 설명</b><i>${uiIcon('arrow')}</i></button><section class="save-transfer"><h3>나의 별 기록</h3><p>내보내기에는 성장·수집·설치물·엽서·별명과 설정이 포함돼요.<br>불러오기·초기화 전 기록은 최근 한 개만 복구용으로 보관해요.</p><div class="save-buttons"><button class="button secondary" id="export">기록 내보내기</button><label class="button secondary" tabindex="0" role="button" id="importLabel">기록 불러오기<input id="import" type="file" accept=".json,application/json"></label></div><button class="text-button" id="restoreBackup" ${readLocal(BACKUP_KEY)?'':'disabled'}>불러오기·초기화 전 기록 복구</button>${damagedRaw?'<button class="text-button" id="exportOriginal">읽지 못한 원본 내보내기</button>':''}</section><button class="text-button reset" id="reset">새로운 은하계에서 시작</button><small class="release-version">게임 버전 ${APP_VERSION}</small>`,()=>{
 $('.modal-card').classList.add('settings-dialog');
 $('#export').onclick=()=>{downloadText(encodeSave(state,userPrefs),'my-little-dusts.json');toast('기록 파일을 내보냈어요.','journal');};
 $('#import').onchange=e=>previewImportFile(e.target.files[0]);
 $('#importLabel').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#import').click();}};
 $('#restoreBackup').onclick=()=>previewImportText(readLocal(BACKUP_KEY),'이전 기록 복구');
 if($('#exportOriginal'))$('#exportOriginal').onclick=()=>downloadText(damagedRaw,'original-dust-record.json');
 $('#soundEnabled').onchange=e=>{userPrefs.sound=e.target.checked;persistPreferences();if(userPrefs.sound)sounds.play('test');};
 $('#soundVolume').oninput=e=>{userPrefs.volume=Number(e.target.value);$('#volumeValue').textContent=userPrefs.volume+'%';persistPreferences();};
 $('#testSound').onclick=()=>{if(!userPrefs.sound||userPrefs.volume===0)return toast('효과음을 켜고 음량을 올려주세요.');if(!sounds.play('test'))toast('이 브라우저에서는 소리를 재생할 수 없어요.');};
 $('#reduceMotion').onchange=e=>{userPrefs.motionReduced=e.target.checked;persistPreferences();applyPreferences();render();};
 $('#visualEffects').onchange=e=>{userPrefs.visualEffects=e.target.checked;persistPreferences();applyPreferences();};
 $('#reset').onclick=()=>modal('새로운 은하계로 갈까요?',`<p>현재 성장·수집 기록을 초기화해요.<br>현재 기록은 복구용으로 한 개 보관해요. 내보내기도 먼저 할 수 있어요.</p><button class="button secondary full" id="exportBeforeReset">먼저 기록 내보내기</button><button class="button primary full" id="confirmReset">새로 시작하기</button><button class="button secondary full" id="cancelReset">돌아가기</button>`,()=>{$('#exportBeforeReset').onclick=()=>downloadText(damagedRaw||encodeSave(state,userPrefs),'my-little-dusts.json');$('#confirmReset').onclick=()=>{const next=createState();try{commitImport(localStorage,KEY,next,userPrefs,damagedRaw||encodeSave(state,userPrefs));}catch{return toast('저장 공간을 확인해주세요. 현재 기록은 유지했어요.');}state=next;saveBlocked=false;damagedRaw=null;offlineReturn=false;save();close();go('room');quickStart();};$('#cancelReset').onclick=settings;});
 });}

$('#main').addEventListener('click',event=>{
 const filter=event.target.closest?.('.selection-filters .filter-choice');
 if(!filter || filter.getAttribute('aria-pressed')==='true')return;

 const results=document.getElementById(filter.getAttribute('aria-controls'));
 if(!results)return;
 if(filter.dataset.dustFilter){
  dustFilter=filter.dataset.dustFilter;
  results.innerHTML=renderDustFilterResults();
 }else{
  furnitureFilter=filter.dataset.furnitureFilter;
  results.innerHTML=renderFurnitureFilterResults();
 }
 for(const button of filter.parentElement.querySelectorAll('.filter-choice')){
  button.setAttribute('aria-pressed',String(button===filter));
 }
 sounds.unlock();
});
document.addEventListener('click',e=>{if(Date.now()<suppressRoomClickUntil)return;const b=e.target.closest('button');if(!b||b.disabled)return;sounds.unlock();if(b.hasAttribute('data-refresh-game'))refreshGame();else if(b.dataset.dailySparkle)earnDailySparkle(b,e);else if(b.dataset.roomChapter)roomChapter(Number(b.dataset.roomChapter));else if(b.dataset.roomReward){const r=claimRoomChapter(state,Number(b.dataset.roomReward));if(r.ok){save();render();roomChapter(Number(b.dataset.roomReward));toast('은하계에 새로운 기억을 놓았어요.','story');}}else if(b.hasAttribute('data-room-decor')){equipRoomDecor(state,Number(b.dataset.roomDecor));save();render();openRooms();}else if(b.hasAttribute('data-room-guest'))openRoomGuest();else if(b.dataset.openMerge)openMerge(Number(b.dataset.openMerge));else if(b.dataset.mergePreview)previewMerge(...b.dataset.mergePreview.split(':').map(Number));else if(b.dataset.confirmMerge)confirmMerge(...b.dataset.confirmMerge.split(':').map(Number));else if(b.hasAttribute('data-open-survey'))openSurvey();else if(b.hasAttribute('data-dispatch-party'))sendAdventureParty();else if(b.hasAttribute('data-clear-party')){expeditionParty.clear();updatePartyUI();}else if(b.dataset.partyAdd)toggleAdventureGuest(Number(b.dataset.partyAdd));else if(b.hasAttribute('data-desk-start'))beginDesk();else if(b.hasAttribute('data-desk-resume'))go('explore');else if(b.hasAttribute('data-desk-pause'))pauseDesk();else if(b.hasAttribute('data-desk-history'))deskHistory();else if(b.hasAttribute('data-quick-start'))quickStart();else if(b.dataset.postcardRoute){postcardRoute=b.dataset.postcardRoute;render();$(`[data-postcard-route="${postcardRoute}"]`)?.focus({preventScroll:true});}else if(b.hasAttribute('data-missing-postcards')){postcardShowMissing=!postcardShowMissing;render();$('[data-missing-postcards]')?.focus({preventScroll:true});}else if(b.dataset.collectTarget){setCollectionTarget(state,b.dataset.collectTarget);save();openQuestGuide('collection');}else if(b.hasAttribute('data-clear-target')){setCollectionTarget(state,null);save();openQuestGuide('collection');}else if(b.dataset.claimTheme){const r=claimTheme(state,b.dataset.claimTheme);if(r.ok){save();render();toast(r.theme.reward+'을 받아 은하계에 놓았어요.');}}else if(b.dataset.themeDecor){toggleThemeDecor(state,b.dataset.themeDecor);save();render();}else if(b.dataset.planRoute)prepareCollectionAdventure(b.dataset.planRoute);else if(b.dataset.postcardPlan){const [route,id]=b.dataset.postcardPlan.split(':');const d=state.dusts.find(d=>d.id===id&&!d.stored&&!isAway(state,d.uid));if(d)prepareCollectionAdventure(route,d.uid);else if(copies(id).some(d=>isAway(state,d.uid))){openAdventures();}else if(copies(id).length){close();go('storage');toast('이 친구를 꺼내서 모험을 준비해주세요.');}else detail(id);}else if(b.dataset.rename)nicknameDialog(Number(b.dataset.rename));else if(b.dataset.cozyPlace)placeFavorite(Number(b.dataset.cozyPlace));else if(b.hasAttribute('data-room-memory'))openRoomMemory();else if(b.dataset.memoryChapter){openRoomMemory(Number(b.dataset.memoryChapter)-1);}else if(b.hasAttribute('data-memory-decor')){toggleMemoryDecor(state);save();render();openRoomMemory();}else if(b.hasAttribute('data-economy'))economyBook();else if(b.hasAttribute('data-quest-guide'))openQuestGuide(b.dataset.questGuide);else if(b.hasAttribute('data-next-goal'))followGoal();else if(b.hasAttribute('data-dismiss-offline')){offlineReturn=false;updateGoalUI();}else if(b.id==='togglePlacementStars'){hidePlacementStars=!hidePlacementStars;render();document.getElementById('togglePlacementStars')?.focus({preventScroll:true});}else if(b.id==='togglePlacement'){cancelRoomInteraction();placementMode=!placementMode;render();}else if(b.dataset.collectionTab){collectionTab=b.dataset.collectionTab;render();document.getElementById('collection-tab-'+collectionTab)?.focus({preventScroll:true});}else if(b.hasAttribute('data-life-book'))lifeBook();else if(b.hasAttribute('data-postcards'))postcardBook();else if(b.dataset.postcard)openPostcard(b.dataset.postcard);else if(b.dataset.claimWish){const r=claimWish(state,Number(b.dataset.claimWish));if(r.ok){save();render();refreshDailyWishes(Number(b.dataset.claimWish));toast('고마워! 반짝이 '+r.amount+'개를 나눴어요.','sparkle');}else toast(r.message);}else if(b.dataset.placeWish)placeForWish(Number(b.dataset.placeWish));else if(b.hasAttribute('data-open-rooms'))openRooms();else if(b.dataset.roomStory)roomStory(Number(b.dataset.roomStory)-1);else if(b.dataset.claimFurniture)receiveFurniture(b.dataset.claimFurniture);else if(b.dataset.upgradeFurniture){const r=upgradeFurniture(state,b.dataset.upgradeFurniture);if(!r.ok)return toast(r.message);save();render();if(page==='room'){const item=document.querySelector(`[data-room-item="furniture"][data-room-id="${b.dataset.upgradeFurniture}"]`);if(item)showFurnitureActions(item);}toast('Lv.'+r.level+' · 설치물의 새 이야기가 열렸어요.');}else if(b.dataset.furnitureStory){const [id,index]=b.dataset.furnitureStory.split(':');furnitureBook(id,Number(index)||0);}else if(b.id==='buyFairy'){const r=buyFairy(state);if(!r.ok)return toast(r.message);save();render();toast('요정 모아가 은하계에 찾아왔어요. 모아를 눌러 골드를 모두 받아요.');}else if(b.id==='fairyCollect')earnGold(null,b,e);else if(b.dataset.collectGold)earnGold(Number(b.dataset.collectGold),b,e);else if(b.dataset.storageTab){storageTab=b.dataset.storageTab;if(page==='storage')render();else go('storage');document.getElementById('storage-tab-'+storageTab)?.focus({preventScroll:true});}else if(b.dataset.shopTab){shopTab=b.dataset.shopTab;render();document.getElementById('shop-tab-'+shopTab)?.focus({preventScroll:true});}else if(b.hasAttribute('data-shop-materials')){shopTab='materials';go('shop')}else if(b.hasAttribute('data-upgrade-room')){const r=upgradeRoom(state);if(!r.ok)return toast(r.message);save();render();refreshRooms();toast('Lv.'+state.roomLevel+' · '+currentRoom(state).name+(state.roomLevel%10===0?' · 새로운 은하계 이야기가 열렸어요.':' · 두 자리가 늘었어요.'))}else if(b.dataset.furniture){const r=toggleFurniture(state,b.dataset.furniture);if(!r.ok)return toast(r.message);save();render();toast(r.placed?'설치물을 놓았어요. 효과가 적용돼요.':'설치물을 넣어두었어요. 언제든 다시 놓을 수 있어요.')}else if(b.dataset.buyMaterial){const [key,id]=b.dataset.buyMaterial.split(':');const r=buyMaterial(state,key,id);if(!r.ok)return toast(r.message);save();render();toast('재료 1개를 재료 가방에 넣었어요.','recipe')}else if(b.hasAttribute('data-open-storage'))openStorage();else if(b.dataset.store)archiveDust(Number(b.dataset.store));else if(b.dataset.takeOut)bringBack(Number(b.dataset.takeOut));else if(b.dataset.sharedStory)sharedStoryBook(Number(b.dataset.sharedStory));else if(b.dataset.sharedEntry){const [uid,key]=b.dataset.sharedEntry.split('|');sharedStoryEntry(Number(uid),key);}else if(b.dataset.recordClue)followRecordClue(Number(b.dataset.recordClue));else if(b.dataset.afterword){const [uid,kind]=b.dataset.afterword.split(':');afterwordBook(Number(uid),kind||'favorite');}else if(b.dataset.afterwordRoom)returnFromAfterword(Number(b.dataset.afterwordRoom));else if(b.dataset.storyFriend)placeStoryFriend(Number(b.dataset.storyFriend));else if(b.dataset.storyRoute)openStoryRoute(Number(b.dataset.storyRoute));else if(b.dataset.story)storyBook(Number(b.dataset.story));else if(b.dataset.storyList)storyList(Number(b.dataset.storyList));else if(b.dataset.chapter){const [uid,index]=b.dataset.chapter.split(':').map(Number);storyBook(uid,index)}else if(b.dataset.page){const changed=page!==b.dataset.page;go(b.dataset.page);if(changed&&b.closest('.navigation'))animateNavigation(b);}else if(b.dataset.dust){if(e.detail>1||Date.now()<suppressDustClickUntil)return;focusRoomDust(Number(b.dataset.dust),true)}else if(b.dataset.detail)detail(b.dataset.detail,Number(b.dataset.detailUid)||null);else if(b.dataset.copy){const d=state.dusts.find(x=>x.uid===Number(b.dataset.copy));if(d&&isAway(state,d.uid)){if(state.deskRun?.uid===d.uid)openSurvey();else openAdventures();return;}if(d?.stored)bringBack(d.uid);else if(d){state.selectedUid=d.uid;save();close();go('room')}}else if(b.dataset.recipe){const d=getDust(b.dataset.recipe);selection={group:d.group,rarity:d.rarity,essence:d.essence};if(mixDialogOpen){refreshMix();$('.modal-body').scrollTo({top:0,behavior:'smooth'})}else openMix(selection)}else if(b.id==='glowTrigger')openMix();else if(b.id==='clearMix'){selection={group:'',rarity:'',essence:''};refreshMix()}else if(b.hasAttribute('data-open-adventure')||b.id==='adventureDoor')openAdventures();else if(b.dataset.claimQuest)receiveAdventure(Number(b.dataset.claimQuest));else if(b.id==='materials')showMaterials();else if(b.id==='summon'){const r=mix(state,selection);if(r.ok){save();render();refreshMix()}else toast(r.message)}else if(b.id==='settings')settings();else if(b.id==='guide')guide()});
document.addEventListener('change',e=>{
 const field=e.target;
 if(field.dataset.pick){selection[field.dataset.pick]=field.value;refreshMix(field.id);}
 if(field.name==='keeper-route'&&field.checked&&chooseKeeperRoute(state,field.value).ok){
  save();
  for(const card of $('#adventureContent').querySelectorAll('.quest-choice'))card.classList.toggle('chosen',card.contains(field));
  render();
 }
});$('#home').onclick=e=>{e.preventDefault();go('room')};document.addEventListener('keydown',e=>{if(e.key==='Escape'){if($('#modal').classList.contains('hidden')&&$('#dustPopup .care-dock'))hideDustPopup(true);else close();}if(e.key==='Tab'&&!$('#modal').classList.contains('hidden')){const nodes=[...$('#modal').querySelectorAll('.modal-card,button,input,select,summary,a[href]')].filter(n=>!n.disabled&&n.getClientRects().length&&(n.type!=='radio'||n.checked));if(toastClose.tabIndex===0)nodes.push(toastClose);const first=nodes[0],last=nodes.at(-1);if(e.shiftKey&&document.activeElement===first){last?.focus();e.preventDefault()}else if(!e.shiftKey&&document.activeElement===last){first?.focus();e.preventDefault()}}});document.addEventListener('visibilitychange',()=>{if(document.hidden)save();else{offlineReturn=Date.now()-state.life.lastSeen>=60000;resumeLife(state);save();render();tick();}});applyPreferences();render();save();if(saveBlocked)recoveryNotice();else if(!userPrefs.introSeen)quickStart();setInterval(tick,300);setInterval(()=>{if(!document.hidden)save()},15000);


function roomDecor(){return `<div class="room-decor" aria-label="놓아둔 설치물">${tripDecor()}${state.decorations.map(id=>{const p=toPlanetScreen(state.roomPositions.furniture[id]||DEFAULT_DECOR[id]);return `<button type="button" class="decor decor-${id} ${selected()&&personality(selected().id).favorite.id===id?'favorite-decor':''}" data-room-item="furniture" data-room-id="${id}" role="button" tabindex="0" aria-label="${FURNITURE.find(f=>f.id===id).name} · ${placementMode?"위치 이동":"이야기 읽기"}" style="left:${p.x}%;top:${p.y}%;right:auto;bottom:auto;translate:-50% -50%">${furnitureArt(id,furnitureLevel(state,id))}</button>`;}).join('')}</div>`;}
function goldBubble(d,amount){
 return `<button type="button" class="gold-bubble" data-collect-gold="${d.uid}" aria-label="${esc(dustName(d))} 골드 ${amount} 받기">${icon('coin')}</button>`;
}
function selectedIncome(){
 return `<button class="compact-income" data-economy aria-label="골드 생산량과 가격 안내" title="골드 생산량과 가격 안내"><strong id="selectedGoldTimer">${uiIcon('gold')}${uiIcon('clock')}<span id="goldTimerValue"></span></strong></button>`;
}
function updateGoldUI(){
 const now=Date.now(), ready=new Map();
 for(const d of state.dusts){
  const production=goldProduction(state,d,now);
  if(!production.paused&&production.cycles>0)ready.set(d.uid,production.amount);
 }
 document.querySelectorAll('[data-gold-slot]').forEach(el=>{
  const uid=Number(el.dataset.goldSlot);
  const amount=ready.get(uid), bubble=el.querySelector('.gold-bubble');
  if(amount===undefined){bubble?.remove();return;}
  const d=state.dusts.find(x=>x.uid===uid);
  if(!bubble){
   el.insertAdjacentHTML('afterbegin',goldBubble(d,amount));
  }else{
   const label=`${dustName(d)} 골드 ${amount} 받기`;
   if(bubble.getAttribute('aria-label')!==label)bubble.setAttribute('aria-label',label);
  }
 });
 const fairy=$('#fairyCollect');
 if(fairy){
  const sum=[...ready.values()].reduce((total,amount)=>total+amount,0);
  const label=ready.size?`${sum} 골드 모두 받기`:'골드가 모이는 중';
  fairy.dataset.badge=ready.size?'◉':'';
  fairy.title=label;
  fairy.disabled=!ready.size;
  fairy.setAttribute('aria-label','요정 모아 · '+label);
  $('#fairyStatus').textContent=label;
 }
 const d=selected(),timer=$('#selectedGoldTimer');
 if(d&&timer){
  const p=goldProduction(state,d,now);
  const seconds=Math.ceil(p.remaining/1000);
  timer.classList.toggle('gold-ready',Boolean(p.cycles));
  $('#goldTimerValue').textContent=p.cycles?p.amount:seconds+'초';
  timer.closest('button').setAttribute('aria-label',p.cycles?`${p.amount} 골드 받기 가능 · 골드 안내`:`${seconds}초 뒤 골드 · 골드 안내`);
 }
}
function showCurrencyGain(source,rewards,event){
 const from=source?.getBoundingClientRect();
 if(!from?.width||!from.height)return false;

 const x=event?.detail?event.clientX:from.left+from.width/2;
 const y=event?.detail?event.clientY:from.top+from.height/2;
 const gain=document.createElement('span');
 gain.className='currency-gain';
 gain.setAttribute('role','status');
 gain.style.left=x+'px';
 gain.style.top=y+'px';
 for(const [kind,amount] of rewards){
  const number=document.createElement('b');
  number.className='currency-'+kind;
  number.setAttribute('aria-label',`${kind==='gold'?'골드':'반짝이'} ${amount} 획득`);
  number.textContent='+'+amount.toLocaleString('ko-KR');
  gain.append(number);
 }
 document.body.append(gain);
 setTimeout(()=>gain.remove(),1400);
 for(const [kind] of rewards)flyCurrency(source,kind,x,y);
 return true;
}
function flyCurrency(source,kind,x,y){
 const wallet=$(kind==='gold'?'.gold-wallet':'.sparkle-wallet');
 const target=wallet?.querySelector('svg')||wallet;
 if(!target||typeof source.animate!=='function'||
    document.documentElement.matches('.reduce-motion, .simple-effects')||
    matchMedia('(prefers-reduced-motion: reduce)').matches)return;

 const to=target.getBoundingClientRect();
 if(!to.width||!to.height)return;

 const dx=to.left+to.width/2-x,dy=to.top+to.height/2-y;
 const token=document.createElement('span');
 token.className='currency-flight currency-flight-'+kind;
 token.setAttribute('aria-hidden','true');
 token.style.left=x+'px';
 token.style.top=y+'px';
 const isDrop=source.matches('.daily-sparkle');
 token.innerHTML=kind==='gold'?icon('coin'):(isDrop&&source.querySelector('svg')?.outerHTML)||uiIcon('sparkle');
 document.body.append(token);

 const flight=token.animate([
   {transform:'translate(0, 0) scale(.8)',opacity:0,offset:0},
   {transform:'translate(0, -18px) scale(1.07)',opacity:1,offset:.18},
   {transform:`translate(${dx*.68}px, ${dy*.63-12}px) scale(.9)`,opacity:1,offset:.72},
   {transform:`translate(${dx}px, ${dy}px) scale(.4)`,opacity:0,offset:1},
 ],{duration:660,delay:kind==='sparkle'&&!isDrop?100:0,easing:'cubic-bezier(.28,.2,.38,1)'});
 flight.finished.then(()=>token.remove(),()=>token.remove());
}
function earnGold(uid=null,source=null,event){
 const r=uid===null?collectAllGold(state):collectGold(state,uid);
 if(!r.ok)return toast(r.message||'아직 골드가 모이는 중이에요.');
 sounds.play('gold');save();
 $('#gold').textContent=state.gold;
 $('.gold-wallet').setAttribute('aria-label',`골드 ${state.gold} · 상점 열기`);
 $('#sparkles').textContent=state.sparkles;
 const rewards=[['gold',r.amount]];
 if(r.sparkles)rewards.push(['sparkle',r.sparkles]);
 const displayed=page==='room'&&showCurrencyGain(source,rewards,event);
 if(page==='shop')render();
 updateGoldUI();
 updateGoalUI();
 if(!displayed){
  toast('작은 보답, '+r.amount+' 골드'+(r.sparkles?'와 반짝이 '+r.sparkles+'개':'')+'를 받았어요.','gold');
 }
}
function renderFurnitureFilterResults(){
 return FURNITURE.filter(item=>!state.ownedFurniture.includes(item.id)&&(furnitureFilter==='all'||furnitureCategory(item.id)===furnitureFilter))
  .map(furnitureCard).join('')||'<p>이 분류의 가구를 모두 얻었어요.</p>';
}
function renderShop(){const room=currentRoom(state),next=ROOMS[state.roomLevel];return `<dl class="shop-balance" aria-label="보유 재화"><div class="shop-currency currency-gold"><dt>${icon('coin')}골드</dt><dd><b>${state.gold.toLocaleString('ko-KR')}</b><small>설치물 강화</small></dd></div><div class="shop-currency currency-sparkle"><dt><span aria-hidden="true">✧</span>반짝이</dt><dd><b>${state.sparkles.toLocaleString('ko-KR')}</b><small>재료·은하계·요정</small></dd></div></dl><section class="upgrade-card" style="--room-color:${room.color}"><div class="upgrade-house"><span>◎</span><b>Lv.${state.roomLevel}</b></div><div><span class="shop-eyebrow">지금 우리 은하계</span><h2>${room.name}</h2><p>골드 +${room.bonus}% · 은하계 ${room.capacity}자리 · 보관함 ${room.storage}자리</p>${next?`<small>다음 은하계 · ${next.name} · 골드 보상 +${next.bonus}%</small>`:'<small>가장 포근한 은하계를 완성했어요.</small>'}</div><div class="room-upgrade-actions"><button class="button primary" data-upgrade-room ${!next||state.sparkles<next.cost?'disabled':''}>${next?state.sparkles<next.cost?`반짝이 ${(next.cost-state.sparkles).toLocaleString('ko-KR')}개 부족`:`반짝이 ${next.cost.toLocaleString('ko-KR')}개로 업그레이드`:'최고 레벨'}</button><button class="text-button open-room-list" data-quest-guide="progress">별빛 임무에서 성장 지도 보기</button></div></section>${fairyShopCard()}<div class="collection-tabs shop-tabs" role="tablist" aria-label="상점 분류">${[['furniture','은하계 꾸미기'],['materials','조합 재료'],['trip','탐험 재료']].map(([id,label])=>`<button id="shop-tab-${id}" role="tab" data-shop-tab="${id}" aria-selected="${shopTab===id}" aria-controls="shopPanel" tabindex="${shopTab===id?0:-1}" class="${shopTab===id?'active':''}">${label}</button>`).join('')}</div><section id="shopPanel" role="tabpanel" tabindex="0" aria-labelledby="shop-tab-${shopTab}">${shopTab==='furniture'?`<p class="shop-note">아직 얻지 못한 가구예요. 획득한 가구는 보관함에서 강화할 수 있어요.</p><div class="furniture-filters selection-filters" role="group" aria-label="설치물 효과 필터">${[['all','모두'],['sparkles','반짝이'],['gold','골드'],['adventure','모험']].map(([id,name])=>`<button type="button" class="filter-choice" aria-controls="furnitureFilterResults" data-furniture-filter="${id}" aria-pressed="${furnitureFilter===id}">${name}</button>`).join('')}</div><div class="furniture-grid" id="furnitureFilterResults">${renderFurnitureFilterResults()}</div>`:shopTab==='trip'?tripShop():`<p class="shop-note">쓰다듬어 모은 반짝이로 재료를 사요. 재료로 같은 친구를 만나고, 별을 합쳐 키워요.</p>${[['group',GROUPS,'그룹'],['rarity',RARITIES,'희귀도'],['essence',ESSENCES,'정수']].map(([key,items,title])=>`<section class="shop-materials"><h2>${title}</h2><div>${items.map(x=>{const price=materialPrice(key,x.id,state);return `<article class="material-card">${icon(x.id)}<h3>${x.name}</h3><p>보유 ${state.materials[key][x.id]}개</p><button class="button secondary" data-buy-material="${key}:${x.id}" ${state.sparkles<price?'disabled':''}>반짝이 ${price}개 · 재료 1개</button></article>`;}).join('')}</div></section>`).join('')}<button class="button primary full" data-page="mix">재료 조합하러 가기 →</button>`}</section>`;}


function renderHeader(){const c=counts(),used=homeCount(state),capacity=roomCapacity(state);const unread=state.life.journal.filter(e=>!e.seen).length;$('#lifeUnread').textContent=unread?'+'+unread:'';$('#headerCounts').innerHTML=`<button id="headerCollection" class="resource-count" data-page="collection" title="발견한 별 · 도감 열기" aria-label="발견한 별 ${c.types} / ${DUSTS.length}">${uiIcon('collection')}<b>${String(c.types).padStart(2,'0')}<em>/${DUSTS.length}</em></b><small data-short="발견">발견한 별</small></button><button id="headerRoomCapacity" class="resource-count" data-quest-guide="progress" title="은하계 자리 ${used} / ${capacity} · 탐험 중인 별의 귀환 자리 포함" aria-label="은하계 자리 ${used} / ${capacity} · 귀환 자리 포함">${uiIcon('home')}<b>${String(used).padStart(2,'0')}<em>/${String(capacity).padStart(2,'0')}</em></b><small data-short="은하계">은하계 자리</small></button>`;}

function careDock(active){const d=getDust(active.id);return `<section class="care-dock care-panel compact-dock" aria-labelledby="dustPopupName"><div class="compact-top"><div class="compact-profile">${dustPortrait(active,journeyComplete(active))}<div><div class="compact-name"><h2 id="dustPopupName" title="${esc(dustName(active))}">${esc(dustName(active))}</h2><b>Lv.${level(active.xp)}</b> ${level(active.xp)>=5?`<button class="text-button" data-rename="${active.uid}" aria-label="별명 짓기">${uiIcon('edit')}</button>`:''}</div><p>${growthName(level(active.xp))} · ${find(RARITIES,d.rarity).name}</p></div></div><div class="compact-actions">
 ${selectedIncome()}
 <button class="text-button" data-care-tap="${active.uid}" aria-label="쓰다듬기" title="쓰다듬기">${uiIcon('heart')}</button>
 <button class="text-button" data-detail="${active.id}" data-detail-uid="${active.uid}" aria-label="별 상세보기" title="별 상세보기">${uiIcon('detail')}</button>
 <button class="text-button" data-store="${active.uid}" aria-label="보관하기" title="보관하기">${uiIcon('storage')}</button>
 <button class="button primary" data-open-merge="${active.uid}" aria-label="${active.xp>=10?'최고 레벨':'별 합치기'}" title="${active.xp>=10?'최고 레벨':'별 합치기'}" ${active.xp>=10?'disabled':''}>${uiIcon(active.xp>=10?'check':'merge')}</button>
 </div></div>${hasJourney(active)?journeyCue(active):''}</section>`;}


function hideDustPopup(restoreFocus=false){
 const uid=dustPopupUid;
 if(uid===null){clearFurnitureActions();return;}
 dustPopupUid=null;
 $('#dustPopup')?.replaceChildren();
 const dust=document.querySelector(`[data-dust="${uid}"]`);
 dust?.setAttribute('aria-expanded','false');
 if(restoreFocus)dust?.focus({preventScroll:true});
}
document.addEventListener('click',event=>{
 if(dustPopupUid===null||Date.now()<suppressRoomClickUntil||
    !$('#modal').classList.contains('hidden'))return;
 if(!event.target.closest('#dustPopup, .room-dust'))hideDustPopup();
},true);
function focusRoomDust(uid,showPopup=false){
 if(!selectDust(state,uid))return;
 save();renderHeader();const active=selected();
 if(showPopup&&!placementMode)dustPopupUid=uid;
 else if(dustPopupUid!==uid)hideDustPopup();
 document.querySelectorAll('.room-dust').forEach(el=>{
  const on=Number(el.dataset.dust)===uid;
  el.classList.toggle('selected',on);
  el.setAttribute('aria-pressed',String(on));
  el.setAttribute('aria-expanded',String(on&&uid===dustPopupUid&&!placementMode));
  const bubble=el.querySelector('.rub-bubble');
  if(bubble&&!bubble.classList.contains('show'))bubble.classList.toggle('hint',on);
 });
 const popup=$('#dustPopup');
 if(popup)popup.innerHTML=uid===dustPopupUid&&!placementMode?careDock(active):'';
 updateGoldUI();updateLifeView();
}
function adventureDoor(){return `<button class="adventure-keeper" id="adventureDoor" aria-label="은하계 요정 루미 · 탐험 관리"><span class="keeper-gate" aria-hidden="true">${icon('residents')}</span><span class="keeper-character">${icon('keeper')}</span><b>모험 관리인 루미</b><small>탐험 수첩</small><span id="adventureDoorStatus">별을 이곳으로 ↗</span></button>`;}
function availableParty(){
 for(const uid of expeditionParty)if(!roomResidents(state).some(d=>d.uid===uid))expeditionParty.delete(uid);
 return [...expeditionParty];
}
function partyRack(){
 const party=availableParty();
 return party.length?`<div class="expedition-rack"><button class="button primary" data-dispatch-party>${party.length}마리 탐험 보내기 →</button><button class="button secondary" data-clear-party aria-label="탐험대 비우기">${uiIcon('close')}</button></div>`:'';
}
function updatePartyUI(){
 const rack=$('#expeditionRack');
 if(rack)rack.innerHTML=partyRack();
 for(const star of document.querySelectorAll('[data-dust]'))star.classList.toggle('expedition-selected',expeditionParty.has(Number(star.dataset.dust)));
 refreshAdventures();
}
function toggleAdventureGuest(uid){
 if(expeditionParty.has(uid))expeditionParty.delete(uid);
 else{
  if(!roomResidents(state).some(d=>d.uid===uid))return;
  if(availableParty().length+state.adventures.length>=MAX_ADVENTURERS)return toast('루미의 탐험 자리는 최대 3개예요. 돌아온 별을 먼저 맞이해주세요.');
  expeditionParty.add(uid);
 }
 updatePartyUI();
}
function rewardChips(route,rewards=adventureRewards(state,route),preview=true){return `<span class="quest-rewards">${rewards.materials.map(([key,id,amount])=>{const item=find({group:GROUPS,rarity:RARITIES,essence:ESSENCES}[key],id);return `<span>${icon(id)}<b>${item.name}</b><small>×${amount}</small></span>`;}).join('')}<span class="quest-sparkles">${uiIcon('sparkle')} <b>반짝이</b><small>×${rewards.sparkles}</small></span>${preview&&activeLevel(state,'postbox')?`<span class="quest-sparkles">✉ 새 엽서일 때만 +${activeLevel(state,'postbox')}</span>`:''}</span>`;}
function routeChoice(route){
 const chosen=state.keeperRoute===route.id,locked=!routeUnlocked(state,route.id);
 const duration=Math.round(route.duration*(1-activeLevel(state,'windchime')*.05))/1000;
 return `<label class="quest-route quest-choice ${chosen?'chosen':''}" style="--route-color:${route.color}">
  <span class="route-title">
   <input type="radio" name="keeper-route" value="${route.id}" aria-labelledby="route-name-${route.id}" aria-describedby="route-detail-${route.id}" ${chosen?'checked':''} ${locked?'disabled':''}>
   <span><b id="route-name-${route.id}">${route.name}</b><span class="route-description" id="route-detail-${route.id}">${route.description}${locked?' · 은하계 Lv.'+routeUnlockLevel(route.id)+'에서 열려요':''}</span></span>
   <small>${duration}초</small>
  </span>
  ${rewardChips(route)}
 </label>`;
}
function legacyTravelers(){return `${state.adventures.length?`<section class="travelers"><h3>모험 소식 <small>${state.adventures.length}마리</small></h3>${state.adventures.map(q=>{const d=state.dusts.find(x=>x.uid===q.uid),route=find(QUESTS,q.route);return `<article class="traveler" data-traveler="${q.uid}" style="--route-color:${route.color}"><div class="traveler-heading"><b>${esc(dustName(d))}</b><span>${route.name}</span><small data-quest-time="${q.uid}"></small></div><div class="travel-scene"><span class="travel-home">⌂</span><i class="travel-path"></i><span class="travel-dust">${dustPortrait(d,journeyComplete(d))}</span><span class="travel-flag">${uiIcon('flag')}</span></div><button class="button secondary full" data-claim-quest="${q.uid}" disabled>모험 중이에요</button></article>`;}).join('')}</section>`:''}`;}
function adventureContent(){return `<button class="text-button postcard-entry" data-postcards>받은 모험 엽서 ${state.life.postcards.length} / 150 ↗</button><p class="adventure-intro">은하계에서 별을 길게 눌러 루미에게 놓거나 아래에서 골라요. 탐험대는 최대 3마리예요.</p><div class="expedition-pick">${roomResidents(state).map(d=>`<button class="button secondary" aria-pressed="${expeditionParty.has(d.uid)}" data-party-add="${d.uid}">${esc(dustName(d))} · Lv.${level(d.xp)}</button>`).join('')}</div>${expeditionParty.size?`<button class="button primary full" data-dispatch-party>${expeditionParty.size}마리 탐험 보내기 →</button>`:''}${legacyTravelers()}<fieldset class="quest-planning"><legend>다음 모험의 목적지</legend><div class="quest-routes">${QUESTS.map(routeChoice).join('')}</div></fieldset><p class="quest-footnote">별의 레벨이 높거나 함께 떠나는 별이 많을수록 정수와 반짝이를 더 가져와요.</p>`;}
function openAdventures(){openTrips(state.deskRun&&!state.starTrips?.trip?'survey':'trip');}
function openRouteDispatch(){availableParty();modal('은하계 요정 루미의 탐험 수첩',`<div id="adventureContent">${adventureContent()}</div>`);adventureDialogOpen=true;$('.modal-card').classList.add('adventure-dialog');updateAdventureUI();}
function refreshAdventures(){
 if(!adventureDialogOpen||!$('#adventureContent'))return;
 const focusedUid=document.activeElement?.dataset.partyAdd;
 $('#adventureContent').innerHTML=adventureContent();updateAdventureUI();
 if(focusedUid)document.querySelector(`[data-party-add="${focusedUid}"]`)?.focus({preventScroll:true});
}
function updateAdventureUI(){
 const now=Date.now(),ready=state.adventures.filter(q=>q.end<=now).length,door=$('#adventureDoorStatus');const keeper=$('#adventureDoor');if(keeper){keeper.dataset.badge=ready?String(ready):state.adventures.length?String(state.adventures.length):'';keeper.title=ready?ready+'마리 귀환 · 루미의 모험 수첩':'루미의 모험 수첩';}if(door)door.textContent=ready?`${ready}마리 돌아왔어요!`:state.adventures.length?`${state.adventures.length}마리 모험 중`:'별을 이곳으로 ↗';
 if(!adventureDialogOpen)return;
 for(const q of state.adventures){const card=document.querySelector(`[data-traveler="${q.uid}"]`);if(!card)continue;const complete=q.end<=now,progress=Math.max(0,Math.min(1,(now-q.start)/(q.end-q.start)));card.style.setProperty('--travel-progress',String(progress));card.classList.toggle('returned',complete);card.querySelector('[data-quest-time]').textContent=complete?'돌아왔어요!':Math.ceil((q.end-now)/1000)+'초 남음';const button=card.querySelector('[data-claim-quest]');button.disabled=!complete;button.classList.toggle('primary',complete);button.classList.toggle('secondary',!complete);button.textContent=complete?'돌아온 별 맞이하고 선물 받기':'모험 중이에요';}
}
function sendAdventureParty(){
 const party=availableParty(),route=find(QUESTS,state.keeperRoute),r=startAdventureParty(state,party,route.id);
 if(!r.ok)return toast(r.message);
 expeditionParty.clear();save();render();updatePartyUI();
 toast(`탐험 출발 · ${route.name} · ${party.length}마리`,'flag');
}
function receiveAdventure(uid){const r=claimAdventure(state,uid);if(!r.ok)return toast(r.message);save();render();modal('돌아온 별 · '+esc(dustName(r.dust)),`<div class="returned-dust">${dustPortrait(r.dust,journeyComplete(r.dust))}</div><p>${r.route.name}에서 소중한 재료를 모아왔어요.</p>${r.afterword?`<section class="return-afterword"><b>이전 질문에서 이어진 새 후일담</b><p>${esc(aftermathFor(r.dust).onReturn)}</p><button class="button secondary" data-afterword="${r.dust.uid}:route">돌아온 뒤의 이야기 읽기</button></section>`:''}${rewardChips(r.route,r.rewards,false)}${postcardPaper(r.postcard,r.isNew)}<button class="button secondary full" data-postcards>모은 별에서 엽서 보기 →</button><button class="button primary full" data-open-adventure>다른 모험 확인하기 ↗</button><button class="text-button return-mix" data-page="room">같이 은하계에서 쉬기 →</button>`);}
document.addEventListener('dblclick',event=>{if(event.target.closest?.('.room-dust'))event.preventDefault();});


function fairyShopCard(){return `<section class="fairy-shop-card ${state.fairyOwned?'has-fairy':''}"><div class="fairy-portrait">${icon('fairy')}</div><div><span class="effect-badge">골드 한 번에 받기</span><h2>골드 모으는 요정, 모아</h2><p>모아에게 부탁하면 준비된 골드를 모두 받아요.<br>데려온 뒤에는 은하계에서도 모아를 눌러 한 번에 받아요.</p></div>${state.fairyOwned?'<button class="button primary" id="fairyCollect"><span id="fairyStatus">골드 모두 받기</span></button>':`<button class="button primary" id="buyFairy" ${state.sparkles<FAIRY_PRICE?'disabled':''}>반짝이 ${FAIRY_PRICE}개 · 요정 데려오기</button>`}</section>`;}

function setItemAnchor(el,x,y){el.style.left=x+'%';el.style.top=y+'%';const gold=el.dataset.roomItem==='dust'?document.querySelector(`[data-gold-slot="${el.dataset.roomId}"]`):null;if(gold){gold.style.left=x+'%';gold.style.top=y+'%';gold.style.animation='none';}}
function clearMoveReady(){if(moveReady)moveReady.classList.remove('move-ready','moving-item','press-pending');moveReady=null;}
function restoreDragAnchor(d){d.el.style.left=d.initialLeft;d.el.style.top=d.initialTop;d.el.style.animation=d.initialAnimation;d.el.classList.toggle('positioned',d.wasPositioned);if(d.gold){d.gold.style.left=d.goldLeft;d.gold.style.top=d.goldTop;d.gold.style.animation=d.goldAnimation;d.gold.classList.toggle('positioned',d.goldPositioned);}}
function clearMergeDrop(){document.querySelectorAll('.merge-eligible,.merge-target').forEach(el=>el.classList.remove('merge-eligible','merge-target'));const status=$('#mergeDropStatus');if(status){status.textContent='';status.classList.remove('show');}}
function mergeTargetUnder(d,point=null){if(d.el.dataset.roomItem!=='dust')return null;const body=d.el.querySelector('.dust-body>path');if(!body)return null;const box=body.getBoundingClientRect();const targets=mergeCandidates(state,Number(d.el.dataset.roomId)).map(x=>{const el=document.querySelector(`.room-dust[data-dust="${x.uid}"]`),shape=el?.querySelector('.dust-body>path');return shape?{uid:x.uid,el,rect:shape.getBoundingClientRect()}:null;}).filter(Boolean);return pickMergeDropTarget(point||d.dropPoint||{x:box.left+box.width/2,y:box.top+box.height/2},targets);}
function updateMergeDrop(d){if(d.el.dataset.roomItem!=='dust')return;const target=mergeTargetUnder(d);document.querySelectorAll('.merge-target').forEach(el=>el.classList.toggle('merge-target',el===target?.el));if(target)target.el.classList.add('merge-target');const status=$('#mergeDropStatus');if(!status)return;const dust=state.dusts.find(x=>x.uid===target?.uid);const moving=state.dusts.find(x=>x.uid===Number(d.el.dataset.roomId));const text=dust&&moving?`놓으면 ${dustName(dust)} Lv.${mergeResultLevel(dust,moving)} · 이 자리에서 자라요`:'같은 종류의 빛나는 친구 위에 놓아주세요';if(status.textContent!==text)status.textContent=text;status.classList.add('show');}
function cleanRoomDrag(d){clearTimeout(d.timer);clearMergeDrop();d.el.classList.remove('move-ready','moving-item','press-pending');$('#adventureDoor')?.classList.remove('drop-ready');$('.dust-room')?.classList.remove('dragging-dust','dragging-furniture');try{if(d.el.hasPointerCapture(d.pointerId))d.el.releasePointerCapture(d.pointerId);}catch{}moveReady=null;}
function cancelRoomInteraction(){const d=roomDrag;if(!d)return;roomDrag=null;if(d.active)restoreDragAnchor(d);cleanRoomDrag(d);}
function activateRoomDrag(d){
 if(roomDrag!==d||!d.el.isConnected)return;
 d.gesture=placementMode||d.gesture.phase==='moving'?d.gesture:armGesture(d.gesture,performance.now());if(d.gesture.phase!=='moving')return;
 hideDustPopup();d.active=true;moveReady=d.el;d.el.classList.remove('press-pending','rubbing');d.el.classList.add('move-ready','moving-item');
 const box=d.el.getBoundingClientRect(),room=d.playfield.getBoundingClientRect();d.offsetX=box.x+box.width/2-d.x;d.offsetY=box.y+box.height/2-d.y;d.el.style.animation='none';setItemAnchor(d.el,(box.x+box.width/2-room.x)/room.width*100,(box.y+box.height/2-room.y)/room.height*100);
 d.room.classList.add(d.el.dataset.roomItem==='dust'?'dragging-dust':'dragging-furniture');if(d.el.dataset.roomItem==='dust'){for(const x of mergeCandidates(state,Number(d.el.dataset.roomId)))document.querySelector(`.room-dust[data-dust="${x.uid}"]`)?.classList.add('merge-eligible');updateMergeDrop(d);}try{d.el.setPointerCapture(d.pointerId);}catch{}if(!placementMode)navigator.vibrate?.(15);
}
document.addEventListener('pointerdown',event=>{
 if(event.isPrimary===false){cancelRoomInteraction();return;}if(page!=='room'||!$('#modal').classList.contains('hidden')||event.button!==0)return;
 const el=event.target.closest?.('[data-room-item]');if(!el||(!placementMode&&el.dataset.roomItem==='furniture'))return;cancelRoomInteraction();
 const gold=el.dataset.roomItem==='dust'?document.querySelector(`[data-gold-slot="${el.dataset.roomId}"]`):null;
 const d={el,gold,room:el.closest('.dust-room'),playfield:el.closest('.room-playfield'),pointerId:event.pointerId,x:event.clientX,y:event.clientY,active:false,gesture:beginGesture(event.clientX,event.clientY,performance.now(),placementMode),initialLeft:el.style.left,initialTop:el.style.top,initialAnimation:el.style.animation,wasPositioned:el.classList.contains('positioned'),goldLeft:gold?.style.left,goldTop:gold?.style.top,goldAnimation:gold?.style.animation,goldPositioned:gold?.classList.contains('positioned')};roomDrag=d;
 if(event.pointerType==='touch')try{el.setPointerCapture(event.pointerId);}catch{}
 if(placementMode)activateRoomDrag(d);else{el.classList.add('press-pending');d.timer=setTimeout(()=>activateRoomDrag(d),HOLD_MS+5);}
},true);
document.addEventListener('pointermove',event=>{
 const d=roomDrag;if(!d||event.pointerId!==d.pointerId)return;if(!d.active&&d.el.dataset.roomItem==='dust'&&Math.hypot(event.clientX-d.x,event.clientY-d.y)>=10){
  clearTimeout(d.timer);d.gesture.phase='moving';activateRoomDrag(d);
 }
 d.gesture=advanceGesture(d.gesture,event.clientX,event.clientY);
 if(!d.active)return;
 event.preventDefault();event.stopImmediatePropagation();
 if(!shouldPlace(d.gesture))return;
 const room=d.playfield.getBoundingClientRect(),box=d.el.getBoundingClientRect(),padX=(box.width/2+8)/room.width*100,padY=(box.height/2+12)/room.height*100;
 const x=Math.max(padX,Math.min(100-padX,(event.clientX+d.offsetX-room.x)/room.width*100)),y=Math.max(padY,Math.min(100-padY,(event.clientY+d.offsetY-room.y)/room.height*100));
 setItemAnchor(d.el,x,y);d.dropPoint={x:event.clientX,y:event.clientY};updateMergeDrop(d);const keeper=$('#adventureDoor');if(keeper&&d.el.dataset.roomItem==='dust')keeper.classList.toggle('drop-ready',overAdventureKeeper(keeper,event,event.clientX+d.offsetX,event.clientY+d.offsetY));
},true);
function overAdventureKeeper(keeper,event,x,y){
 const box=keeper.getBoundingClientRect();
 return insideAdventureGate(box,event.clientX,event.clientY)||insideAdventureGate(box,x,y);
}
function finishRoomDrag(event,cancel=false){
 const d=roomDrag;if(!d||event.pointerId!==d.pointerId)return;roomDrag=null;clearTimeout(d.timer);const active=d.active,place=active&&shouldPlace(d.gesture)&&!cancel,mergeTarget=place?mergeTargetUnder(d,{x:event.clientX,y:event.clientY}):null;
 if(active){event.preventDefault();event.stopImmediatePropagation();suppressRoomClickUntil=Date.now()+250;suppressDustClickUntil=Date.now()+400;}
 cleanRoomDrag(d);if(!place){if(active)restoreDragAnchor(d);return;}
 const keeper=$('#adventureDoor'),box=d.el.getBoundingClientRect();
 if(d.el.dataset.roomItem==='dust'&&keeper&&overAdventureKeeper(keeper,event,box.x+box.width/2,box.y+box.height/2)){restoreDragAnchor(d);selectDust(state,Number(d.el.dataset.roomId));save();openTrips();return;}
 if(mergeTarget){restoreDragAnchor(d);confirmMerge(mergeTarget.uid,Number(d.el.dataset.roomId));return;}
 const point=fromPlanetScreen({x:parseFloat(d.el.style.left),y:parseFloat(d.el.style.top)});
 const r=moveRoomItem(state,d.el.dataset.roomItem,d.el.dataset.roomId,point.x,point.y);
 if(r.ok){const p=toPlanetScreen(r.position);setItemAnchor(d.el,p.x,p.y);d.el.classList.add('positioned');d.el.style.animation='';if(d.gold){d.gold.classList.add('positioned');d.gold.style.animation='';}save();updateLifeView();toast('원하는 자리에 놓았어요.');}else restoreDragAnchor(d);
}
document.addEventListener('pointerup',e=>finishRoomDrag(e),true);
document.addEventListener('pointercancel',e=>finishRoomDrag(e,true),true);
document.addEventListener('lostpointercapture',e=>{if(roomDrag?.pointerId===e.pointerId)cancelRoomInteraction();},true);
window.addEventListener('blur',cancelRoomInteraction);
document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelRoomInteraction();});
document.addEventListener('contextmenu',e=>{if(e.target.closest?.('[data-room-item]'))e.preventDefault();});
document.addEventListener('keydown',event=>{
 if(event.key==='Escape'){if(!$('#modal').classList.contains('hidden')){close();return;}cancelRoomInteraction();clearMoveReady();if(placementMode){placementMode=false;render();}return;}
 const el=event.target.closest?.('[data-room-item]');if(!el||!event.altKey||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;
 event.preventDefault();const x=parseFloat(el.style.left)+(event.key==='ArrowLeft'?-2:event.key==='ArrowRight'?2:0),y=parseFloat(el.style.top)+(event.key==='ArrowUp'?-2:event.key==='ArrowDown'?2:0),point=fromPlanetScreen({x,y}),r=moveRoomItem(state,el.dataset.roomItem,el.dataset.roomId,point.x,point.y);
 if(r.ok){const p=toPlanetScreen(r.position);setItemAnchor(el,p.x,p.y);el.classList.add('positioned');save();updateLifeView();}
});
function clearFurnitureActions(){
 document.getElementById('furnitureActions')?.remove();
 }
document.addEventListener('click',event=>{
 if(event.target.closest('[data-upgrade-furniture]'))return;
 clearFurnitureActions();
 const item=event.target.closest('.decor[data-room-item="furniture"]');
 if(!item||placementMode||Date.now()<suppressRoomClickUntil)return;
 showFurnitureActions(item);
});
function showFurnitureActions(item){
 const crafted=item.hasAttribute('data-trip-item'),i=Number(item.dataset.tripItem);
 const f=crafted?destinations[i]:FURNITURE.find(entry=>entry.id===item.dataset.roomId);
 if(!f)return;
 hideDustPopup();
 const host=item.closest('.room-playfield').querySelector('#dustPopup');
 const lv=crafted?journal(state).levels[i]:furnitureLevel(state,f.id);
 const price=crafted?(lv<10?tripUpgradePrice(lv):null):upgradeCost(state,f.id);
 const name=crafted?f.furniture:f.name,art=crafted?tripFurnitureArt(i,lv):furnitureArt(f.id,lv);
 const effect=crafted?`${f.name} 탐험 골드 +${lv-1}`:furnitureEffect(state,f.id);
 const storyAttr=crafted?`data-trip-story="${i}"`:`data-furniture-story="${f.id}:${lv-1}"`;
 const upgradeAttr=crafted?`data-trip-upgrade="${i}"`:`data-upgrade-furniture="${f.id}"`;
 const label=price===null?'최고 레벨':`업그레이드 · ${price} 골드`;
 const clue=crafted?(price===null?'최고 레벨에 도달했어요.':`${price}골드로 Lv.${lv+1}이 되면 ${f.name} 탐험 골드가 +${lv}가 돼요.`):price===null?'모든 이야기가 열렸어요. 책을 눌러 다시 읽어보세요.':`${price}골드로 Lv.${lv+1}이 되면 ‘${FURNITURE_STORIES[f.id][lv][0]}’ 이야기가 열려요.`;
 host.innerHTML=`<section id="furnitureActions" class="care-dock care-panel compact-dock" aria-labelledby="furniturePopupName"><div class="compact-top"><div class="compact-profile"><span class="furniture-portrait">${art}</span><div><div class="compact-name"><h2 id="furniturePopupName">${esc(name)}</h2><b>Lv.${lv}</b></div><p>${esc(effect)}</p></div></div><div class="compact-actions"><button class="text-button" aria-label="이야기 읽기" title="이야기 읽기" ${storyAttr}>${uiIcon("story")}</button><button class="button primary" aria-label="${label}" title="${label}" ${upgradeAttr} ${price===null||state.gold<price?"disabled":""}>${uiIcon(price===null?"check":"upgrade")}</button></div></div>${renderStoryCue(clue)}</section>`;

}
function roomGestureTools(){return `<div class="room-placement"><button class="button ${placementMode?'primary':'secondary'}" id="togglePlacement" aria-pressed="${placementMode}" aria-label="${placementMode?'배치 끝내기':'배치하기'}" title="${placementMode?'배치 끝내기':'배치하기'}">${uiIcon(placementMode?'check':'move')}<span class="desktop-label">${placementMode?'배치 끝내기':'배치하기'}</span></button>${placementMode?`<button id="togglePlacementStars" class="button ${hidePlacementStars?'primary':'secondary'}" aria-label="별 숨기기" aria-pressed="${hidePlacementStars}" title="${hidePlacementStars?'별 다시 표시':'별 숨기기'}">${uiIcon(hidePlacementStars?'eyeOff':'eye')}<span class="desktop-label">${hidePlacementStars?'별 숨김':'별 표시'}</span></button>`:''}<small>${placementMode?'원하는 곳으로 끌어다 놓으세요':'길게 눌러도 옮길 수 있어요'}</small></div>`;}

function furnitureLevelTrack(lv){return `<div class="furniture-level-track" aria-label="설치물 레벨 ${lv} / 10">${Array.from({length:10},(_,i)=>i+1).map(n=>`<i class="${lv>=n?'lit':''}"></i>`).join('')}</div>`;}
function furnitureCard(f){const owned=state.ownedFurniture.includes(f.id),on=installed(state,f.id),lv=furnitureLevel(state,f.id),price=upgradeCost(state,f.id),nextEffect=lv<10?furnitureEffect({...state,ownedFurniture:[...new Set([...state.ownedFurniture,f.id])],furnitureLevels:{...state.furnitureLevels,[f.id]:lv+1||1}},f.id):null;return `<article class="furniture-card ${on?'placed':''}"><div class="furniture-picture" style="--furniture-color:${f.color}">${furnitureArt(f.id,lv||1)}<span>${on?'우리 은하계에 있어요':owned?'보관 중 · 효과 쉼':'새로운 살림'} · ${owned?'Lv.'+lv+' / 10':'퀘스트 보상'}</span></div><div class="furniture-info"><span class="effect-badge">${furnitureEffect(state,f.id)}</span><h2>${f.name}</h2>${furnitureLevelTrack(lv)}${nextEffect?`<p class="next-furniture-effect">${owned?'다음 단계':'처음 놓으면'} · ${nextEffect}</p>`:'<p class="next-furniture-effect">모든 효과와 이야기가 열렸어요.</p>'}<p>${owned?FURNITURE_STORIES[f.id][lv-1][0]:'처음 놓는 날, 이 설치물의 첫 이야기가 시작돼요.'}</p>${owned?`<button class="button primary full" data-upgrade-furniture="${f.id}" ${price===null||state.gold<price?'disabled':''}>${price===null?'Lv.10 · 가장 포근한 모습':price+' 골드 · Lv.'+(lv+1)+'로 업그레이드'}</button>`:''}<div class="furniture-toolbar"><button class="button secondary" ${owned?`data-furniture="${f.id}"`:`data-quest-guide="furniture:${f.id}"`}>${on?'회수하기':owned?'은하계에 설치':'획득 퀘스트 보기'}</button><button class="text-button" data-furniture-story="${f.id}:${Math.max(0,lv-1)}">이야기 ${lv} / 10 ↗</button></div></div></article>`;}
const ringNotes=[
 '사진을 펼쳐 놓고도 둘이 앉을 자리가 남네. 딱 이만큼이면 되겠다.',
 '빈자리가 아직 따뜻해. 돌아올 때까지 나도 옆에 앉아 있어야지.',
 '실밥에 초록 가루가 묻었네. 오늘은 어디까지 다녀왔을까?',
 '조금씩 옆으로 구르니까 내 자리까지 생겼어.',
 '고리가 살짝 들썩였어. 이번엔 누가 돌아왔을까?',
 '기운 자리가 금방 보이네. 나는 이 한 땀이 제일 마음에 들어.',
 '어제까진 없던 색이야. 옆자리 친구랑 꼭 닮았네.',
 '저녁빛이 빈자리를 먼저 데워 뒀어. 돌아오면 포근하겠다.',
 '리본이 한쪽으로 기울었네. 별이 묶은 그대로 두고 싶어.',
 '눈을 감고 만져도 처음 기운 자리를 찾을 수 있어.'
];
function furnitureBook(id,index=0){const f=FURNITURE.find(x=>x.id===id);if(!f)return;const lv=furnitureLevel(state,id),i=Math.min(Math.max(index,0),Math.max(0,lv-1)),chapter=FURNITURE_STORIES[id][i];modal(f.name+'의 작은 이야기',`<div class="furniture-story-art" style="--furniture-color:${f.color}">${furnitureArt(id,lv||1)}</div><span class="new-badge">Lv.${lv} / 10 · ${furnitureEffect(state,id)}</span>${lv?`<h3 class="unlocked-story-title">${chapter[0]}</h3><p class="story-body">${chapter[1]}</p>`:'<p>아직 우리 은하계에 오지 않은 설치물예요.<br>별빛 임무에서 보상을 받으면 첫 이야기가 열려요.</p>'} ${id==='rug'&&lv>0?storyNotePanel('나리의 생각',`<p>${esc(ringNotes[i])}</p>`,true):''}${id==='rug'&&lv>0&&i===0?storyNotePanel('루미의 관측 노트 · 장미성운',`<p>사진 속 꽃의 가운데를 들여다보세요. 그곳에는 NGC 2244라는 별무리가 있어요. 이 별들이 내보내는 빛과 항성풍이 주변 가스를 밀어내 가운데에 빈 공간이 생겨요.</p><a href="https://apod.nasa.gov/apod/ap240214.html" target="_blank" rel="noopener noreferrer">NASA에서 장미성운 사진 보기 ↗</a>`):''}<div class="furniture-chapters">${FURNITURE_STORIES[id].map((c,j)=>`<button data-furniture-story="${id}:${j}" ${j>=lv?'disabled':''} class="${i===j&&lv?'current':''}"><b>${j+1}</b><span>${j<lv?c[0]:'Lv.'+(j+1)+'에 열리는 이야기'}</span></button>`).join('')}</div><button class="button secondary full" data-page="shop">작은 상점으로 돌아가기 →</button>`);}

function roomListContent(){const r=currentRoom(state),next=ROOMS[state.roomLevel],milestone=ROOM_CHAPTERS.find(c=>c.level>state.roomLevel),available=ROOM_CHAPTERS.filter(c=>c.level<=state.roomLevel&&!state.roomGrowth.claimed.includes(c.level));return `<p class="rooms-intro">Lv.${state.roomLevel} / 100 · 은하계 ${homeCount(state)} / ${r.capacity}자리 · 보관함 ${r.storage}자리<br>레벨마다 +2마리 · 10레벨마다 새로운 은하계와 이야기</p><section class="room-level-next"><b>${r.name} · 골드 +${r.bonus}%</b><progress value="${state.roomLevel}" max="100" aria-label="은하계 성장 ${state.roomLevel} / 100"></progress><span>✧ ${state.sparkles}개 보유${next?` · 다음 비용 ${next.cost}개`:''}</span><button class="button primary full" data-upgrade-room ${!next||state.sparkles<next.cost?'disabled':''}>${next?`${state.sparkles<next.cost?`반짝이 ${next.cost-state.sparkles}개 부족`:`Lv.${next.level} · ${next.capacity}자리로 넓히기`}`:'200마리의 작은 우주 완성'}</button><small>${milestone?`다음 큰 변화 Lv.${milestone.level} · ${milestone.name} · ${milestone.reward}`:'마지막 이야기를 다시 읽고 특별 장식을 확인해요.'}</small></section>${state.roomGrowth.legacyRoutes?'<p class="room-legacy-note">이전 레벨과 별·설치물·생산 보너스·열린 모험을 유지해요. 정원보다 많은 친구도 사라지지 않아요.</p>':''}${available.length?`<div class="room-unclaimed"><b>새 이야기와 보상 ${available.length}개</b>${available.map(c=>`<button class="button secondary" data-room-chapter="${c.level}">Lv.${c.level} · ${c.title} ↗</button>`).join('')}</div>`:''}<div class="room-decades">${[{level:0,name:'작은 쉼터',title:'처음 펼친 성단 지도',reward:'첫 두 자리에서 시작해요'},...ROOM_CHAPTERS].map(c=>{const lo=c.level||1,hi=c.level===100?100:c.level===0?9:c.level+9,open=state.roomLevel>=lo,claimed=c.level&&state.roomGrowth.claimed.includes(c.level);return `<details><summary><b>Lv.${lo}${hi>lo?'–'+hi:''} · ${c.name}</b><span>${open?claimed?'✓':c.level?'이야기 열림':'성장 중':'⌑'}</span></summary><p>${c.reward}</p>${c.level?`<button class="button secondary" data-room-chapter="${c.level}" ${open?'':'disabled'}>${claimed?'이야기 다시 읽기':'이야기와 보상 보기'}</button>`:'<button class="text-button" data-room-story="1">첫 은하계의 이야기 읽기 ↗</button>'}${claimed?`<button class="button secondary" data-room-decor="${state.roomGrowth.decor===c.level?0:c.level}">${state.roomGrowth.decor===c.level?'장식 넣어두기':'보상 장식 놓기'}</button>`:''}<div class="room-level-grid">${ROOMS.slice(lo-1,hi).map(v=>`<span class="${v.level===state.roomLevel?'current':''}"><b>Lv.${v.level}</b><small>${v.capacity}자리</small><small>${v.level===1?'시작':'✧ '+v.cost}</small></span>`).join('')}</div></details>`;}).join('')}</div>`;}
function openRooms(){modal('은하계 성장 지도',`<button class="text-button mission-return" data-quest-guide="progress">← 별빛 임무</button><div id="roomList">${roomListContent()}</div>`);roomDialogOpen=true;$('.modal-card').classList.add('rooms-dialog');}
function refreshRooms(){if(roomDialogOpen&&$('#roomList'))$('#roomList').innerHTML=roomListContent();}
function roomStory(index){if(index<0||index>=state.roomLevel||!ROOMS[index])return;if(index>=9)return roomChapter(Math.floor((index+1)/10)*10);modal(ROOMS[0].storyTitle,`<p class="story-body">${ROOMS[0].story}</p><button class="button primary full" data-room-memory>작은 쉼터의 기억 복원하기 →</button><button class="button secondary full" data-open-rooms>은하계 목록으로 →</button>`);}
function roomChapter(n){const firstRead=!state.roomGrowth.read.includes(n);if(!readRoomChapter(state,n))return;save();const c=ROOM_CHAPTERS.find(c=>c.level===n),claimed=state.roomGrowth.claimed.includes(n);modal(c.title,`<div class="room-story-cover" style="--room-color:${c.color}"><span>⌂</span><b>Lv.${n} · ${c.name}</b></div>${fieldPage(roomPage(n),firstRead)||storyParagraph(c.body,firstRead,'story-body')}<p>${c.reward}</p>${n===70?'<p>조합 단서 · 반짝 그룹 + 희귀 재료 + 별가루 8개. 작은 별의 온기를 따라가 보세요.</p>':''}<button class="button primary full" data-room-reward="${n}" ${claimed?'disabled':''}>${claimed?'✓ 보상 받음':'이야기 보상 받고 장식 놓기'}</button><button class="button secondary full" data-open-rooms>은하계 목록으로 →</button>`);}
function ornamentArt(n){const shapes={10:'<path d="M22 72V30a28 28 0 0 1 56 0v42ZM50 4v68M22 40h56"/>',20:'<path d="M22 75Q10 12 78 18Q82 76 22 75ZM22 75l42-42"/>',30:'<path d="M15 55L50 18l35 37M25 48v35h50V48M43 83V61h14v22"/>',40:'<rect x="13" y="12" width="74" height="76" rx="8"/><path d="M50 70V40M50 55Q20 25 28 62M50 53Q80 25 72 62"/>',50:'<path d="M50 5l13 28 31 3-23 22 7 31-28-15-28 15 7-31L6 36l31-3Z"/>',60:'<path d="M50 5v17M30 25h40l10 52H20ZM30 83h40M50 37v24M43 50h14"/>',70:'<circle cx="50" cy="50" r="31"/><path d="M20 30l18 3M65 20l-4 19M80 65l-18-2M35 80l4-18"/>',80:'<path d="M5 22Q50 45 95 22M18 28v38M50 34v38M82 28v38"/><path d="M8 45h20v25H8ZM40 50h20v25H40ZM72 45h20v25H72Z"/>',90:'<path d="M70 15a35 35 0 1 0 15 58A31 31 0 0 1 70 15ZM18 76Q5 55 23 51Q26 34 42 48Q67 38 70 65Q88 80 18 76Z"/>',100:'<ellipse cx="50" cy="50" rx="43" ry="18" transform="rotate(-25 50 50)"/><circle cx="50" cy="50" r="23"/><path d="M22 15v12M16 21h12M82 74v12M76 80h12"/>'};return `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[n]||''}</svg>`;}
function roomOrnament(){const n=state.roomGrowth.decor,c=ROOM_CHAPTERS.find(c=>c.level===n);return c?`<button class="room-growth-ornament ornament-${n}" data-room-chapter="${n}" aria-label="${c.reward} · 이야기 다시 보기">${ornamentArt(n)}</button>`:'';}
function guestButton(){const v=roomGuest(state);return v?.ready?`<button class="room-guest" data-room-guest aria-label="방문한 별 손님 · 안부 선물 받기">${dustArt(['crumb','pink','violet','soot','puff'][v.index],0)}<span aria-hidden="true">✧</span></button>`:'';}
function openRoomGuest(){const v=roomGuest(state);if(!v)return;const r=claimRoomGuest(state);if(!r.ok)return toast('오늘의 손님에게 이미 안부를 받았어요.');save();render();modal('잠깐 쉬어가도 될까요?',`${dustArt(['crumb','pink','violet','soot','puff'][v.index],0)}<p>“이 길에서 주웠어. 너희 은하계에 놓으면 좋을 것 같아서.”</p><p>${find(ESSENCES,r.essence).name} 정수 1개를 받았어요.<br>새 손님은 한국 시간 자정에 찾아와요.</p><button class="button secondary full" data-open-rooms>함께 자란 은하계 이야기 보기 →</button>`);}
function roomFairy(){return state.fairyOwned?`<button class="room-fairy" id="fairyCollect" aria-label="요정 모아 · 골드 모두 받기"><span class="fairy-aura" aria-hidden="true"></span>${icon('fairy')}<b>골드 모으는 모아</b><small id="fairyStatus">골드 모두 받기</small></button>`:'';}


function windowSpot(){
 const open=currentRoom(state).theme>=1;
 return `<div class="life-window galaxy-portal ${open?'window-open':'window-closed'}" aria-label="${open?'열린 별빛 창가':'별빛 창가'}">
  <svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="19"/><ellipse cx="26" cy="26" rx="10" ry="19" transform="rotate(37 26 26)"/><path d="M26 20v12m-6-6h12"/></svg>
  <span>별빛 창가</span></div>`;
}
function storyReaction(d){return roomStoryReaction(state,d,{near:nearFavorite(state,d),other:storyCompanion(state,d)});}
function lifeClass(d){const pair=companionship(state,d),r=storyReaction(d);return [nearFavorite(state,d)&&characterProfile(d.id)?'character-active character-'+d.id:'',nearFavorite(state,d)?'cozy':'',pair?'social-'+pair.kind:'',r.settled?'story-settled':'',r.keepsake?'story-traveler':'',r.text?'story-speaking':''].filter(Boolean).join(' ');}
function lifeLabel(d){const reaction=storyReaction(d);if(reaction.text)return reaction.text;if(nearFavorite(state,d)&&characterProfile(d.id))return characterProfile(d.id).words;const pair=companionship(state,d);return pair?(pair.kind==='nap'?'zzz · 함께 낮잠':'♪ 함께 놀아요'):nearFavorite(state,d)?'♡ 여기 좋아':'';}
function storyKeepsake(d){return `<span class="story-keepsake" data-story-keepsake="${d.uid}" title="함께 다녀온 항로의 표식" aria-hidden="true">${uiIcon('mail')}</span>`;}
function lifeBubble(d){return `<span class="life-bubble" data-life-bubble="${d.uid}" aria-hidden="true">${esc(lifeLabel(d))}</span>`;}
function preferenceDetails(id,resident){
 const p=personality(id),pair=resident&&companionship(state,resident);
 const action=resident?`<button class="text-button" data-cozy-place="${resident.uid}">${state.decorations.includes(p.favorite.id)?'좋아하는 설치물 곁에 놓기':'좋아하는 설치물 찾기'} →</button>`:'';
 return `<div class="preference-detail"><span>${p.mood.name}</span><h3>${uiIcon('heart')} 좋아하는 설치물 · ${p.favorite.name}</h3><p>${resident&&nearFavorite(state,resident)?p.favorite.action:`“${p.favorite.words}”`}</p>${pair?`<small>${esc(dustName(pair.other))} 곁에서 ${pair.label}</small>`: ''}<small>가까이 두면 특별한 반응을 보여요.<br>이 설치물을 Lv.3으로 키우면 함께한 추억도 열려요.</small>${action}</div>`;
}
function dailyWishesContent(){
 const wishes=roomResidents(state).map(d=>({d,w:smallWish(state,d)}));
 wishes.sort((a,b)=>Number(a.w.done)-Number(b.w.done)||Number(b.w.ready)-Number(a.w.ready));
 return `<h3 id="dailyWishesTitle">별들의 오늘의 부탁</h3><p>한국 시간 자정에 바뀌어요.</p>${wishes.length?wishes.map(({d,w})=>{
  const installed=state.decorations.includes(personality(d.id).favorite.id);
  return `<article class="daily-wish"><div><b>${esc(dustName(d))}</b><p>“${esc(w.text)}”</p></div>${w.done?'<small>✓ 완료</small>':w.ready?`<button class="button primary" data-claim-wish="${d.uid}">고마움 받기 · ✧ ${w.reward}</button>`:w.kind===0&&!installed?'<button class="text-button" data-page="shop">설치물 찾기</button>':`<button class="button secondary" data-place-wish="${d.uid}">${w.kind===0?'설치물 곁에 놓기':w.kind===1?'창가에 놓기':'친구 곁에 놓기'}</button>`}</article>`;
 }).join(''):'<p>은하계에 머무는 별이 생기면 부탁이 여기에 나타나요.</p>'}`;
}
function refreshDailyWishes(uid){
 const list=$('#dailyWishes');if(!list)return;
 const focused=list.contains(document.activeElement);
 list.innerHTML=dailyWishesContent();
 if(focused)(list.querySelector(`[data-claim-wish="${uid}"]`)||list).focus({preventScroll:true});
}
function placeForWish(uid){const d=roomResidents(state).find(x=>x.uid===uid);if(!d)return;const w=smallWish(state,d),p=personality(d.id);let target;
 if(w.kind===0){if(!state.decorations.includes(p.favorite.id))return go('shop');const a=state.roomPositions.furniture[p.favorite.id]||DEFAULT_DECOR[p.favorite.id];target={x:Math.max(8,Math.min(92,a.x-8)),y:Math.min(90,a.y+7)};}
 else if(w.kind===1)target={x:68,y:22};else{const other=inRoom(state).find(x=>x.uid!==d.uid);if(!other)return;const a=roomSpot(state,other);target={x:Math.min(92,a.x+9),y:a.y};}
 const r=moveRoomItem(state,'dust',d.uid,target.x,target.y);if(r.ok){observeLife(state);save();render();refreshDailyWishes(uid);toast('원하는 자리에 놓았어요.');}}
function updateLifeView(){if(page!=='room')return;
 for(const el of document.querySelectorAll('.room-dust')){const d=state.dusts.find(x=>x.uid===Number(el.dataset.dust));if(!d)continue;const classes=lifeClass(d);for(const c of ['cozy','social-nap','social-play','character-active','story-settled','story-traveler','story-speaking',...Object.keys(CHARACTERS).map(id=>'character-'+id)])el.classList.toggle(c,classes.includes(c));const bubble=el.querySelector('[data-life-bubble]');if(bubble)bubble.textContent=lifeLabel(d);}
 const active=selected();
 for(const el of document.querySelectorAll('.decor'))el.classList.toggle('favorite-decor',!!active&&personality(active.id).favorite.id===el.dataset.roomId);
 const badge=$('#lifeUnread');if(badge){const count=state.life.journal.filter(e=>!e.seen).length;badge.textContent=count?'+'+count:'';}
 const postcardCount=$('#postcardCount');if(postcardCount)postcardCount.textContent=state.life.postcards.length;
}
function dailySparkleButton(d){return `<button class="daily-sparkle" data-daily-sparkle="${d.uid}" aria-label="${esc(getDust(d.dustId).name)} · 반짝이 ${d.amount||1}개 받기" title="별이 흘린 반짝이 +${d.amount||1}" style="left:${d.x}%;top:${toPlanetScreen(d).y}%"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3Q18 13 29 16Q18 19 16 29Q13 19 3 16Q13 13 16 3Z" fill="var(--color-sparkle-fill)" stroke="var(--color-sparkle-edge)" stroke-width="1.4"/><circle cx="16" cy="16" r="2" fill="var(--color-sparkle-core)"/></svg>${d.amount>1?`<small>+${d.amount}</small>`:''}</button>`;}
function dailySparkleButtons(){return state.dailySparkles.drops.map(dailySparkleButton).join('');}
function syncDailySparkleButtons(){
 const layer=$('#dailySparkleDrops');
 if(!layer)return;
 const drops=new Map(state.dailySparkles.drops.map(drop=>[String(drop.uid),drop]));
 // Keep the existing nodes and their animation state while the drops are available.
 for(const button of [...layer.children]){
  if(!drops.delete(button.dataset.dailySparkle))button.remove();
 }
 for(const drop of drops.values())layer.insertAdjacentHTML('beforeend',dailySparkleButton(drop));
}
function earnDailySparkle(button,event){
 if(placementMode)return;
 const result=collectDailySparkle(state,Number(button.dataset.dailySparkle));
 if(!result.ok)return;

 $('#sparkles').textContent=state.sparkles;
 const displayed=showCurrencyGain(button,[['sparkle',result.amount]],event);
 syncDailySparkleButtons();
 save();
 updateGoalUI();
 sounds.play('gold');
 if(!displayed)toast('별이 남긴 작은 빛, 반짝이 +'+result.amount,'sparkle');
}
function updateDailySparkleUI(){
 const layer=$('#dailySparkleDrops');
 if(!layer||saveBlocked||roomDrag||!$('#modal').classList.contains('hidden'))return;
 const now=Date.now(),created=dropDailySparkles(state,now,d=>roomSpot(state,d));
 const auto=placementMode?{amount:0,changed:false}:autoCollectDailySparkles(state,now);
 if(created.length||auto.changed)save();
 if(auto.amount){
  $('#sparkles').textContent=state.sparkles;
  updateGoalUI();
  toast('유리병이 반짝이 '+auto.amount+'개를 모았어요.','sparkle');
 }
 if(created.length||auto.amount)syncDailySparkleButtons();
}
function tickLife(){const now=Date.now();if(now-lifeLastTick<2000)return;lifeLastTick=now;const events=observeLife(state,now);if(events.length)save();if(!roomDrag?.active){updateLifeView();updateDailySparkleUI();}}
function lifeBook(){readLife(state);save();updateLifeView();modal('은하계 생활 수첩',`<div class="life-book-intro"><span>은하계에서 남긴 기록</span><p>설치물과의 추억, 친구와의 첫 만남, 들어준 부탁이 차곡차곡 쌓여요.</p><button class="text-button" data-postcards>모험 엽서함 ${state.life.postcards.length} / 150 ↗</button></div><div class="life-timeline">${state.life.journal.length?state.life.journal.map(e=>`<article class="life-entry ${e.kind}"><span>${uiIcon(e.kind==='offline'?'moon':e.kind==='postcard'?'mail':'heart')}</span><div><small>${lifeDate(e.at)} · ${{offline:'부재 중 이야기',postcard:'모험에서 온 소식',favorite:'오래 함께한 설치물',friend:'친구와의 발견',wish:'작은 부탁',story:'이야기 다음의 하루'}[e.kind]}</small><h3>${esc(e.title)}</h3><p>${esc(e.text).replaceAll('\n','<br>')}</p>${e.storyUid&&state.dusts.some(d=>d.uid===e.storyUid)?`<button class="text-button" data-shared-entry="${e.storyUid}|afterword:${e.afterwordKind}">${afterwordRecord(state,{uid:e.storyUid},e.afterwordKind)?.read?'후일담 다시 읽기':'후일담 읽고 변화 만나기'}</button>`:''}${e.kind==='offline'?'<small>자리를 비운 사이 별들이 남긴 이야기예요.</small>':''}</div></article>`).join(''):`<div class="empty-life"><span>${uiIcon('journal')}</span><p>아직 첫 페이지가 비어 있어요.</p><small>친구들을 가까이 놓거나 작은 부탁을 들어주세요.<br>좋아하는 설치물 Lv.3 곁에서도 추억이 시작돼요.</small></div>`}</div><p class="life-footnote">생활 기록은 최근 120개, 발견한 엽서·추억·후일담은 계속 보관해요.</p>`);$('.modal-card').classList.add('life-dialog');}
function lifeDate(at){return new Intl.DateTimeFormat('ko-KR',{timeZone:'Asia/Seoul',month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(at);}
function postcardPaper(p,isNew=false){return `<article class="postcard-paper"><div class="postcard-heading"><span>FROM A TINY FRIEND</span><i>${uiIcon('mail')}</i></div><small>${isNew?'새로운 엽서 · ':''}${find(QUESTS,p.route).name}에서 · ${personality(p.dustId).mood.name}</small><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p><footer>너에게, ${getDust(p.dustId).name} 보냄<span>${lifeDate(p.at)}</span></footer></article>`;}
function postcardBook(){collectionTab='postcards';go('collection');}
function renderPostcards(){const routes=postcardRoute==='all'?QUESTS:QUESTS.filter(q=>q.id===postcardRoute);return `<div class="postcard-summary"><span>${uiIcon('mail')}</span><b>${state.life.postcards.length}<small> / 150장</small></b><p>같은 길도 친구마다 다르게 기억해요.<br>종류·장소마다 한 장씩, 받은 엽서는 계속 간직해요.</p></div><div class="route-collection-grid">${QUESTS.map(routeCard).join('')}</div><div class="collection-filters">${[['all','모든 장소'],...QUESTS.map(q=>[q.id,q.name])].map(([id,name])=>`<button class="filter-choice" data-postcard-route="${id}" aria-pressed="${postcardRoute===id}">${name}</button>`).join('')}<button class="filter-choice filter-toggle" data-missing-postcards aria-pressed="${postcardShowMissing}">${postcardShowMissing?'받은 엽서만 보기':'아직 없는 엽서도 보기'}</button></div>${routes.map(q=>{const data=routeCollection(state,q.id);return `<section class="route-postcards"><h2>${q.name} <small>${data.letters.length} / 50장</small></h2><div class="postcard-grid">${data.letters.map(p=>`<button class="postcard-thumb" data-postcard="${p.id}" style="--postcard-color:${getDust(p.dustId).color}"><span>${dustArt(p.dustId,0)}</span><small>${q.name}에서</small><b>${esc(p.title)}</b><i>${getDust(p.dustId).name} 보냄 ↗</i></button>`).join('')}${postcardShowMissing?data.missing.map(d=>`<button class="postcard-thumb missing-letter" data-postcard-plan="${q.id}:${d.id}"><span>${dustArt(d.id,knownDust(state,d.id)?0:2,knownDust(state,d.id)?'':'silhouette')}</span><small>아직 도착하지 않은 엽서</small><b>${knownDust(state,d.id)?d.name:'아직 모르는 친구'}</b><i>${copies(d.id).length?'이 친구의 모험 준비하기':'친구의 수집 단서 보기'} ↗</i></button>`).join(''):''}</div>${!data.letters.length&&!postcardShowMissing?'<p class="empty-letter-note">아직 받은 엽서가 없어요. 위에서 이 길에 처음 보낼 친구를 찾아보세요.</p>':''}</section>`;}).join('')}`;}

function openPostcard(id){const p=state.life.postcards.find(x=>x.id===id);if(!p)return;modal('너에게 보내는 안부.',`${dustArt(p.dustId,0)}${postcardPaper(p)}<button class="button secondary full" data-postcards>모은 별 · 엽서로 돌아가기 →</button>`);}

function readyMissionRewards(){
 const furniture=FURNITURE.filter(item=>furnitureQuest(state,item.id).ready).length;
 const chapters=ROOM_CHAPTERS.filter(chapter=>chapter.level<=state.roomLevel &&
  state.roomGrowth.read.includes(chapter.level) && !state.roomGrowth.claimed.includes(chapter.level));
 return {furniture,chapters,count:furniture+chapters.length};
}
function missionFairyArt(){
 return `<svg viewBox="0 0 56 48" aria-hidden="true">
  <path class="mission-wing mission-wing-left" d="M19 24C9 9 2 17 7 27c3 5 7 6 13 5Z" fill="#e5def4" stroke="#a69cb9" stroke-width="1.3"/>
  <path class="mission-wing mission-wing-right" d="M37 24c10-15 17-7 12 3-3 5-7 6-13 5Z" fill="#e5def4" stroke="#a69cb9" stroke-width="1.3"/>
  <path d="M13 24c0-9 6-15 15-15s15 6 15 15-6 15-15 15-15-6-15-15Z" fill="#c9bce5" stroke="#9686b0" stroke-width="1.4"/>
  <path d="m28 2 2 4 4 1-4 2-2 4-2-4-4-2 4-1Z" fill="#f8de8e" stroke="#b99f63" stroke-width="1"/>
  <circle cx="23" cy="23" r="1.5" fill="#615478"/><circle cx="33" cy="23" r="1.5" fill="#615478"/>
  <path d="M26 27q2 2 4 0" fill="none" stroke="#615478" stroke-width="1.1" stroke-linecap="round"/>
  <path d="M18 32q5-3 10 1 5-4 10-1v10q-5-2-10 2-5-4-10-2Z" fill="#fff4d7" stroke="#9c8fa3" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="M28 34v8" stroke="#9c8fa3" stroke-width="1.2"/>
  <path class="mission-page" d="M28 34q4-4 10-2v9q-5-2-10 1Z" fill="#fff9ea" stroke="#9c8fa3" stroke-width=".8"/>
 </svg>`;
}
function questGuide(){
 const {count}=readyMissionRewards();
 const label=count ? `별빛 임무지기 나리 · 받을 보상 ${count}개` : '별빛 임무지기 나리';
 return `<button type="button" class="quest-guide${count?' has-reward':''}" id="roomQuestGuide" data-quest-guide aria-label="${label}" aria-haspopup="dialog" title="별빛 임무 열기">
 ${missionFairyArt()}<span>별빛 임무지기 나리</span>${count?`<i class="quest-reward-count" aria-hidden="true">${count}</i>`: ''}</button>`;
}
function openQuestGuide(focusSection){
 const ready=readyMissionRewards();
 goalHTML=goalPanelContent();
 const notice=ready.count ? `<section class="mission-ready-notice" data-shimmer-region>
   ${storyParagraph(`지금 받을 수 있는 보상이 ${ready.count}개 있어요.`,true)}
   ${ready.furniture ? '<button class="text-button" data-quest-guide="furniture">설치물 보상 보기</button>' : ''}
   ${ready.chapters.length ? `<button class="text-button" data-room-chapter="${ready.chapters[0].level}">은하계 기록 보상 보기</button>` : ''}
 </section>` : '';
 modal('별빛 임무지기 나리',`${notice}<section class="growth-journey" id="goalPanel" aria-label="지금 할 일과 다음 보상">${goalHTML}</section>
 ${missionProgress()}
 ${furnitureMissions()}
 <section class="daily-wishes mission-section" id="dailyWishes" tabindex="-1" aria-labelledby="dailyWishesTitle">${dailyWishesContent()}</section>
 <section class="mission-section collection-clue" id="missionCollection" tabindex="-1" aria-labelledby="missionCollectionTitle">
   <h3 id="missionCollectionTitle">다음 수집 단서</h3>${collectionTargetContent()}
 </section>`);
 $('.modal-card').classList.add('quest-guide-dialog');
 updateGoalUI();
 if(focusSection==='collection')$('#missionCollection').focus();
 if(focusSection==='progress')$('#missionProgress').focus();
 if(focusSection?.startsWith('furniture')){
  $('#furnitureMissions').open=true;
  const id=focusSection.split(':')[1];
  (id?document.getElementById('furniture-mission-'+id):$('#furnitureMissions summary'))?.focus();
 }
}
function furnitureMissions(){
 const quests=FURNITURE.map(f=>furnitureQuest(state,f.id));
 const pending=quests.filter(q=>!q.owned).sort((a,b)=>Number(b.ready)-Number(a.ready));
 const ready=pending.filter(q=>q.ready).length;
 return `<details class="mission-section" id="furnitureMissions"><summary>설치물 퀘스트 · 보유 ${quests.length-pending.length}/${quests.length}${ready?' · 받을 보상 '+ready+'개':''}</summary>
 <div class="furniture-missions">${pending.length?pending.map(({f,condition,ready})=>`<article id="furniture-mission-${f.id}" tabindex="-1" class="daily-wish">${furnitureArt(f.id)}<div><b>${f.name}</b><p>${condition}</p>${f.id==='rug'?'<p>나리의 부탁 · 별들이 나란히 앉도록 행성 고리를 펴 주세요.</p>':''}</div>${ready?`<button class="button primary" data-claim-furniture="${f.id}">받기</button>`:'<small>진행 중</small>'}</article>`).join(''):'<p>모든 설치물 보상을 받았어요.</p>'}</div>
 </details>`;
}
function receiveFurniture(id){
 const reward=claimFurnitureQuest(state,id);
 if(!reward.ok)return toast(reward.message);
 if(id==='rug')toggleFurniture(state,id);
 save();render();
 if(id==='rug')furnitureBook(id,0);
 else openQuestGuide('furniture');
 toast(reward.furniture.name+'을 받았어요.','check');
}
function goalPanelContent(){
 const goal=nextGoal(state),steps=firstSteps(state),gold=goldOverview(state),first=steps.some(s=>!s.done),costText=n=>goal.currency==='gold'?`${n} 골드`:goal.currency==='sparkles'?`반짝이 ${n}개`:`친구 ${n}마리`;
 const cost=goal.currency==='free'?'<b>무료</b>':`<b>${costText(goal.cost)} 필요</b><span>보유 ${costText(goal.have)} · ${goal.missing?costText(goal.missing)+' 더 모으면 돼요':'준비됐어요'}</span>`;
 return `${offlineReturn?`<div class="return-reward"><span>☀</span><div><b>돌아오셨어요. ${gold.ready?gold.ready+' 골드가 기다려요.':'별들이 골드를 모으고 있어요.'}</b><p>은하계에 남은 별만 최대 30분 누적 · 머리 위 골드를 눌러 받아요.</p></div><button class="text-button" data-dismiss-offline aria-label="돌아온 소식 닫기">${uiIcon('close')}</button></div>`:''}<div class="journey-top"><span class="journey-eyebrow">${first?'은하계 첫 임무':'다음 은하계 임무'}</span><button class="text-button" data-economy>생산량 · 가격표 ↗</button></div><ol class="journey-steps">${steps.map((step,i)=>`<li class="${step.done?'complete':step.id===goal.id?'current':''}"><span>${step.done?'✓':i+1}</span>${step.label}${step.done?'<small>완료</small>':''}</li>`).join('')}</ol>${fieldPage(questPage(goal))}<div class="journey-content" data-shimmer-region><div><h2>${esc(goal.title)}</h2>${storyParagraph(goal.description,true)}<div class="journey-reward"><span>✧ 다음에 얻어요</span><b>${esc(goal.reward)}</b></div></div><div class="journey-action"><div class="goal-cost">${cost}</div><button class="button primary" data-next-goal ${goal.action==='birth'&&state.pending?'disabled':''}>${esc(goal.cta)} →</button></div></div><div class="journey-footer"><span>◉ ${gold.ready?`받을 골드 ${gold.ready} · 머리 위 골드 누르기`:'별이 은하계에서 골드를 모으고 있어요'}${gold.capped?' · 한도에 찬 친구 '+gold.capped+'마리':''}</span><span>접속 중·미접속 모두 최대 30분 누적</span></div>`;
}
function updateGoalUI(){
 const panel=$('#goalPanel');
 if(!panel)return;
 panel.classList.toggle('journey-established',firstSteps(state).every(step=>step.done));
 const html=goalPanelContent();
 if(html===goalHTML)return;

 const previous=panel.querySelector('.observation-disclosure');
 const focused=previous?.contains(document.activeElement) ? document.activeElement.tagName : null;
 const wasOpen=previous?.open;
 const next=document.createElement('template');
 next.innerHTML=html;
 goalHTML=html;
 const oldFooter=panel.querySelector('.journey-footer');
 const newFooter=next.content.querySelector('.journey-footer');
 const oldReturn=panel.querySelector('.return-reward');
 const newReturn=next.content.querySelector('.return-reward');
 const stableChildren=container=>[...container.children].filter(node=>!node.matches('.journey-footer, .return-reward'));
 const oldChildren=stableChildren(panel);
 const newChildren=stableChildren(next.content);
 if(oldFooter && newFooter && oldChildren.length===newChildren.length &&
    oldChildren.every((node,index)=>node.textContent===newChildren[index].textContent &&
      node.querySelector('button')?.disabled===newChildren[index].querySelector('button')?.disabled)){
  oldFooter.replaceWith(newFooter);
  if(oldReturn && newReturn)oldReturn.querySelector('b').textContent=newReturn.querySelector('b').textContent;
  else if(oldReturn)oldReturn.remove();
  else if(newReturn)panel.prepend(newReturn);
  return;
 }
 panel.replaceChildren(next.content);
 storyEffects.refresh();

 const note=panel.querySelector('.observation-disclosure');
 if(!note||note.textContent!==previous?.textContent)return;
 if(wasOpen){
  note.classList.add('observation-restored');
  note.open=true;
  note.addEventListener('toggle',()=>{
   if(!note.open)note.classList.remove('observation-restored');
  });
 }
 if(focused)note.querySelector(focused.toLowerCase())?.focus({preventScroll:true});
}

function openStoryRecipe(d){
 const info=getDust(d.id);
 openMix({group:info.group,rarity:info.rarity,essence:info.essence});
}
function prepareFirstStory(uid){
 const d=state.dusts.find(star=>star.uid===uid);
 if(!d)return followGoal();
 if(mergeCandidates(state,uid).length)return openMerge(uid);
 const matching=state.dusts.filter(star=>star.uid!==uid&&star.id===d.id&&star.xp<10);
 const incoming=d.stored?d:matching.find(star=>star.stored);
 if(incoming&&hasHomeSpace(state)){
  const result=takeOutDust(state,incoming.uid);
  if(!result.ok)return toast(result.message);
  save();render();
  return prepareFirstStory(uid);
 }
 if(incoming)return chooseStorySeat(d,incoming);
 const away=matching.find(star=>isAway(state,star.uid));
 if(away)return state.deskRun?.uid===away.uid?openSurvey():openAdventures();
 if(!hasHomeSpace(state))return chooseStorySeat(d);
 return openStoryRecipe(d);
}
function chooseStorySeat(d,incoming){
 const residents=inRoom(state);
 const matching=incoming?.uid===d.uid?residents.filter(star=>star.id===d.id&&star.xp<10):[];
 const protectedUid=matching.length===1?matching[0].uid:null;
 const candidates=residents.filter(star=>star.uid!==d.uid&&star.uid!==protectedUid);
 if(!candidates.length){
  return modal('첫 이야기 준비하기',`<p>모험 중인 별의 자리도 남겨두고 있어요. 돌아온 친구를 맞이하면 자리를 정할 수 있어요.</p>
   <button class="button primary full" ${state.deskRun?'data-open-survey':'data-open-adventure'}>${state.deskRun?'탐사 이어가기':'루미의 모험 소식 보기'}</button>`);
 }
 if(!incoming&&!hasStorageSpace(state)){
  return modal('첫 이야기 준비하기','<p>보관함도 가득 찼어요. 은하계를 넓히면 새 친구를 위한 자리가 생겨요.</p><button class="button primary full" data-open-rooms>성장 지도 보기</button>');
 }
 const name=esc(dustName(incoming||d));
 modal('첫 이야기 준비하기',`<div class="story-seat">
  <p>${incoming?name+'를 은하계로 데려오려면':name+'와 같은 별을 맞이하려면'} 자리가 하나 필요해요. 보관함에서 잠시 쉴 별을 골라주세요.</p>
  <div class="merge-options">${candidates.map(star=>{
   const label=esc(dustName(star))+(copies(star.id).length>1?' #'+(copies(star.id).findIndex(copy=>copy.uid===star.uid)+1):'');
   return `<button type="button" class="merge-option" data-story-seat="${star.uid}" aria-label="${label} 보관함으로 옮기기">${dustPortrait(star)}<span><b>${label}</b><small>Lv.${level(star.xp)} · 이야기 ${star.readStories.length}편 읽음</small></span><i>보관함으로 →</i></button>`;
  }).join('')}</div>
  <small>보관함에서도 레벨과 이야기는 그대로예요.</small>
 </div>`,()=>{
  for(const button of document.querySelectorAll('[data-story-seat]')){
   button.onclick=()=>{
    const outgoingUid=Number(button.dataset.storySeat);
    const result=incoming?swapStoredDust(state,incoming.uid,outgoingUid):storeDust(state,outgoingUid);
    if(!result.ok)return toast(result.message);
    save();render();
    prepareFirstStory(d.uid);
   };
  }
 });
}

function followGoal(){
 const goal=nextGoal(state);
 if(goal.action==='birth')return openMix();
 if(goal.action==='story')return storyBook(goal.uid);
 if(goal.action==='merge')return openMerge(goal.uid);
 if(goal.action==='match-stored')return prepareFirstStory(goal.uid);
 if(goal.action==='match-survey')return openSurvey();
 if(goal.action==='duplicate')return prepareFirstStory(goal.uid);
 if(goal.action==='pet'){go('room');focusRoomDust(goal.uid);toast('별을 누르고 하트 버튼을 눌러 주세요.');return;}
 if(goal.currency==='sparkles'&&goal.missing){go('room');toast('별을 선택하고 하트를 눌러 반짝이를 모아요. 조합 재료·방·요정에 사용할 수 있어요.');return;}
 if(goal.currency==='gold'&&goal.missing){go('room');toast(goldOverview(state).ready?'별 머리 위의 골드를 눌러 받아요.':'별이 모으는 중이에요. 쓰다듬거나 다른 친구도 만나보세요.');return;}
 if(goal.action==='rug')return receiveFurniture('rug');
 if(goal.action==='room-chapter')return roomChapter(goal.chapter);
 if(goal.action==='room')return openRooms();
 if(goal.action==='adventure')return openAdventures();
 if(goal.action==='storage')return go('storage');
 return go(goal.action==='collection'?'collection':'shop');
}
function economyTable(headers,rows){return `<div class="economy-table-wrap" tabindex="0" role="region" aria-label="${headers[0]} 표 · 옆으로 밀어 보기"><table class="economy-table"><thead><tr>${headers.map(x=>`<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((x,i)=>i?`<td>${x}</td>`:`<th scope="row">${x}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function economyBook(){
 const residents=goldOverview(state).entries,baseState={...state,roomLevel:1,decorations:[]};
 const baseRows=RARITIES.map(r=>{const samples=DUSTS.filter(d=>d.rarity===r.id).map(d=>baseGoldInterval(d)/1000);return [r.name,`${Math.min(...samples)}~${Math.max(...samples)}초`,`${goldAmount(baseState,{...DUSTS.find(d=>d.rarity===r.id),xp:0})} 골드`];});
 const currentRows=residents.map(p=>[getDust(p.dust.id).name+` <small>Lv.${level(p.dust.xp)}</small>`,`${goldInterval(state,p.dust)/1000}초`,`${goldAmount(state,p.dust)} 골드`,`${p.amount} 골드${p.capped?' · 가득 참':''}`]);
 modal('성장과 골드 안내',`<div class="economy-book"><p class="economy-lead">지금 할 일은 접힌 퀘스트에서 이어가요.<br>아래 표는 실제 게임에 적용된 수치예요.</p><section><h3>처음 만나는 세 걸음</h3><p>새 게임은 60 골드와 반짝이 6개로 시작해요. 기존 기록의 재화는 그대로 유지해요.</p>${economyTable(['행동','필요한 재화','얻는 것'],[['별 탄생','무료 · 재료 없이 랜덤','별 1마리'],['첫 이야기','같은 종류 Lv.1 두 마리 합치기','첫 이야기 해금'],['첫 설치물','별의 첫 이야기 읽기','합치기 반짝이 +1 · 설치물 이야기']])}<p>같은 종류 두 마리를 합치면 더 높은 쪽보다 한 레벨 올라요. Lv.2~6에서 이야기가 한 편씩 열려요. 쓰다듬어 얻은 반짝이는 재료·방·요정을 사고, 설치물은 별빛 임무에서 받고, 골드는 강화에 써요.</p></section><section class="offline-policy"><h3>골드는 최대 30분까지 쌓여요</h3><p>은하계에 남은 별이 접속 중에도, 창을 닫은 동안에도 모아요. 별별 30분에 해당하는 <b>완성된 생산 횟수</b>까지만 쌓이며, 한도에 도달하면 받을 때까지 쉬어요. 한도에 못 찼다면 받기 전의 미완성 시간은 이어져요.</p><p><b>받는 방법</b> 머리 위 골드를 눌러 개별 수령해요. 모아를 구매하면 한 번에 받을 수 있어요. 보관함·모험 중에는 생산이 멈추고 이미 쌓인 보상과 남은 시간은 보존돼요. 돌아왔다고 자동 지급되지는 않아요.</p><small>예: Lv.1 솔라 · 기본 20초마다 1 골드 → 최대 90회, 90 골드. 레벨·방·설치물에 따라 실제 수치가 달라져요. 기기 시간을 기준으로 계산해요.</small></section><section><h3>골드 생산량</h3><p>기본값은 Lv.1 · 작은 쉼터 · 설치물 없음 기준이에요. 같은 희귀도 안에서도 별마다 간격이 달라요.</p>${economyTable(['희귀도','기본 생산 간격','1회 생산'],baseRows)}<p>레벨·은하계·설치물 효과를 적용한 1회 생산량을 ${GOLD_PRODUCTION_DIVISOR}으로 나누고 올림해요. 항법 비콘은 생산 시간을 줄여요. 오르골 반짝이는 모인 횟수와 관계없이 별별 <b>수령 한 번에</b> 지급돼요.</p>${currentRows.length?`<h4>지금 우리 은하계 · 적용된 효과 포함</h4>${economyTable(['별','생산 간격','1회 생산','지금 받을 양'],currentRows)}`:'<p>은하계에 쉬는 별이 오면 현재 생산량이 여기에 표시돼요.</p>'}<details><summary>50종 기본 생산표 펼치기</summary>${economyTable(['별','희귀도','생산 간격','1회 생산'],DUSTS.map(d=>[d.name,find(RARITIES,d.rarity).name,`${baseGoldInterval(d)/1000}초`,`${goldAmount(baseState,{...d,xp:0})} 골드`]))}</details></section><section><h3>설치물 획득 · 업그레이드</h3><p>퀘스트 보상은 Lv.1로 받아요. 업그레이드는 모든 설치물에 같은 비용이 적용되며, Lv.10까지 순서대로 키워요. 넣어두기·다시 놓기는 무료예요.</p>${economyTable(['설치물','획득 퀘스트','처음 놓았을 때'],FURNITURE.map(f=>[f.name,furnitureQuest(state,f.id).condition,furnitureEffect({...state,ownedFurniture:[f.id],furnitureLevels:{[f.id]:1}},f.id)]))}${economyTable(['업그레이드','비용','열리는 것'],Array.from({length:9},(_,i)=>i+2).map(l=>[`Lv.${l-1} → ${l}`,`${upgradeCost({...state,ownedFurniture:['rug'],furnitureLevels:{rug:l-1}},'rug')} 골드`,`설치물 효과 강화 · ${l}번째 이야기`]))}<p>Lv.1에서 Lv.10까지 강화에 총 3,700 골드가 들어요.</p></section><section><h3>다음 은하계의 반짝이 비용과 보상</h3><p>한 단계씩 업그레이드해요. 아래는 이전 은하계에서 올라가는 비용이에요.</p>${economyTable(['방','업그레이드','골드 보너스','방 / 보관함'],ROOMS.filter(r=>r.level===1||r.level%10===0).map((r)=>[`Lv.${r.level} ${r.name}`,r.level>1?'반짝이 '+r.cost+'개':'시작 방',`+${r.bonus}%`,`${r.capacity} / ${r.storage}자리`]))}</section><section><h3>반짝이로 만나는 요정과 조합 재료</h3>${economyTable(['구매 항목','비용'],[['골드 요정 모아',`반짝이 ${FAIRY_PRICE}개 · 한 번 구매`],['그룹 재료 1개','반짝이 8개'],['보통 / 특별 / 희귀 재료 1개',`반짝이 ${materialPrice('rarity','common',state)} / ${materialPrice('rarity','rare',state)} / ${materialPrice('rarity','legend',state)}개`],['정수 1개','반짝이 3개']])}<p>확정 조합은 그룹 1개 + 희귀도 1개 + 정수 3 / 5 / 8개를 사용해요. 전부 상점에서 산다면 반짝이 보통 ${8+materialPrice('rarity','common',state)+9} · 특별 ${8+materialPrice('rarity','rare',state)+15} · 희귀 ${8+materialPrice('rarity','legend',state)+24}개예요. 조합대를 놓으면 위 가격에 할인이 반영돼요. 모험으로도 재료를 모을 수 있고, 랜덤 탄생은 계속 무료예요.</p></section><button class="button primary full" data-page="room">우리 은하계에서 목표 이어가기 →</button></div>`);
 $('.modal-card').classList.add('economy-dialog');
}

function missionProgress(){
 const memory=memoryProgress(state);
 return `<section class="mission-section mission-progress" id="missionProgress" tabindex="-1" aria-labelledby="missionProgressTitle">
  <h3 id="missionProgressTitle">은하계 진행도</h3>
  <button type="button" class="mission-entry" data-room-memory>${uiIcon('story')}<b>작은 쉼터의 기억</b><small>${memory.complete?'복원 완료':`기억 ${memory.pieces}/3`}</small></button>
  <button type="button" class="mission-entry" data-open-rooms>${uiIcon('planet')}<b>은하계 성장 지도</b><small>Lv.${state.roomLevel} / 100</small></button>
 </section>`;
}
function memoryDecor(){return state.roomMemory.claimed&&state.roomMemory.placed?`<div class="memory-mobile" role="img" aria-label="기억 복원 보상 · 귀가의 별모빌"><svg viewBox="0 0 110 100" aria-hidden="true"><path d="M55 0V22M23 33Q55 10 87 33M23 33V55M55 22V70M87 33V52" fill="none" stroke="#b6a66e" stroke-width="2"/><g fill="#edce64" stroke="#beaa60"><path d="m23 48 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z"/><path d="m55 62 4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1Z"/><path d="m87 46 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/></g></svg><small>귀가의 별모빌</small></div>`:'';}
function openRoomMemory(index=null){
 const firstRead=index!==null&&!state.roomMemory.read.includes(index);let chapter=null,result=null;
 if(index!==null){result=readRoomMemory(state,index);if(!result.ok)return toast('앞의 기억을 읽고 표시된 행동을 완료해주세요.');chapter=result.chapter;save();render();}
 const m=state.roomMemory,progress=memoryProgress(state);
 modal('작은 쉼터의 기억',`<button class="text-button mission-return" data-quest-guide="progress">← 별빛 임무</button><div class="memory-book"><p class="memory-intro">자라는 온기, 남겨둔 자리, 돌아오는 바람.<br>세 조각을 모아 루미의 별지도를 함께 완성해요.</p><div class="memory-progress"><b>기억 조각 ${progress.pieces} / 3</b><span>읽은 이야기 ${m.read.length} / 5 · ${m.claimed?'복원 완료':'복원 중'}</span></div>${chapter?`<article class="memory-chapter"><small>${index===0?'프롤로그':index===4?'마지막 기억':'기억 '+index}</small><h3>${esc(chapter.title)}</h3>${storyParagraph(chapter.body,firstRead)}${observationNote(memoryPage(index)[2],memoryPage(index)[3],true)}${result.reward?'<b>✧ 귀가의 별모빌을 받았어요. 은하계에 걸어두었어요.</b>':''}</article>`:''}<ol class="memory-chapters">${ROOM_MEMORY.map((c,i)=>{const read=m.read.includes(i),open=read||i===progress.next&&progress.canRead;return `<li><button data-memory-chapter="${i+1}"${index===i?' aria-current="true"':''} ${open?'':'disabled'}><span>${i===0?'시작':i===4?'완성':'0'+i}</span><div><b>${c.title}</b><small>${read?'읽음 · 다시 읽기':open?i===4?'마지막 기억 읽고 장식 받기':'새 기억 읽기':i<4&&m.unlocked.includes(i)?'행동 완료 · 앞의 기억을 먼저 읽어요':c.condition}</small></div><i>${uiIcon(open?'arrow':'lock')}</i></button></li>`;}).join('')}</ol>${chapter?'<button class="text-button" data-room-memory>기억 목록 보기</button>':''}<div class="memory-reward"><b>완성 보상 · 귀가의 별모빌</b><p>이 은하계로 돌아오는 친구를 맞이하는 특별 장식이에요. 생산 효과는 없으며, 한 번만 받아요. 은하계를 바꿔도 기억과 장식은 남아요.</p>${m.claimed?`<button class="button secondary full" data-memory-decor>${m.placed?'별모빌 잠시 넣어두기':'별모빌 은하계에 걸기'}</button>`:'<small>별 Lv.2 · 설치물 Lv.2 · 모험 귀환 보상 수령 후, 다섯 이야기를 차례로 읽으면 받아요.</small>'}</div>${!progress.complete&&!progress.canRead?`<button class="button primary full" ${progress.next===2?'data-page="shop"':progress.next===3?'data-open-adventure':'data-page="room"'}>${progress.next===2?'상점에서 설치물 업그레이드':progress.next===3?'루미에게 모험 알아보기':'은하계에서 별 키우기'} →</button>`:''}</div>`);
 $('.modal-card').classList.add('memory-dialog');
}

function characterArt(d,settled=false){
 const {id}=d, c=characterProfile(id), art=dustPortrait(d,settled);
 if(!c||level(d.xp)<5)return art;
 const prop={dance:'♪ ♫',sleep:'z Z',roll:'✦'}[c.motion];
 return `<span class="character-performance motion-${c.motion}" style="--character-face:${getDust(id).face}">${art}${characterFace(id)}${prop?`<span class="character-prop prop-${c.motion}" aria-hidden="true">${prop}</span>`:''}</span>`;
}
function placeFavorite(uid){const d=roomResidents(state).find(x=>x.uid===uid);if(!d)return;const p=personality(d.id);if(!state.decorations.includes(p.favorite.id))return go('shop');const a=state.roomPositions.furniture[p.favorite.id]||DEFAULT_DECOR[p.favorite.id];const r=moveRoomItem(state,'dust',d.uid,Math.max(8,Math.min(92,a.x-8)),Math.min(90,a.y+7));if(r.ok){observeLife(state);save();go('room');document.querySelector(`[data-dust="${d.uid}"]`)?.scrollIntoView({block:'center',behavior:reduced.matches?'instant':'smooth'});}}
function nicknameDialog(uid){const d=state.dusts.find(d=>d.uid===uid);if(!d)return;modal('너만의 작은 이름',`<p>${esc(getDust(d.id).name)}에게 불러줄 별명을 지어주세요.<br>같은 종류도 각각 다른 이름을 가질 수 있어요.</p><form id="nicknameForm"><label class="nickname-label" for="nicknameInput">별명 · 최대 12자</label><input id="nicknameInput" class="nickname-input" value="${esc(d.nickname||'')}" autocomplete="off" placeholder="예: 몽실이"><p id="nicknameError" role="status"></p><button class="button primary full" type="submit">이 이름으로 부르기</button></form><button class="text-button" id="clearNickname">원래 이름으로 돌아가기</button>`,()=>{const input=$('#nicknameInput');input.focus();input.select();$('#nicknameForm').onsubmit=e=>{e.preventDefault();const r=renameDust(state,uid,input.value);if(!r.ok){$('#nicknameError').textContent=r.message;return;}save();close();render();toast(r.name+'! 반가워.');};$('#clearNickname').onclick=()=>{renameDust(state,uid,'');save();close();render();};});}

function characterFace(id){const c=characterProfile(id),left='<ellipse cx="41" cy="48" rx="2.5" ry="3.6"/>',right='<ellipse cx="59" cy="48" rx="2.5" ry="3.6"/>',closed='<path d="M37 47Q41 52 45 47M55 47Q59 52 63 47" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',wink='<path d="M55 48Q59 53 63 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>';
 return `<svg class="character-face" viewBox="0 0 100 100" aria-hidden="true"><g fill="currentColor">${c.face==='wink'?left+wink:c.face==='blush'?left+right:closed}${c.face==='blush'?'<g opacity=".28"><ellipse cx="33" cy="55" rx="5" ry="2.5"/><ellipse cx="67" cy="55" rx="5" ry="2.5"/></g>':''}${c.face==='sleep'?'<ellipse cx="50" cy="59" rx="2.5" ry="2"/>':'<path d="M45 57Q50 63 55 57" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>'}</g></svg>`;}

function collectionTargetContent(){
 const d=targetDust(state);
 if(!d)return `<section class="collection-target target-refined target-complete"><p>모든 별의 흔적을 발견했어요. 친구들과 다녀온 여행을 엽서로 모아보세요.</p><button class="button primary target-detail-button" data-postcards>모험 엽서 살펴보기</button></section>`;
 const known=knownDust(state,d.id),need=materialNeeds(state,d.id).find(n=>n.key==='essence'),ready=!need.missing;
 return `<section class="collection-target target-refined" aria-label="다음에 만날 별의 단서"><header class="target-intro"><div class="target-portrait">${dustArt(d.id,known?0:2,known?'':'silhouette')}</div><div><span class="target-catalog">도감 ${String(DUSTS.indexOf(d)+1).padStart(2,'0')} · ${known?'발견한 별':'미발견'}</span><h4>${known?esc(d.name):'새로운 별의 흔적'}</h4></div></header><p class="target-description">${known?'만난 순간 조합법을 기록했어요. 모은 재료로 같은 친구를 다시 만날 수 있어요.':recipeHint(d.id)}</p><div class="target-requirements"><div class="target-resource"><b>${find(ESSENCES,d.essence).name} 정수</b><span class="target-readiness ${ready?'is-ready':'is-missing'}">${ready?'재료 준비 완료':need.missing+'개 더 필요해요'}</span></div><dl class="target-material-counts"><div><dt>필요</dt><dd>${need.need.toLocaleString('ko-KR')}개</dd></div><div><dt>보유</dt><dd>${need.have.toLocaleString('ko-KR')}개</dd></div></dl></div><div class="target-actions"><button class="button primary target-detail-button" ${known?'data-recipe="'+d.id+'"':'data-detail="'+d.id+'"'}>${known?'기록한 조합으로 만나기':'단서 살펴보기'}</button>${state.collectionBook.target?'<button class="text-button target-recommend" data-clear-target>다른 친구 추천받기</button>':''}</div></section>`;
}
function recipeRecord(d){const needs=materialNeeds(state,d.id);return `<div class="recorded-recipe"><span>발견한 조합법 · 랜덤으로 만나도 기록돼요</span><div>${needs.map(n=>{const list={group:GROUPS,rarity:RARITIES,essence:ESSENCES}[n.key];return `<span>${icon(n.id)}<b>${find(list,n.id).name} ×${n.need}</b><small>보유 ${n.have}${n.missing?' · '+n.missing+'개 부족':''}</small></span>`;}).join('')}</div></div>`;}
function renderRecipeJournal(){return `<p class="collection-intro">만난 친구의 조합을 자동으로 기록해요. 방·보관함·모험 어디에 있어도 기록은 남아요.<br>아직 모르는 조합은 실루엣의 단서로 추리해보세요.</p><div class="recipe-journal">${DUSTS.filter(d=>knownDust(state,d.id)).map(d=>`<article><div class="recipe-journal-title">${dustArt(d.id,0)}<h2>${d.name}</h2></div>${recipeRecord(d)}<button class="button secondary full" data-recipe="${d.id}">이 조합으로 만나기 →</button></article>`).join('')}</div>`;}
function renderThemes(){return `<p class="collection-intro">같은 종류를 여러 마리 모아도 한 종류로 세어요. 테마의 친구들을 모두 만나면 특별한 장식을 한 번 받아요.<br>장식은 생산 효과가 없으며 넣어두었다 다시 놓을 수 있어요.</p><div class="theme-grid">${THEMES.map(t=>{const p=themeProgress(state,t.id),placed=state.collectionBook.placed.includes(t.id);return `<article class="theme-card" style="--theme-color:${t.color}"><div class="theme-card-title">${themeArt(t.id)}<div><h2>${t.name}</h2><p>${t.description}</p></div></div><div class="theme-progress"><b>${p.found.length} / ${t.members.length}종</b><span>${p.claimed?'장식을 받았어요':p.complete?'장식이 준비됐어요':p.missing.length+'종을 더 만나면 완성'}</span></div><div class="growth-track"><i style="width:${p.found.length/t.members.length*100}%;background:${t.color}"></i></div><div class="theme-members">${t.members.map(id=>{const d=getDust(id),known=knownDust(state,id);return `<button data-detail="${id}" aria-label="${known?d.name:'미발견 도감 '+(DUSTS.indexOf(d)+1)} · 수집 단서">${dustArt(id,known?0:2,known?'':'silhouette')}<small>${known?d.name:'?'}</small></button>`;}).join('')}</div><div class="theme-prize"><span>꾸미기 보상 · ${t.reward}</span>${p.claimed?`<button class="button secondary full" data-theme-decor="${t.id}">${placed?'은하계에서 잠시 넣어두기':'은하계에 다시 놓기'}</button>`:`<button class="button primary full" data-claim-theme="${t.id}" ${p.complete?'':'disabled'}>${p.complete?'완성 장식 받기':'친구들을 모으면 받을 수 있어요'}</button>`}</div>${!p.complete?`<button class="text-button" data-collect-target="${p.missing[0]}">이 테마의 다음 친구를 목표로 →</button>`:''}</article>`;}).join('')}</div>`;}
function routeCard(q){const r=routeCollection(state,q.id),d=r.candidates[0];return `<article class="route-collection-card"><span class="kicker">${q.name}</span><h3>엽서 ${r.letters.length} / 50장</h3>${rewardChips(q)}<p>${d?esc(dustName(d))+'에게 이 길의 엽서를 아직 받지 못했어요.':r.missing.length?'보관함의 친구를 꺼내거나 새로운 친구에게 이 길을 소개해보세요.':'이 길의 모든 엽서를 모았어요!'}</p><button class="button secondary full" data-plan-route="${q.id}" ${routeUnlocked(state,q.id)?'':'disabled'}>${routeUnlocked(state,q.id)?'이 길로 모험 준비하기 →':'은하계 Lv.'+routeUnlockLevel(q.id)+'에서 열려요'}</button><small>목적지만 정해요. 별을 루미 앞으로 옮기고 출발을 확인해주세요.</small></article>`;}
function prepareCollectionAdventure(route,uid=null){if(!chooseKeeperRoute(state,route).ok)return;const d=uid?state.dusts.find(d=>d.uid===uid):routeCollection(state,route).candidates[0];if(d&&!d.stored&&!isAway(state,d.uid))state.selectedUid=d.uid;save();close();go('room');openRouteDispatch();}
function themeArt(id){const shape=id==='neighbors'?'<rect x="12" y="17" width="76" height="64" rx="6" fill="#f4e6bf" stroke="#b5a477" stroke-width="4"/><g fill="#e4be6c"><circle cx="33" cy="41" r="9"/><circle cx="58" cy="41" r="9"/><circle cx="32" cy="64" r="9"/><circle cx="56" cy="64" r="9"/><circle cx="76" cy="53" r="8"/></g>':id==='forest'?'<path d="M6 18Q50 56 94 18" stroke="#a3b28b" fill="none" stroke-width="3"/><g fill="#acc58d"><ellipse cx="23" cy="38" rx="8" ry="16" transform="rotate(-30 23 38)"/><ellipse cx="50" cy="48" rx="8" ry="16"/><ellipse cx="77" cy="38" rx="8" ry="16" transform="rotate(30 77 38)"/></g>':'<circle cx="50" cy="48" r="36" fill="#e9e2bd" opacity=".3"/><path d="M64 18A32 32 0 1 0 80 66A31 31 0 0 1 64 18" fill="#e7d68f" stroke="#b6a573" stroke-width="2"/><path d="m77 20 3 6 7 1-5 5 1 7-6-4-6 4 1-7-5-5 7-1Z" fill="#cfbdde"/>';return `<svg viewBox="0 0 100 100" aria-hidden="true">${shape}</svg>`;}
function themeDecorations(){return `<div class="theme-room-decor" aria-label="테마 수집으로 받은 장식">${THEMES.filter(t=>state.collectionBook.placed.includes(t.id)).map(t=>`<span class="theme-room-item theme-${t.id}" role="img" aria-label="수집 완성 보상 · ${t.reward}">${themeArt(t.id)}</span>`).join('')}</div>`;}

function readLocal(key){try{return localStorage.getItem(key);}catch{return null;}}
function persistPreferences(){try{localStorage.setItem(PREFS_KEY,JSON.stringify(userPrefs));if($('#optionsStatus'))$('#optionsStatus').textContent='설정을 저장했어요.';return true;}catch{if($('#optionsStatus'))$('#optionsStatus').textContent='설정 저장이 어려워요. 이 화면에서만 적용돼요.';return false;}}
function applyPreferences(){document.documentElement.classList.toggle('reduce-motion',reduced.matches);document.documentElement.classList.toggle('simple-effects',!userPrefs.visualEffects);document.querySelectorAll('svg').forEach(svg=>{try{if(reduced.matches)svg.pauseAnimations?.();else svg.unpauseAnimations?.();}catch{}});}
function downloadText(text,name){const url=URL.createObjectURL(new Blob([text],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function quickStart(){
 modal('별과 함께하는 첫날',`
  <div class="first-day">
   <div class="first-day-progress" role="img" aria-label="첫날 안내 1 / 3">
    <i class="is-current"></i><i></i><i></i>
   </div>
   <section class="first-day-welcome" data-first-day-page>
    <div class="first-day-art" aria-hidden="true">${dustArt('crumb',0)}</div>
    <h3 tabindex="-1">솔라에게 인사해요</h3>
    <p>“${esc(firstGreeting(getDust('crumb')))}”</p>
   </section>
   <section class="first-day-guide" data-first-day-page hidden>
    <h3 tabindex="-1">별과 노는 법</h3>
    <ul class="first-day-list">
     <li><span aria-hidden="true">♡</span><div><b>쓰다듬기</b><p>별을 선택하고 하트 버튼을 눌러요.</p></div></li>
     <li><span aria-hidden="true">↔</span><div><b>합치기와 이동</b><p>별을 길게 눌러 같은 종류 위로 끌면 합쳐져요. 빈 곳에 놓으면 이동해요.</p></div></li>
     <li><span aria-hidden="true">✧</span><div><b>새 별 만나기</b><p>은하계의 작은 빛을 눌러 무료로 새 별을 만날 수 있어요.</p></div></li>
    </ul>
    <details class="first-day-details">
     <summary>골드 · 반짝이 · 저장</summary>
     <p><b>골드</b>는 별 머리 위 동전을 눌러 받아요. 최대 30분까지 쌓여요.</p>
     <p><b>반짝이</b>는 별이 매일 기본 1개씩 바닥에 흘려요. 한국 시간 자정에 갱신되고, 태양광 집광기로 개수를 늘릴 수 있어요.</p>
     <p><b>기록</b>은 이 브라우저에 저장돼요. 기기를 옮기기 전에 ‘작은 기록’에서 내보내 주세요.</p>
    </details>
   </section>
   <section class="first-day-guide" data-first-day-page hidden>
    <h3 tabindex="-1">은하계의 요정들</h3>
    <ul class="first-day-list">
     <li><span aria-hidden="true">${missionFairyArt()}</span><div><b>별빛 임무지기 나리</b><p>다음 할 일을 알려줘요. 받을 보상이 있으면 빛나요.</p></div></li>
     <li><span aria-hidden="true">${icon('keeper')}</span><div><b>탐험 요정 루미</b><p>별을 탐험에 보내고, 돌아오면 선물을 건네줘요.</p></div></li>
     <li><span aria-hidden="true">${icon('fairy')}</span><div><b>골드 요정 모아</b><p>작은 상점에서 만나면 골드를 한 번에 받아줘요.</p></div></li>
    </ul>
   </section>
   <div class="first-day-actions">
    <button type="button" class="button primary" id="beginPlaying">은하계로 가기</button>
    <button type="button" class="button primary" id="firstDayContinue" hidden>요정 만나기</button>
    <button type="button" class="text-button" id="firstDayExplore">조작과 요정 둘러보기</button>
    <button type="button" class="text-button" id="firstDayBack" hidden>이전</button>
   </div>
  </div>`,()=>{
   const pages=[...document.querySelectorAll('[data-first-day-page]')];
   const deck=$('.first-day');
   const progress=deck.querySelector('.first-day-progress');
   let index=0;
   let swipe=null;

   deck.addEventListener('touchstart',event=>{
    const touch=event.touches[0];
    const onControl=event.target.closest('button, a, summary, input, select, textarea');
    swipe=event.touches.length===1 && !onControl
     ? {id:touch.identifier,x:touch.clientX,y:touch.clientY,axis:null}
     : null;
   },{passive:true});
   deck.addEventListener('touchmove',event=>{
    if(!swipe)return;
    if(event.touches.length!==1){swipe=null;return;}
    if(swipe.axis)return;
    const touch=event.touches[0];
    const dx=Math.abs(touch.clientX-swipe.x);
    const dy=Math.abs(touch.clientY-swipe.y);
    if(Math.max(dx,dy)>=12)swipe.axis=dx>dy*1.4 ? 'x' : 'y';
   },{passive:true});
   deck.addEventListener('touchend',event=>{
    if(!swipe)return;
    const start=swipe;
    swipe=null;
    const touch=Array.from(event.changedTouches).find(item=>item.identifier===start.id);
    if(!touch || event.touches.length || start.axis==='y')return;
    const dx=touch.clientX-start.x;
    const dy=touch.clientY-start.y;
    if(Math.abs(dx)<48 || Math.abs(dx)<Math.abs(dy)*1.4)return;
    showPage(index+(dx<0 ? 1 : -1));
   },{passive:true});
   deck.addEventListener('touchcancel',()=>{swipe=null;},{passive:true});

   function showPage(next){
    if(next<0 || next>=pages.length || next===index)return;
    index=next;
    pages.forEach((page,i)=>{page.hidden=i!==index;});
    [...progress.children].forEach((dot,i)=>dot.classList.toggle('is-current',i===index));
    progress.setAttribute('aria-label',`첫날 안내 ${index+1} / ${pages.length}`);
    $('#beginPlaying').hidden=index===1;
    $('#firstDayContinue').hidden=index!==1;
    $('#firstDayExplore').hidden=index!==0;
    $('#firstDayBack').hidden=index===0;
    pages[index].scrollTop=0;
    pages[index].querySelector('h3').focus({preventScroll:true});
   }

   $('#beginPlaying').onclick=()=>{
    close();
    if(page!=='room')go('room');
   };
   $('#firstDayExplore').onclick=()=>showPage(1);
   $('#firstDayContinue').onclick=()=>showPage(2);
   $('#firstDayBack').onclick=()=>showPage(index-1);
  });
 introOpen=true;
}
function recoveryNotice(){modal('기존 기록을 보호하고 있어요.',`<p>저장된 기록을 읽지 못했어요. 원본을 덮어쓰지 않았어요.<br>원본을 먼저 내려받거나, 내보내 둔 정상 기록을 불러와주세요.</p><button class="button primary full" id="rescueOriginal">원본 기록 내보내기</button><button class="button secondary full" id="rescueSettings">작은 기록 열기</button>`,()=>{$('#rescueOriginal').onclick=()=>downloadText(damagedRaw,'original-dust-record.json');$('#rescueSettings').onclick=settings;});}
async function previewImportFile(file){if(!file)return;if(file.size>MAX_SAVE_BYTES)return toast('5MB 이하의 기록 파일을 골라주세요.');try{previewImportText(await file.text(),'파일에서 불러오기');}catch{toast('파일을 읽지 못했어요. 현재 기록은 유지돼요.');}}
function previewImportText(raw,title){let imported;try{imported=decodeSave(raw);}catch(e){return toast(/[가-힣]/.test(e.message)?e.message:'이 게임에서 내보낸 정상 기록을 골라주세요. 현재 기록은 유지돼요.');}const info=saveSummary(imported.state),prefs=imported.preferences||userPrefs;modal(title,`<p>불러올 기록을 먼저 확인해주세요.<br>현재 기록을 바꾸기 전에 복구용 기록 한 개를 남겨요.</p><dl class="import-summary"><div><dt>함께한 별</dt><dd>${info.types}종 · ${info.dusts}마리</dd></div><div><dt>은하계와 설치물</dt><dd>은하계 Lv.${info.room} · 설치물 ${info.furniture}종</dd></div><div><dt>읽은 이야기 · 엽서</dt><dd>${info.stories}편 · ${info.postcards}장</dd></div><div><dt>보유 골드</dt><dd>${info.gold}</dd></div></dl><button class="button secondary full" id="exportBeforeImport">현재 기록 먼저 내보내기</button><button class="button primary full" id="applyImport">이 기록으로 불러오기</button><button class="text-button" id="cancelImport">취소 · 현재 기록 유지</button>`,()=>{$('#exportBeforeImport').onclick=()=>downloadText(damagedRaw||encodeSave(state,userPrefs),'before-import-dusts.json');$('#cancelImport').onclick=settings;$('#applyImport').onclick=()=>{try{commitImport(localStorage,KEY,imported.state,prefs,damagedRaw||encodeSave(state,userPrefs));}catch{return toast('기록을 저장할 공간이 부족해요. 현재 기록은 유지했어요.');}state=imported.state;userPrefs=prefs;saveBlocked=false;damagedRaw=null;offlineReturn=Date.now()-state.life.lastSeen>=60000;resumeLife(state);applyPreferences();save();close();go('room');toast('기록을 불러왔어요. 이전 기록도 복구할 수 있어요.');};});}

systemReduced.addEventListener?.('change',()=>{applyPreferences();render();});

function openSurvey(){openTrips('survey');}
function deskEntryCard(){const available=inRoom(state),uid=selected()?.uid;return `<section class="desk-entry"><header class="desk-entry-head"><div class="desk-entry-art" aria-hidden="true"><span>⌁</span><i>✧</i></div><div><span class="kicker">직접 탐사 · 첫 구역</span><h3>외곽 관측소</h3></div></header><div class="desk-entry-body"><p>관측소 잔해 사이를 탐사하고 화물 상자 뒤의 숨은 통로를 찾아요.</p>${state.deskRun?`<p class="desk-resume-note">${esc(dustName(state.dusts.find(d=>d.uid===state.deskRun.uid)))}의 위치와 발견을 저장했어요.</p><button class="button primary full" data-desk-resume>외곽 관측소 탐사 이어가기 →</button>`:`<label class="desk-select-label" for="deskDust">함께 갈 별</label><div class="select-field desk-select"><select id="deskDust" ${available.length?'':'disabled'}>${available.length?'':'<option>선택할 별이 없어요</option>'}${available.map(d=>`<option value="${d.uid}" ${d.uid===uid?'selected':''}>${esc(dustName(d))} · Lv.${level(d.xp)}</option>`).join('')}</select></div><button class="button primary full" data-desk-start ${available.length?'':'disabled'}>${available.length?'이 별과 탐사 시작 →':'은하계에 별을 먼저 데려와 주세요'}</button>`}<button class="text-button" data-desk-history>외곽 관측소 귀환 기록 · ${state.deskArchive.clears}회 완주 ↗</button></div></section>`;}
function beginDesk(){const r=startDesk(state,Number($('#deskDust')?.value));if(!r.ok)return toast(r.message);save();go('explore');}
function pauseDesk(){save();go('room');toast('탐사 위치와 시료를 저장했어요. 루미의 탐험 수첩에서 이어갈 수 있어요.');}
function renderDesk(){const r=state.deskRun,d=state.dusts.find(d=>d.uid===r.uid);return `<section class="desk-page"><header class="desk-heading"><div><span class="kicker">탐사 구역 01</span><h1>외곽 관측소 <small>${esc(dustName(d))}와 함께</small></h1></div><button class="button secondary" data-desk-pause>나중에 계속</button></header><div class="desk-objectives" aria-label="탐사 진행"><span id="deskGoalPush">○ 화물 상자 밀기</span><span id="deskGoalSecret">○ 숨은 통로 발견</span><span id="deskGoalItems">재료 0 / 3</span><small id="deskSeen">지도 탐사율</small></div><div class="desk-frame"><canvas id="deskCanvas" tabindex="0" aria-label="외곽 관측소 탐사 지도. 클릭하거나 터치한 바닥으로 이동합니다. 방향키로도 이동하고, E키로 화물 상자 밀기, 스페이스 키로 재료 줍기가 가능합니다."></canvas></div><p id="deskMessage" class="desk-message" role="status" aria-live="polite">지도에서 이동할 곳을 눌러요.</p><div class="desk-controls"><button class="button secondary" id="deskPush">화물 상자 밀러 가기</button><button class="button secondary" id="deskPick" disabled>가까운 재료 줍기</button><button class="button secondary" id="deskHome">귀환 지점으로 걷기</button><button class="button primary" id="deskExit">은하계로 귀환</button></div><div class="desk-pouch"><span>수집한 시료 <small>귀환하면 재료 가방에 넣어요</small></span><div id="deskPouch"></div></div><p class="desk-input-note">클릭·터치로 이동 · 반짝이는 재료에 다가가면 주워요 · 화물 상자를 누르면 다가가서 밀어요<br>키보드: 방향키 이동 / E 밀기 / Space 줍기 · ‘나중에 계속’으로 중단해도 이어갈 수 있어요.</p></section>`;}
function attachDesk(){const r=state.deskRun,d=state.dusts.find(d=>d.uid===r.uid);deskScene=mountDeskScene({canvas:$('#deskCanvas'),state,onSave:save,onUpdate:updateDesk,onExit:returnDesk,onPause:pauseDesk,reduced:()=>reduced.matches,visuals:()=>userPrefs.visualEffects,sound:kind=>sounds.play(kind),bodyPath:starAppearance(getDust(d.id).shape,stage(d.xp),level(d.xp)).path, growthStage:stage(d.xp),growthLevel:level(d.xp)});}
function updateDesk(p){if(page!=='explore'||!state.deskRun)return;if(p.message)$('#deskMessage').textContent=p.message;const r=state.deskRun,progress=deskProgress(r);$('#deskGoalPush').classList.toggle('complete',progress.pushed);$('#deskGoalSecret').classList.toggle('complete',progress.secret);$('#deskGoalItems').classList.toggle('complete',progress.picked===progress.total);$('#deskGoalPush').textContent=(progress.pushed?'✓ ':'○ ')+'화물 상자 밀기';$('#deskGoalSecret').textContent=(progress.secret?'✓ ':'○ ')+'숨은 통로 발견';$('#deskGoalItems').textContent='재료 '+progress.picked+' / 3';$('#deskSeen').textContent='지도 탐사율 '+progress.seen+'%';$('#deskPush').disabled=progress.pushed;$('#deskPush').textContent=progress.pushed?'화물 상자 밀기 완료':p.canPush?'화물 상자 밀기 →':'화물 상자 밀러 가기';$('#deskPick').disabled=!p.nearItem;$('#deskExit').disabled=!progress.atExit;$('#deskExit').textContent=progress.complete?'재료 챙겨 은하계로 귀환':'은하계로 귀환';const html=r.picked.map(id=>{const i=DESK_ITEMS.find(i=>i.id===id);return `<span>${icon(i.material)}${i.label} ×${i.amount}</span>`;}).join('')||'<small>아직 비어 있어요. 주변의 반짝임을 찾아보세요.</small>';if($('#deskPouch').innerHTML!==html)$('#deskPouch').innerHTML=html;}
function returnDesk(){const result=finishDesk(state);if(!result.ok)return toast(result.message);save();go('room');sounds.play(result.complete?'birth':'gold');modal(result.complete?'외곽 관측소 탐사 완료':'다시 우리 은하계로.',`<div class="desk-return-seal">${result.complete?'✧':'⌂'}</div><p>${result.complete?'화물 상자를 밀고 숨은 길을 찾아,<br>세 가지 재료를 모두 모아 돌아왔어요.':'주머니에 챙긴 재료를 들고 돌아왔어요.<br>다음에는 아직 못 본 틈도 살펴볼까요?'}</p><div class="desk-return-loot">${result.rewards.map(i=>`<span>${icon(i.material)}<b>${i.label} ×${i.amount}</b></span>`).join('')||'<p>이번에는 빈손이지만, 다음 걸음은 조금 덜 낯설 거예요.</p>'}</div>${result.sparkles?`<p>이슬정원의 축하 · 반짝이 +${result.sparkles}</p>`:''}<p class="desk-return-story">${result.complete?'“커다란 물건 사이에도 내 몸 하나 지나갈 길이 있었어. 화물 상자가 비켜준 자리에 작은 이슬이 기다리고 있었어.”':'“나에게는 멀었던 길이, 집에서 보면 은하계에서 보면 작은 궤도 한 바퀴였어.”'}</p><button class="button primary full" id="deskReturnDone">우리 은하계에서 쉬기 →</button><button class="text-button" data-desk-history>귀환 기록 다시 보기</button>`,()=>$('#deskReturnDone').onclick=close);}
function deskHistory(){modal('외곽 관측소의 탐사 일지',`<p>완주 ${state.deskArchive.clears}회 · 최근 귀환 기록을 간직해요.<br>물건을 움직여 찾은 길은 다음 탐사에서도 다시 찾아볼 수 있어요.</p><div class="desk-history">${state.deskArchive.records.map(e=>`<article><b>${esc(e.name)} · ${e.complete?'숨은 길까지 완주':'잠깐의 산책'}</b><small>${new Date(e.at).toLocaleString('ko-KR')}</small><p>${e.items.length?e.items.map(id=>DESK_ITEMS.find(i=>i.id===id).name).join(' · '):'가벼운 주머니로 돌아왔어요.'}</p></article>`).join('')||'<p>아직 첫 발자국을 기다리고 있어요.</p>'}</div><button class="button secondary full" data-open-survey>탐사 구역으로 →</button>`);}

document.addEventListener('change',event=>{if(event.target.matches('[data-record-copy]')){const id=event.target.dataset.recordCopy,uid=Number(event.target.value);detail(id,uid);$('#recordCopy')?.focus();}});

function tripDecor(){
 const j=journal(state);
 return destinations.map((d,i)=>{
  if(!j.placed[i])return '';
  const id='trip-'+i,saved=state.roomPositions.furniture[id];
  const p=saved?toPlanetScreen(saved):{x:[27,67,48][i],y:[68,58,77][i]};
  return `<button class="decor trip-prop" data-room-item="furniture" data-room-id="${id}" data-trip-item="${i}" style="left:${p.x}%;top:${p.y}%;right:auto;bottom:auto;translate:-50% -50%;transform:none" aria-label="${d.furniture} · ${placementMode?'위치 이동':'이야기 읽기'}">${tripFurnitureArt(i,j.levels[i])}</button>`;
 }).join('');
}
function tripFurnitureArt(index,level=1){
 return furnitureArt(destinations[index].art,level);
}
function tripButton(label,attr,enabled=true){
 return `<button class="button secondary" ${attr} ${enabled?'':'disabled'}>${label}</button>`;
}
function blueprintClue(d){
 return renderStoryCue(`${d.name} · Lv.${d.level}${d.essence?' 이슬 정수 별':''} · ‘${d.quests[0]}’ 완료`);
}
function tripShop(){
 const j=journal(state);
 const materials=destinations.map((d,i)=>`<article class="material-card">${icon(d.materialArt)}<h3>${d.material}</h3><p>보유 ${j.stock[i]}개</p>${tripButton(d.price+' '+d.color+' · 1개 구매','data-trip-buy="'+i+'"',(i?state.sparkles:state.gold)>=d.price)}</article>`).join('');
 const designs=destinations.map((d,i)=>{
  if(j.crafted[i])return '';
  const stock=j.stock[i],known=j.blueprints[i];
  return `<article class="furniture-card"><div class="furniture-picture">${tripFurnitureArt(i)}<span>${known?'도안 발견':'미발견 도안'}</span></div><div class="furniture-info"><h2>${d.furniture}</h2>${known?'':blueprintClue(d)}<p class="recipe-material" aria-label="${d.material} 보유 ${stock}개, 필요 ${recipeQuantity}개">${icon(d.materialArt)} ${d.material} <b>${stock} / ${recipeQuantity}개</b></p><button class="button primary full" data-trip-craft="${i}" ${known&&stock>=recipeQuantity?'':'disabled'}>제작하고 놓기</button></div></article>`;
 }).join('');
 return `<section class="shop-materials"><h2>탐험 재료</h2><div>${materials}</div></section><section><h2>가구 제작</h2><div class="furniture-grid">${designs||'<p>탐험 가구를 모두 제작했어요.</p>'}</div></section>`;

}
function ownedFurnitureShelf(){
 const j=journal(state);
 const regular=FURNITURE.filter(f=>state.ownedFurniture.includes(f.id)).map(furnitureCard).join('');
 const crafted=destinations.map((d,i)=>{
  if(!j.crafted[i])return '';
  const lv=j.levels[i],price=tripUpgradePrice(lv);
  return `<article class="furniture-card ${j.placed[i]?'placed':''}"><div class="furniture-picture">${tripFurnitureArt(i,lv)}<span>${j.placed[i]?'우리 은하계에 있어요':'보관 중 · 효과 쉼'} · Lv.${lv} / 10</span></div><div class="furniture-info"><span class="effect-badge">${d.name} 탐험 골드 +${lv-1}</span><h2>${d.furniture}</h2>${furnitureLevelTrack(lv)}<p class="next-furniture-effect">${lv<10?'다음 단계 · 탐험 골드 +'+lv:'최고 레벨에 도달했어요.'}</p><button class="button primary full" data-trip-upgrade="${i}" ${lv>=10||state.gold<price?'disabled':''}>${lv>=10?'최고 레벨':price+' 골드 · Lv.'+(lv+1)+'로 업그레이드'}</button><div class="furniture-toolbar">${tripButton(j.placed[i]?'회수하기':'은하계에 설치','data-trip-place="'+i+'"')}</div></div></article>`;
 }).join('');
 return `<section><div class="furniture-grid">${regular+crafted||'<p>아직 획득한 가구가 없어요.</p>'}</div></section>`;
}
function tripOrbit(index,end,traveler){
 const duration=tripSeconds[index],elapsed=Math.min(duration,Math.max(0,duration-(end-Date.now())/1000));
 const colors=['#a4d3a0','#8fc8e8','#c3b3e9'];
 const landmarks=['<path d="M-9 6Q-11-8 8-9Q12 5-9 6ZM-9 6 4-5"/>','<path d="M0-11C-3-6-9 0-9 4a9 9 0 0 0 18 0C9 0 3-6 0-11Z"/>','<path d="M5-10A11 11 0 1 0 10 7 10 10 0 0 1 5-10Z"/>'];
 return `<div class="trip-orbit" aria-hidden="true" style="--planet-tint:${colors[index]};--flight-time:${duration}s;--elapsed:-${elapsed}s">
 <svg class="trip-sky" viewBox="0 0 240 88"><g fill="currentColor" opacity=".4"><circle cx="23" cy="19" r="1"/><circle cx="205" cy="63" r="1.4"/><circle cx="177" cy="11" r="1"/><circle cx="57" cy="72" r="1"/></g>
 <ellipse cx="120" cy="44" rx="79" ry="26" fill="none" stroke="currentColor" opacity=".35" stroke-dasharray="2 4"/>
 <circle cx="120" cy="44" r="21" fill="var(--planet-tint)" opacity=".17"/><g transform="translate(120 44)" stroke="var(--planet-tint)" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="1.8">${landmarks[index]}</g></svg>
 <div class="trip-pilot">${traveler?dustPortrait(traveler):'✦'}</div></div>`;
}
function openTrips(tab='trip'){
 const j=journal(state),t=j.trip,pet=selected();
 const tabs=[['trip','랜덤 탐험'],['survey','직접 탐사'],['work','도안 단서'],['log','남은 발견']].map(([key,name])=>`<button class="button ${key===tab?'primary':'secondary'}" data-trip-tab="${key}" aria-pressed="${key===tab}">${name}</button>`).join('');
 let body='';
 if(tab==='survey'){
  body=deskEntryCard();
 }else if(tab==='work'){
  body=destinations.map((d,i)=>j.blueprints[i]?'':`<section><h3>${d.furniture}</h3>${blueprintClue(d)}</section>`).join('')||'<p>가구 도안을 모두 발견했어요.</p>';
 }else if(tab==='log'){
  body=destinations.map((d,i)=>{
   const missing=d.quests.filter((_,n)=>!j.counts[2*i+n]);
   return missing.length?`<section class="trip-discoveries"><h3>${icon(d.symbol)}<span>${d.name}</span></h3>${missing.map(q=>`<p>${icon(d.materialArt)}<span>${q} · 미발견</span></p>`).join('')}</section>`:'';
  }).join('')||'<p>모든 탐험 임무를 발견했어요.</p>';
 }else if(t){
  const d=destinations[Math.floor(t.q/2)],traveler=state.dusts.find(dust=>dust.uid===t.uid);
  const seconds=Math.max(0,Math.ceil(((t.end??0)-Date.now())/1000));
  body=`<section class="trip-report"><div class="trip-heading">${traveler?`<span class="trip-avatar ${seconds?'':'trip-homecoming'}">${dustPortrait(traveler)}</span>`:''}<div><small>${traveler?esc(dustName(traveler)):'별'} · ${seconds?'탐험 중':'귀환 완료'}</small><h3>${d.name}</h3></div></div><p>${d.quests[t.q%2]}</p>${seconds?`${tripOrbit(Math.floor(t.q/2),t.end,traveler)}<progress aria-label="탐험 진행률" max="${tripSeconds[Math.floor(t.q/2)]}" value="${tripSeconds[Math.floor(t.q/2)]-seconds}"></progress><small id="tripClock">${seconds}초 뒤 돌아와요</small>`:`<p>${d.material} 1개를 찾아왔어요.</p>${tripButton(tripGold(state,Math.floor(t.q/2))+' 골드와 '+d.material+' 받기','data-trip-collect')}`}</section>`;
 }else{
  body=`<section><h3>${pet?esc(dustName(pet))+'의 탐험':'탐험할 별이 필요해요'}</h3><p>${pet?'Lv.'+level(pet.xp)+' · 갈 수 있는 별에서 임무를 하나 발견해요.':'보관함에서 별을 은하계로 데려와 주세요.'}</p>${tripButton('랜덤 탐험 떠나기','data-trip-start',!!pet)}</section>`;
 }
 modal('루미의 탐험 수첩',`<div class="trip-book"><nav>${tabs}</nav>${body}${tab==='trip'&&state.adventures.length?legacyTravelers():''}${tab==='log'?tripButton(uiIcon('mail')+' 받은 모험 엽서 '+state.life.postcards.length,'data-postcards'):''}</div>`);
 if(tab==='trip'&&state.adventures.length){adventureDialogOpen=true;updateAdventureUI();}
}
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b||b.disabled)return;
 const a=b.dataset,j=journal(state);
 if('tripStory' in a){
  const i=Number(a.tripStory),d=destinations[i];
  if(d&&j.crafted[i])modal(d.furniture+'의 작은 이야기',`<div class="furniture-portrait">${tripFurnitureArt(i,j.levels[i])}</div><p class="story-body">${['풀잎별에서 주워 온 가지 하나가 조금 짧았어요. 나리는 그 다리 밑에 납작한 나무 조각을 받쳤어요. 그제야 별이 폴짝 올라앉아도 스툴이 까딱하지 않았어요.','연잎 밑에서 건져 올린 조개를 창가에 놓았어요. 밤이 되자 조개 안쪽에 남은 빛이 작은 별의 발끝까지 닿았어요.','달빛석을 차곡차곡 놓아 만든 선반에 루미가 첫 엽서를 기대어 두었어요. 은빛 돌 위로 엽서 속 분화구가 희미하게 떠올랐어요.'][i]}</p>`);
  return;
 }
 if('careTap' in a){
  const uid=Number(a.careTap),result=pet(state,Date.now(),uid);
  if(result.ok){const el=document.querySelector(`.room-dust[data-dust="${uid}"]`),dust=state.dusts.find(d=>d.uid===uid);if(el&&dust)playPetReaction(el,dust);sounds.play('pet');save();$('#sparkles').textContent=state.sparkles;toast('반짝이 +'+result.amount);}
  return;
 }
 if('tripUi' in a||a.tripTab)return openTrips(a.tripTab);
 let ok=false,msg='',tab='trip';
 if('tripStart' in a){const p=selected();if(p)ok=depart(state,p,level(p.xp),getDust(p.id).essence);}
 else if('tripCollect' in a){const i=j.trip?Math.floor(j.trip.q/2):-1,first=i>=0&&j.trip.q%2===0&&!j.blueprints[i];ok=collectTrip(state);if(ok)msg=first?'탐험 보상을 받았어요. '+destinations[i].furniture+' 도안이 열렸어요.':'탐험 보상을 받았어요.';}
 else {const action=['buy','craft','place','upgrade'].find(k=>b.hasAttribute('data-trip-'+k));if(!action)return;ok=workshop(state,action,Number(b.getAttribute('data-trip-'+action)));if(ok){save();render();if(action==='upgrade'&&page==='room'){const item=document.querySelector('[data-trip-item="'+a.tripUpgrade+'"]');if(item)showFurnitureActions(item);}if(action==='craft')toast('가구를 제작했어요. 보관함에서 강화할 수 있어요.','check');}return;}
 if(ok){save();render();openTrips(tab);if(msg)toast(msg,'check');}
});
