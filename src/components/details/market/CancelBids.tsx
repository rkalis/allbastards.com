import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import Button from '../../common/Button';
import { cancel } from '../../../utils/market';
import { toast } from '../../../utils';
import { MarketData } from '../../../utils/interfaces';

interface Props {
  marketData: MarketData;
}

function CancelBids({ marketData }: Props) {
  const { account, library } = useWeb3React<providers.Web3Provider>();

  // TODO: Update UI after cancelling a bid
  const cancelBids = async () => {
    if (!library) return;

    try {
      const unconfirmedTransactions = await Promise.all(
        marketData.bids.map((bid) => cancel(bid, library!)),
      );

      toast('CANCELLATION TRANSACTION(S) SUBMITTED', {
        position: 'top-right',
      });

      try {
        await Promise.all(unconfirmedTransactions.map((transaction) => transaction.wait()));
      } catch {
        toast('CANCELLATION TRANSACTION(S) FAILED', {
          position: 'top-center',
          className: 'bg-red-500',
        });
      }
    } catch (error: any) {
      // Don't display an error message if the user rejected the popup
      if (!(error.code && error.code === 4001)) {
        toast('CANCELLATION FAILED', {
          position: 'top-center',
          className: 'bg-red-500',
        });
      }
    }
  };

  if (!account || !library) return null;
  if (marketData.bids.length === 0) return null;

  return (
    <div>
      <Button label="CANCEL BID(S)" onClick={cancelBids} />
    </div>
  );
}

export default CancelBids;
