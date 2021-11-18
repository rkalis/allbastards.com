import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import Button from '../../common/Button';
import { buy } from '../../../utils/market';
import { toast } from '../../../utils';
import { MarketData } from '../../../utils/interfaces';

interface Props {
  marketData: MarketData;
}

function Buy({ marketData }: Props) {
  const { account, library } = useWeb3React<providers.Web3Provider>();

  // TODO: Update UI after buying a bastard
  const buyBastard = async () => {
    if (!marketData.listing) return;
    if (!library) return;

    try {
      const unconfirmedTransaction = await buy(marketData.listing, library);

      toast('BUY TRANSACTION SUBMITTED', {
        position: 'top-right',
      });

      try {
        await unconfirmedTransaction.wait();
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
  if (!marketData.listing) return null;

  return (
    <div>
      <Button label="BUY" onClick={buyBastard} />
    </div>
  );
}

export default Buy;