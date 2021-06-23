import { useState } from 'react';
import IconButton from '../common/IconButton';

interface Props {
  indices: number[];
  setIndices: (indices: number[]) => void;
}

function Sort({ indices, setIndices }: Props) {
  const [order, setOrder] = useState<number>(1);

  const sort = () => {
    const newIndices = [...indices];

    if (order > 0) {
      setIndices(newIndices.sort((a, b) => b - a));
    } else {
      setIndices(newIndices.sort((a, b) => a - b));
    }

    setOrder(-1 * order);
  };

  return (
    <div className="flex justify-center align-middle items-center">
      <IconButton iconName={order > 0 ? 'SortDesc' : 'SortAsc'} onClick={sort} />
    </div>
  );
}

export default Sort;
