import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import Modal from '../common/Modal';
import Filter from '../common/Filter';
import Button from '../common/Button';
import { ActiveFilters, FilterOption, FilterSpecification, ISettings } from '../../utils/interfaces';
import { filterObjectByKey } from '../../utils';
import IconButton from '../common/IconButton';
import { getOwnerFilters } from '../../utils/web3';
import { applyFilters, getAllAttributeFilters, updateUrl } from '../../utils/filters';

interface Props {
  settings: ISettings;
  indices: number[];
  setIndices: (indices: number[]) => void;
}

function Filters({ settings, indices, setIndices }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [ownerFilters, setOwnerFilters] = useState<FilterSpecification[]>([]);
  const [parsedUrlOwnerFilter, setParsedUrlOwnerFilter] = useState<string[]>([]);
  const { library, account } = useWeb3React();

  const allFilters = getAllAttributeFilters();

  const parseUrlForFilters = () => {
    // Parse the filter query parameter from the JSON
    const url = new URL(window.location.href);
    const filterEntries = Object.entries<string[]>(JSON.parse(url.searchParams.get('filters') ?? '{}'));

    const selectedFilters = filterEntries
      .map(([attribute, filterValues]) => {
        console.log(attribute);

        const attributeFilter = allFilters.find((filterSpecification) => filterSpecification.attribute === attribute);
        const selectedOptions = attributeFilter?.options.filter(({ value }) => filterValues.includes(value));

        return [attribute, selectedOptions];
      })
      .filter(([, selectedOptions]) => selectedOptions !== undefined && selectedOptions.length > 0);

    // Store the parsed url filter for OWNER so it can be processed *after*
    const ownerFilterEntry = filterEntries.find(([attribute]) => attribute === 'OWNER');
    if (ownerFilterEntry) setParsedUrlOwnerFilter(ownerFilterEntry[1]);

    setActiveFilters(Object.fromEntries(selectedFilters));
  };

  const applyParsedUrlOwnerFilter = () => {
    if (ownerFilters.length === 0 || parsedUrlOwnerFilter.length === 0) return;
    const selectedOptions = ownerFilters[0].options.filter(({ value }) => parsedUrlOwnerFilter.includes(value));
    setActiveFilters({ ...activeFilters, OWNER: selectedOptions });
    setParsedUrlOwnerFilter([]);
  };

  const updateOwnerFilters = async () => {
    const newActiveFilters = filterObjectByKey(activeFilters, (attribute) => attribute !== 'OWNER');
    setActiveFilters(newActiveFilters);
    if (library) {
      setOwnerFilters([await getOwnerFilters(library, account ?? undefined)]);
    } else {
      setOwnerFilters([]);
    }
  };

  const clearFilters = () => {
    setActiveFilters({});
  };

  useEffect(() => {
    applyParsedUrlOwnerFilter();
  }, [ownerFilters, parsedUrlOwnerFilter]);

  useEffect(() => {
    parseUrlForFilters();
  }, []);

  useEffect(() => {
    const filteredIndices = applyFilters(activeFilters);
    setIndices(filteredIndices);
    if (settings.showFiltersInUrl) {
      updateUrl(activeFilters);
    }
  }, [activeFilters]);

  useEffect(() => {
    if (settings.showFiltersInUrl) {
      updateUrl(activeFilters);
    } else {
      updateUrl({});
    }
  }, [settings.showFiltersInUrl]);

  useEffect(() => {
    // Don't run on first render when library and owner filter aren't loaded yet,
    // otherwise we run into concurrency issues with setActiveFilters and url parsing
    if (library || ownerFilters.length > 0) {
      updateOwnerFilters();
    }
  }, [library, account]);

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

  const clearFiltersButton = (
    <Button onClick={clearFilters} label="CLEAR ALL" inverted className="w-full inline-flex justify-center" />
  );

  return (
    <div className="flex justify-center align-middle items-center">
      <IconButton iconName="Filter" onClick={() => setIsOpen(true)} />

      <Modal title="FILTERS" isOpen={isOpen} setIsOpen={setIsOpen} additionalButtons={[clearFiltersButton]}>
        <div className="text-center">
          Total: {indices.length}
        </div>
        <div>
          {renderFiltersFor(allFilters)}
          {renderFiltersFor(ownerFilters)}
        </div>
      </Modal>
    </div>
  );
}

export default Filters;
