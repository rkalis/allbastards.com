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

export enum HypeType {
  CALM = 'CALM AF',
  HYPED = 'HYPED AF',
}

export enum BastardType {
  BASTARD = 'BASTARD',
  NOT = 'NOT',
}
