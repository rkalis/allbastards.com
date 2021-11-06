import { providers } from 'ethers';
import { getAddress } from '@ethersproject/address';
import { createRaribleSdk } from '@rarible/protocol-ethereum-sdk';
import { toAddress, toBigNumber } from '@rarible/types';
import { Order, OrderActivityFilterByItemTypes, OrderStatus } from '@rarible/ethereum-api-client';
import { EthersWeb3ProviderEthereum } from '@rarible/ethers-ethereum';
import { BASTARD_CONTRACT_ADDRESS } from './constants';
import { displayAddress } from './web3';
import { MarketData } from './interfaces';

export const getMarketData = async (index: number, provider?: providers.Web3Provider): Promise<MarketData> => {
  const ethereum = provider && new EthersWeb3ProviderEthereum(provider);
  const sdk = createRaribleSdk(ethereum, 'mainnet');

  const filter = {
    contract: BASTARD_CONTRACT_ADDRESS,
    tokenId: String(index),
    status: [OrderStatus.ACTIVE],
  };

  const ownershipResult = await sdk.apis.nftOwnership.getNftOwnershipsByItem(filter);

  const owner = getAddress(ownershipResult.ownerships[0].owner);

  console.log(provider)
  const ownerDisplay = await displayAddress(owner, provider);

  const ordersResult = await sdk.apis.order.getSellOrdersByItemAndByStatus(filter);

  // TODO: Support non-ETH orders
  const listing = ordersResult.orders[0]?.take.assetType.assetClass === 'ETH'
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
