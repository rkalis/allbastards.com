import MultiSelect from 'react-multi-select-component';
import { FilterOption } from '../../utils/interfaces';
import ListItemRenderer from './ListItemRenderer';

interface Props {
  label: string;
  options: FilterOption[];
  selected: FilterOption[];
  update: (value: FilterOption[]) => void;
}

function Filter({ label, options, selected, update }: Props) {
  return (
    <div className="py-1 px-2 my-1 grid grid-cols-6 border-2">
      <div className="col-span-3 text-xl font-bold align-middle items-center inline-flex">{label}</div>
      <div className="col-span-3 inline-flex justify-end">
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
