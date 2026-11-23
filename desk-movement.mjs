import{crateTile,deskPath,stepDesk,canPushDesk,pushDesk}from'./desk-exploration.mjs?v=1.13.35-9a3a12ca';

// An interaction is a destination plus an action, rather than two separate taps.
export function createDeskMovement(state,{say=()=>{},onPush=()=>{}}={}){
 let path=[],pendingPush=false,target=null;
 function commitPush(){const result=pushDesk(state.deskRun);if(!result.ok)return false;pendingPush=false;onPush(result);path=deskPath(state.deskRun,10.5,7.5);target={x:10.5,y:7.5};return true;}
 function requestPush(){const r=state.deskRun;if(!r||r.pushed)return false;if(canPushDesk(r))return commitPush();const next=deskPath(r,9.5,7.5);if(!next.length){say('화물 상자 왼쪽의 빈 바닥으로 다가가세요.');return false;}path=next;target={x:9.5,y:7.5};pendingPush=true;say('화물 상자 옆으로 걸어가서 밀어볼게요.');return true;}
 function plan(x,y){const r=state.deskRun;if(!r)return false;const c=crateTile(r);if(!r.pushed&&Math.floor(x)===c.x&&Math.floor(y)===c.y)return requestPush();pendingPush=false;const next=deskPath(r,x,y);path=next;target=next.at(-1)||null;return next.length>0;}
 function step(seconds){const result=stepDesk(state,path,seconds);if(pendingPush&&!path.length){if(canPushDesk(state.deskRun))commitPush();else pendingPush=false;}return result;}
 return{plan,requestPush,step,get target(){return target},get moving(){return path.length>0},get pendingPush(){return pendingPush}};
}
