import{createDeskMovement}from'./desk-movement.mjs?v=1.13.75-5c5e3f7f';
import{DESK,DESK_ITEMS,deskBlocked,crateTile,canPushDesk,pickDesk,deskProgress}from'./desk-exploration.mjs?v=1.13.75-5c5e3f7f';
import{DUSTS}from'./dust-data.mjs?v=1.13.75-5c5e3f7f';
import{starLight,starFace}from'./star-art.mjs?v=1.13.75-5c5e3f7f';
const T=48,W=960,H=672;
export function mountDeskScene({canvas,state,onUpdate,onSave,onExit,onPause,reduced,visuals,sound,bodyPath}){
 const ctx=canvas.getContext('2d'),fog=document.createElement('canvas');fog.width=W;fog.height=H;const fc=fog.getContext('2d');
 let frame,last=0,lastSave=0,time=0,disposed=false,camera={x:0,y:0,w:864,h:540},seenKey='',message='지도에서 이동할 곳을 눌러요.',burst=[],trail=[],moving=false,heading=0,crateVisual=state.deskRun.pushed?11:10,pushUntil=0,drawWidth=0,drawHeight=0;
 const silhouette=new Path2D(bodyPath);
 const dust=state.dusts.find(d=>d.uid===state.deskRun.uid),info=DUSTS.find(d=>d.id===dust.id);
 function say(text){message=text;onUpdate({message});}
 function particles(x,y,color,n=12){if(!visuals()||reduced())return;for(let i=0;i<n;i++){const a=i/n*Math.PI*2;burst.push({x:x*T,y:y*T,vx:Math.cos(a)*55,vy:Math.sin(a)*55-35,life:1,color});}}
 function announce(result){for(const item of result.picked||[]){particles(item.x,item.y,item.color,16);say(item.name+' 발견! 주머니에 쏙.');sound('gold');}if(result.discovered){particles(10.5,6.5,'#f8dc80',25);say('화물 상자 뒤에 숨은 길이 있었어!');sound('birth');}}
 const movement=createDeskMovement(state,{say,onPush(result){pushUntil=time+650;particles(10.5,7.5,'#eec5ad');sound('feed');announce(result);onSave();update();}});
 function plan(x,y){if(movement.plan(x,y))say(movement.pendingPush?'화물 상자 옆으로 걸어가서 밀어볼게요.':'저 좌표로 이동할게요.');else if(state.deskRun.pushed&&Math.floor(x)===11&&Math.floor(y)===7)say('화물 상자를 밀었어요. 열린 틈으로 들어가 보세요.');else say('물건에 막혀 있어요. 옆의 빈 바닥을 눌러보세요.');}
 function push(){movement.requestPush();update();}
 function pick(){const result=pickDesk(state.deskRun,1.1);if(!result.length)return say('반짝이는 재료 가까이 다가가세요.');announce({picked:result});onSave();update();}
 function home(){plan(DESK.start.x,DESK.start.y);say('귀환 포털로 이동할게요.');}
 function update(){const r=state.deskRun;if(!r)return;onUpdate({...deskProgress(r),canPush:canPushDesk(r),nearItem:DESK_ITEMS.some(i=>!r.picked.includes(i.id)&&(i.id!=='dew'||r.secret)&&Math.hypot(r.x-i.x,r.y-i.y)<1.1),message});}
 function round(x,y,w,h,rad,fill,stroke=null){ctx.beginPath();ctx.roundRect(x,y,w,h,rad);if(fill){ctx.fillStyle=fill;ctx.fill();}if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=2;ctx.stroke();}}
 function text(value,x,y,size=18,color='#f1e9ff',align='center'){ctx.font=`${size}px system-ui,sans-serif`;ctx.fillStyle=color;ctx.textAlign=align;ctx.fillText(value,x,y);}
 function fogMask(r){const key=r.seen.length+':'+r.secret;if(key===seenKey)return;seenKey=key;fc.globalCompositeOperation='source-over';fc.clearRect(0,0,W,H);fc.fillStyle='#100d22f5';fc.fillRect(0,0,W,H);fc.globalCompositeOperation='destination-out';for(const cell of r.seen){const x=(cell%20+.5)*T,y=(Math.floor(cell/20)+.5)*T,g=fc.createRadialGradient(x,y,16,x,y,64);g.addColorStop(0,'#000');g.addColorStop(.58,'#000');g.addColorStop(1,'#0000');fc.fillStyle=g;fc.fillRect(x-64,y-64,128,128);}fc.globalCompositeOperation='source-over';}
 function floor(){
  const glow=ctx.createRadialGradient(W*.63,H*.44,0,W*.63,H*.44,W*.66);
  glow.addColorStop(0,'#3a2e63');glow.addColorStop(.6,'#211e45');glow.addColorStop(1,'#16162e');
  ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='#bba8ee22';ctx.lineWidth=1;ctx.beginPath();
  for(let x=T;x<W;x+=T){ctx.moveTo(x,0);ctx.lineTo(x,H);}
  for(let y=T;y<H;y+=T){ctx.moveTo(0,y);ctx.lineTo(W,y);}
  ctx.stroke();
  for(let i=0;i<92;i++){ctx.fillStyle=i%12===0?'#f6d99bbb':'#d7c7ff77';ctx.beginPath();ctx.arc((i*173+91)%W,(i*119+24)%H,i%12===0?1.9:1.05,0,Math.PI*2);ctx.fill();}
 }
 function objects(r){
  round(3*T,2*T,3*T-5,4*T-5,12,'#31294e','#9d8abd');
  round(3*T+12,2*T+14,3*T-29,4*T-34,8,'#1e273f','#596c9d');
  for(let y=2*T+32;y<6*T-48;y+=24){for(let x=3*T+24;x<6*T-22;x+=22)round(x,y,15,11,2,'#6379a6');}
  text('관측 모듈',4.5*T,5.7*T,17);
  round(2*T,8*T+3,6*T-4,T-10,6,'#354363','#819ac7');
  for(let x=2*T+13;x<8*T-18;x+=22)round(x,8*T+9,15,T-22,2,'#667fc0');
  text('태양 전지판',5*T,8.63*T,15);
  round(8*T,T,10*T,T-3,7,'#3c305c','#8f7fb0');
  for(const x of [8,17])round(x*T,2*T,T-4,4*T,7,'#3c305c','#8f7fb0');
  round(12*T,2*T,4*T-5,3*T-5,9,'#2b3c59','#92accd');
  round(12*T+12,2*T+12,4*T-28,3*T-30,6,'#253149','#6285a6');
  for(let y=2*T+30;y<5*T-25;y+=16)round(12*T+24,y,4*T-65,3,2,'#87b9d5');
  text('신호 중계기',14*T,3.25*T,18);
  for(const [x,w] of [[8,2],[11,7]]){
    round(x*T,6*T,w*T-3,T-3,4,'#4d416f','#a698c4');
    for(let offset=12;offset<w*T-10;offset+=22)round(x*T+offset,6*T+8,9,5,2,'#b5a6d0');
  }
  if(!r.secret){
    round(10*T,6*T,T,T-3,4,'#4d416f','#a698c4');
  }else{
    round(10*T+4,6*T,T-8,T,4,'#66538566','#ceb8fe');
    ctx.strokeStyle='#ead9ff';ctx.lineWidth=2;ctx.setLineDash([5,7]);
    ctx.beginPath();ctx.moveTo(10.5*T,7.2*T);ctx.lineTo(10.5*T,5.3*T);ctx.stroke();ctx.setLineDash([]);
  }
  const cargo=crateVisual*T,canPush=canPushDesk(r);
  round(cargo,7*T+3,T-3,T-10,7,'#ae709b',canPush?'#ffe0a5':'#edb7db');
  round(cargo+12,7*T+4,20,T-12,3,'#524064');
  round(cargo+17,7*T+13,10,5,2,'#ffe0a5');
  text('화물 상자',cargo+23,7*T-7,16);
 }
 function exit(){
  const x=DESK.start.x*T,y=DESK.start.y*T;
  ctx.save();ctx.translate(x,y);
  ctx.strokeStyle='#c8b0ff';ctx.fillStyle='#7251ac88';ctx.lineWidth=3;
  ctx.beginPath();ctx.ellipse(0,0,31,24,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.strokeStyle='#eee1ff';ctx.beginPath();ctx.ellipse(0,0,20,14,0,0,Math.PI*2);ctx.stroke();
  ctx.restore();text('귀환 포털',x,y+43,16);
 }
 function item(i){const x=i.x*T,y=i.y*T,pulse=reduced()?1:1+Math.sin(time/400)*.12;const g=ctx.createRadialGradient(x,y,0,x,y,35);g.addColorStop(0,'#fff3b9bb');g.addColorStop(1,'#fff3b900');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,35,0,Math.PI*2);ctx.fill();ctx.save();ctx.translate(x,y);ctx.scale(pulse,pulse);ctx.fillStyle=i.color;ctx.strokeStyle='#f8f4d9';ctx.lineWidth=2;
 if(i.id==='leaf'){ctx.beginPath();ctx.ellipse(0,0,11,19,.55,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.strokeStyle='#77925c';ctx.beginPath();ctx.moveTo(-6,11);ctx.lineTo(8,-13);ctx.stroke();}else if(i.id==='dew'){ctx.beginPath();ctx.moveTo(0,-21);ctx.bezierCurveTo(30,12,6,30,-10,13);ctx.bezierCurveTo(-22,1,-3,-14,0,-21);ctx.fill();ctx.stroke();ctx.fillStyle='#e6f6eb';ctx.beginPath();ctx.ellipse(-4,2,3,7,.4,0,Math.PI*2);ctx.fill();}else{for(const [a,b,r]of[[-10,2,10],[0,-6,13],[11,3,10],[0,8,10]]){ctx.beginPath();ctx.arc(a,b,r,0,Math.PI*2);ctx.fill();ctx.stroke();}}
 ctx.restore();text('✧',x+23,y-18,20,'#fff5bd');text(i.label,x,y+39,16,'#f5edff');}
 const heroLight=starLight(info.color,info.rarity);
 function drawHeroBody(){
  const glass=ctx.createLinearGradient(15,5,82,98);
  for(const [offset,color] of heroLight)glass.addColorStop(offset,color);
  ctx.fillStyle=glass;ctx.fill(silhouette);
  const reflection=ctx.createRadialGradient(26,20,0,26,20,52);
  reflection.addColorStop(0,'#ffffffb8');reflection.addColorStop(1,'#ffffff00');
  ctx.fillStyle=reflection;ctx.fill(silhouette);
  ctx.strokeStyle='#ffffff66';ctx.lineWidth=1.2;ctx.lineJoin='round';ctx.stroke(silhouette);
 }
 function hero(r){const x=r.x*T,y=r.y*T,walk=moving&&!reduced(),bounce=walk?Math.abs(Math.sin(time/85))*4:0,idle=reduced()?0:Math.sin(time/580)*.035,push=time<pushUntil;ctx.fillStyle='#09071366';ctx.beginPath();ctx.ellipse(x,y+18,20,6,0,0,Math.PI*2);ctx.fill();ctx.save();ctx.translate(x,y-bounce);ctx.rotate(push?.17:walk?Math.sin(time/100)*.09:0);ctx.scale(push?1.2:1+idle,walk?.9+Math.abs(Math.sin(time/85))*.12:push?.82:1-idle);ctx.save();ctx.scale(.78,.78);ctx.translate(-50,-50);drawHeroBody();ctx.restore();const glance=walk?Math.cos(heading)*2:0;const face=starFace;ctx.fillStyle=face;const blink=time%4400>4210;for(const xx of[-7,7]){ctx.beginPath();ctx.ellipse(xx+glance,-2,2.3,blink?1:3,0,0,Math.PI*2);ctx.fill();}ctx.strokeStyle=face;ctx.lineWidth=2;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-3,7);ctx.quadraticCurveTo(1,10,5,6);ctx.stroke();if(walk){ctx.fillStyle=info.color;ctx.beginPath();ctx.ellipse(-11,19,5,3,0,0,Math.PI*2);ctx.ellipse(10,19,5,3,0,0,Math.PI*2);ctx.fill();}ctx.restore();}
 function mini(r){const x=camera.w-117,y=15,unit=4.5;round(x-8,y-8,107,80,9,'#1c1632ef');for(const cell of r.seen){const cx=cell%20,cy=Math.floor(cell/20);ctx.fillStyle=deskBlocked(r,cx,cy)?'#77669c':'#c5b5ef';ctx.fillRect(x+cx*unit,y+cy*unit,unit-1,unit-1);}ctx.fillStyle='#f3d45c';ctx.beginPath();ctx.arc(x+r.x*unit,y+r.y*unit,3,0,Math.PI*2);ctx.fill();}
 function draw(){const r=state.deskRun;if(!r)return;const rect=canvas.getBoundingClientRect(),width=Math.max(1,rect.width),height=Math.max(1,rect.height),dpr=Math.min(window.devicePixelRatio||1,2);if(width!==drawWidth||height!==drawHeight){drawWidth=width;drawHeight=height;canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);}camera.w=width<600?432:864;camera.h=camera.w*height/width;camera.x=Math.max(0,Math.min(W-camera.w,r.x*T-camera.w/2));camera.y=Math.max(0,Math.min(H-camera.h,r.y*T-camera.h/2));if(camera.h>H)camera.y=0;const scale=width/camera.w;ctx.setTransform(dpr*scale,0,0,dpr*scale,0,0);ctx.clearRect(0,0,camera.w,camera.h);ctx.save();ctx.translate(-camera.x,-camera.y);floor();objects(r);exit();for(const i of DESK_ITEMS)if(!r.picked.includes(i.id))item(i);fogMask(r);ctx.drawImage(fog,0,0);const target=movement.target;if(target&&movement.moving){ctx.strokeStyle='#f4e6a0aa';ctx.lineWidth=2;ctx.setLineDash([4,8]);ctx.beginPath();ctx.arc(target.x*T,target.y*T,13+(reduced()?0:Math.sin(time/180)*3),0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);}for(const p of trail){ctx.fillStyle=`rgba(250,236,185,${p.life*.35})`;ctx.beginPath();ctx.arc(p.x,p.y,2,0,Math.PI*2);ctx.fill();}for(const p of burst){ctx.globalAlpha=p.life;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,3*p.life+1,0,Math.PI*2);ctx.fill();}ctx.globalAlpha=1;hero(r);ctx.restore();mini(r);}
 function loop(now){if(disposed||!state.deskRun)return;const seconds=last?Math.min(.05,(now-last)/1000):0;last=now;time=now;const r=state.deskRun,before={x:r.x,y:r.y};const result=movement.step(seconds);moving=result.moving;announce(result);if(moving){heading=Math.atan2(r.y-before.y,r.x-before.x);if(visuals()&&!reduced()&&Math.random()<.4)trail.push({x:r.x*T,y:r.y*T+15,life:1});}crateVisual+=(crateTile(r).x-crateVisual)*Math.min(1,seconds*9);for(const p of burst){p.x+=p.vx*seconds;p.y+=p.vy*seconds;p.vy+=80*seconds;p.life-=seconds*1.5;}burst=burst.filter(p=>p.life>0);for(const p of trail)p.life-=seconds*1.2;trail=trail.filter(p=>p.life>0);if((result.picked||[]).length||result.discovered||moving&&now-lastSave>600){lastSave=now;onSave();}if(moving||result.discovered||(result.picked||[]).length)update();draw();frame=requestAnimationFrame(loop);}
 function pointer(event){if(!state.deskRun)return;event.preventDefault();canvas.focus({preventScroll:true});const b=canvas.getBoundingClientRect();const x=camera.x+(event.clientX-b.left)/b.width*camera.w,y=camera.y+(event.clientY-b.top)/b.height*camera.h;plan(x/T,y/T);}
 function keyboard(e){if(!state.deskRun)return;const r=state.deskRun,keys={ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0],ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1]};if(keys[e.key]){e.preventDefault();const [dx,dy]=keys[e.key];plan(Math.floor(r.x)+.5+dx,Math.floor(r.y)+.5+dy);}else if(e.key==='e'||e.key==='E'){e.preventDefault();push();}else if(e.key===' '){e.preventDefault();pick();}else if(e.key==='Escape'){e.preventDefault();onPause();}}
 canvas.addEventListener('pointerdown',pointer);canvas.addEventListener('keydown',keyboard);const buttons=[['deskPush',push],['deskPick',pick],['deskHome',home],['deskExit',onExit]];for(const [id,handler]of buttons)document.getElementById(id)?.addEventListener('click',handler);
 update();frame=requestAnimationFrame(loop);return {dispose(){disposed=true;cancelAnimationFrame(frame);canvas.removeEventListener('pointerdown',pointer);canvas.removeEventListener('keydown',keyboard);for(const [id,handler]of buttons)document.getElementById(id)?.removeEventListener('click',handler);},plan};
}
