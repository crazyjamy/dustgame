import {FURNITURE} from './economy.mjs?v=1.13.81-d7b619b5';

const missions = {
 rug: ['첫 별의 이야기 읽기', s => s.dusts.some(d => d.readStories.length > 0)],
 plant: ['별 2종 발견하기', s => s.collectionBook.discovered.length >= 2],
 lamp: ['은하계 Lv.2 달성하기', s => s.roomLevel >= 2],
 cushion: ['별 5종 발견하기', s => s.collectionBook.discovered.length >= 5],
 bookshelf: ['별 8종 발견하기', s => s.collectionBook.discovered.length >= 8],
 teacup: ['별 3종 발견하기', s => s.collectionBook.discovered.length >= 3],
 basket: ['루미의 모험 귀환 보상 1번 받기', s => s.adventureCount >= 1],
 windchime: ['루미의 모험 귀환 보상 3번 받기', s => s.adventureCount >= 3],
 hourglass: ['은하계 Lv.5 달성하기', s => s.roomLevel >= 5],
 musicbox: ['은하계 Lv.8 달성하기', s => s.roomLevel >= 8],
 starlamp: ['별 10종 발견하기', s => s.collectionBook.discovered.length >= 10],
 glassjar: ['은하계 Lv.12 달성하기', s => s.roomLevel >= 12],
 wishboard: ['작은 쉼터의 기억 복원하기', s => s.roomMemory.claimed],
 postbox: ['모험 엽서 5장 모으기', s => s.life.postcards.length >= 5],
 prism: ['별 15종 발견하기', s => s.collectionBook.discovered.length >= 15],
 starmobile: ['은하계 Lv.15 달성하기', s => s.roomLevel >= 15],
 workbench: ['별 20종 발견하기', s => s.collectionBook.discovered.length >= 20],
 candle: ['은하계 Lv.10 달성하기', s => s.roomLevel >= 10],
 blanket: ['루미의 모험 귀환 보상 6번 받기', s => s.adventureCount >= 6],
 terrarium: ['외곽 관측소 완주하기', s => s.deskArchive.clears >= 1],
};

export function furnitureQuest(s, id) {
 const f = FURNITURE.find(item => item.id === id);
 if (!f) return null;
 const [condition, meetsCondition] = missions[id];
 const owned = s.ownedFurniture.includes(id);
 return {f, condition, owned, ready: !owned && meetsCondition(s)};
}

export function claimFurnitureQuest(s, id) {
 const quest = furnitureQuest(s, id);
 if (!quest) return {ok:false, message:'설치물을 확인해주세요.'};
 if (quest.owned) return {ok:false, message:'이미 보유한 설치물이에요.'};
 if (!quest.ready) return {ok:false, message:'별빛 임무에 표시된 조건을 먼저 달성해주세요.'};
 s.ownedFurniture.push(id);
 s.furnitureLevels[id] = 1;
 return {ok:true, furniture:quest.f};
}
