// Approximate J2000 right ascension (hours) and declination (degrees), in outline order.
const figures=[
 ['카시오페이아자리',[[.153,59.15],[.675,56.54],[.945,60.72],[1.43,60.24],[1.907,63.67]]],
 ['사자자리',[[10.14,11.97],[10.12,16.76],[10.33,19.84],[10.28,23.42],[9.88,26.01],[9.76,23.77]]],
 ['백조자리',[[20.69,45.28],[20.37,40.26],[19.51,27.96],[19.75,45.13],[20.77,33.97]],[[0,1],[1,2],[3,1],[1,4]]],
 ['오리온자리',[[5.92,7.41],[5.42,6.35],[5.53,-.3],[5.60,-1.20],[5.68,-1.94],[5.80,-9.67],[5.24,-8.20]],[[0,1],[1,2],[2,3],[3,4],[4,0],[4,5],[5,6],[6,2]]]
];
export const today=()=>new Date(Date.now()+9*3600000).toISOString().slice(0,10);
export function sky(day){
 const rad=Math.PI/180, lat=37.57*rad, days=(Date.parse(day+'T12:00:00Z')-Date.UTC(2000,0,1,12))/86400000;
 const angle=280.46061837+360.98564736629*days+126.98;
 const height=([ra,dec])=>Math.sin(lat)*Math.sin(dec*rad)+Math.cos(lat)*Math.cos(dec*rad)*Math.cos((angle-ra*15)*rad);
 return figures.reduce((best,next)=>Math.min(...next[1].map(height))>Math.min(...best[1].map(height))?next:best);
}
export function light(state,name,postcard,day=today()){
 const [figure,stars]=sky(day),book=state.nightSky??={counts:{},days:{}};
 const count=book.counts[figure]||0;
 if(count>=stars.length&&!postcard)return;
 book.counts[figure]=Math.min(stars.length,count+1);
 const entry=book.days[day]??={names:[],letters:0};
 if(!entry.names.includes(name))entry.names.push(name);
 entry.count=book.counts[figure];if(postcard)entry.letters++;
}
export function art(figure,count){
 const [,stars,edges=stars.slice(1).map((_,i)=>[i,i+1])]=figure;
 const points=stars.map(([ra,dec])=>[-ra*15*Math.cos(stars[0][1]*Math.PI/180),-dec]);
 const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
 const scale=Math.min(88/(Math.max(...xs)-Math.min(...xs)),52/(Math.max(...ys)-Math.min(...ys)));
 const p=points.map(([x,y])=>[6+(x-Math.min(...xs))*scale,6+(y-Math.min(...ys))*scale]);
 return '<svg viewBox="0 0 100 64" aria-hidden="true">'+edges.map(([a,b])=>'<line x1="'+p[a][0]+'" y1="'+p[a][1]+'" x2="'+p[b][0]+'" y2="'+p[b][1]+'" stroke="currentColor" opacity="'+(Math.max(a,b)<count?.9:.25)+'"/>').join('')+p.map(([x,y],i)=>'<circle cx="'+x+'" cy="'+y+'" r="'+(i<count?3:2)+'" fill="currentColor" opacity="'+(i<count?1:.55)+'"/>').join('')+'</svg>';
}
