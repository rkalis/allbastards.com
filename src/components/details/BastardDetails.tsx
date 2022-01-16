import { useAsync } from 'react-async-hook';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { ISettings } from '../../utils/interfaces';
import { getMetadata } from '../../utils';
import MarketDetails from './market/MarketDetails';
import { getMarketData } from '../../utils/market';
import { ZERO_ADDRESS } from '../../utils/constants';
import Attributes from './Attributes';
import ImageAndHeader from './ImageAndHeader';
import MarketHistory from './market/MarketHistory';
import ExternalLinks from './ExternalLinks';
import Description from './Description';

interface Props {
  tokenId: number;
  settings: ISettings;
}

function BastardDetails({ tokenId, settings }: Props) {
  const { account, library } = useWeb3React<providers.Web3Provider>();
  const { result: metadata } = useAsync(getMetadata, [tokenId]);
  const { result: marketData, execute: updateMarketData } = useAsync(
    getMarketData,
    [tokenId, account ?? ZERO_ADDRESS, library],
    { setLoading: (state) => ({ ...state, loading: true }) },
  );

  if (!metadata) return null;

  return (
    <div className="container mx-auto" style={{ paddingTop: 10, paddingBottom: 100 }}>
      <div className="flex flex-col gap-2">
        <ImageAndHeader metadata={metadata} />
        <ExternalLinks metadata={metadata} />
        <Description metadata={metadata} />
        <Attributes metadata={metadata} />
        {
          settings.enableMarketplace && marketData &&
            <MarketDetails
              marketData={marketData}
              refresh={() => updateMarketData(tokenId, account ?? ZERO_ADDRESS, library)}
            />
        }
        {marketData && <MarketHistory marketData={marketData} />}
      </div>
    </div>
  );
}

export default BastardDetails;
