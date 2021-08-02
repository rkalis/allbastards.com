import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { range } from '../src/utils';
import { BASTARDS_API_BASE, HIGHEST_BASTARD_ID } from '../src/utils/constants';

const downloadBastard = async (index: number) => {
  console.log(`Downloading ${index}`);

  const { data } = await axios.get(`${BASTARDS_API_BASE}/${index}`);
  const imageUrl = data.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
  const { data: stream } = await axios.get(imageUrl, { responseType: 'stream' });

  await new Promise<void>((resolve, reject) => {
    setTimeout(reject, 10000);

    stream
      .pipe(fs.createWriteStream(path.join(__dirname, '..', 'public', 'img', 'full', `${index}.png`)))
      .on('finish', () => resolve())
      .on('error', (error: any) => reject(error));
  });
};

const downloadBastards = async (count: number, start = 1) => {
  const indexes = range(count, start);

  for (const index of indexes) {
    while (true) {
      try {
        await downloadBastard(index);
        break;
      } catch {
        // ignored
      }
    }
  }
};

const LAST = fs.readdirSync(path.join(__dirname, '..', 'public', 'img', 'full'))
  .filter((name) => name.endsWith('.png') || name.endsWith('.webp'))
  .map((name) => Number.parseInt(name.replace(/\.png|\.webp/, ''), 10))
  .sort((a, b) => a - b)
  .pop();

const START = LAST === undefined ? 1 : LAST + 1;

downloadBastards(HIGHEST_BASTARD_ID - START + 1, START);
