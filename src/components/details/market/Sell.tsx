import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { useState } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import NumberSetting from '../../common/NumberSetting';
import { sell } from '../../../utils/market';
import { toast } from '../../../utils';
import { MarketData } from '../../../utils/interfaces';

interface Props {
  marketData: MarketData;
  refresh: () => void;
}

function Sell({ marketData, refresh }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('');
  const { account, library } = useWeb3React<providers.Web3Provider>();

  const createListing = async () => {
    try {
      await sell(marketData.tokenId, price, account!, library!);

      toast('LISTING CREATED', {
        position: 'top-right',
      });

      refresh();

      setIsOpen(false);
    } catch (error: any) {
      // Don't display an error message if the user rejected the popup
      if (!(error.code && error.code === 4001)) {
        toast('LISTING FAILED', {
          position: 'top-center',
          className: 'bg-red-500',
        });
      }
    }
  };

  const sellButton = (<Button label="CREATE SELL LISTING" onClick={createListing} className="w-full inline-flex justify-center" />);

  if (!account || !library) return null;

  return (
    <div>
      <Button label="SELL" onClick={() => setIsOpen(true)} />

      <Modal title="SELL" isOpen={isOpen} setIsOpen={setIsOpen} additionalButtons={[sellButton]}>
        <NumberSetting label="PRICE" unit="ETH" min="0" step="0.1" value={price} update={setPrice} />
      </Modal>
    </div>
  );
}

export default Sell;
