import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { ZERO_ADDRESS } from '../../../utils/constants';
import { MarketData } from '../../../utils/interfaces';
import { getBidPriceDisplay, getBidsFromAccount, getListingPriceDisplay } from '../../../utils/market';
import AcceptBid from './AcceptBid';
import Bid from './Bid';
import Buy from './Buy';
import CancelListings from './CancelListings';
import Sell from './Sell';
import UpdateBid from './UpdateBid';
import UpdateListing from './UpdateListing';

interface Props {
  marketData: MarketData;
}

function MarketDetails({ marketData }: Props) {
  const { account, library } = useWeb3React<providers.Web3Provider>();

  const listingPriceDisplay = getListingPriceDisplay(marketData.listings);
  const bidPriceDisplay = getBidPriceDisplay(marketData.bids);
  const bidsFromUser = getBidsFromAccount(marketData.bids, account ?? ZERO_ADDRESS);

  const isForSale = listingPriceDisplay !== undefined;
  const hasBid = bidPriceDisplay !== undefined;
  const hasBidsFromUser = bidsFromUser.length > 0;
  const canSell = library !== undefined && marketData.owner === account;
  const canBid = library !== undefined && account !== undefined && marketData.owner !== account;
  const canBuy = canBid && isForSale;
  const canAcceptBid = canSell && hasBid;

  return (
    <div>
      <h3 className="font-bold text-center text-2xl md:text-3xl">MARKET</h3>
      <div className="flex flex-col gap-2">
        <div className="w-1/2 max-w-md mx-auto text-center text-sm md:text-base">
          <div>This bastard is currently owned by {marketData.ownerDisplay}.</div>
          {
            listingPriceDisplay
              ? <div>This bastard is currently for sale for {listingPriceDisplay}.</div>
              : <div>This bastard is currently not for sale.</div>
          }
          {
            bidPriceDisplay
              ? <div>There is a bid of {bidPriceDisplay} on this bastard.</div>
              : <div>There are currently no bids on this bastard.</div>
          }
        </div>
        <div className="flex justify-center gap-2">
          {canSell && !isForSale && <Sell marketData={marketData} />}
          {canSell && isForSale && <UpdateListing marketData={marketData} />}
          {canSell && isForSale && <CancelListings marketData={marketData} />}
          {canBuy && <Buy marketData={marketData} />}
          {canBid && !hasBidsFromUser && <Bid marketData={marketData} />}
          {canBid && hasBidsFromUser && <UpdateBid marketData={marketData} />}
          {canAcceptBid && <AcceptBid marketData={marketData} />}
        </div>
      </div>
    </div>
  );
}

export default MarketDetails;
