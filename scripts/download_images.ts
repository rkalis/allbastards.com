import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { range } from '../src/utils';
import { HIGHEST_BASTARD_ID } from '../src/utils/constants';

const downloadBastard = async (index: number) => {
  const metadataPath = path.join(__dirname, '..', 'public', 'metadata', `${index}.json`);
  const outputPath = path.join(__dirname, '..', 'public', 'img', 'full', `${index}.png`);
  const convertedOutputPath = outputPath.replace('png', 'webp');

  if (fs.existsSync(outputPath)) return;
  if (fs.existsSync(convertedOutputPath)) return;
  if (!fs.existsSync(metadataPath)) return;

  console.log(`Downloading ${index}`);

  // eslint-disable-next-line
  const metadata = require(metadataPath);
  const imageUrl = `https://ipfs.io/ipfs/${metadata.image_ipfs['512']}`;
  const { data: stream } = await axios.get(imageUrl, { responseType: 'stream' });

  await new Promise<void>((resolve, reject) => {
    setTimeout(reject, 10000);

    stream
      .pipe(fs.createWriteStream(outputPath))
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

downloadBastards(HIGHEST_BASTARD_ID + 1, 0);
