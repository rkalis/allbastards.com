import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { useState } from 'react';
import Modal from '../../common/Modal';
import Button from '../../common/Button';
import NumberSetting from '../../common/NumberSetting';
import { updateListing } from '../../../utils/market';
import { toast } from '../../../utils';
import { MarketData } from '../../../utils/interfaces';

interface Props {
  marketData: MarketData;
}

function UpdateListing({ marketData }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [price, setPrice] = useState<string>('1');
  const { account, library } = useWeb3React<providers.Web3Provider>();

  const [existingListing] = marketData.listings;

  // TODO: Update UI after submitting a listing
  const updateSellListing = async () => {
    try {
      await updateListing(existingListing, price, library!);

      toast('LISTING UPDATED', {
        position: 'top-right',
      });

      setIsOpen(false);
    } catch (error: any) {
      if (error.code === 4001) return;

      if (typeof error.value?.message === 'string' && error.value.message.includes('\'take.value\' greater than maximum available')) {
        toast('PRICE CANNOT BE INCREASED, ONLY DECREASED', {
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

  const updateButton = (<Button label="UPDATE LISTING" onClick={updateSellListing} className="w-full inline-flex justify-center" />);

  if (!account || !library || !existingListing) return null;

  return (
    <div>
      <Button label="UPDATE LISTING" onClick={() => setIsOpen(true)} />

      <Modal title="SELL" isOpen={isOpen} setIsOpen={setIsOpen} additionalButtons={[updateButton]}>
        <NumberSetting label="PRICE" unit="ETH" min="0" step="0.1" value={price} update={setPrice} />
      </Modal>
    </div>
  );
}

export default UpdateListing;
