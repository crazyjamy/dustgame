import {DUSTS} from './dust-data.mjs';
import interfaceCopy from './en-interface.mjs?v=64ae6460';
import skyA from './en-sky-a.mjs?v=64ae6460';
import skyB from './en-sky-b.mjs?v=64ae6460';
import skyC from './en-sky-c.mjs?v=64ae6460';
import stars from './en-stars.mjs?v=64ae6460';
import * as memories from './en-memories.mjs?v=64ae6460';
import * as world from './en-world.mjs?v=64ae6460';
import controlsA from './en-ui-patterns-a.mjs?v=64ae6460';
import controlsB from './en-ui-patterns-b.mjs?v=64ae6460';
import controlsC from './en-ui-patterns-c.mjs?v=64ae6460';
// Player-facing copy. Source text and save identifiers remain in their original language.
const copy = new Map(`
별이 머무는 곳|Where Stars Stay
별이 머무는 곳 · 은하계로|Where Stars Stay · Go to galaxy
별이 머무는 곳 · 나의 은하계|Where Stars Stay · My galaxy
게임 메뉴|Game menu
골드와 상점|Gold and shop
반짝이 · 조합 재료 상점|Sparkles and materials
반짝이로 조합 재료 사기|Buy materials with sparkles
작은 기록|Settings and saves
설정과 저장 기록 열기|Open settings and saves
골드|Gold
반짝이|Sparkles
생활 수첩|Journal
별의 은하계|Galaxy
모은 별|Star collection
보관함|Storage
작은 상점|Shop
별과 설치물을 돌보는 홈|Care for stars and furniture
별 도감과 엽서 보기|Browse stars and postcards
쉬고 있는 별 보기|Visit resting stars
설치물 강화와 재료 구매|Upgrade furniture and buy materials
이 브라우저에 자동 저장|Autosaved in this browser
알림 닫기|Dismiss
닫기|Close
다음|Next
이전|Back
돌아가기|Go back
확인|OK
취소|Cancel
완료|Done
작은 기록과 설정|Settings and saves
기록은 이 브라우저에 자동 저장돼요. 다른 기기·주소로 옮기기 전에는 내보내주세요.|Your game saves automatically in this browser. Export it before switching devices or sites.
기존 기록을 읽지 못해 덮어쓰기를 멈췄어요. 원본을 먼저 내보내주세요.|Your save could not be read. Export the original before continuing.
게임 새로고침|Refresh game
처음 안내 다시 보기|Replay the welcome guide
소리와 화면 효과|Sound and visual effects
효과음 켜기|Sound effects
음악 없이 작은 반응 소리만 나요.|Play gentle sounds when you interact.
효과음 음량|Effects volume
소리 들어보기|Preview sound
움직임 줄이기|Reduce motion
기기에서 줄이도록 설정한 경우에도 적용돼요.|Your device’s reduced motion preference also applies.
반짝이 장식 효과|Sparkle effects
꺼도 획득량과 선택 표시는 유지돼요.|Rewards and selection indicators stay the same when effects are off.
설정은 이 브라우저에 저장돼요.|Settings are saved in this browser.
설정을 저장했어요.|Settings saved.
설정 저장이 어려워요. 이 화면에서만 적용돼요.|Couldn’t save settings. They apply to this session only.
설치물 효과와 중첩 규칙 보기|Furniture effects and how they combine
같은 설치물은 한 개씩, 다른 설치물 효과는 함께 적용돼요. 골드는 설치물에만 사용해요. 하루 반짝이 수량은 생성할 때 정해져요. 유리병은 은하계를 보는 동안만 자동으로 주워요. 새 엽서와 오늘 첫 수확 보상은 한 번만 받아요.|Place one of each item. Different items combine their effects. Gold upgrades furniture. Daily sparkle yields are set when they appear. The jar collects them while your galaxy is open. Each new postcard and the first harvest of the day award their bonus once.
성장과 골드 안내|Growth and gold guide
자세한 게임 설명|How to play
나의 별 기록|My save
내보내기에는 성장·수집·설치물·엽서·별명과 설정이 포함돼요.|Your export includes progress, collections, furniture, postcards, nicknames and settings.
불러오기·초기화 전 기록은 최근 한 개만 복구용으로 보관해요.|One backup is kept before an import or reset.
기록 내보내기|Export save
기록 불러오기|Import save
불러오기·초기화 전 기록 복구|Restore previous save
읽지 못한 원본 내보내기|Export original save
새로운 은하계에서 시작|Start a new galaxy
새로운 은하계로 갈까요?|Start a new galaxy?
현재 성장·수집 기록을 초기화해요.|This resets your progress and collection.
현재 기록은 복구용으로 한 개 보관해요. 내보내기도 먼저 할 수 있어요.|A backup will be kept. You can also export your save first.
먼저 기록 내보내기|Export first
새로 시작하기|Start over
별과 함께하는 첫날|Your first day among the stars
솔라에게 인사해요|Say hello to Sola
“안녕, 나 솔라야. 네 옆에 앉아도 돼?”|“Hi, I’m Sola. Can I sit next to you?”
별과 노는 법|Playing with stars
쓰다듬기|Pet your star
별을 선택하고 별 상세에서 별을 살살 문질러요.|Select a star, open its profile and gently rub its portrait.
합치기와 이동|Merge and move
별을 길게 눌러 같은 종류 위로 끌면 합쳐져요. 빈 곳에 놓으면 이동해요.|Hold a star and drag it onto another of its kind to merge. Drop it in an empty spot to move it.
새 별 만나기|Meet a new star
은하계의 작은 빛을 눌러 무료로 새 별을 만날 수 있어요.|Tap the little light in your galaxy to meet a new star for free.
골드 · 반짝이 · 저장|Gold, sparkles and saves
는 별 머리 위 동전을 눌러 받아요. 최대 30분까지 쌓여요.| builds up for up to 30 minutes. Tap the coins above your stars to collect it.
는 별이 매일 기본 1개씩 바닥에 흘려요. 한국 시간 자정에 갱신되고, 태양광 집광기로 개수를 늘릴 수 있어요.| drop once per star each day at midnight in Korea. A solar collector increases the yield.
기록|Progress
은 이 브라우저에 저장돼요. 기기를 옮기기 전에 ‘작은 기록’에서 내보내 주세요.| is saved in this browser. Export it from Settings before switching devices.
은하계의 요정들|Meet the fairies
별빛 임무지기 나리|Nari, the quest keeper
다음 할 일을 알려줘요. 받을 보상이 있으면 빛나요.|Nari helps you find your next task and glows when a reward is ready.
탐험 요정 루미|Lumi, the explorer
별을 탐험에 보내고, 돌아오면 선물을 건네줘요.|Lumi sends stars on adventures and brings you their gifts when they return.
골드 요정 모아|Moa, the gold keeper
작은 상점에서 만나면 골드를 한 번에 받아줘요.|Meet Moa at the shop to collect all your gold at once.
은하계로 가기|Enter the galaxy
요정 만나기|Meet the fairies
조작과 요정 둘러보기|Learn the controls and meet the fairies
모은 기록|Collection
별들과 함께 남긴 발견을 모아요.|Keep the discoveries you make with your stars.
조합 기록|Recipes
모험 엽서|Postcards
테마 수집|Themes
전체|All
발견|Found
미발견|Undiscovered
성장|Grown
보유|Owned
· Lv.4 이상|· Lv.4 and up
작은 단서|Little clue
아직 모르는 별|Unknown star
별 도감 필터|Filter stars
보유 별|Stars
보유 가구|Furniture
보관함 분류|Storage categories
보관한 별|Stored stars
꺼내면 이어서 키울 수 있어요.|Bring a star back to continue raising it.
아직 쉬고 있는 별이 없어요.|No stars are resting here yet.
별의 은하계에서 ‘보관하기’를 눌러보세요.|Select a star in your galaxy and choose Store.
별의 은하계로 →|Go to galaxy →
아직 획득한 가구가 없어요.|You haven’t collected any furniture yet.
설치물 강화|Furniture upgrades
재료·은하계·요정|Materials, galaxy and fairies
지금 우리 은하계|Your galaxy
별빛 임무에서 성장 지도 보기|View the growth map in Starlight Quests
은하계 꾸미기|Galaxy decor
조합 재료|Materials
재료 상점|Material shop
별빛 임무|Starlight quests
배치하기|Arrange
배치 완료|Finish arranging
은하계|Galaxy
우주먼지|Stardust
아기별|Baby star
별 상세보기|Star profile
보관하기|Store
별 합치기|Merge stars
새로운 별 만나기|Meet a new star
+ 새로운 별 만나기|+ Meet a new star
탐험|Explore
랜덤 탐험|Random expedition
별자리 달력|Constellation calendar
루미의 모험 수첩|Lumi’s adventure journal
루미의 관측 노트|Lumi’s observing notes
나리의 노트|Nari’s notebook
골드 모으는 모아|Moa the gold keeper
골드 모두 받기|Collect all gold
받기|Collect
설치물|Furniture
성장 지도|Growth map
보유 골드|Gold balance
은하계와 설치물|Galaxy and furniture
함께한 별|Star companions
이 기록으로 불러오기|Import this save
현재 기록 먼저 내보내기|Export current save first
취소 · 현재 기록 유지|Cancel and keep current save
불러올 기록을 먼저 확인해주세요.|Review this save before importing.
이전 기록|Past entries
새 소식|New entries
후일담 읽기|Read the epilogue
별 이야기|Star stories
솔라|Sola
루미|Lumi
모아|Moa
나리|Nari
움브라|Umbra
로제타|Rosetta
유로파|Europa
헬리아|Helia
네뷸라|Nebula
기록 파일을 내보냈어요.|Save exported.
기록을 불러왔어요. 이전 기록도 복구할 수 있어요.|Save imported. Your previous save can still be restored.
효과음을 켜고 음량을 올려주세요.|Turn on sound effects and raise the volume.
이 브라우저에서는 소리를 재생할 수 없어요.|This browser couldn’t play the sound.
`.trim().split('\n').map(line => line.split('|')));

const patterns = [
  [/^처음 놓으면 · (.+)$/, 'When first placed · $1'],
  [/^(\d+)종 · (\d+)마리와 함께하고 있어요\.$/, (_, types, count) => count+' '+(count==='1'?'star':'stars')+' · '+types+' species'],
  [/^게임 버전 (.+)$/, 'Game version $1'],
  [/^첫날 안내 (.+)$/, 'Welcome guide $1'],
  [/^(\d+)마리 · 조합 기록됨$/, '$1 owned · Recipe saved'],
  [/^(\/?\s*\d+)마리$/, '$1 stars'],
  [/^반짝이 ([\d,]+)개 부족$/, 'Need $1 more sparkles'],
  [/^반짝이 ([\d,]+)개로 업그레이드$/, 'Upgrade for $1 sparkles'],
];

// Direct lookups preserve the authored English rhythm of whole story paragraphs.
for (const catalog of [world.default, interfaceCopy, skyA, skyB, skyC, stars, memories.default]) {
  for (const [source, translation] of catalog) copy.set(source.trim(), translation);
}

// Species names double as observing topics. Use the collection's proper names.
const speciesNames = new Set(DUSTS.map(star => star.name));
for (const [source, name] of world.default) {
  if (speciesNames.has(source)) copy.set(source,name);
}
const hangul = /[가-힣]/;
const originalCapturePatterns = new Set(world.patterns.map(([regex]) => regex));
const templates = [...memories.patterns, ...world.patterns, ...controlsB, ...controlsC, ...controlsA, ...patterns];

// Records created by older versions can combine item names, captions and counts
// into one saved string. Match the longest known phrase at each position.
const fragments = new Map();
for (const source of copy.keys()) {
  if (!hangul.test(source) || !source) continue;
  const list = fragments.get(source[0]) || [];
  list.push(source);
  fragments.set(source[0], list);
}
for (const list of fragments.values()) list.sort((a,b) => b.length-a.length);

function translateFragments(text, names) {
  const pieces = [];
  let literal = '';
  for (let i = 0; i < text.length;) {
    const name = names.find(value => text.startsWith(value,i));
    const match = name || fragments.get(text[i])?.find(value => text.startsWith(value,i));
    if (!match) {literal += text[i++]; continue;}
    if (literal) {pieces.push(literal); literal = '';}
    pieces.push(name || copy.get(match));
    i += match.length;
  }
  pieces.push(literal);
  return pieces.join(' ').replace(/\s+/g,' ').replace(/\s+([.,!?%)”’])/g,'$1').replace(/([(“])\s+/g,'$1').trim();
}

export function english(text, names = []) {
  const key = text.trim();
  if (!key || !hangul.test(key) || names.includes(key)) return text;
  let value = copy.get(key);
  const translate = part => english(part, names);
  value ??= world.worldText(key,translate) ?? memories.memoryText(key,translate) ?? undefined;
  if (value === undefined) {
    for (const [pattern, replacement] of templates) {
      const match = pattern.exec(key);
      if (!match || match[0] !== key) continue;
      const captured = match.slice(1).map(part => part && part !== key ? english(part,names) : part);
      value = typeof replacement === 'function' ? replacement(match[0],...(originalCapturePatterns.has(pattern) ? match.slice(1) : captured)) :
        replacement.replace(/\$(\d+)/g, (_,n) => captured[Number(n)-1] ?? '');
      if (value !== key) break;
      value = undefined;
    }
  }
  if (value === undefined) {
    const sections = key.split(/( · |\n+|(?<=[.!?])\s+(?=[가-힣“]))/u);
    value = sections.length > 1 ? sections.map(translate).join('') : translateFragments(key,names);
  }
  return text.replace(key, () => value);
}
