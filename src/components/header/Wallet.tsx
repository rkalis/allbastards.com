import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import Button from '../common/Button';
import { lookupEnsName, shortenAddress } from '../../utils/web3';

declare let window: {
  ethereum: any
};

function Wallet() {
  const [label, setLabel] = useState<string>('CONNECT WEB3');
  const { account, library, activate } = useWeb3React();
  const injectedConnector = new InjectedConnector({ supportedChainIds: [1] });

  const updateLabel = async () => {
    if (!library || !account) {
      setLabel('CONNECT WEB3');
      return;
    }
    const ensName = await lookupEnsName(account, library);
    setLabel(ensName ?? shortenAddress(account));
  };

  const connectIfUnlocked = async () => {
    try {
      const connectedAccounts = await window.ethereum.request({ method: 'eth_accounts', params: [] });
      if (connectedAccounts.length > 0) {
        activate(injectedConnector);
      }
    } catch {
      // ignored
    }
  };

  useEffect(() => {
    connectIfUnlocked();
  }, []);

  useEffect(() => {
    updateLabel();
  }, [account]);

  return (
    <Button label={label} onClick={() => activate(injectedConnector)} />
  );
}

export default Wallet;
