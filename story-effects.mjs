export function connectStoryEffects(dialog) {
  const selector = '.story-shimmer';
  let seen = new Set();
  let current = null;
  let frame = 0;

  function stop() {
    current?.sentence.classList.remove('shimmer-active');
    current = null;
  }

  function visible(text) {
    if (text.closest('details:not([open])')) return false;
    const body = dialog.querySelector('.modal-body');
    if (!body) return false;
    const box = text.getBoundingClientRect();
    const bounds = body.getBoundingClientRect();
    const height = Math.min(box.bottom, bounds.bottom, window.innerHeight) -
      Math.max(box.top, bounds.top, 0);
    return box.height > 0 && height >= Math.min(box.height * 0.65, 48);
  }

  function play(text) {
    const sentences = [...text.querySelectorAll('.story-sentence')];
    if (!sentences.length) return;
    seen.add(text.textContent);
    current = {text, remaining: sentences.slice(1), sentence: sentences[0]};
    current.sentence.classList.add('shimmer-active');
  }

  function refresh(preferred = null) {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      if (document.hidden || dialog.classList.contains('hidden') ||
          document.documentElement.matches('.reduce-motion, .simple-effects') ||
          !matchMedia('(prefers-reduced-motion: no-preference) and (forced-colors: none)').matches) {
        stop();
        return;
      }
      const available = text => text.isConnected && visible(text) && !seen.has(text.textContent);
      if (current && (!current.text.isConnected || !visible(current.text) ||
          (preferred && preferred !== current.text && available(preferred)))) stop();
      if (current) return;

      const candidates = preferred ? [preferred] : [...dialog.querySelectorAll(selector)];
      const target = candidates.find(available);
      if (target) play(target);
    });
  }

  dialog.addEventListener('animationend', event => {
    if (!current || event.target !== current.sentence || event.animationName !== 'story-shimmer') return;
    const {text, remaining, sentence} = current;
    sentence.classList.remove('shimmer-active');
    if (!remaining.length || !visible(text)) {
      current = null;
      return;
    }
    current.sentence = remaining.shift();
    current.sentence.classList.add('shimmer-active');
  });

  dialog.addEventListener('toggle', event => {
    if (event.target.matches('.observation-disclosure') && event.target.open) {
      const text = event.target.querySelector(selector);
      if (text && !event.target.classList.contains('observation-restored')) refresh(text);
    }
  }, true);
  dialog.addEventListener('focusin', event => {
    const text = event.target.closest('[data-shimmer-region], details[open]')?.querySelector(selector);
    if (text) refresh(text);
  });
  dialog.addEventListener('scroll', () => refresh(), {capture: true, passive: true});
  document.addEventListener('visibilitychange', () => refresh());

  return {
    refresh,
    reset() {
      cancelAnimationFrame(frame);
      stop();
      seen = new Set();
    },
  };
}
