import arrayShuffle from 'array-shuffle';
import IconButton from '../common/IconButton';

interface Props {
  indices: number[];
  setIndices: (indices: number[]) => void;
}

function Shuffle({ indices, setIndices }: Props) {
  const shuffle = () => {
    setIndices(arrayShuffle(indices));
  };

  return (
    <div className="flex justify-center align-middle items-center">
      <IconButton iconName="Shuffle" onClick={shuffle} />
    </div>
  );
}

export default Shuffle;
