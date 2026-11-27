import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = new URL('../', import.meta.url);
const output = new URL('www/', root);
const entryFiles = new Set(['favicon.svg', 'VERSION.json']);
const gameFiles = (await readdir(root, { withFileTypes: true }))
  .filter(file => file.isFile() && !file.name.startsWith('.'))
  .map(file => file.name)
  .filter(name => entryFiles.has(name) || /\.(css|mjs)$/.test(name));

await rm(output, { recursive: true, force: true });
await mkdir(output);
const index = await readFile(new URL('index.html', root), 'utf8');
const mobileIndex = index
  .replace(/<!-- web-analytics:start -->[\s\S]*?<!-- web-analytics:end -->\s*/g, '')
  .replace('</body>', '<script type="module" src="./native-tab-bar.mjs"></script></body>');
await Promise.all([
  writeFile(new URL('index.html', output), mobileIndex),
  ...gameFiles.map(name => cp(new URL(name, root), new URL(name, output))),
  cp(new URL('assets/', root), new URL('assets/', output), { recursive: true }),
  build({
    entryPoints: {
      'native-share-save': fileURLToPath(new URL('./share-save.mjs', import.meta.url)),
      'native-merge-haptics': fileURLToPath(new URL('./merge-haptics.mjs', import.meta.url)),
      'native-tab-bar': fileURLToPath(new URL('./tab-bar.mjs', import.meta.url)),
    },
    outdir: fileURLToPath(output),
    outExtension: { '.js': '.mjs' },
    bundle: true,
    splitting: true,
    format: 'esm',
    target: ['safari15', 'chrome109'],
  }),
]);
