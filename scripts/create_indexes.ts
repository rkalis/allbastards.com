import fs from 'fs';
import path from 'path';

const indexBastard = (bastardIndex: number, attributesIndex: any) => {
  const metadataPath = path.join(__dirname, '..', 'public', 'metadata', `${bastardIndex}.json`);
  if (!fs.existsSync(metadataPath)) return attributesIndex;

  console.log(`Indexing ${bastardIndex}`);

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const metadata = require(`../public/metadata/${bastardIndex}.json`);

  const TRAIT_OVERRIDES: any = {
    'DOM COLOR NAME': 'DOM COLOR',
    'NUM GLICPIXxX': 'NUMBER OF FRAMES',
  };

  metadata.attributes.forEach(({ trait_type, value }: any) => {
    const key = TRAIT_OVERRIDES[trait_type] ?? trait_type;

    attributesIndex[key] = attributesIndex[key] ?? {};
    attributesIndex[key][value] = attributesIndex[key][value] ?? [];
    attributesIndex[key][value].push(bastardIndex);
  });

  return attributesIndex;
};

const indexAllBastards = () => {
  const indexes = fs.readdirSync(path.join(__dirname, '..', 'public', 'metadata'))
    .map((name) => Number.parseInt(name.replace(/\.json/, ''), 10))
    .sort((a, b) => a - b);

  let attributesIndex: any = {};

  for (const index of indexes) {
    attributesIndex = indexBastard(index, attributesIndex);
  }

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'utils', 'attributes-index.json'), JSON.stringify(attributesIndex, null, 2));
};

indexAllBastards();
