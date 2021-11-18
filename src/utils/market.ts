import { providers, utils } from 'ethers';
import { getAddress } from '@ethersproject/address';
import { createRaribleSdk as createRaribleSdkInternal } from '@rarible/protocol-ethereum-sdk';
import { toAddress, toBigNumber } from '@rarible/types';
import { Order, OrderActivityFilterByItemTypes, OrderStatus, RaribleV2Order } from '@rarible/ethereum-api-client';
import { EthersWeb3ProviderEthereum } from '@rarible/ethers-ethereum';
import { BASTARD_CONTRACT_ADDRESS } from './constants';
import { displayAddress } from './web3';
import { MarketData } from './interfaces';

export const createRaribleSdk = (provider?: providers.Web3Provider) => {
  const ethereum = provider && new EthersWeb3ProviderEthereum(provider);
  const sdk = createRaribleSdkInternal(ethereum, 'mainnet');
  return sdk;
};

export const getMarketData = async (index: number, provider?: providers.Web3Provider): Promise<MarketData> => {
  const sdk = createRaribleSdk(provider);

  const filter = {
    contract: BASTARD_CONTRACT_ADDRESS,
    tokenId: String(index),
    status: [OrderStatus.ACTIVE],
  };

  const ownershipResult = await sdk.apis.nftOwnership.getNftOwnershipsByItem(filter);

  const owner = getAddress(ownershipResult.ownerships[0].owner);

  const ownerDisplay = await displayAddress(owner, provider);

  const ordersResult = await sdk.apis.order.getSellOrdersByItemAndByStatus(filter);

  // TODO: Support non-ETH orders & non-rarible orders
  const listing = ordersResult.orders[0]?.take.assetType.assetClass === 'ETH' && ordersResult.orders[0]?.type === 'RARIBLE_V2'
    ? ordersResult.orders[0]
    : undefined;

  const listingPriceDisplay = listing && displayPrice(listing);

  const activityResult = await sdk.apis.orderActivity.getOrderActivities({
    orderActivityFilter: {
      '@type': 'by_item',
      types: [
        OrderActivityFilterByItemTypes.BID,
        OrderActivityFilterByItemTypes.LIST,
        OrderActivityFilterByItemTypes.MATCH,
      ],
      contract: toAddress(BASTARD_CONTRACT_ADDRESS),
      tokenId: toBigNumber(String(index)),
    },
  });

  const activity = activityResult.items;

  return { owner, ownerDisplay, listing, listingPriceDisplay, activity };
};

export const displayPrice = (listing: Order) => {
  // TODO: Support non-ETH orders
  const asset = 'ETH';
  const amount = listing.take.valueDecimal?.toString();

  return `${amount} ${asset}`;
};

export const sell = async (tokenId: number, price: string, seller: string, provider: providers.Web3Provider) => {
  const sdk = createRaribleSdk(provider);

  const sellRequest = {
    makeAssetType: {
      assetClass: 'ERC721',
      contract: toAddress(BASTARD_CONTRACT_ADDRESS),
      tokenId: toBigNumber(String(tokenId)),
    },
    amount: 1,
    originFees: [],
    payouts: [],
    maker: toAddress(seller),
    price: toBigNumber(utils.parseEther(price).toString()),
    takeAssetType: {
      assetClass: 'ETH' as const,
    },
  };

  const sellOrder = await sdk.order.sell(sellRequest);

  return sellOrder;
};

export const buy = async (listing: RaribleV2Order, provider: providers.Web3Provider) => {
  const sdk = createRaribleSdk(provider);

  const fillRequest = {
    order: listing,
    amount: 1, // TODO: Check
    // infinite: true,
    // payouts: [],
    // originFees: [],
  };

  const unconfirmedTransaction = await sdk.order.fill(fillRequest);

  return unconfirmedTransaction;
};
