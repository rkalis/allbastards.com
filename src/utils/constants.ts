import { ISettings } from './interfaces';

export const OPENSEA_BASE = 'https://opensea.io/assets/0xF38d6BF300d52bA7880b43cDDB3F94ee3C6C4Ea6';
export const OPEANSEA_REFERRAL = 'ref=0xe126b3e5d052f1f575828f61feba4f4f2603652a';
export const BASTARDS_API_BASE = 'https://pxg-prod.herokuapp.com/metadata';
export const HIGHEST_BASTARD_ID = 10000;
export const IMAGE_BASE = '/img/full/';
export const THUMBNAIL_BASE = '/img/thumb/';
export const METADATA_BASE = '/metadata';
export const PLACEHOLDER_IMAGE = '/img/loading.gif';

// TODO: Change these
export const BASTARD_CONTRACT_ADDRESS = '0xF38d6BF300d52bA7880b43cDDB3F94ee3C6C4Ea6';
export const NFT20_ADDRESS = '0x24aeE9418fB15C652d3658e4d7bc7F4fcAf647F8';
export const NFTX_V2_ADDRESS = '0x7D74c70120cb34DD1cC0B1fB72493B5Ce4903072';
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const DEAD_ADDRESS = '0x000000000000000000000000000000000000dEaD';

export const IMAGE_SIZE_SMALL = 100;
export const IMAGE_SIZE_LARGE = 480;

export const GENERAL_ATTRIBUTES = [
  'BASTARDNESS',
  'SONG WORD COUNT',
];

export const HYPED_ATTRIBUTES = [
  'SPEEDOMETER',
  'NUM OF FRAMES',
  'HEAD TURNS',
  'FLOATY HEAD',
  'BACKGROUND GLITCH LEVEL',
  'BACKGROUND MOOD',
];

export const CALM_ATTRIBUTES = [
  'TYPE',
  'BACKGROUND',
  'GLITCH PATTERN',
  'FACING DIRECTION',
  'BAD HABIT(S)',
];

export const DEFAULT_SETTINGS: ISettings = {
  colourfulBackground: false,
  displayNumbers: false,
  showFiltersInUrl: true,
};
