import { useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import Modal from '../common/Modal';
import Filter from '../common/Filter';
import attributesIndex from '../../utils/attributes-index.json';
import { FilterOption } from '../../utils/interfaces';
import { HIGHEST_BASTARD_ID } from '../../utils/constants';
import { range } from '../../utils';

interface Props {
  setIndices: (indices: number[]) => void;
}

function Filters({ setIndices }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<{ [attribute: string]: FilterOption[] }>({});

  // Convert the JSON in the attributes-index.json into a format that can be digested by the MultiSelect component
  const allFilters = Object.entries(attributesIndex)
    .map(([attribute, attributeIndex]) => {
      const options = Object.entries(attributeIndex)
        .map(([label, value]) => ({ label: `${label} - ${value.length}`, value }))
        .sort((a, b) => b.value.length - a.value.length);

      return { attribute, options };
    });

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

  return (
    <div className="flex justify-center align-middle items-center">
      <button
        type="button"
        className="inline-flex justify-center text-xl sm:text-4xl font-medium"
        onClick={() => setIsOpen(true)}
      >
        <FiFilter />
      </button>

      <Modal title="FILTERS" isOpen={isOpen} setIsOpen={setIsOpen}>
        {allFilters.map(({ attribute, options }) => (
          <Filter
            label={attribute}
            options={options}
            selected={activeFilters[attribute] ?? []}
            update={(selected: FilterOption[]) => setActiveFilters({ ...activeFilters, [attribute]: selected })}
          />
        ))}
      </Modal>
    </div>
  );
}

export default Filters;
