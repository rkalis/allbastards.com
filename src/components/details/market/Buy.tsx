import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import Button from '../../common/Button';
import { fill } from '../../../utils/market';
import { emitAnalyticsEvent, toast } from '../../../utils';
import { MarketData } from '../../../utils/interfaces';

interface Props {
  marketData: MarketData;
  refresh: () => void;
}

function Buy({ marketData, refresh }: Props) {
  const { account, library } = useWeb3React<providers.Web3Provider>();

  const [lowestListing] = marketData.listings;

  const buyBastard = async () => {
    try {
      const unconfirmedTransaction = await fill(lowestListing, library!);
      emitAnalyticsEvent('marketplace_buy');

      toast('BUY TRANSACTION SUBMITTED, DATA WILL UPDATE AFTER IT IS CONFIRMED', {
        position: 'top-right',
      });

      try {
        await unconfirmedTransaction.wait();
        refresh();
      } catch {
        toast('BUY TRANSACTION FAILED', {
          position: 'top-center',
          className: 'bg-red-500',
        });
      }
    } catch (error: any) {
      // Don't display an error message if the user rejected the popup
      if (!(error.code && error.code === 4001)) {
        toast('PURCHASE FAILED', {
          position: 'top-center',
          className: 'bg-red-500',
        });
      }
    }
  };

  if (!account || !library) return null;
  if (!lowestListing) return null;

  return (
    <div>
      <Button label="BUY" onClick={buyBastard} />
    </div>
  );
}

export default Buy;
