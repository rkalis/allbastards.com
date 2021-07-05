import { ChangeEvent } from 'react';
import './RangeSlider.css';

interface Props {
  min: number;
  max: number;
  value: number;
  update: (value: number) => void;
  className?: string;
}

function RangeSlider({ min, max, value, update, className }: Props) {
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    update(Number(event.target.value));
  };

  return (
    <div className={`bg-blue-500 border-black border-2 flex items-center align-middle ${className}`}>
      <input type="range" min={min} max={max} value={value} onChange={onChange} />
    </div>
  );
}

export default RangeSlider;
