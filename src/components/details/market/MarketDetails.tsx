import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { MarketData } from '../../../utils/interfaces';
import Button from '../../common/Button';
import Sell from './Sell';

interface Props {
  marketData: MarketData;
  tokenId: number;
}

function MarketDetails({ marketData, tokenId }: Props) {
  const { account, library } = useWeb3React<providers.Web3Provider>();

  const isForSale = marketData.listingPriceDisplay !== undefined;
  const canSell = library !== undefined && marketData.owner === account;
  const canBid = library !== undefined && account !== undefined && marketData.owner !== account;
  const canBuy = canBid && isForSale;

  return (
    <div>
      <h3 className="font-bold text-center text-2xl md:text-3xl">MARKET</h3>

      <div className="flex flex-col gap-2">
        <div className="w-1/2 max-w-md mx-auto text-center text-sm md:text-base">
          <div>This bastard is currently owned by {marketData.ownerDisplay}.</div>
          {
            marketData.listingPriceDisplay
              ? <div>This bastard is currently for sale for {marketData.listingPriceDisplay}.</div>
              : <div>This bastard is currently not for sale.</div>
          }
        </div>

        <div className="flex justify-center gap-2">
          {canSell && <Sell tokenId={tokenId} />}
          {canBuy && <Button label="BUY" />}
          {canBid && <Button label="BID" />}
        </div>
      </div>
    </div>
  );
}

export default MarketDetails;
