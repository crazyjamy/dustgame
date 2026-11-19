const outlines = {
  blob: 'M50 12C56 12 56 28 68 33C75 37 88 35 89 43C90 50 77 57 75 67C73 77 80 88 73 90C66 92 58 84 50 84C40 84 33 91 27 89C20 86 26 75 24 67C22 57 10 50 11 43C12 35 26 37 33 33C44 28 44 12 50 12Z',
  round: 'M50 13C72 13 87 28 87 51C87 73 71 87 50 87C28 87 13 73 13 51C13 28 28 13 50 13Z',
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
  ['round', 'bands'], ['square', 'bands'], ['drop', 'dots'], ['cloud', 'waves'], ['gem', 'facets'],
  ['triangle', 'facets'], ['pill', 'waves'], ['round', 'specks'], ['ghost', 'specks'], ['leaf', 'bands'],
  ['square', 'specks'], ['round', 'dots'], ['diamond', 'facets'], ['triangle', 'specks'], ['flower', 'dots'],
  ['ripple', 'waves'], ['pill', 'dots'], ['gem', 'specks'], ['heart', 'dots'], ['cloud', 'dots'],
  ['bean', 'dots'], ['square', 'dots'], ['drop', 'bands'], ['clover', 'dots'], ['star', 'specks'],
  ['pill', 'bands'], ['snow', 'specks'], ['triangle', 'bands'], ['bean', 'waves'], ['diamond', 'bands'],
];

export function starAppearance(shape) {
  const variant = shape.startsWith('soft-') ? Number(shape.slice(5)) : 0;
  const [outline, motif] = collectionLooks[variant - 1] || [shape, baseMotifs[shape]];
  return { path: outlines[outline] || outlines.round, pattern: motifs[motif] || '' };
}
