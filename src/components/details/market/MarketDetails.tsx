import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { ZERO_ADDRESS } from '../../../utils/constants';
import { MarketData } from '../../../utils/interfaces';
import { displayPrice, getBidPriceDisplay, getBidsFromAccount, getListingPriceDisplay } from '../../../utils/market';
import AcceptBid from './AcceptBid';
import Bid from './Bid';
import Buy from './Buy';
import CancelBids from './CancelBids';
import CancelListings from './CancelListings';
import Sell from './Sell';
import UpdateBid from './UpdateBid';
import UpdateListing from './UpdateListing';

interface Props {
  marketData: MarketData;
  refresh: () => void;
}

function MarketDetails({ marketData, refresh }: Props) {
  const { account, library } = useWeb3React<providers.Web3Provider>();

  const activeAccountIsOwner = marketData.owner === account;
  const isBidFromOwner = marketData.bids.length > 0 &&
    marketData.bids[0].maker.toLowerCase() === marketData.owner.toLowerCase();

  const listingPriceDisplay = getListingPriceDisplay(marketData.listings);

  const bidPriceDisplay = getBidPriceDisplay(marketData.bids);
  const activeBidsFromUser = getBidsFromAccount(marketData.bids, account ?? ZERO_ADDRESS);
  const inactiveBidsFromUser = getBidsFromAccount(marketData.inactiveBids, account ?? ZERO_ADDRESS);
  const bidsFromUser = [...activeBidsFromUser, ...inactiveBidsFromUser];

  const isForSale = listingPriceDisplay !== undefined;
  const hasBid = bidPriceDisplay !== undefined;
  const hasBidsFromUser = bidsFromUser.length > 0;
  const canSell = library !== undefined && activeAccountIsOwner;
  const canBid = library !== undefined && account !== undefined && !activeAccountIsOwner;
  const canBuy = canBid && isForSale;
  const canAcceptBid = canSell && hasBid && !isBidFromOwner;
  const canCancelBid = library !== undefined && account !== undefined && hasBidsFromUser;

  return (
    <div>
      <h3 className="font-bold text-center text-2xl md:text-3xl">MARKET</h3>
      <div className="flex flex-col gap-2">
        <div className="w-1/2 max-w-md mx-auto text-center text-sm md:text-base">
          {activeAccountIsOwner && <div>You currently own this bastard!</div>}
          {!activeAccountIsOwner && <div>This bastard is currently owned by {marketData.ownerDisplay}.</div>}

          {listingPriceDisplay && <div>This bastard is currently for sale for {listingPriceDisplay}.</div>}
          {!listingPriceDisplay && <div>This bastard is currently not for sale.</div>}

          {bidPriceDisplay && <div>There is a bid of {bidPriceDisplay} on this bastard.</div>}
          {!bidPriceDisplay && <div>There are currently no active bids on this bastard.</div>}

          {
            hasBidsFromUser &&
              <div>
                You have {bidsFromUser.length} bid(s) on this bastard of {bidsFromUser.map((bid) => displayPrice(bid, 'make')).join(', ')}.
              </div>
          }
          {!hasBidsFromUser && <div>You have no bids on this bastard.</div>}

        </div>
        <div className="flex justify-center gap-2">
          {canSell && !isForSale && <Sell marketData={marketData} refresh={refresh} />}
          {canSell && isForSale && <UpdateListing marketData={marketData} refresh={refresh} />}
          {canSell && isForSale && <CancelListings marketData={marketData} refresh={refresh} />}
          {canBuy && <Buy marketData={marketData} refresh={refresh} />}
          {canBid && !hasBidsFromUser && <Bid marketData={marketData} refresh={refresh} />}
          {canBid && hasBidsFromUser && <UpdateBid bids={bidsFromUser} refresh={refresh} />}
          {canCancelBid && <CancelBids bids={bidsFromUser} refresh={refresh} />}
          {canAcceptBid && <AcceptBid marketData={marketData} refresh={refresh} />}
        </div>
      </div>
    </div>
  );
}

export default MarketDetails;
