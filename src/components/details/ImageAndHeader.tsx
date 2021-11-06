import { isSafari } from '../../utils';
import { IMAGE_BASE } from '../../utils/constants';
import { Metadata } from '../../utils/interfaces';

interface Props {
  metadata: Metadata;
}

function ImageAndHeader({ metadata }: Props) {
  const imageSource = isSafari()
    ? metadata.image
    : `${IMAGE_BASE}/${metadata.tokenId}.webp`;

  return (
    <div>
      <h2 className="font-bold text-center text-2xl md:text-5xl">Bastard {metadata.tokenId}</h2>
      <div className="w-1/2 max-w-md mx-auto border-4 border-black">
        <img src={imageSource} alt={`Bastard ${metadata.tokenId}`} />
      </div>
    </div>
  );
}

export default ImageAndHeader;
