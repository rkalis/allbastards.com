import { BigNumber, Contract, providers } from 'ethers';
import BASTARD_ABI from './bastards-abi.json';
import { BASTARD_CONTRACT_ADDRESS, NFT20_ADDRESS, NFTX_V1_ADDRESS, NFTX_V2_ADDRESS } from './constants';

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
  const [indicesRaw] = await contract.functions.tokensOfOwner(address);
  const indices = indicesRaw.map((bn: BigNumber) => bn.toNumber());
  return indices;
};

export const getOwnerFilters = async (provider: providers.Web3Provider, userAddress: string) => {
  const bastardContract = new Contract(BASTARD_CONTRACT_ADDRESS, BASTARD_ABI, provider);

  const userIndices = await getIndicesOwnedByAddress(bastardContract, userAddress);
  const nft20Indices = await getIndicesOwnedByAddress(bastardContract, NFT20_ADDRESS);
  const nftxV1Indices = await getIndicesOwnedByAddress(bastardContract, NFTX_V1_ADDRESS);
  const nftxV2Indices = await getIndicesOwnedByAddress(bastardContract, NFTX_V2_ADDRESS);

  return {
    attribute: 'OWNER',
    options: [
      { label: `YOU - ${userIndices.length}`, value: userIndices },
      { label: `NFT20 - ${nft20Indices.length}`, value: nft20Indices },
      { label: `NFTX V1 - ${nftxV1Indices.length}`, value: nftxV1Indices },
      { label: `NFTX V2 - ${nftxV2Indices.length}`, value: nftxV2Indices },
    ],
  };
};
