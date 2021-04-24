import arrayShuffle from 'array-shuffle';
import { FiShuffle } from 'react-icons/fi';

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
      <button
        type="button"
        className="inline-flex justify-center text-xl sm:text-4xl font-medium"
        onClick={shuffle}
      >
        <FiShuffle />
      </button>
    </div>
  );
}

export default Shuffle;
