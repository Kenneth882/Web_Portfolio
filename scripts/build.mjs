import { mkdir, copyFile, cp, rm } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const output = new URL('dist/', root);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'favicon.svg']) {
  await copyFile(new URL(file, root), new URL(file, output));
}
await cp(new URL('public/', root), new URL('public/', output), { recursive: true });
console.log('Built static portfolio in dist/');
