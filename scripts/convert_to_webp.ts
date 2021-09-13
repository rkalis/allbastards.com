import path from 'path';
import fs from 'fs';
import { HIGHEST_BASTARD_ID } from '../src/utils/constants';
import { HypeType } from '../src/utils/interfaces';
import { range } from '../src/utils';

const webp = require('webp-converter');

export const isHyped = (index: number) => {
  // eslint-disable-next-line global-require, import/no-dynamic-require
  const metadata = require(`../public/metadata/${index}.json`);
  const hypeType = metadata.attributes.find((attr: any) => attr.trait_type === 'HYPEMETER');

  return hypeType.value === HypeType.HYPED;
};

const convertBastard = async (index: number) => {
  const inputPath = path.join(__dirname, '..', 'public', 'img', 'full', `${index}.png`);
  const outputPath = path.join(__dirname, '..', 'public', 'img', 'full', `${index}.webp`);

  if (!fs.existsSync(inputPath)) return;
  if (fs.existsSync(outputPath)) return;

  console.log(`Converting ${index}`);

  if (isHyped(index)) {
    await webp.gwebp(inputPath, outputPath, '-q 100');
  } else {
    await webp.cwebp(inputPath, outputPath, '-q 100 -lossless');
  }

  fs.unlinkSync(inputPath);
};

const convertBastards = async (count: number, start = 1) => {
  const indexes = range(count, start);

  for (const index of indexes) {
    while (true) {
      try {
        await convertBastard(index);
        break;
      } catch (error) {
        console.error(error);
      }
    }
  }
};

convertBastards(HIGHEST_BASTARD_ID + 1, 0);
