import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { range } from '../src/utils';
import { BASTARDS_API_BASE, HIGHEST_BASTARD_ID } from '../src/utils/constants';

const downloadBastard = async (index: number) => {
  const downloadPath = path.join(__dirname, '..', 'public', 'metadata', `${index}.json`);
  if (fs.existsSync(downloadPath)) return false;

  console.log(`Downloading ${index}`);

  const { data } = await axios.get(`${BASTARDS_API_BASE}/${index}`);

  fs.writeFileSync(downloadPath, JSON.stringify(data));

  return data;
};

const downloadBastards = async (count: number, start = 1) => {
  const indexes = range(count, start);

  for (const index of indexes) {
    while (true) {
      try {
        await downloadBastard(index);
        break;
      } catch (error) {
        console.error(error);
      }
    }
  }
};

downloadBastards(HIGHEST_BASTARD_ID + 1, 0);
