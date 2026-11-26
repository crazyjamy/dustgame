// Gesture state is temporary. Currency is credited only after real movement inside a dust.
export function withinPetArea(rect,x,y){const rx=Math.max(22,rect.width/2+9),ry=Math.max(22,rect.height/2+9),dx=(x-rect.x-rect.width/2)/rx,dy=(y-rect.y-rect.height/2)/ry;return dx*dx+dy*dy<=1;}
export function trackRub(previous,sample,threshold=48){
 if(!sample.inside)return null;
 const fresh=!previous||previous.uid!==sample.uid||previous.pointerId!==sample.pointerId||sample.time-previous.time>900||sample.time<previous.time;
 if(fresh)return{...sample,distance:0,moved:false,reached:false};
 const delta=Math.hypot(sample.x-previous.x,sample.y-previous.y);
 const moved=delta>=.5,distance=Math.min(threshold,previous.distance+(moved?Math.min(delta,16):0));
 return{...sample,distance,moved,reached:moved&&distance>=threshold};
}

// The gesture belongs to this mounted portrait and ends when the pointer lifts.
export function bindPortraitPet(portrait, uid, onPet, personality = null) {
 let pointer = null;
 let stroke = null;
 let completed = false;
 let followTouch = null;
 let phase = '';
 let timer;
 const status = personality && portrait.parentElement.querySelector('[role="status"]');
 const originalLabel = personality && portrait.getAttribute('aria-label');
 function react(next) {
  clearTimeout(timer);
  phase = next;
  portrait.dataset.response = next;
  status.textContent = next === 'invite' ? '한 번 더 톡 눌러 주세요' : next ? personality[next] : '';
  portrait.setAttribute('aria-label', next === 'invite' ? '한 번 더 만지기' : originalLabel);
  if (next) timer = setTimeout(() => react(''), next === 'invite' ? 2600 : 850);
  else {
   portrait.style.removeProperty('--gaze-x');
   portrait.style.removeProperty('--gaze-y');
  }
 }

 function sample(event) {
  const rect = portrait.getBoundingClientRect();
  const x = event.clientX, y = event.clientY;
  const inside = withinPetArea(rect, x, y);
  if (inside && stroke && (x !== stroke.x || y !== stroke.y)) {
   const clamp = value => Math.max(-1, Math.min(1, value));
   const dx = clamp((x - stroke.x) / 8) * .65 + clamp(2 * (x - rect.left) / rect.width - 1) * .35;
   const dy = clamp((y - stroke.y) / 8) * .65 + clamp(2 * (y - rect.top) / rect.height - 1) * .35;
   portrait.style.setProperty('--gaze-x', dx * 4 + 'px');
   portrait.style.setProperty('--gaze-y', dy * 3 + 'px');
  } else if (!stroke) {
   portrait.style.removeProperty('--gaze-x');
   portrait.style.removeProperty('--gaze-y');
  }
  stroke = trackRub(stroke, { uid, pointerId: pointer, x, y, time: event.timeStamp, inside });
  if (stroke?.reached) {
   if (personality && !completed) {
    portrait.dataset.response = 'ready';
    status.textContent = '이제 손을 떼 보세요';
   }
   completed = true;
   onPet();
   stroke.distance = 0;
  }
 }

 portrait.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0 || pointer !== null) return;
  pointer = event.pointerId;
  portrait.setPointerCapture(pointer);
  if (phase) {
   followTouch = { x:event.clientX, y:event.clientY, tap:phase === 'invite' };
   return;
  }
  completed = false;
  sample(event);
 });
 portrait.addEventListener('pointermove', event => {
  if (event.pointerId !== pointer) return;
  if (followTouch) {
   if (Math.hypot(event.clientX-followTouch.x,event.clientY-followTouch.y)>10) followTouch.tap=false;
  } else sample(event);
 });
 function end(event) {
  if (event.pointerId !== pointer) return;
  pointer = null;
  stroke = null;
  if (followTouch) {
   const tap = followTouch.tap && phase === 'invite' && event.type === 'pointerup' && Math.hypot(event.clientX-followTouch.x,event.clientY-followTouch.y)<=10;
   followTouch = null;
   if (tap) react('reply');
   return;
  }
  if (personality && completed && event.type === 'pointerup') {
   completed = false;
   react('invite');
   return;
  }
  if (personality && completed) react('');
  completed = false;
  portrait.style.removeProperty('--gaze-x');
  portrait.style.removeProperty('--gaze-y');
 }
 for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) portrait.addEventListener(type, end);
 // Keyboard and assistive-technology activation uses the same reward cooldown.
 portrait.addEventListener('click', event => { if (event.detail !== 0 || event.pointerType || pointer !== null) return;
  if (!phase) {
   onPet();
   if (personality) react('invite');
  } else if (phase === 'invite') react('reply'); });
}
