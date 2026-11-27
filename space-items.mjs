// Each silhouette represents a real celestial object or a spacecraft instrument.
const detail = 'var(--furniture-detail, #939da5)';
const shade = 'var(--furniture-shade, #aab5c00c)';
const surface = 'var(--furniture-surface, #aab5c01b)';
const highlight = 'var(--furniture-highlight, #aab5c029)';
export const spaceItemArt={
 shellLamp:`<ellipse cx="26" cy="42" rx="14" ry="3" fill="${surface}"/>
  <path d="M23 38C15 33 8 27 9 21q0-5 5-5 1-6 7-5 4-7 9-2 6-2 8 4 7 1 6 8c-1 7-8 13-15 17Z" fill="${surface}"/>
  <path d="m15 18 9 14m-3-18 4 16m6-18-4 18m11-14-9 15" stroke="${detail}"/>
  <circle cx="26" cy="32" r="6" fill="${highlight}"/><circle cx="24" cy="30" r="1.7" fill="${highlight}" stroke="none"/>
  <path d="M11 33q13 8 30-1-2 10-15 10-12 0-15-9Z" fill="${highlight}"/>`,
 moonShelf:`<path d="M13 29v12l8-10m11 0v11l8-12" fill="${surface}"/>
  <path d="m7 27 28-6 11 5-30 7Z" fill="${highlight}"/><path d="m7 27 9 6 30-7v5l-30 7-9-6Z" fill="${surface}"/>
  <path d="M30 7a10 10 0 1 0 8 14q-12 1-8-14Z" fill="${highlight}"/>
  <path d="m13 25-1-9 4-1 2 9m2-1-2-11 4-1 2 11" fill="${surface}"/>`,
 woodStool:`<path d="m16 24-4 17q1 2 4 1l5-16m11-1 4 17q3 1 4-1l-4-18" fill="${surface}"/>
  <path d="m24 26 1 10h4l1-10" fill="${shade}"/>
  <path d="M9 18q0-6 17-6t17 6v5q-2 6-17 6T9 23Z" fill="${surface}"/>
  <ellipse cx="26" cy="18" rx="17" ry="6.5" fill="${highlight}"/>
  <path d="M15 18q6-4 15-3m-8 6q8 0 14-3" stroke="${detail}"/>`,

 rug:`<circle cx="26" cy="26" r="14" fill="${surface}"/>
  <path d="M16 21q6-6 14-6" stroke="${detail}"/>
  <path d="M13 22.15a22 6 0 1 0 26 0" transform="rotate(-22 26 27)"/>`,
 plant:`<path d="M6 40v-9a20 20 0 0 1 40 0v9Z" fill="${highlight}"/><path d="M8 34h36v9H8Z" fill="${shade}"/><path d="M26 33v-15m0 8-7-5m7 8 7-8" stroke="${detail}"/><circle cx="19" cy="20" r="3" fill="${surface}"/><circle cx="33" cy="21" r="3" fill="${highlight}"/>`,
 lamp:`<path d="M14 42h24l-2-4H16Z" fill="${shade}"/><path d="M21 38V22h10v16m-7-15v15"/><path d="m17 21 9-13 9 13Z" fill="${surface}"/><path d="m22 19 4-6 4 6" stroke="${detail}"/><path d="M8 14l5 2m26 0 5-2M12 6l4 4m20 0 4-4" stroke="${detail}"/>`,
 cushion:`<path d="M15 33 20 16h12l6 17Z" fill="${surface}"/><path d="m16 30-7 10h-4m31-10 7 10h4M20 34h12v6H20Z" fill="${highlight}"/><circle cx="26" cy="22" r="4" fill="${highlight}"/>`,
 bookshelf:`<rect x="11" y="9" width="30" height="34" rx="5" fill="${surface}"/><path d="M17 17h18v13H17Z" fill="${shade}"/><path d="M20 23h11m-9 4h7" stroke="${detail}"/><circle cx="18" cy="36" r="1.8" fill="${highlight}"/><path d="M24 36h11"/>`,
 teacup:`<rect x="10" y="14" width="32" height="26" rx="5" fill="${highlight}"/><path d="M15 19h22v16H15Z" fill="${shade}"/><path d="m19 29 4-6 4 6 4-6 3 4" stroke="${detail}"/><path d="M6 20h4m-4 13h4m32-13h4m-4 13h4"/>`,
 basket:`<path d="M11 21q0-11 15-11t15 11v15q0 7-15 7t-15-7Z" fill="${surface}"/><path d="M11 23h30m-30 12h30"/><path d="m19 31 5-5 8 2 3 5-8 4Z" fill="${highlight}"/>`,
 windchime:`<path d="M26 28V43m-9 1h18"/><path d="M9 15q26 0 34 18-21 10-34-18Z" fill="${highlight}"/><path d="M19 26 32 12m0-6v12m-6-6h12" stroke="${detail}"/>`,
 hourglass:`<circle cx="26" cy="26" r="13" fill="${surface}"/><ellipse cx="26" cy="26" rx="20" ry="7" transform="rotate(40 26 26)"/><path d="m5 9 9 8m24 20 9 8" stroke="${detail}"/><path d="M26 19v7l5 3"/>`,
 musicbox:`<rect x="9" y="25" width="34" height="17" rx="4" fill="${surface}"/><path d="M26 25V10m-6 0h12M18 31v5m5-6v7m5-5v4m5-6v7" stroke="${detail}"/><path d="M11 15q3-6 8-8m14 0q5 2 8 8" stroke="${detail}"/>`,
 starlamp:`<path d="M23 27h6v14m-11 1h16"/><path d="m8 19 18-9 18 9-18 10Z" fill="${highlight}"/><path d="m17 15 18 9m-1-10-17 10M8 19l18 1 18-1"/>`,
 glassjar:`<rect x="10" y="12" width="32" height="28" rx="7" fill="${highlight}"/><path d="M10 22h32m-25-10v28m18-28v28"/><circle cx="23" cy="27" r="2" fill="${highlight}"/><circle cx="31" cy="33" r="2" fill="${surface}"/>`,
 wishboard:`<path d="M26 24v18m-9 2h18"/><path d="M11 13q2 17 22 20l8-8Z" fill="${surface}"/><path d="m25 24 10-13m0-5v10m-5-5h10" stroke="${detail}"/>`,
 postbox:`<path d="M13 22q0-12 13-12t13 12v15q-13 10-26 0Z" fill="${surface}"/><path d="M13 36h26m-24-14h22"/><path d="M21 25h10v8H21Z" fill="${highlight}"/>`,
 prism:`<path d="m23 9 16 29H7Z" fill="${highlight}"/><path d="m3 22 16 5 27-10m-25 12 26 1m-23 2 20 9" stroke="${detail}"/><path d="m23 9 3 22L7 38"/>`,
 starmobile:`<ellipse cx="26" cy="26" rx="21" ry="13" transform="rotate(-24 26 26)"/><circle cx="18" cy="25" r="8" fill="${highlight}"/><circle cx="34" cy="27" r="6" fill="${highlight}"/><path d="M26 10v-5m0 42v-5" stroke="${detail}"/>`,
 workbench:`<rect x="6" y="12" width="40" height="27" rx="4" fill="${surface}"/><path d="M11 18h30v12H11Z" fill="${shade}"/><path d="M15 35h22M15 22h6m4 0h5m4 0h3" stroke="${detail}"/><path d="M15 39v5m22-5v5"/>`,
 candle:`<circle cx="26" cy="21" r="11" fill="${highlight}"/><path d="M26 5v4m0 24v5M10 21H6m40 0h-4"/><path d="M12 41h28v5H12Z" fill="${shade}"/><path d="m20 41 6-10 6 10" fill="${surface}"/>`,
 blanket:`<path d="M7 32 14 14h24l7 18-19 12Z" fill="${surface}"/><path d="m14 14 12 30 12-30M11 24h30m-33 9h36" stroke="${detail}"/>`,
 terrarium:`<path d="m10 25 12-14 18 8 2 15-15 9-15-6Z" fill="${highlight}"/><path d="m22 11 3 18 15-10M25 29l2 14m-2-14-13 8" stroke="${detail}"/><path d="M33 5h12m-10 5h12" stroke="${detail}"/>`,
};
