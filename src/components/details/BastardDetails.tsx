import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { ISettings, MarketData, Metadata } from '../../utils/interfaces';
import { getMetadata } from '../../utils';
import MarketDetails from './market/MarketDetails';
import { getMarketData } from '../../utils/market';
import Attributes from './Attributes';
import ImageAndHeader from './ImageAndHeader';
import MarketHistory from './market/MarketHistory';
import ExternalLinks from './ExternalLinks';
import Description from './Description';

interface Props {
  tokenId: number;
  settings: ISettings;
  marginTop: number;
  marginBottom: number;
}

function BastardDetails({ tokenId, settings, marginBottom, marginTop }: Props) {
  const [metadata, setMetadata] = useState<Metadata>();
  const [marketData, setMarketData] = useState<MarketData>();
  const { library } = useWeb3React<providers.Web3Provider>();

  const updateMetadata = async () => {
    const newMetadata = await getMetadata(tokenId);
    setMetadata(newMetadata);
  };

  const updateMarketData = async () => {
    const newMarketData = await getMarketData(tokenId, library);
    setMarketData(newMarketData);
  };

  useEffect(() => {
    if (!metadata) {
      updateMetadata();
    }
  }, []);

  useEffect(() => {
    updateMarketData();
  }, [library]);

  if (!metadata) return null;

  return (
    <div className="container mx-auto" style={{ paddingTop: 10, paddingBottom: 10, marginTop, marginBottom }}>
      <div className="flex flex-col gap-2">
        <ImageAndHeader metadata={metadata} />
        <ExternalLinks metadata={metadata} />
        <Description metadata={metadata} />
        <Attributes metadata={metadata} />
        {
          settings.enableMarketplace &&
            marketData && <MarketDetails marketData={marketData} refresh={updateMarketData} />
        }
        {marketData && <MarketHistory marketData={marketData} />}
      </div>
    </div>
  );
}

export default BastardDetails;
