import fs from 'fs';
import path from 'path';
import EXPERIMENTAL_CATEGORIES from './experimental-categories';

const indexBastard = (bastardIndex: number, attributesIndex: any) => {
  console.log(`Indexing ${bastardIndex}`);

  // eslint-disable-next-line global-require, import/no-dynamic-require
  const metadata = require(`../public/metadata/${bastardIndex}.json`);

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
    BALD: 'BALD',
    BANDANA: 'BANDANA',
    BEANIE: 'BEANIE',
    BLACKBG: 'BLACK BACKGROUND',
    CAP: 'CAP',
    CAPBACKWARDS: 'BACKWARD CAP',
    CAPFORWARDS: 'FORWARD CAP',
    CLOWNHAIRGREENAFRO: 'AFRO',
    CLOWNHAIRGREENBALD: 'CLOWN HAIR',
    COWBOYHAT: 'COWBOY HAT',
    CRAZYHAIRREGULAR: 'CRAZY HAIR REGULAR',
    CRAZYHAIRHEART: 'CRAZY HAIR HEART',
    DORAG: 'DO-RAG',
    EYESOo: 'O_o EYES',
    FEDORA: 'FEDORA',
    GOLDCHAIN: 'GOLD CHAIN',
    HEADBAND: 'HEAD BAND',
    HEARTSHAPEDHAIR: 'HEART-SHAPED HAIR',
    HOODIE: 'HOODIE',
    HOODIE_PARTIAL: 'PARTIAL HOODIE',
    KNITTEDCAP: 'KNITTED CAP',
    NECK_NONE: 'NO NECK',
    NECK_THICK: 'THICK NECK',
    NECK_THIN: 'THIN NECK',
    PEAKSPIKE: 'PEAK SPIKE',
    PILOTHELMET: 'PILOT HELMET',
    PINKWITHHAT: 'PINK WITH HAT',
    PINKWITHHAT_PARTIAL: 'PARTIAL PINK WITH HAT',
    POLICECAP: 'POLICE CAP',
    PURPLEHAIR: 'PURPLE HAIR',
    PURPLEHAIR_PARTIAL: 'PARTIAL PURPLE HAIR',
    TASSLEHAT: 'TASSLE HAT',
    TASSLEHAT_PARTIAL: 'PARTIAL TASSLE HAT',
    TIARA: 'TIARA',
    TIARA_PARTIAL: 'PARTIAL TIARA',
    TOPHAT: 'TOP HAT',
    VR: 'VR GOGGLES',
    WELDINGGOGGLES: 'WELDING GOGGLES',
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
