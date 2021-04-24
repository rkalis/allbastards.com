import { Switch } from '@headlessui/react';

interface Props {
  label: string;
  value: boolean;
  update: (value: boolean) => void;
}

// The UI code in this component has been taken from https://headlessui.dev/react/switch and amended

function BooleanSetting({ label, value, update }: Props) {
  return (
    <div className="py-1 px-2 my-1 grid grid-cols-5 border-2">
      <div className="col-span-4 text-xl font-bold">{label}</div>
      <div className="inline-flex justify-end">
        <Switch checked={value} onChange={update} className={`${value ? 'bg-blue-500' : 'bg-gray-200'} relative inline-flex items-center h-6 border-2 border-black w-11 focus:outline-none`}>
          <span className={`${value ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full border-black border-2`} />
        </Switch>
      </div>
    </div>
  );
}

export default BooleanSetting;
