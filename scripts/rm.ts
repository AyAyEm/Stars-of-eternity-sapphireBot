import { promises as fs } from 'graceful-fs';

(async () => {
  if (process.argv.length < 3) throw new Error('Wrong usage: rm (path)');
  await fs.rm(process.argv[2], { recursive: true });
})().catch(() => null);
