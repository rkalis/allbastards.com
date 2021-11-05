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
export interface Attribute {
  trait_type: string;
  value: string;
}

export enum HypeType {
  CALM = 'CALM AF (STILL)',
  HYPED = 'HYPED AF (ANIMATED)',
}
