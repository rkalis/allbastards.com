import { BigNumber, Contract, providers } from 'ethers';
import BASTARD_ABI from './bastards-abi.json';
import { BASTARD_CONTRACT_ADDRESS, DEAD_ADDRESS, NFT20_ADDRESS, NFTX_V2_ADDRESS } from './constants';

export const getLibrary = (provider: any) => new providers.Web3Provider(provider);

export const lookupEnsName = async (address: string, provider: providers.Provider) => {
  try {
    return await provider.lookupAddress(address);
  } catch {
    return undefined;
  }
};

export const shortenAddress = (address: string) => `${address.substr(0, 6)}...${address.substr(address.length - 4, 4)}`;

export const displayConnectedAddress = async (address: string, provider?: providers.Web3Provider) => {
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
  const nftxV2Indices = await getIndicesOwnedByAddress(bastardContract, NFTX_V2_ADDRESS);
  const burnedIndices = await getIndicesOwnedByAddress(bastardContract, DEAD_ADDRESS);

  const filterSpecification = {
    attribute: 'OWNER',
    options: [
      { label: `NFT20 - ${nft20Indices.length}`, value: 'NFT20', indices: nft20Indices },
      { label: `NFTX - ${nftxV2Indices.length}`, value: 'NFTX', indices: nftxV2Indices },
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
