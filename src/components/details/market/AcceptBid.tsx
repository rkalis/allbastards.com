import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import Button from '../../common/Button';
import { fill } from '../../../utils/market';
import { toast } from '../../../utils';
import { MarketData } from '../../../utils/interfaces';

interface Props {
  marketData: MarketData;
}

function AcceptBid({ marketData }: Props) {
  const { account, library } = useWeb3React<providers.Web3Provider>();

  // TODO: Update UI after accepting a bid
  const acceptBidOnBastard = async () => {
    try {
      const unconfirmedTransaction = await fill(marketData.bid!, library!);

      toast('BID ACCEPT TRANSACTION SUBMITTED', {
        position: 'top-right',
      });

      try {
        await unconfirmedTransaction.wait();
      } catch {
        toast('BID ACCEPT TRANSACTION FAILED', {
          position: 'top-center',
          className: 'bg-red-500',
        });
      }
    } catch (error: any) {
      // Don't display an error message if the user rejected the popup
      if (!(error.code && error.code === 4001)) {
        toast('ACCEPTING BID FAILED', {
          position: 'top-center',
          className: 'bg-red-500',
        });
      }
    }
  };

  if (!account || !library) return null;
  if (!marketData.bid) return null;

  return (
    <div>
      <Button label="ACCEPT BID" onClick={acceptBidOnBastard} />
    </div>
  );
}

export default AcceptBid;
