import React, { useState } from 'react';
import { providers, utils } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { toast } from '../../utils';
import Button from '../common/Button';
import Modal from '../common/Modal';
import NumberSetting from '../common/NumberSetting';

function DonateButton() {
  const { account, library, activate } = useWeb3React<providers.Web3Provider>();
  const [amount, setAmount] = useState<string>('0.01');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!library) return null;

  const sendDonation = async () => {
    if (!account) {
      const injectedConnector = new InjectedConnector({ supportedChainIds: [1] });
      activate(injectedConnector);
      return;
    }

    try {
      const signer = library.getSigner();
      if (!signer) return;

      await signer.sendTransaction({
        to: '0xe126b3E5d052f1F575828f61fEBA4f4f2603652a',
        from: account,
        value: utils.parseEther(amount),
      });

      toast('THANKS FOR DONATING!', {
        position: 'top-right',
      });

      setIsOpen(false);
    } catch (err: any) {
      if (err.code && err.code === 'INVALID_ARGUMENT') {
        toast('INVALID INPUT', {
          position: 'top-center',
          className: 'bg-red-500',
        });
      }

      if (err.code && err.code === 'INSUFFICIENT_FUNDS') {
        toast('INSUFFICIENT FUNDS', {
          position: 'top-center',
          className: 'bg-red-500',
        });
      }
    }
  };

  const donateButton = (<Button label="DONATE" onClick={sendDonation} className="w-full inline-flex justify-center" />);

  return (
    <div className="flex justify-center align-middle items-center">
      <Button label="DONATE" onClick={() => setIsOpen(true)} />

      <Modal title="DONATE" isOpen={isOpen} setIsOpen={setIsOpen} additionalButtons={[donateButton]}>
        <NumberSetting label="AMOUNT" value={amount} min="0" step="0.01" unit="ETH" update={setAmount} />
      </Modal>
    </div>
  );
}

export default DonateButton;
