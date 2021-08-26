import React, { ChangeEvent, useState } from 'react';
import { providers, utils } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { toast } from '../../utils';
import Button from '../common/Button';
import Modal from '../common/Modal';

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
    } catch (err) {
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

  const donateButton = (<Button label="DONATE" onClick={sendDonation} inverted className="w-full inline-flex justify-center" />);

  const updateAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const regex = /^[0-9]{1,6}(\.[0-9]{1,4})?$/;
    if (value.match(regex)) setAmount(value);
  };

  return (
    <div className="flex justify-center align-middle items-center">
      <Button label="DONATE" onClick={() => setIsOpen(true)} />

      <Modal title="DONATE" isOpen={isOpen} setIsOpen={setIsOpen} additionalButtons={[donateButton]}>
        <div className="py-1 px-2 my-1 grid grid-cols-6 border-2">
          <div className="col-span-3 text-md sm:text-xl font-bold align-middle items-center inline-flex">AMOUNT</div>
          <div className="col-span-3 inline-flex justify-end items-center">
            <div className="border-2 border-black w-full p-2 gap-2 flex">
              <input
                className="w-full focus:outline-none"
                name="amount"
                type="number"
                value={amount}
                min="0.00"
                max="1000"
                step="0.01"
                onChange={updateAmount}
              />
              <span>ETH</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DonateButton;
