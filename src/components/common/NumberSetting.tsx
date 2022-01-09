import { ChangeEvent } from 'react';

interface Props {
  label: string;
  value: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  unit?: string;
  update: (value: string) => void;
}

function NumberSetting({ label, value, min, max, step, unit, update }: Props) {
  const updateValue = (event: ChangeEvent<HTMLInputElement>) => {
    // Disregard *any* errors, since they will be caught downstream any way
    update(event.target.value);
  };

  return (
    <div className="py-1 px-2 my-1 grid grid-cols-6 border-2">
      <div className="col-span-3 text-md sm:text-xl font-bold align-middle items-center inline-flex">{label}</div>
      <div className="col-span-3 inline-flex justify-end items-center">
        <div className="border-2 border-black w-full p-2 gap-2 flex">
          <input
            className="w-full focus:outline-none"
            name="amount"
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={updateValue}
          />
          {unit && <span>{unit}</span>}
        </div>
      </div>
    </div>
  );
}

export default NumberSetting;
