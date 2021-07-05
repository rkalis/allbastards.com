import Switch from './Switch';

interface Props {
  label: string;
  value: boolean;
  update: (value: boolean) => void;
}

function BooleanSetting({ label, value, update }: Props) {
  return (
    <div className="py-1 px-2 my-1 grid grid-cols-5 border-2">
      <div className="col-span-4 text-xl font-bold">
        {label}
      </div>
      <div className="inline-flex justify-end items-center">
        <Switch value={value} update={update} className="w-14" />
      </div>
    </div>
  );
}

export default BooleanSetting;
