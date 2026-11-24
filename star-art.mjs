const outlines = {
  scallop: 'M50 10C62 10 66 19 70 24C84 23 91 31 87 44C96 56 91 66 81 70C82 83 71 89 60 84C53 94 42 94 34 85C22 89 13 81 17 69C6 63 7 51 14 44C10 31 18 23 30 24C33 17 40 10 50 10Z',
  bow: 'M18 19C28 14 40 27 50 34C60 27 72 14 82 19C93 25 84 43 73 50C85 57 91 76 80 82C70 87 60 74 50 67C40 74 30 87 20 82C9 76 15 57 27 50C16 43 7 25 18 19Z',
  arch: 'M16 65V47C16 25 29 13 50 13C71 13 84 25 84 47V68Q84 85 68 85H32Q16 85 16 65Z',
  octagon: 'M35 13H65Q70 13 74 17L84 27Q88 31 88 36V64Q88 70 84 74L74 84Q70 88 65 88H35Q30 88 26 84L16 74Q12 70 12 64V36Q12 31 16 27L26 17Q30 13 35 13Z',
  shell: 'M12 64C12 48 23 31 36 22C53 10 76 14 86 27C99 45 88 54 77 59C68 64 69 81 56 87C39 95 12 84 12 64Z',
  kite: 'M48 10Q53 8 58 13L86 44Q91 50 86 55L54 89Q49 94 45 87L17 59Q12 53 15 46Z',
  crown: 'M13 33Q12 23 20 28L34 36L46 13Q50 7 54 13L66 36L80 28Q88 23 87 33L79 73Q76 86 64 86H36Q24 86 21 73Z',
  wave: 'M11 42C12 27 19 22 29 25C36 27 43 18 51 17C63 16 71 25 73 34C84 35 90 44 89 55C88 68 78 73 72 75C63 86 52 84 44 78C34 85 26 82 22 72C10 66 8 54 11 42Z',
  twin: 'M50 26C58 15 72 14 81 26C91 39 90 64 79 76C71 85 57 84 50 73C42 84 29 85 20 76C9 64 9 39 19 26C28 14 42 15 50 26Z',
  comet: 'M12 56C12 33 33 21 50 24C64 25 76 14 87 16Q93 18 87 26L74 40C84 54 81 72 68 82C49 97 12 83 12 56Z',
  fan: 'M13 68C7 57 14 48 22 43C18 28 29 18 40 22C41 13 57 10 64 22C77 19 87 30 82 43C93 50 94 61 86 71C76 86 24 87 13 68Z',
  cushion: 'M18 17C29 19 38 23 50 23C62 23 71 19 82 17Q91 16 83 33C78 44 79 56 84 68Q91 85 81 84C70 82 61 77 50 77C39 77 30 82 19 84Q9 85 16 68C21 56 22 44 17 33Q9 16 18 17Z',
  blob: 'M50 12C56 12 56 28 68 33C75 37 88 35 89 43C90 50 77 57 75 67C73 77 80 88 73 90C66 92 58 84 50 84C40 84 33 91 27 89C20 86 26 75 24 67C22 57 10 50 11 43C12 35 26 37 33 33C44 28 44 12 50 12Z',
  round: 'M50 13C72 13 87 28 87 51C87 73 71 87 50 87C28 87 13 73 13 51C13 28 28 13 50 13Z',
  bud: 'M50 13C58 13 62 17 67 23C73 30 87 36 87 51C87 72 70 87 50 87C29 87 13 72 13 51C13 36 27 30 33 23C38 17 42 13 50 13Z',
  square: 'M32 17H68Q84 17 84 34V68Q84 84 68 84H32Q16 84 16 68V34Q16 17 32 17Z',
  triangle: 'M41 20Q50 6 59 20L86 67Q97 84 77 84H23Q4 84 14 67Z',
  pill: 'M40 24H60C80 24 89 37 89 52C89 68 78 79 60 79H40C22 79 11 68 11 52C11 37 21 24 40 24Z',
  gem: 'M32 15H68L87 39L76 73L50 89L24 73L13 39Z',
  diamond: 'M43 16Q50 9 57 16L84 43Q91 50 84 57L57 84Q50 91 43 84L16 57Q9 50 16 43Z',
  moon: 'M63 15C41 8 20 24 17 48C14 73 32 88 54 87C67 86 78 77 83 66C69 76 56 71 54 60C60 57 65 47 62 41C53 31 58 21 63 15Z',
  flower: 'M50 12C62 12 65 24 66 29C78 24 89 30 89 41C89 50 82 55 76 57C86 65 82 79 72 83C61 88 54 78 50 73C45 81 38 87 28 83C18 79 14 65 24 57C11 53 9 42 14 34C18 27 27 25 34 29C35 23 40 12 50 12Z',
  clover: 'M50 25C60 6 85 12 84 31C84 38 81 44 75 48C93 59 87 82 69 84C60 85 54 80 50 73C45 80 37 86 28 84C12 81 9 58 25 48C7 36 17 11 36 15C42 16 47 19 50 25Z',
  ghost: 'M19 74V48C19 25 32 14 50 14C68 14 81 25 81 48V74Q81 86 73 81L65 74L55 84Q50 89 45 84L35 74L27 81Q19 86 19 74Z',
  heart: 'M50 27C63 8 89 18 88 38C87 60 58 79 50 88C42 79 13 60 12 38C11 18 37 8 50 27Z',
  drop: 'M44 16Q50 7 56 16C66 31 83 47 83 62C83 80 68 89 50 89C32 89 17 80 17 62C17 47 34 31 44 16Z',
  leaf: 'M75 17C92 29 89 53 72 71C57 87 32 89 20 74C9 59 16 37 32 27C47 17 63 23 75 17Z',
  bean: 'M39 19C62 13 86 27 87 48C88 70 78 82 58 81C49 81 46 76 36 78C23 80 13 73 14 60C14 48 19 25 39 19Z',
  cloud: 'M19 47C11 34 23 22 36 24C43 9 67 12 71 29C87 29 92 41 86 53C98 70 81 83 67 79C55 88 40 86 32 78C12 83 6 61 19 47Z',
  fluff: 'M25 28C24 13 42 10 50 22C62 8 80 16 77 30C93 27 98 45 85 51C98 62 87 79 74 74C77 89 59 93 50 81C41 93 23 89 26 74C11 80 3 64 15 52C3 41 12 25 25 28Z',
  ripple: 'M50 15C64 6 75 18 74 29C90 27 94 43 83 51C94 62 84 77 72 73C69 88 57 90 50 81C42 92 26 88 27 74C11 77 6 62 17 51C7 40 15 27 28 30C25 15 39 8 50 15Z',
  moss: 'M14 60C14 47 21 42 27 38C23 24 37 19 45 25C51 12 68 14 72 30C87 30 92 45 85 55C94 68 82 82 65 82H36C23 82 14 74 14 60Z',
  snow: 'M50 11Q56 11 57 21L59 31L69 25Q85 16 85 29L74 42L84 45Q96 51 85 57L74 60L84 72Q87 85 72 79L61 71L57 82Q50 97 43 82L39 71L28 79Q13 85 16 72L26 60L15 57Q4 51 16 45L26 42L15 29Q15 16 31 25L41 31L43 21Q44 11 50 11Z',
  star: 'M50 9Q55 9 57 25L63 37L87 44Q96 47 86 54L69 62L65 85Q63 94 56 86L50 76L40 88Q33 94 32 84L29 62L13 54Q4 49 13 44L36 37L43 19Q46 9 50 9Z',
};

const motifs = {
  dots: '<circle cx="35" cy="30" r="3"/><circle cx="46" cy="26" r="2"/><circle cx="30" cy="39" r="1.6"/>',
  bands: '<path d="M24 36Q37 29 51 31M50 72Q66 74 77 64" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>',
  specks: '<path d="M38 26l2 4 4 2-4 2-2 4-2-4-4-2 4-2ZM64 65l2 3 3 2-3 1-2 4-1-4-4-1 4-2Z"/>',
  facets: '<path d="M34 23h29l9 12-16-4ZM27 63l14 6 9 12Z"/>',
  waves: '<path d="M31 31q8-8 16 0t16 0M31 67q8-6 16 0t16 0" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
};

const baseMotifs = {
  fluff: 'specks', square: 'dots', flower: 'dots', ghost: 'specks', star: 'specks',
  pill: 'bands', triangle: 'facets', leaf: 'bands', moss: 'dots', cloud: 'waves',
  heart: 'dots', diamond: 'facets', ripple: 'waves', clover: 'dots', snow: 'specks',
  drop: 'bands', bean: 'waves', gem: 'facets',
};

const collectionLooks = [
  ['twin', 'bands'], ['octagon', 'bands'], ['drop', 'dots'], ['cloud', 'waves'], ['gem', 'facets'],
  ['triangle', 'facets'], ['pill', 'waves'], ['scallop', 'specks'], ['ghost', 'specks'], ['leaf', 'bands'],
  ['cushion', 'specks'], ['round', 'dots'], ['kite', 'facets'], ['crown', 'specks'], ['flower', 'dots'],
  ['wave', 'waves'], ['arch', 'dots'], ['gem', 'specks'], ['heart', 'dots'], ['fan', 'dots'],
  ['shell', 'dots'], ['square', 'dots'], ['comet', 'bands'], ['clover', 'dots'], ['star', 'specks'],
  ['bow', 'bands'], ['snow', 'specks'], ['triangle', 'bands'], ['bean', 'waves'], ['diamond', 'bands'],
];

const youngOutlines = {
  blob:'bud', star:'bud', crown:'bud', snow:'bud',
  square:'arch', octagon:'cushion', diamond:'cushion', gem:'cushion', kite:'drop',
  clover:'twin', flower:'twin', bow:'twin', fluff:'cloud', scallop:'cloud',
  ghost:'arch', triangle:'bud', drop:'bud', pill:'bean', leaf:'bean',
  moon:'shell', shell:'bean', comet:'shell', wave:'moss', ripple:'moss',
  heart:'fan', fan:'cloud', twin:'pill', cloud:'wave', moss:'wave',
};

export const starLevelScale = level => [.76, .83, .89, .95, 1][Math.min(level, 5) - 1];

export function starAppearance(shape, stage = 2, level = [1,3,4][stage]) {
  if (stage === 0) return { path: outlines.round, pattern: '' };
  if (level === 2) return { path: outlines.bud, pattern: '' };
  const variant = shape.startsWith('soft-') ? Number(shape.slice(5)) : 0;
  const [outline, motif] = collectionLooks[variant - 1] || [shape, baseMotifs[shape]];
  if (stage === 1) return { path: outlines[youngOutlines[outline] || outline] || outlines.bud, pattern: '' };
  return { path: outlines[outline] || outlines.round, pattern: motifs[motif] || '' };
}

// Use the same soft light in the catalog, on the planet and in the canvas map.
export const starFace = '#352743';

function blendLight(first, second, amount) {
  const channel = (hex, i) => parseInt(hex.slice(i, i + 2), 16);
  const channels = [1, 3, 5].map(i => Math.round(channel(first, i) * (1 - amount) + channel(second, i) * amount));
  return `rgb(${channels.join(', ')})`;
}

export function starLight(color, rarity) {
  const rare = rarity === 'legend';
  return [
    [0, blendLight(color, rare ? '#fff1db' : '#fff4e7', .78)],
    [.47, blendLight(color, '#ffffff', rare ? .42 : .30)],
    [.76, blendLight(color, rare ? '#a6e7fb' : '#c9b3ff', .61)],
    [1, blendLight(color, rare ? '#e9b5f2' : '#e7c9f8', .74)],
  ];
}
