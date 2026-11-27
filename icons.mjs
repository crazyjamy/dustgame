import {spaceItemArt} from './space-items.mjs?v=64ae6460';
const shapes={




 bookshelf:'<rect x="7" y="6" width="38" height="41" rx="3" fill="#cbb697"/><path d="M11 25H41M11 42H41" stroke="#9b866d"/><path d="M14 12V24H20V12Z" fill="#a8bfad"/><path d="M24 15L28 13L33 24H28Z" fill="#e0c087"/><path d="M15 31H31V36H15Z" fill="#bea7bf"/>',
 teacup:'<ellipse cx="25" cy="43" rx="21" ry="4" fill="#ded5b8"/><path d="M9 21H37L34 39Q24 45 13 39Z" fill="#bad0bf"/><path d="M37 25Q49 22 45 32Q42 37 36 34"/><ellipse cx="23" cy="22" rx="14" ry="4" fill="#eddfb8"/><path d="M19 15Q14 10 20 5M29 15Q24 10 30 5" stroke="#b7c9ba"/>',
 basket:'<path d="M9 24H43L39 45H13Z" fill="#d7bd91"/><path d="M16 24Q13 4 26 5Q39 4 36 24M9 29H43M12 36H40M19 25L21 44M30 25L29 44" stroke="#ae956d"/><path d="M21 19Q17 9 11 14Q11 22 21 19Z" fill="#b4c599"/>',
 windchime:'<path d="M26 4V12M13 22Q13 10 26 10Q39 10 39 22Z" fill="#bbd5d4"/><path d="M26 22V42M17 23V34M35 23V33"/><ellipse cx="26" cy="43" rx="5" ry="3" fill="#dfc995"/><circle cx="17" cy="36" r="3" fill="#d2b8cb"/><circle cx="35" cy="35" r="3" fill="#c3d2ac"/>',
 hourglass:'<path d="M12 6H40M12 46H40M16 7Q16 20 26 26Q36 32 36 45M36 7Q36 20 26 26Q16 32 16 45" stroke="#a89bb0" stroke-width="3"/><path d="M17 11H35Q33 20 26 23Q19 20 17 11ZM19 42Q22 34 26 32Q30 34 33 42Z" fill="#e4cf9f" stroke="none"/><path d="M26 27V30" stroke="#d4b471"/>',
 musicbox:'<path d="M8 28H44V44Q26 50 8 44Z" fill="#d8b2bd"/><path d="M8 28L15 15H43L44 28Z" fill="#ead0d3"/><path d="M15 17L17 8H43V16" fill="#e4c6cd"/><path d="M44 35H49V41M25 20V31M25 20L34 17V28" stroke="#a391a0"/><ellipse cx="22" cy="31" rx="4" ry="3" fill="#baa6bf"/><ellipse cx="31" cy="28" rx="4" ry="3" fill="#baa6bf"/>',
 fairy:'<g class="fairy-wings" fill="#f1e7c1" stroke="#c5bc8e"><ellipse cx="11" cy="24" rx="9" ry="6" transform="rotate(-25 11 24)"/><ellipse cx="41" cy="24" rx="9" ry="6" transform="rotate(25 41 24)"/></g><path d="M26 6L31 17L43 19L34 28L36 40L26 34L16 40L18 28L9 19L21 17Z" fill="#f2cf6e" stroke="#c4a251"/><g fill="#766b45" stroke="none"><circle cx="22" cy="23" r="1.4"/><circle cx="30" cy="23" r="1.4"/></g><path d="M23 28Q26 31 29 28" stroke="#ac874a"/><path d="M23 34L18 39L26 43L34 39L29 34Z" fill="#a6c9d0" stroke="#7ea5ad"/><path d="M34 32Q43 29 45 39Q44 48 35 47Q29 44 34 36Z" fill="#d7b86b" stroke="#b19758"/><circle cx="38" cy="40" r="3" fill="#f6e0a0" stroke="#bc9e4e"/>',
 keeper:'<g class="fairy-wings" fill="#dceeff" stroke="#83add7"><path d="M17 22Q1 12 5 30Q10 35 18 28Z"/><path d="M35 22Q51 12 47 30Q42 35 34 28Z"/></g><path d="M17 27Q9 37 13 45Q26 49 39 45Q43 37 35 27Z" fill="#6b9bce" stroke="#477cae"/><ellipse cx="26" cy="23" rx="12" ry="12" fill="#e5d9b8" stroke="#8fa7bd"/><path d="M12 18Q16 3 35 9L41 17Q25 14 12 18Z" fill="#75a8db" stroke="#4c7eaf"/><path d="M28 10Q30 0 40 3Q39 11 28 10Z" fill="#b5dbff" stroke="#6597c8"/><g fill="#354c68" stroke="none"><circle cx="22" cy="23" r="1.5"/><circle cx="30" cy="23" r="1.5"/></g><path d="M24 28Q26 30 28 28M18 34L32 44" stroke="#5a758e"/><path d="M26 34L34 31L43 35V45L34 42L26 45Z" fill="#dcecff" stroke="#769abc"/><path d="M34 31V42M29 38L32 36L38 39L41 37" stroke="#7ba1c8"/>',
 catalog:'<rect x="11" y="7" width="30" height="38" rx="6" fill="#e3dfbf"/><path d="M19 7V45M25 18H34M25 25H34M25 32H31"/>',
 residents:'<path d="M7 24L26 8L45 24V44H7Z" fill="#d9cbea"/><path d="M21 44V30H32V44"/><path d="M7 24L26 8L45 24" stroke="#a589c3"/>',








 coin:'<circle cx="26" cy="26" r="19" fill="#efd576"/><circle cx="26" cy="26" r="13" stroke="#c4a052"/><path d="M30 20H24Q19 20 19 26Q19 32 26 32H31V26H26"/>',
 rug:'<ellipse cx="26" cy="30" rx="23" ry="13" fill="#dfb0aa"/><ellipse cx="26" cy="30" rx="17" ry="8" stroke="#f8e3ce"/><path d="M8 37L5 41M16 41L14 45M35 41L37 45M43 37L47 41"/>',
 plant:'<path d="M18 31H36L33 46H21Z" fill="#d8b89a"/><path d="M27 32V16"/><path d="M27 23C12 26 11 12 13 10C24 9 30 15 27 23Z" fill="#aabd91"/><path d="M27 18C26 5 37 4 42 7C42 17 36 22 27 18Z" fill="#bdce9f"/>',
 lamp:'<path d="M26 27V44M17 45H35"/><path d="M17 10H35L43 29H9Z" fill="#ead591"/><path d="M26 29V34" stroke="#d4b252"/>',
 cushion:'<path d="M7 20Q10 13 18 17Q26 11 34 17Q44 13 46 23L44 38Q35 43 27 39Q16 43 8 38Z" fill="#bfcfe0"/><path d="M16 24Q26 20 37 24M14 32Q26 37 40 31" stroke="#eaf0f5"/>',
starlamp:'<path d="M26 6l5 11 12 2-9 8 2 12-10-6-10 6 2-12-9-8 12-2Z" fill="#dfcce9"/><path d="M26 38v8M17 47h18"/>',
glassjar:'<path d="M17 10h18v6l6 8v19q-15 7-30 0V24l6-8Z" fill="#d4e7df"/><path d="M15 8h22M14 18h24"/><path d="M25 23l3 7 7 2-7 3-3 7-2-7-7-3 7-2Z" fill="#f5dfa0"/>',
wishboard:'<path d="M10 13h32v29H10ZM16 42l-3 6M36 42l3 6" fill="#dbc9ac"/><path d="M17 19h18v15H17Z" fill="#fcf5db"/><path d="M21 23h10M21 28h7M18 7l8-4 8 4"/>',
postbox:'<path d="M9 17q0-11 17-11t17 11v22H9ZM26 39v8M19 48h14" fill="#dcb6bd"/><path d="M15 18h22M16 25h20v10H16Z"/><path d="M16 25l10 7 10-7"/>',
prism:'<path d="M25 8L6 42h39Z" fill="#d4d9ed"/><path d="M3 22h18M31 23l18-8M34 28l15-1M36 33l13 7" stroke="#b6b0d7"/><path d="M25 8v34M6 42l19-10 20 10"/>',
starmobile:'<path d="M26 3v8M7 17q19-12 38 0M12 15v15M26 11v29M40 15v15"/><path d="M12 26l3 6 6 1-5 5 1 6-5-3-5 3 1-6-5-5 6-1ZM40 26l2 4 5 1-4 4 1 5-4-3-4 3 1-5-4-4 5-1Z" fill="#e8d49e"/><circle cx="26" cy="43" r="5" fill="#d8c8df"/>',
workbench:'<path d="M5 22h42v7H5ZM10 29v18M42 29v18M10 37h32" fill="#cbb398"/><path d="M12 9h9v12h-9ZM24 13h7v8h-7ZM34 7h7v14h-7Z" fill="#d5d4b9"/>',
candle:'<ellipse cx="26" cy="44" rx="19" ry="5" fill="#d4c5ac"/><path d="M17 21h18v21q-9 5-18 0Z" fill="#edc7a3"/><path d="M26 20v-5M26 3q12 11 0 14Q14 14 26 3Z" fill="#f4dc8d"/><path d="M17 24q5 8 9 0q5 6 9-1"/>',
blanket:'<path d="M8 12q17-7 35 0l3 29q-18-6-36 2Z" fill="#c1d5c9"/><path d="M11 19q14-6 30 0M12 28q14-6 30 0M11 41v6M19 40v7M28 40v7M37 40v7M45 41v6"/><path d="M24 11l6 28" stroke="#e9edce"/>',
terrarium:'<path d="M18 7h16v10l9 11v14q-17 8-34 0V28l9-11Z" fill="#d4e5d5"/><path d="M11 37q17-10 30 2M25 37V24"/><path d="M25 31q-13-1-10-10 11-1 10 10ZM25 28q0-12 12-9 0 11-12 9Z" fill="#a9c797"/><circle cx="31" cy="12" r="2" fill="#a7d6df"/>'
};
// A few silver facets stay readable both on shop cards and in 24px recipes.
const shade = 'var(--furniture-shade, #aab5c00c)';
const surface = 'var(--furniture-surface, #aab5c01b)';
const highlight = 'var(--furniture-highlight, #aab5c029)';
const outlineColor = 'var(--furniture-outline, #a4abb4)';

const materialShapes = {
 daily: `<path d="M13 37a8 8 0 0 1-1-16 10 10 0 0 1 17-5 8 8 0 0 1 13 7 7 7 0 0 1-2 14Z" fill="${shade}"/><path d="M12 26q2-5 7-4m5-5q4 0 6 4"/>`,
 pop: `<path d="M25 13c2-9 14-7 12 3 9-2 13 9 4 13 6 8-3 15-10 10-3 10-15 7-14-2-9 2-14-8-6-13-6-7 3-15 10-10Z" fill="${shade}"/><circle cx="26" cy="26" r="5" fill="${highlight}"/>`,
 dream: `<path d="m24 8 5 12 12 5-12 5-5 13-5-13-12-5 12-5Z" fill="${surface}"/><path d="M40 7v7m-3.5-3.5h7"/>`,
 common: `<path d="m17 17-4 21q13 5 26 0l-4-21Z" fill="${shade}"/><path d="M20 17v-3a6 6 0 0 1 12 0v3m-17 4h22"/><circle cx="26" cy="30" r="3" fill="${highlight}"/>`,
 rare: `<path d="m13 18 13-9 13 9-3 22H16Z" fill="${surface}"/><path d="m26 18 2.5 6 6.5 1-5 4.5 1 6-5-3-5 3 1-6-5-4.5 6.5-1Z" fill="${shade}"/>`,
 legend: `<path d="m10 19 9-9h14l9 9-16 23Z" fill="${shade}"/><path d="m19 10 3 9 4 23 4-23 3-9m-23 9h32"/><path d="m22 19 4-9 4 9Z" fill="${highlight}"/>`,
 leaf: `<path d="M12 36C8 19 24 9 41 10c1 17-11 31-29 26Z" fill="${shade}"/><path d="m9 42 25-24m-15 14-1-9m7 3h8"/>`,
 spark: `<circle cx="26" cy="26" r="9" fill="${surface}"/><path d="M26 7v5m0 28v5M7 26h5m28 0h5M12 12l4 4m20 20 4 4m-28 0 4-4m20-20 4-4"/>`,
 moon: `<path d="M33 9a18 18 0 1 0 9 27A20 20 0 0 1 33 9Z" fill="${surface}"/><path d="M40 12v6m-3-3h6"/>`,
 dew: `<path d="M26 7c-5 10-14 18-14 26a14 14 0 0 0 28 0c0-8-9-16-14-26Z" fill="${shade}"/><path d="M18 31q-1 7 6 9"/>`,
 ember: `<path d="M29 6q13 17 9 30c-3 12-24 13-25-2q-1-9 8-16-1 8 4 9 7-8 4-21Z" fill="${shade}"/><path d="M26 30q8 9 1 13-8-1-4-9Z" fill="${highlight}"/>`,
 stardust: `<path d="m22 9 3.5 10.5L36 23l-10.5 3.5L22 38l-3.5-11.5L8 23l10.5-3.5Z" fill="${surface}"/><path d="m39 31 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/><circle cx="39" cy="13" r="1.5" fill="${highlight}"/>`,
 twig: `<path d="m10 40 12-14-2-12 3-2 3 10L37 9l3 2-11 15 10-3 1 3-15 5-12 12Z" fill="${shade}"/><path d="M29 15q-3-9 7-12 1 8-7 12Z" fill="${surface}"/>`,
 glowShell: `<path d="M21 40 9 28q-5-6 0-10 0-7 7-7 3-7 10-4 7-4 11 3 7 0 7 8 5 5 0 11L31 40Z" fill="${shade}"/><path d="m14 22 9 13m-4-19 5 17m4-18-1 18m10-16-8 18"/><path d="M21 39h11l-2 5h-7Z" fill="${highlight}"/>`,
 moonstone: `<path d="m8 30 6-15 16-7 13 11 1 15-15 10-16-4Z" fill="${shade}"/><path d="m14 15 11 9 18-5-13-11Z" fill="${highlight}"/><path d="m25 24 4 20 15-10-1-15Z" fill="${surface}"/><path d="m17 26 1.5 3.5L22 31l-3.5 1.5L17 36l-1.5-3.5L12 31l3.5-1.5Z" fill="${highlight}" stroke="none"/>`,
};

export function icon(id,cls=''){
 const material = materialShapes[id];
 const art = material || shapes[id] || materialShapes.dream;
 const stroke = material ? outlineColor : '#716281';
 return `<svg class="material-icon ${material?'supply-art ':''}${cls}" viewBox="0 0 52 52" fill="none" stroke="${stroke}" stroke-width="${material ? .8 : 1.6}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${art}</svg>`;
}

export function furnitureArt(id,level=1){
 const lv=Math.max(1,Math.min(10,level));
 const growth=(lv-1)/9;
 const art=spaceItemArt[id]||materialShapes.dream;
 const strokeWidth=(.68+growth*.15).toFixed(2);
 return `<svg class="material-icon furniture-art" viewBox="0 0 52 52" fill="none" stroke="${outlineColor}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${art}</svg>`;
}
