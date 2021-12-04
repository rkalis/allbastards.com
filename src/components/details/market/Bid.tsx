import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { useState } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import NumberSetting from '../../common/NumberSetting';
import { bid } from '../../../utils/market';
import { toast } from '../../../utils';
import { MarketData } from '../../../utils/interfaces';

interface Props {
  marketData: MarketData;
}

function Bid({ marketData }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('1');
  const { account, library } = useWeb3React<providers.Web3Provider>();

  // TODO: Update UI after submitting a listing
  const createBid = async () => {
    try {
      await bid(marketData.tokenId, price, account!, library!);

      toast('BID PLACED', {
        position: 'top-right',
      });

      setIsOpen(false);
    } catch (error: any) {
      // Don't display an error message if the user rejected the popup
      if (!(error.code && error.code === 4001)) {
        toast('BID FAILED', {
          position: 'top-center',
          className: 'bg-red-500',
        });
      }
    }
  };

  const bidButton = (<Button label="PLACE BID" onClick={createBid} className="w-full inline-flex justify-center" />);

  if (!account || !library) return null;

  return (
    <div>
      <Button label="BID" onClick={() => setIsOpen(true)} />

      <Modal title="BID" isOpen={isOpen} setIsOpen={setIsOpen} additionalButtons={[bidButton]}>
        <NumberSetting label="PRICE" unit="WETH" min="0" step="0.1" value={price} update={setPrice} />
      </Modal>
    </div>
  );
}

export default Bid;
