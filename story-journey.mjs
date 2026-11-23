// A small, additive story arc. Existing chapter indices and XP gates stay intact.
import {STAR_JOURNEYS} from './star-journeys.mjs?v=1.13.63-0f23dbc5';
export const SOLA_JOURNEY = {
  question: '내 빛이 멀리 있는 친구에게도 닿을까?',
  ending: '네가 돌아올 자리를 밝혀둘게.',
  afterword: {
    title: '기다림을 놓아둔 고리',
    body: '솔라를 행성 고리 곁에 놓아주었어요. 솔라는 고리 안쪽을 두 번 꾹 누르고, 접어 둔 편지를 펼쳤어요. “여기 앉으면 기다리는 동안에도 할 일이 있네.” 작은 태양 옆에는 네가 앉을 동그라미를 하나 더 그렸어요. 답장이 언제 올지는 몰라도, 오늘은 혼자 기다리지 않아도 됐어요.'
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
