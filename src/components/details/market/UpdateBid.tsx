import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { useState } from 'react';
import { RaribleV2Order } from '@rarible/ethereum-api-client';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import NumberSetting from '../../common/NumberSetting';
import { updateBid } from '../../../utils/market';
import { emitAnalyticsEvent, toast } from '../../../utils';

interface Props {
  bids: RaribleV2Order[];
  refresh: () => void;
}

function UpdateBid({ bids, refresh }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('');
  const { account, library } = useWeb3React<providers.Web3Provider>();

  const [existingBid] = bids;

  const updateExistingBid = async () => {
    try {
      await updateBid(existingBid, price, library!);
      emitAnalyticsEvent('marketplace_bid_update');

      toast('BID UPDATED', {
        position: 'top-right',
      });

      refresh();

      setIsOpen(false);
    } catch (error: any) {
      if (error.code === 4001) return;

      if (typeof error.value?.message === 'string' && error.value.message.includes('\'make.value\' less then current')) {
        toast('BID CANNOT BE DECREASED, ONLY INCREASED', {
          position: 'top-center',
          className: 'bg-red-500',
        });
      } else if (error.message) {
        toast(error.message, {
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

  const updateButton = (<Button label="UPDATE BID" onClick={updateExistingBid} className="w-full inline-flex justify-center" key="update" />);

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
