import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import Button from '../common/Button';
import { lookupEnsName, shortenAddress } from '../../utils/web3';
import { FallbackConnector } from '../../utils/FallbackConnector';
import { emitAnalyticsEvent } from '../../utils';

declare let window: {
  ethereum: any
};

function Wallet() {
  const [label, setLabel] = useState<string>('CONNECT WALLET');
  const { account, library, activate } = useWeb3React<providers.Web3Provider>();
  const injectedConnector = new InjectedConnector({ supportedChainIds: [4] });
  const fallbackConnector = new FallbackConnector({ supportedChainIds: [4] });

  const updateLabel = async () => {
    if (!library || !account) {
      setLabel('CONNECT WALLET');
      return;
    }
    const ensName = await lookupEnsName(account, library);
    setLabel(ensName ?? shortenAddress(account));
  };

  const connectIfUnlocked = async () => {
    if (!window.ethereum) return;
    const connectedAccounts = await window.ethereum.request({ method: 'eth_accounts', params: [] });
    if (connectedAccounts.length > 0) {
      activate(injectedConnector);
      emitAnalyticsEvent('connect_wallet');
    } else {
      activate(fallbackConnector);
    }
  };

  useEffect(() => {
    connectIfUnlocked();
  }, []);

  useEffect(() => {
    updateLabel();
    connectIfUnlocked();
  }, [account]);

  if (!window.ethereum) {
    return null;
  }

  return (
    <Button label={label} onClick={() => activate(injectedConnector)} />
  );
}

export default Wallet;
