import fs from 'fs';
import path from 'path';

const indexBastard = (bastardIndex: number, attributesIndex: any) => {
  console.log(`Indexing ${bastardIndex}`);

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const metadata = require(`../public/metadata/${bastardIndex}.json`);

  metadata.attributes.forEach(({ key, value }: any) => {
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

  let attributesIndex = {};

  for (const index of indexes) {
    attributesIndex = indexBastard(index, attributesIndex);
  }

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'utils', 'attributes-index.json'), JSON.stringify(attributesIndex, null, 2));
};

indexAllBastards();
