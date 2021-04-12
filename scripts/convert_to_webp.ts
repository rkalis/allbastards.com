import webp from 'webp-converter';
import path from 'path';
import fs from 'fs';
import { HIGHEST_BASTARD_ID, HypeType } from '../src/utils/constants';
import { range } from '../src/utils';

export const isHyped = (index: number) => {
  const metadata = require(`./metadata/${index}.json`);
  const hypeType = metadata.attributes.find((attr: any) => attr.key === 'HYPE TYPE');

  return hypeType.value === HypeType.HYPED;
}

const convertBastard = async (index: number) => {
  console.log(`Converting ${index}`);

  const inputPath = path.join(__dirname, '..', 'public', 'img', 'full', `${index}.png`);
  const outputPath = path.join(__dirname, '..', 'public', 'img', 'full', `${index}.webp`);

  if (isHyped(index)) {
    await webp.gwebp(inputPath, outputPath, "-q 100");
  } else {
    await webp.cwebp(inputPath, outputPath, "-q 100 -lossless");
  }

  fs.unlinkSync(inputPath);
}

const convertBastards = async (count: number, start = 1) => {
  const indexes = range(count, start);

  for (const index of indexes) {
    while (true) {
      try {
        await convertBastard(index);
        break;
      } catch {}
    }
  }
}

const LAST = fs.readdirSync(path.join(__dirname, '..', 'public', 'img', 'full'))
  .filter(name => name.endsWith('.webp'))
  .map(name => Number.parseInt(name.replace(/\.webp/, '')))
  .sort((a, b) => a - b)
  .pop();

const START = LAST === undefined ? 0 : LAST + 1;

convertBastards(HIGHEST_BASTARD_ID - START + 1, START);
