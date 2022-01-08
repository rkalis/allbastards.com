import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import Modal from '../common/Modal';
import Filter from '../common/Filter';
import Button from '../common/Button';
import { ActiveFilters, FilterOption, FilterSpecification, HypeType, ISettings, Marketplace } from '../../utils/interfaces';
import { CALM_ATTRIBUTES, HYPED_ATTRIBUTES, MARKETPLACE_ATTRIBUTES } from '../../utils/constants';
import { filterObjectByKey } from '../../utils';
import IconButton from '../common/IconButton';
import RangeSlider from '../common/RangeSlider';
import { getOwnerFilters } from '../../utils/web3';
import { applyFilters, getAllAttributeFilters, separateAttributeFilters, updateUrl } from '../../utils/filters';
import { getMarketplaceFilters } from '../../utils/market';

interface Props {
  settings: ISettings;
  indices: number[];
  setIndices: (indices: number[]) => void;
}

function Filters({ settings, indices, setIndices }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [selectedHypeType, setSelectedHypeType] = useState<number>(2);
  const [ownerFilters, setOwnerFilters] = useState<FilterSpecification[]>([]);
  const [parsedUrlOwnerFilter, setParsedUrlOwnerFilter] = useState<string[]>([]);
  const [selectedMarketplaceFilter, setSelectedMarketplaceFilter] = useState<number>(2);
  const [marketplaceFilters, setMarketplaceFilters] = useState<FilterSpecification>();
  const { library, account } = useWeb3React<providers.Web3Provider>();

  const allFilters = getAllAttributeFilters();
  const { generalFilters, hypedFilters, calmFilters, hypeTypeFilter } = separateAttributeFilters(allFilters);

  const updateSelectedHypeType = (value: number) => {
    // Remove all selected filters from the hype type specific categories
    const newActiveFilters = filterObjectByKey(activeFilters, (attribute) => (
      !CALM_ATTRIBUTES.includes(attribute) && !HYPED_ATTRIBUTES.includes(attribute)
    ));

    // Apply the HYPE TYPE filter selection
    const filter = [];
    if (value === 1) {
      const calmSelected = hypeTypeFilter?.options.find(({ label }) => label.includes(HypeType.CALM)) as FilterOption;
      filter.push(calmSelected);
    } else if (value === 3) {
      const hypedSelected = hypeTypeFilter?.options.find(({ label }) => label.includes(HypeType.HYPED)) as FilterOption;
      filter.push(hypedSelected);
    }

    setActiveFilters({ ...newActiveFilters, 'HYPE TYPE': filter });
    setSelectedHypeType(value);
  };

  const updateSelectedMarketplaceFilter = (value: number) => {
    // Remove all selected filters from the hype type specific categories
    const newActiveFilters = filterObjectByKey(activeFilters, (attribute) => (
      !MARKETPLACE_ATTRIBUTES.includes(attribute)
    ));

    // Apply the HYPE TYPE filter selection
    const filter = [];
    if (value === 1) {
      const forSale = marketplaceFilters?.options
        .find(({ label }) => label.includes(Marketplace.FORSALE)) as FilterOption;
      filter.push(forSale);
    } else if (value === 3) {
      const notForSale = marketplaceFilters?.options
        .find(({ label }) => label.includes(Marketplace.NOTFORSALE)) as FilterOption;
      filter.push(notForSale);
    }

    setActiveFilters({ ...newActiveFilters, MARKETPLACE: filter });
    setSelectedMarketplaceFilter(value);
  };

  const parseUrlForFilters = () => {
    // Parse the filter query parameter from the JSON
    const url = new URL(window.location.href);
    const filterEntries = Object.entries<string[]>(JSON.parse(url.searchParams.get('filters') ?? '{}'));

    const selectedFilters = filterEntries
      .map(([attribute, filterValues]) => {
        if (attribute === 'HYPE TYPE') {
          if (filterValues[0] === HypeType.CALM) {
            setSelectedHypeType(1);
          } else if (filterValues[0] === HypeType.HYPED) {
            setSelectedHypeType(3);
          }
        }

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

  const updateMarketplaceFilters = async () => {
    const newActiveFilters = filterObjectByKey(activeFilters, (attribute) => attribute !== 'MARKETPLACE');
    setActiveFilters(newActiveFilters);

    const updateFilters = await getMarketplaceFilters(library);
    setMarketplaceFilters(updateFilters);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSelectedHypeType(2);
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
    if (library) {
      updateMarketplaceFilters();
    }
  }, [library]);

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
        settings={settings}
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

  const clearFiltersButton = (
    <Button onClick={clearFilters} label="CLEAR ALL" className="w-full inline-flex justify-center" />
  );

  return (
    <div className="flex justify-center align-middle items-center">
      <IconButton iconName="Filter" onClick={() => setIsOpen(true)} />

      <Modal title="FILTERS" isOpen={isOpen} setIsOpen={setIsOpen} additionalButtons={[clearFiltersButton]}>
        <div className="text-center">
          Total: {indices.length}
        </div>
        {
          settings.enableMarketplace &&
            <div className="border-2 p-2 my-2">
              <div className="grid grid-cols-3 items-center px-4 text-lg font-bold">
                <span className="inline-flex justify-start">{Marketplace.FORSALE}</span>
                <RangeSlider min={1} max={3} value={selectedMarketplaceFilter} onChange={updateSelectedMarketplaceFilter} className="w-full" />
                <span className="inline-flex justify-end">{Marketplace.NOTFORSALE}</span>
              </div>
            </div>
        }
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
