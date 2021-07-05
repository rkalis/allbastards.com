import { ChangeEvent } from 'react';
import { overrideTailwindClasses } from 'tailwind-override';
import './RangeSlider.css';

interface Props {
  min: number;
  max: number;
  value: number;
  onChange?: (value: number) => void;
  onClick?: () => void;
  className?: string;
}

function RangeSlider({ min, max, value, onChange, onClick, className }: Props) {
  const onChangeWrapper = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(Number(event.target.value));
  };

  return (
    <div className={overrideTailwindClasses(`bg-blue-500 border-black border-2 flex items-center align-middle ${className}`)}>
      <input type="range" min={min} max={max} value={value} onChange={onChangeWrapper} onClick={onClick} />
    </div>
  );
}

export default RangeSlider;
