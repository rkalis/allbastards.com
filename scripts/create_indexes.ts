import fs from 'fs';
import path from 'path';
import { NULLISH_ATTRIBUTES } from '../src/utils/constants';
import EXPERIMENTAL_CATEGORIES from './experimental-categories';

const indexBastard = (bastardIndex: number, attributesIndex: any) => {
  console.log(`Indexing ${bastardIndex}`);

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const metadata = require(`../public/metadata/${bastardIndex}.json`);

  const definedTraits = metadata.attributes.filter(({ value }: any) => !NULLISH_ATTRIBUTES.includes(value));
  metadata.attributes.push({ trait_type: 'TRAIT COUNT', value: definedTraits.length });

  metadata.attributes.forEach(({ trait_type, value }: any) => {
    attributesIndex[trait_type] = attributesIndex[trait_type] ?? {};
    attributesIndex[trait_type][value] = attributesIndex[trait_type][value] ?? [];

    attributesIndex[trait_type][value].push(bastardIndex);
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

  console.log('Indexing experimental traits');

  const EXPERIMENTAL_TRAIT_MAPPING: any = {
    BLACKBG: 'BLACK BACKGROUND',
    EYESOo: 'O_o EYES',
  };

  EXPERIMENTAL_CATEGORIES.forEach(({ category, tokenIds }) => {
    const traitName = EXPERIMENTAL_TRAIT_MAPPING[category];
    if (!traitName) return;
    attributesIndex['EXPERIMENTAL TRAITS'] = attributesIndex['EXPERIMENTAL TRAITS'] ?? {};
    attributesIndex['EXPERIMENTAL TRAITS'][traitName] = tokenIds;
  });

  fs.writeFileSync(path.join(__dirname, '..', 'src', 'utils', 'attributes-index.json'), JSON.stringify(attributesIndex, null, 2));
};

indexAllBastards();
