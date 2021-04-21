import { FiShuffle } from 'react-icons/fi';

interface Props {
  shuffle: () => void;
}

function Shuffle({ shuffle }: Props) {
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
