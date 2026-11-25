// Preserve dialogue, punctuation and whitespace while animating one sentence at a time.
const segmenter = typeof Intl.Segmenter === 'function' ? new Intl.Segmenter('ko', {granularity:'sentence'}) : null;
export function storySentences(body) {
  const text = String(body);
  if (segmenter) return Array.from(segmenter.segment(text), part => part.segment);
  return text.match(/[^.!?。！？]*[.!?。！？]+[”’"')\]]*\s*|[^.!?。！？]+$/gu) || (text ? [text] : []);
}
const escapeText = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function sentenceMarkup(body){
  return storySentences(body).map((sentence, index) => `<span class="story-sentence" style="--sentence-index:${index}">${escapeText(sentence)}</span>`).join('');
}
export function storyParagraph(body, firstRead=false, className='') {
  const classes = [className, firstRead ? 'story-shimmer' : ''].filter(Boolean).join(' ');
  const content = firstRead
    ? sentenceMarkup(body)
    : escapeText(body);
  return `<p${classes ? ` class="${escapeText(classes)}"` : ''}>${content}</p>`;
}
