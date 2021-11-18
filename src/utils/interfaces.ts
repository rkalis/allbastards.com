import { Activity, RaribleV2Order } from '@rarible/ethereum-api-client';

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export interface ISettings {
  colourfulBackground: boolean;
  displayNumbers: boolean;
  showFiltersInUrl: boolean;
  enableExperimentalTraits: boolean;
}

export interface FilterOption {
  label: string;
  value: string;
  indices: number[];
}

export interface ActiveFilters {
  [attribute: string]: FilterOption[];
}

export interface FilterSpecification {
  attribute: string;
  options: FilterOption[];
}

export interface Metadata {
  tokenId: number;
  name: string;
  description: string;
  image: string;
  imageArweave: string;
  external_url: string;
  attributes: Attribute[];
}

export interface MarketData {
  owner: string;
  ownerDisplay: string;
  listing?: RaribleV2Order;
  listingPriceDisplay?: string;
  activity: Activity[];
}

export interface Attribute {
  trait_type: string;
  value: string;
}

export enum HypeType {
  CALM = 'CALM AF (STILL)',
  HYPED = 'HYPED AF (ANIMATED)',
}
