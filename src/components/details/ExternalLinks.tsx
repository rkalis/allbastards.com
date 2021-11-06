import { BGANPUNKS_GALLERY_BASE, OPEANSEA_REFERRAL, OPENSEA_BASE, RARIBLE_BASE } from '../../utils/constants';
import { Metadata } from '../../utils/interfaces';

interface Props {
  metadata: Metadata;
}

function ExternalLinks({ metadata }: Props) {
  return (
    <div className="flex justify-center gap-2">
      <a href={`${OPENSEA_BASE}/${metadata.tokenId}?${OPEANSEA_REFERRAL}`} target="_blank" rel="noreferrer">
        <img src="/img/opensea.png" alt="OpenSea link" width="24px" />
      </a>

      <a href={`${RARIBLE_BASE}:${metadata.tokenId}`} target="_blank" rel="noreferrer">
        <img src="/img/rarible.webp" alt="Rarible link" width="24px" />
      </a>

      <a href={`${BGANPUNKS_GALLERY_BASE}/${metadata.tokenId}`} target="_blank" rel="noreferrer">
        <img src="/img/bganpunkswebsite.png" alt="BASTARD GAN PUNKS v2 GALLERY link" width="24px" />
      </a>
    </div>
  );
}

export default ExternalLinks;
