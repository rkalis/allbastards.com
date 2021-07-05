import RangeSlider from './RangeSlider';

interface Props {
  value: boolean;
  update: (value: boolean) => void;
  className?: string;
}

function Switch({ value, update, className }: Props) {
  return (
    <RangeSlider
      min={0}
      max={1}
      value={Number(value)}
      onClick={() => update(!value)}
      className={`${value ? 'bg-blue-500' : 'bg-gray-200'} ${className}`}
    />
  );
}

export default Switch;
