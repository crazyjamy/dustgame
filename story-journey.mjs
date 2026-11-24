// A small, additive story arc. Existing chapter indices and XP gates stay intact.
import {STAR_JOURNEYS} from './star-journeys.mjs?v=1.13.81-4728e3b5';
export const SOLA_JOURNEY = {
  question: '내 빛이 멀리 있는 친구에게도 닿을까?',
  ending: '네가 돌아올 자리를 밝혀둘게.',
  afterword: {
    title: "행성 고리 곁에서",
    body: "솔라는 행성 고리 옆에 편지를 세워두고 방석을 조금 밀었어요. “오늘도 여기서 기다릴래. 너도 앉을래?” 움브라가 옆에 앉자 솔라는 어제 그리던 지도를 펼쳤어요."
  }
};

export const journeyFor = d => d?.id === 'crumb' ? SOLA_JOURNEY : STAR_JOURNEYS[d?.id] || null;
export const hasJourney = d => !!journeyFor(d);
export const journeyComplete = d => hasJourney(d) && [0, 1, 2, 3, 4].every(i => d.readStories.includes(i));
export const afterwordKey = uid => 'sola-ring:' + uid;
export const hasAfterword = (s, d) => d?.id === 'crumb' && (s.life.storyMoments || []).includes(afterwordKey(d.uid));
export function journeyHint(s, d) {
  if (!hasJourney(d)) return '';
  if (journeyComplete(d)) return journeyFor(d).ending;
  if (d.id !== 'crumb') return journeyFor(d).question;
  if (!d.readStories.includes(0)) return '멀리 있는 친구에게 첫 인사를 보내고 싶대요.';
  if (!hasAfterword(s, d)) return '행성 고리 곁에 기다릴 자리를 만들어주세요.';
  return '솔라의 편지는 어디까지 갔을까요?';
}
