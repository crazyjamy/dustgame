import { english } from './english.mjs?v=64ae6460';

const attributes = ['aria-label', 'title', 'placeholder', 'data-tooltip', 'data-short'];
let language = 'ko';
let playerNames = () => [];
export function protectPlayerNames(read) { playerNames = read; }
export function displayCopy(source) {
  return language === 'en' ? english(source,playerNames()) : source;
}
let observer;
let originals = new WeakMap();

function localize(node, field, source) {
  const read = () => field === 'text' ? node.data : node.getAttribute(field);
  const write = value => field === 'text' ? node.data = value : node.setAttribute(field, value);
  const saved = originals.get(node);
  const previous = saved?.get(field);
  if (language === 'ko') {
    if (previous && previous.translation === read()) write(previous.source);
    return;
  }
  if (!source || previous?.translation === source || !/[가-힣]/.test(source)) return;
  const translation = displayCopy(source);
  if (translation === source) return;
  const fields = saved || new Map();
  fields.set(field, {source, translation});
  originals.set(node, fields);
  write(translation);
}

function visit(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    localize(node, 'text', node.data);
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE || node.matches('script,style,textarea,[translate="no"]')) return;
  for (const field of attributes) {
    if (node.hasAttribute(field)) localize(node, field, node.getAttribute(field));
  }
  if (node.matches('svg')) return;
  for (const child of node.childNodes) visit(child);
}

export function applyLanguage(next) {
  if (next === language) return;
  observer?.disconnect();
  language = next;
  document.documentElement.lang = next;
  visit(document.documentElement);
  if (next === 'ko') { originals = new WeakMap(); return; }
  observer ||= new MutationObserver(records => {
    for (const record of records) {
      if (record.target.parentElement?.closest('svg,script,style,textarea,[translate="no"]')) continue;
      if (record.type === 'attributes') {
        localize(record.target, record.attributeName, record.target.getAttribute(record.attributeName));
      } else if (record.type === 'characterData') visit(record.target);
      else for (const child of record.addedNodes) visit(child);
    }
  });
  observer.observe(document.documentElement, {subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:attributes});
}
