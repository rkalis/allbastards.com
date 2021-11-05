import React, { useEffect, useState } from 'react';
import { Metadata } from '../../utils/interfaces';
import { getMetadata, isSafari } from '../../utils';
import { BGANPUNKS_GALLERY_BASE, IMAGE_BASE, OPEANSEA_REFERRAL, OPENSEA_BASE, RARIBLE_BASE } from '../../utils/constants';

interface Props {
  index: number;
  marginTop: number;
  marginBottom: number;
}

function BastardDetails({ index, marginBottom, marginTop }: Props) {
  const [metadata, setMetadata] = useState<Metadata>();
  const [imageSource, setImageSource] = useState<string>(`${IMAGE_BASE}/${index}.webp`);

  useEffect(() => {
    if (!metadata) return;

    // Safari doesn't properly support WebP, so we use the fallback images
    if (isSafari()) setImageSource(metadata.image);
  }, [metadata]);

  const updateMetadata = async () => {
    const newMetadata = await getMetadata(index);
    setMetadata(newMetadata);
  };

  useEffect(() => {
    if (!metadata) {
      updateMetadata();
    }
  }, []);

  if (!metadata) return null;

  return (
    <div className="container mx-auto px-4 sm:px-8 overflow-hidden" style={{ paddingTop: 6, paddingBottom: 6, marginTop, marginBottom }}>
      <h2 className="font-charriot font-bold text-center text-2xl sm:text-4xl md:text-5xl">Bastard {index}</h2>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center">
          <div className="w-1/2 max-w-md border-4 border-black">
            <img src={imageSource} alt={`Bastard ${index}`} />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-1/2 max-w-md flex flex-row justify-center gap-4">
            <a href={`${OPENSEA_BASE}/${index}?${OPEANSEA_REFERRAL}`} target="_blank" rel="noreferrer">
              <img src="/img/opensea.png" alt="OpenSea link" width="24px" />
            </a>
            <a href={`${RARIBLE_BASE}:${index}`} target="_blank" rel="noreferrer">
              <img src="/img/rarible.webp" alt="Rarible link" width="24px" />
            </a>
            <a href={`${BGANPUNKS_GALLERY_BASE}/${index}`} target="_blank" rel="noreferrer">
              <img src="/img/bganpunkswebsite.png" alt="BASTARD GAN PUNKS v2 GALLERY link" width="24px" />
            </a>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <div className="w-1/2 max-w-md font-charriot text-center text-sm md:text-base">
            {metadata.description} <br /> (word count: {metadata.description.trim().split(/[\s\n]+/).length})
          </div>
        </div>
        <h3 className="font-charriot font-bold text-center text-xl sm:text-2xl md:text-3xl">ATTRIBUTES</h3>
        <div className="flex justify-center">
          <div className="w-5/6 flex flex-wrap justify-center gap-4">
            {metadata.attributes.map(({ trait_type, value }) => (
              <div className="border-2 w-64 border-black p-2 flex flex-col justify-center">
                <h4 className="font-charriot font-bold text-blue-500 text-center text-lg sm:text-xl md:text-xl">
                  {trait_type === 'BACKGROUND GLITCH LEVEL' ? 'BG GLITCH LEVEL' : trait_type}
                </h4>
                <div className="font-charriot text-center text-sm md:text-base">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BastardDetails;
