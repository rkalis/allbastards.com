/* eslint-disable class-methods-use-this */
import { InjectedConnector, NoEthereumProviderError } from '@web3-react/injected-connector';
import { ConnectorUpdate } from '@web3-react/types';

declare let window: {
  ethereum: any;
};

export class FallbackConnector extends InjectedConnector {
  public async activate(): Promise<ConnectorUpdate> {
    if (!window.ethereum) {
      throw new NoEthereumProviderError();
    }

    // Disable ethereum send / enable so that InjectedConnector does not trigger popups
    const oldSend = window.ethereum.send;
    const oldEnable = window.ethereum.enable;
    window.ethereum.send = async () => ({ result: [] });
    window.ethereum.enable = async () => (undefined);

    const result = await super.activate();

    window.ethereum.send = oldSend;
    window.ethereum.enable = oldEnable;

    return result;
  }

  public async getAccount(): Promise<null> {
    return null;
  }
}
