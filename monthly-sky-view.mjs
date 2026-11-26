import { monthlyStories } from './monthly-story-data.mjs';
import { editions, activeStory, releaseMonth, releaseDays, status } from './monthly-sky.mjs';

const stamps = Object.fromEntries(`And ✧ Ant ⚙ Aps 🪶 Aqr 🏺 Aql 🦅 Ara 🔥 Ari 🐏 Aur 🐐 Boo ✴ Cae ✒ Cam 🦒 Cnc 🐝 CVn 🌀 CMa ✦ CMi △ Cap 🐐 Car ⚓ Cas ✧ Cen ✉ Cep ♖ Cet 🐋 Cha 🍃 Cir ◯ Col 🕊 Com 🎀 CrA ♕ CrB ♛ Crv 🪶 Crt 🏺 Cru ✛ Cyg 🦢 Del 🐬 Dor 🐟 Dra 🐉 Equ ♘ Eri ≋ For 🪟 Gem ♊ Gru 🪶 Her ✧ Hor ◷ Hya 🐍 Hyi ✉ Ind 🗺 Lac 🦎 Leo ♌ LMi 🐾 Lep 🐇 Lib ⚖ Lup 🐾 Lyn 🐾 Lyr ♫ Men ⛰ Mic 🔬 Mon 🌹 Mus 🪽 Nor 📐 Oct ◎ Oph 🐍 Ori ✦ Pav 🦚 Peg 🪽 Per ✧ Phe 🪶 Pic 🎨 Psc 🐟 PsA ◯ Pup ⚓ Pyx 🧭 Ret ▦ Sge ➶ Sgr 🫖 Sco ♏ Scl ◒ Sct 🛡 Ser 🐍 Sex ◴ Tau ♉ Tel 🔭 Tri △ TrA △ Tuc ☁ UMa 🐻 UMi ✧ Vel ⛵ Vir 🌾 Vol 🐟 Vul 🦊`.split(' ').reduce((pairs, value, i, all) => i%2 ? pairs : [...pairs,[value,all[i+1]]],[]));

export function monthlyViews({esc, notePanel}) {
  const byId = id => monthlyStories.find(s => s.id === id);
  const fmt = id => releaseMonth(id).replace('-', '년 ') + '월';
  const cover = s => '<div class="month-cover"><span aria-hidden="true">'+stamps[s.id]+'</span><b>'+esc(s.name)+'</b><p>'+esc(s.motif)+'</p></div>';
  function postcard(s, sender) {
    return '<article class="month-postcard">'+cover(s)+'<p class="story-body">'+esc(s.letter)+'</p><footer>'+esc(sender)+' 보냄</footer></article>';
  }
  function panel(state,day,id) {
    const released = editions.filter(s => releaseMonth(s.id) <= day.slice(0,7));
    const selected = byId(id);
    const s = released.includes(selected) ? selected : (activeStory(state,day) || released.at(-1));
    let page = '';
    if (s) {
      const p = status(state,s,day), target = activeStory(state,day);
      const options = released.slice().reverse().map(t=>'<option value="'+t.id+'" '+(t===s?'selected':'')+'>'+fmt(t.id)+' · '+esc(t.name)+'</option>').join('');
      const progress = p.opened === 5 ? '완성 엽서가 도착했어요.' : p.opened < p.due ? '랜덤 탐험 귀환 보상을 받으면 다음 이야기가 열려요.' : '다음 이야기는 '+releaseDays[p.opened]+'일에 공개돼요.';
      const actions = p.credits < 5 && target?.id !== s.id ? '<button class="button secondary" data-month-target="'+s.id+'">이 별자리에 귀환 별빛 모으기</button>' : '';
      const rows = s.episodes.map(([title],i)=>{
        const open=i<p.opened;
        return '<button class="month-episode" '+(open?'data-month-read="'+s.id+'-'+i+'"':'disabled')+'><span>'+releaseDays[i]+'일</span><b>'+esc(title)+'</b><small>'+(open?'읽기':i>=p.due?'공개 예정':'별빛 대기')+'</small></button>';
      }).join('');
      page='<label for="monthlyArchive">읽을 달</label><div class="select-field"><select id="monthlyArchive">'+options+'</select></div><h3>'+esc(s.title)+'</h3><p class="month-count">'+p.opened+'/5편 열림 · 귀환 별빛 '+p.credits+'/5개</p><p>'+progress+'</p>'+actions+'<div class="story-chapters month-chapters">'+rows+'</div>'+
        (p.opened===5?'<button class="month-card-link" data-month-card="'+s.id+'">'+cover(s)+'<b>완성 엽서 읽기</b></button>':'');
    }
    return '<section class="monthly-book"><h2>월간 별자리 이야기</h2>'+page+'</section>';
  }
  function reader(state,day,id,index) {
    const s=byId(id);
    if(!s || !Number.isInteger(index) || index<0 || index>4) return null;
    const p=status(state,s,day), limit=p.opened;
    if(index>=limit)return null;
    const [title,body,note]=s.episodes[index];
    const attr='data-month-read';
    const steps=[index>0?'<button class="button secondary" '+attr+'="'+id+'-'+(index-1)+'">이전 편</button>':'',index+1<limit?'<button class="button primary" '+attr+'="'+id+'-'+(index+1)+'">다음 편</button>':''].join('');
    const card=index===4?'<button class="button primary full" '+'data-month-card'+'="'+id+'">완성 엽서 펼치기</button>':'';
    return {title,html:'<article class="month-reader"><small>'+esc(s.name)+' · '+releaseDays[index]+'일'+'</small><p class="story-body">'+esc(body)+'</p>'+notePanel('루미의 관측 노트','<p>'+esc(note)+'</p>')+'<div class="month-nav">'+steps+'</div>'+card+'</article>'};
  }
  return {byId,panel,reader,postcard};
}
