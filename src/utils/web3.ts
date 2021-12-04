import { BigNumber, Contract, providers, utils } from 'ethers';
import BASTARD_ABI from './bastards-abi.json';
import ERC20_ABI from './ERC20.json';
import { BASTARD_CONTRACT_ADDRESS, DEAD_ADDRESS, NFT20_ADDRESS, NFTX_ADDRESS, WETH_ADDRESS } from './constants';

export const getLibrary = (provider: any) => new providers.Web3Provider(provider);

export const lookupEnsName = async (address: string, provider: providers.Provider) => {
  try {
    return await provider.lookupAddress(address);
  } catch {
    return undefined;
  }
};

export const shortenAddress = (address: string) => `${address.substr(0, 6)}...${address.substr(address.length - 4, 4)}`;

export const displayAddress = async (address: string, provider?: providers.Web3Provider) => {
  const ensName = provider && await lookupEnsName(address, provider);
  return ensName ?? shortenAddress(address);
};

export const getIndicesOwnedByAddress = async (contract: Contract, address: string) => {
  const [indicesRaw] = await contract.functions.tokensOfOwner(address) as BigNumber[][];
  const indices = indicesRaw.map((bn: BigNumber) => bn.toNumber()).sort((a, b) => a - b);
  return indices;
};

export const getOwnerFilters = async (provider: providers.Web3Provider, userAddress?: string) => {
  const bastardContract = new Contract(BASTARD_CONTRACT_ADDRESS, BASTARD_ABI, provider);

  const userIndices = userAddress && await getIndicesOwnedByAddress(bastardContract, userAddress);
  const nft20Indices = await getIndicesOwnedByAddress(bastardContract, NFT20_ADDRESS);
  const nftxIndices = await getIndicesOwnedByAddress(bastardContract, NFTX_ADDRESS);
  const burnedIndices = await getIndicesOwnedByAddress(bastardContract, DEAD_ADDRESS);

  const filterSpecification = {
    attribute: 'OWNER',
    options: [
      { label: `NFT20 - ${nft20Indices.length}`, value: 'NFT20', indices: nft20Indices },
      { label: `NFTX - ${nftxIndices.length}`, value: 'NFTX', indices: nftxIndices },
      { label: `BURNED - ${burnedIndices.length}`, value: 'BURNED', indices: burnedIndices },
    ],
  };

  if (userIndices) {
    filterSpecification.options.unshift(
      { label: `YOU - ${userIndices.length}`, value: 'YOU', indices: userIndices },
    );
  }

  return filterSpecification;
};

export const checkWethBalance = async (account: string, requiredBalance: string, provider: providers.Web3Provider) => {
  const wethContract = new Contract(WETH_ADDRESS, ERC20_ABI, provider);
  const bidderBalance = await wethContract.balanceOf(account);

  if (utils.parseEther(requiredBalance).gt(bidderBalance)) {
    throw new Error('WETH BALANCE TOO LOW');
  }
};
