import { ActiveFilters, FilterOption, FilterSpecification } from './interfaces';
// import attributesIndex from './attributes-index.json';
import { CALM_ATTRIBUTES, GENERAL_ATTRIBUTES, HIGHEST_BASTARD_ID, HYPED_ATTRIBUTES } from './constants';
import { range } from '.';

// Convert the JSON in the attributes-index.json into a format that can be used by the MultiSelect component
export const getAllAttributeFilters = () => {
  // const allFilters = Object.entries(attributesIndex)
  //   .map(([attribute, attributeIndex]) => {
  //     const options = Object.entries(attributeIndex)
  //       .map(([value, indices]) => ({ label: `${value} - ${indices.length}`, value, indices }))
  //       .sort((a, b) => b.indices.length - a.indices.length);

  //     return { attribute, options };
  //   });

  // return allFilters;

  return [] as FilterSpecification[];
};

export const separateAttributeFilters = (allFilters: FilterSpecification[]) => {
  const generalFilters = allFilters.filter(({ attribute }) => GENERAL_ATTRIBUTES.includes(attribute));
  const hypedFilters = allFilters.filter(({ attribute }) => HYPED_ATTRIBUTES.includes(attribute));
  const calmFilters = allFilters.filter(({ attribute }) => CALM_ATTRIBUTES.includes(attribute));
  const hypeTypeFilter = allFilters.find(({ attribute }) => attribute === 'HYPE TYPE');
  return { generalFilters, hypedFilters, calmFilters, hypeTypeFilter };
};

export const applyFilters = (filters: { [index: string]: FilterOption[] }) => {
  const allIndices = range(HIGHEST_BASTARD_ID, 1);

  // Convert the filters object to a list containing all selected indices for a specific attribute
  // discarding attributes without any selected options
  // Essentially we OR all filters within the same attribute and we AND the different attributes
  const indicesPerFilter = Object.values(filters)
    .filter((selectedFilters) => selectedFilters.length > 0)
    .map((filterOptions) => (
      filterOptions.reduce<number[]>((all, current) => all.concat(current.indices), [])
    ));

  // Keep only the indices that occur in every filter
  const filteredIndices = indicesPerFilter
    .reduce<number[]>((filtered, filter) => filtered.filter((index) => filter.includes(index)), [...allIndices]);

  return filteredIndices;
};

export const updateUrl = (activeFilters: ActiveFilters) => {
  const url = new URL(window.location.toString());

  const filterEntries = Object.entries(activeFilters)
    .map(([attribute, filterOptions]) => {
      const filterValues = filterOptions.map(({ value }) => value);
      return [attribute, filterValues];
    })
    .filter(([, filterValues]) => filterValues.length > 0);

  const filterQuery = JSON.stringify(Object.fromEntries(filterEntries));

  if (filterQuery === '{}') {
    url.searchParams.delete('filters');
  } else {
    url.searchParams.set('filters', filterQuery);
  }

  window.history.replaceState({}, '', url.toString());
};
