import { useEffect } from 'react';
import { useAsync } from 'react-async-hook';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import Button from '../common/Button';
import { displayAddress } from '../../utils/web3';
import { FallbackConnector } from '../../utils/FallbackConnector';
import { emitAnalyticsEvent } from '../../utils';

declare let window: {
  ethereum: any
};

function Wallet() {
  const injectedConnector = new InjectedConnector({ supportedChainIds: [(process.env.REACT_APP_ETHEREUM_NETWORK === 'rinkeby' ? 4 : 1)] });
  const fallbackConnector = new FallbackConnector({ supportedChainIds: [(process.env.REACT_APP_ETHEREUM_NETWORK === 'rinkeby' ? 4 : 1)] });

  const { account, library, activate } = useWeb3React<providers.Web3Provider>();
  const { result: label = 'CONNECT WALLET' } = useAsync(displayAddress, [account, library], {
    setLoading: (state) => ({ ...state, loading: true }),
  });

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
  }, [account]);

  if (!window.ethereum) {
    return null;
  }

  return (
    <Button label={label} onClick={() => activate(injectedConnector)} />
  );
}

export default Wallet;
