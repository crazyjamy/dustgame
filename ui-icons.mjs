// Shared 24px line icons for game controls. Illustrated game objects use icons.mjs.
const paths = {
 home: '<path d="m3 11 9-8 9 8M5 10v11h14V10M10 21v-7h4v7"/>',
 collection: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
 storage: '<path d="M4 8h16v13H4ZM3 3h18v5H3ZM9 12h6"/>',
 shop: '<path d="M4 12v9h16v-9M2 10l3-7h14l3 7q-2.5 4-6 0-4 4-8 0-3.5 4-6 0ZM10 21v-6h4v6"/>',
 journal: '<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v18m3-13h4m-4 4h4m-4 4h2"/>',
 story: '<path d="M12 6q-4-4-9-2v15q5-2 9 2 4-4 9-2V4q-5-2-9 2Zm0 0v15"/>',
 detail: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8m-8 4h8m-8 4h5"/>',
 settings: '<path d="M4 6h8m4 0h4M4 12h3m4 0h9M4 18h10m4 0h2"/><circle cx="14" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
 gold: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5" fill="currentColor" stroke="none"/>',
 sparkle: '<path d="M12 2q1 8 10 10-9 2-10 10-1-8-10-10 9-2 10-10Z"/>',
 close: '<path d="m6 6 12 12M18 6 6 18"/>',
 edit: '<path d="m4 16-1 5 5-1L20 8a2.8 2.8 0 0 0-4-4ZM14 6l4 4"/>',
 move: '<path d="M3 12h18m-14-4-4 4 4 4m10-8 4 4-4 4"/>',
 check: '<path d="m5 12 4 4L19 6"/>',
 merge: '<circle cx="5.5" cy="12" r="3.5"/><circle cx="18.5" cy="12" r="3.5"/><path d="M12 9.5v5m-2.5-2.5h5"/>',
 survey: '<circle cx="12" cy="12" r="8"/><path d="M12 2v5m0 10v5M2 12h5m10 0h5"/><circle cx="12" cy="12" r="1.75"/>',
 planet: '<circle cx="12" cy="12" r="7"/><path d="M17 6c2-1 4-1 4 0 1 2-2 6-7 9s-9 5-10 3c-1-1 0-3 2-5"/>',
 mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
 recipe: '<path d="M9 3h6m-5 0v7l-5 7a2.5 2.5 0 0 0 2 4h10a2.5 2.5 0 0 0 2-4l-5-7V3M8 14h8"/>',
 clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 heart: '<path d="M12 20 4 12a4.7 4.7 0 0 1 8-5 4.7 4.7 0 0 1 8 5Z"/>',
 reload: '<path d="M20 7v5h-5m5 0a8 8 0 1 0-2.5 5.8"/>',
 help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 4.2 1.8c-1.1 1-1.7 1.4-1.7 2.5m0 3h.01"/>',
 arrow: '<path d="M6 18 18 6M8 6h10v10"/>',
 lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 5v2"/>',
 moon: '<path d="M20 15A8.5 8.5 0 1 1 9 4a9 9 0 0 0 11 11Z"/>',
 flag: '<path d="M5 21V4m0 1c5-4 9 4 14 0v10c-5 4-9-4-14 0"/>',
};

export function uiIcon(name, className = '') {
 const shape = paths[name];
 if (!shape) throw new Error(`Unknown UI icon: ${name}`);
 const classes = className ? `ui-icon ${className}` : 'ui-icon';
 return `<svg class="${classes}" data-icon="${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${shape}</svg>`;
}
