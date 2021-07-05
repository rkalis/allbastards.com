import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Modal from '../common/Modal';
import Filter from '../common/Filter';
import attributesIndex from '../../utils/attributes-index.json';
import { ActiveFilters, FilterOption, FilterSpecification, HypeType } from '../../utils/interfaces';
import { CALM_ATTRIBUTES, GENERAL_ATTRIBUTES, HIGHEST_BASTARD_ID, HYPED_ATTRIBUTES } from '../../utils/constants';
import { filterObjectByKey, range } from '../../utils';
import IconButton from '../common/IconButton';
import RangeSlider from '../common/RangeSlider';
import { getOwnerFilters } from '../../utils/web3';

interface Props {
  setIndices: (indices: number[]) => void;
}

function Filters({ setIndices }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [selectedHypeType, setSelectedHypeType] = useState<number>(2);
  const [ownerFilters, setOwnerFilters] = useState<FilterSpecification[]>([]);
  const { library, account } = useWeb3React();

  // Convert the JSON in the attributes-index.json into a format that can be digested by the MultiSelect component
  const allFilters = Object.entries(attributesIndex)
    .map(([attribute, attributeIndex]) => {
      const options = Object.entries(attributeIndex)
        .map(([label, value]) => ({ label: `${label} - ${value.length}`, value }))
        .sort((a, b) => b.value.length - a.value.length);

      return { attribute, options };
    });

  const generalFilters = allFilters.filter(({ attribute }) => GENERAL_ATTRIBUTES.includes(attribute));
  const hypedFilters = allFilters.filter(({ attribute }) => HYPED_ATTRIBUTES.includes(attribute));
  const calmFilters = allFilters.filter(({ attribute }) => CALM_ATTRIBUTES.includes(attribute));
  const hypeTypeFilter = allFilters.find(({ attribute }) => attribute === 'HYPE TYPE');

  const updateSelectedHypeType = (value: number) => {
    // Remove all selected filters from the hype type specific categories
    const newActiveFilters = filterObjectByKey(activeFilters, (attribute) => GENERAL_ATTRIBUTES.includes(attribute));

    // Apply the HYPE_TYPE filter selection
    const filter = [];
    if (value === 1) {
      const calmSelected = hypeTypeFilter?.options.find(({ label }) => label.includes(HypeType.CALM)) as FilterOption;
      filter.push(calmSelected);
    } else if (value === 3) {
      const hypedSelected = hypeTypeFilter?.options.find(({ label }) => label.includes(HypeType.HYPED)) as FilterOption;
      filter.push(hypedSelected);
    }

    setActiveFilters({ ...newActiveFilters, HYPE_TYPE: filter });
    setSelectedHypeType(value);
  };

  const applyFilters = (filters: { [index: string]: FilterOption[] }) => {
    const indices = range(HIGHEST_BASTARD_ID + 1);

    // Convert the filters object to a list containing all selected indices for a specific attribute
    // discarding attributes without any selected options
    // Essentially we OR all filters within the same attribute and we AND the different attributes
    const indicesPerFilter = Object.values(filters)
      .filter((selectedFilters) => selectedFilters.length > 0)
      .map((filterOptions) => (
        filterOptions.reduce<number[]>((all, current) => all.concat(current.value), [])
      ));

    // Keep only the indices that occur in every filter
    const filteredIndices = indicesPerFilter
      .reduce<number[]>((filtered, filter) => filtered.filter((index) => filter.includes(index)), [...indices]);

    return filteredIndices;
  };

  useEffect(() => {
    const filteredIndices = applyFilters(activeFilters);
    setIndices(filteredIndices);
  }, [activeFilters]);

  const updateOwnerFilters = async () => {
    const newActiveFilters = filterObjectByKey(activeFilters, (attribute) => attribute !== 'OWNER');
    setActiveFilters(newActiveFilters);
    if (library && account) {
      setOwnerFilters([await getOwnerFilters(library, account)]);
    } else {
      setOwnerFilters([]);
    }
  };

  useEffect(() => {
    updateOwnerFilters();
  }, [account]);

  const renderFiltersFor = (filterList: any[]) => (
    filterList.map(({ attribute, options }) => (
      <Filter
        key={attribute}
        label={attribute}
        options={options}
        selected={activeFilters[attribute] ?? []}
        update={(selected: FilterOption[]) => setActiveFilters({ ...activeFilters, [attribute]: selected })}
      />
    ))
  );

  const renderHypeTypeSpecificFilters = () => {
    if (selectedHypeType === 1) {
      return renderFiltersFor(calmFilters);
    }

    if (selectedHypeType === 3) {
      return renderFiltersFor(hypedFilters);
    }

    return <p className="text-lg text-center">Please select CALM AF or HYPED AF for type-specific filters.</p>;
  };

  return (
    <div className="flex justify-center align-middle items-center">
      <IconButton iconName="Filter" onClick={() => setIsOpen(true)} />

      <Modal title="FILTERS" isOpen={isOpen} setIsOpen={setIsOpen}>
        <div>
          {renderFiltersFor(generalFilters)}
          {renderFiltersFor(ownerFilters)}
        </div>
        <div className="border-2 p-2 my-2">
          <div className="flex justify-around items-center">
            <span className="text-lg font-bold">CALM AF</span>
            <RangeSlider min={1} max={3} value={selectedHypeType} onChange={updateSelectedHypeType} className="w-1/4" />
            <span className="text-lg font-bold">HYPED AF</span>
          </div>
        </div>
        <div>{renderHypeTypeSpecificFilters()}</div>
      </Modal>
    </div>
  );
}

export default Filters;
