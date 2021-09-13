import { ISettings } from './interfaces';

export const OPENSEA_BASE = 'https://opensea.io/assets/0x1c60841b70821dca733c9b1a26dbe1a33338bd43';
export const OPEANSEA_REFERRAL = 'ref=0xe126b3e5d052f1f575828f61feba4f4f2603652a';
export const BASTARDS_API_BASE = 'https://api.glicpixxx.love/ver002';
export const HIGHEST_BASTARD_ID = 11499;
export const IMAGE_BASE = '/img/full/';
export const THUMBNAIL_BASE = '/img/thumb/';
export const METADATA_BASE = '/metadata';
export const PLACEHOLDER_IMAGE = '/img/loading.gif';

export const BASTARD_CONTRACT_ADDRESS = '0x1C60841b70821dcA733c9B1a26dBe1a33338bD43';
export const NFT20_ADDRESS = '0xcCcBF11AC3030ee8CD7a04CFE15a3718df6dD030'; // TODO
export const NFTX_ADDRESS = '0xc3B5284B2c0cfa1871a6ac63B6d6ee43c08BDC79'; // TODO
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';

export const IMAGE_SIZE_SMALL = 100;
export const IMAGE_SIZE_LARGE = 480;

export const GENERAL_ATTRIBUTES = [
  'TYPE',
  'BASTARD OR NOT',
  'TRAINING LVL',
];

export const HYPED_ATTRIBUTES = [
  'DANCER OR CLOCK', // maybe skip?
  'DANCE ALGO',
  'CLOCK SPEED (ms)',
  'NUMBER OF FRAMES',
  'GRAINY???',
];

export const CALM_ATTRIBUTES = [
  'GLIC PATTERN',
  'DOM COLOR',
  'UNIQUE COLORS',
  'ORIGIN IMAGE',
];

export const DEFAULT_SETTINGS: ISettings = {
  colourfulBackground: false,
  displayNumbers: false,
  showFiltersInUrl: true,
  enableExperimentalTraits: false,
};
