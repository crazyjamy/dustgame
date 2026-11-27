import { mkdir, writeFile } from 'node:fs/promises';
import { uiIcon } from '../ui-icons.mjs';

const catalog = new URL('../ios/App/App/Assets.xcassets/', import.meta.url);
const icons = { room: 'home', collection: 'collection', storage: 'storage', shop: 'shop' };
const contents = {
  images: [{ filename: 'icon.svg', idiom: 'universal' }],
  info: { author: 'xcode', version: 1 },
  properties: { 'preserves-vector-representation': true, 'template-rendering-intent': 'template' },
};

for (const [page, icon] of Object.entries(icons)) {
  const imageSet = new URL(`GameTab-${page}.imageset/`, catalog);
  const svg = uiIcon(icon)
    .replace(/<svg[^>]*viewBox=/, '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox=')
    .replace(/ aria-hidden="true" focusable="false"/, '')
    .replaceAll('currentColor', '#000');
  await mkdir(imageSet, { recursive: true });
  await Promise.all([
    writeFile(new URL('icon.svg', imageSet), svg + '\n'),
    writeFile(new URL('Contents.json', imageSet), JSON.stringify(contents, null, 2) + '\n'),
  ]);
}
