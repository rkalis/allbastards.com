import Tooltip from 'rc-tooltip';
import MultiSelect from 'react-multi-select-component';
import { FilterOption, ISettings } from '../../utils/interfaces';
import ListItemRenderer from './ListItemRenderer';
import Link from './Link';

interface Props {
  label: string;
  options: FilterOption[];
  selected: FilterOption[];
  update: (value: FilterOption[]) => void;
  settings: ISettings;
}

function Filter({ label, options, selected, update, settings }: Props) {
  const tooltipOverlay = (
    <p className="break-words">
      THESE EXPERIMENTAL TRAITS WERE MANUALLY IDENTIFIED BY <Link to="https://twitter.com/BokkyPooBah" text="BOKKYPOOBAH" />.
      THESE ARE <b>UNOFFICIAL</b> TRAITS AND OFFER <b>NO GUARANTEE WHATSOEVER</b>&nbsp;
      THAT THESE TRAITS ARE ACCURATE OR COMPLETE.
    </p>
  );

  const experimentalTooltip = label === 'EXPERIMENTAL TRAITS' && (
    <Tooltip placement="top" overlay={tooltipOverlay} overlayClassName="bg-white z-50 w-96 border-2 border-black p-2" destroyTooltipOnHide>
      <span className="ml-2">(?)</span>
    </Tooltip>
  );

  if (label.includes('EXPERIMENTAL') && !settings.enableExperimentalTraits) {
    return null;
  }

  return (
    <div className="py-1 px-2 my-1 grid grid-cols-6 border-2">
      <div className="col-span-3 text-md sm:text-xl font-bold align-middle items-center inline-flex">{label} {experimentalTooltip}</div>
      <div className="col-span-3 inline-flex justify-end items-center">
        <MultiSelect
          options={options}
          value={selected}
          onChange={update}
          labelledBy={`Filter by ${label}`}
          className="w-full border-2 border-black"
          ItemRenderer={ListItemRenderer}
        />
      </div>
    </div>
  );
}

export default Filter;
