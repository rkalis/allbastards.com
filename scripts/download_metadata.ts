import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { range } from '../src/utils';
import { HIGHEST_BASTARD_ID } from '../src/utils/constants';

const downloadBastard = async (index: number) => {
  console.log(`Downloading ${index}`);

  const { data } = await axios.get(`https://bastardganpunks.club/api/${index}`);

  fs.writeFileSync(path.join(__dirname, '..', 'public', 'metadata', `${index}.json`), JSON.stringify(data));

  return data;
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

const LAST = fs.readdirSync(path.join(__dirname, '..', 'public', 'metadata'))
  .map((name) => Number.parseInt(name.replace(/\.json/, ''), 10))
  .sort((a, b) => a - b)
  .pop();

const START = LAST === undefined ? 0 : LAST + 1;

downloadBastards(HIGHEST_BASTARD_ID - START + 1, START);
