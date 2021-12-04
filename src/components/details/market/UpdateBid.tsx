import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { useState } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import NumberSetting from '../../common/NumberSetting';
import { updateBid } from '../../../utils/market';
import { toast } from '../../../utils';
import { MarketData } from '../../../utils/interfaces';

interface Props {
  marketData: MarketData;
}

function UpdateBid({ marketData }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('1');
  const { account, library } = useWeb3React<providers.Web3Provider>();

  const [existingBid] = marketData.bids;

  // TODO: Update UI after submitting a listing
  const updateExistingBid = async () => {
    try {
      await updateBid(existingBid, price, library!);

      toast('BID UPDATED', {
        position: 'top-right',
      });

      setIsOpen(false);
    } catch (error: any) {
      if (error.code === 4001) return;

      console.log(error);
      if (typeof error.value?.message === 'string' && error.value.message.includes('\'make.value\' less then current')) {
        toast('BID CANNOT BE DECREASED, ONLY INCREASED', {
          position: 'top-center',
          className: 'bg-red-500',
        });
      } else {
        toast('UPDATE FAILED', {
          position: 'top-center',
          className: 'bg-red-500',
        });
      }
    }
  };

  const updateButton = (<Button label="UPDATE BID" onClick={updateExistingBid} className="w-full inline-flex justify-center" />);

  if (!account || !library || !existingBid) return null;

  return (
    <div>
      <Button label="UPDATE BID" onClick={() => setIsOpen(true)} />

      <Modal title="UPDATE BID" isOpen={isOpen} setIsOpen={setIsOpen} additionalButtons={[updateButton]}>
        <NumberSetting label="PRICE" unit="WETH" min="0" step="0.1" value={price} update={setPrice} />
      </Modal>
    </div>
  );
}

export default UpdateBid;
