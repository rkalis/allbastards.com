import { providers, utils } from 'ethers';
import { getAddress } from '@ethersproject/address';
import { createRaribleSdk as createRaribleSdkInternal } from '@rarible/protocol-ethereum-sdk';
import { toAddress, toBigNumber } from '@rarible/types';
import { ActivitySort, Order, OrderActivityFilterByItemTypes, OrderStatus, Platform, RaribleV2Order } from '@rarible/ethereum-api-client';
import { EthersWeb3ProviderEthereum } from '@rarible/ethers-ethereum';
import { BASTARD_CONTRACT_ADDRESS, WETH_ADDRESS } from './constants';
import { checkWethBalance, displayAddress } from './web3';
import { MarketData } from './interfaces';

export const createRaribleSdk = (provider?: providers.Web3Provider) => {
  const ethereum = provider && new EthersWeb3ProviderEthereum(provider);
  const sdk = createRaribleSdkInternal(ethereum, 'mainnet');
  return sdk;
};

export const getMarketData = async (tokenId: number, provider?: providers.Web3Provider): Promise<MarketData> => {
  const { owner, ownerDisplay } = await getOwner(tokenId, provider);
  const listings = await getSortedListings(tokenId, provider);
  const bids = await getSortedBids(tokenId, provider);
  const activity = await getActivity(tokenId, provider);

  return { tokenId, owner, ownerDisplay, listings, bids, activity };
};

export const getOwner = async (tokenId: number, provider?: providers.Web3Provider) => {
  const sdk = createRaribleSdk(provider);

  const filter = {
    contract: BASTARD_CONTRACT_ADDRESS,
    tokenId: String(tokenId),
    status: [OrderStatus.ACTIVE],
  };

  const ownershipResult = await sdk.apis.nftOwnership.getNftOwnershipsByItem(filter);

  const owner = getAddress(ownershipResult.ownerships[0].owner);

  const ownerDisplay = await displayAddress(owner, provider);

  return { owner, ownerDisplay };
};

export const getSortedListings = async (tokenId: number, provider?: providers.Web3Provider) => {
  const sdk = createRaribleSdk(provider);

  const filter = {
    contract: BASTARD_CONTRACT_ADDRESS,
    tokenId: String(tokenId),
    platform: Platform.RARIBLE,
    status: [OrderStatus.ACTIVE],
  };

  const { orders: listings } = await sdk.apis.order.getSellOrdersByItemAndByStatus(filter);

  // TODO: Support non-ETH orders & non-rarible orders
  const listingsInEth = listings.filter((listing) => listing.take.assetType.assetClass === 'ETH');
  const raribleListingsInEth = listingsInEth.filter((listing) => listing.type === 'RARIBLE_V2') as RaribleV2Order[];

  // TODO: Sort -- currently already sorted by Rarible SDK
  return raribleListingsInEth;
};

export const getSortedBids = async (tokenId: number, provider?: providers.Web3Provider) => {
  const sdk = createRaribleSdk(provider);

  const filter = {
    contract: BASTARD_CONTRACT_ADDRESS,
    tokenId: String(tokenId),
    platform: Platform.RARIBLE,
    status: [OrderStatus.ACTIVE],
  };

  const { orders: bids } = await sdk.apis.order.getOrderBidsByItemAndByStatus(filter);

  // TODO: Support non-WETH orders & non-rarible orders
  const bidsInWeth = bids.filter((listing) => (
    listing.make.assetType.assetClass === 'ERC20' && getAddress(listing.make.assetType.contract) === WETH_ADDRESS
  ));
  const raribleBidsInWeth = bidsInWeth.filter((bid) => bid.type === 'RARIBLE_V2') as RaribleV2Order[];

  // TODO: Sort -- currently already sorted by Rarible SDK
  return raribleBidsInWeth;
};

export const getActivity = async (tokenId: number, provider?: providers.Web3Provider) => {
  const sdk = createRaribleSdk(provider);

  const { items: activity } = await sdk.apis.orderActivity.getOrderActivities({
    orderActivityFilter: {
      '@type': 'by_item',
      types: [
        OrderActivityFilterByItemTypes.BID,
        OrderActivityFilterByItemTypes.LIST,
        OrderActivityFilterByItemTypes.MATCH,
      ],
      contract: toAddress(BASTARD_CONTRACT_ADDRESS),
      tokenId: toBigNumber(String(tokenId)),
    },
    sort: ActivitySort.LATEST_FIRST,
  });

  return activity;
};

export const getListingPriceDisplay = (listings: Order[]) => {
  if (listings.length === 0) return undefined;
  return displayPrice(listings[0], 'take');
};

export const getBidPriceDisplay = (bids: Order[]) => {
  if (bids.length === 0) return undefined;
  return displayPrice(bids[0], 'make');
};

export const getBidsFromAccount = (bids: Order[], account: string) => (
  bids.filter((bid) => bid.maker === toAddress(account))
);

export const displayPrice = (listing: Order, side: 'make' | 'take') => {
  // TODO: Support non-ETH orders
  const asset = 'ETH';
  const amount = listing[side].valueDecimal?.toString();

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

export const updateListing = async (listing: RaribleV2Order, newPrice: string, provider: providers.Web3Provider) => {
  const sdk = createRaribleSdk(provider);

  const updateRequest = {
    order: listing,
    price: toBigNumber(utils.parseEther(newPrice).toString()),
  };

  const updatedSellOrder = await sdk.order.sellUpdate(updateRequest);

  return updatedSellOrder;
};

export const updateBid = async (bid: RaribleV2Order, newPrice: string, provider: providers.Web3Provider) => {
  const sdk = createRaribleSdk(provider);

  await checkWethBalance(bid.maker.toString(), newPrice, provider);

  const updateRequest = {
    order: bid,
    price: toBigNumber(utils.parseEther(newPrice).toString()),
  };

  const updatedBid = await sdk.order.bidUpdate(updateRequest);

  return updatedBid;
};

export const cancel = async (listingOrBid: RaribleV2Order, provider: providers.Web3Provider) => {
  const sdk = createRaribleSdk(provider);

  const unconfirmedTransaction = await sdk.order.cancel(listingOrBid);

  return unconfirmedTransaction;
};

export const fill = async (listingOrBid: RaribleV2Order, provider: providers.Web3Provider) => {
  const sdk = createRaribleSdk(provider);

  const fillRequest = {
    order: listingOrBid,
    amount: 1,
    // infinite: true,
    // payouts: [],
    // originFees: [],
  };

  const unconfirmedTransaction = await sdk.order.fill(fillRequest);

  return unconfirmedTransaction;
};

export const bid = async (tokenId: number, price: string, bidder: string, provider: providers.Web3Provider) => {
  const sdk = createRaribleSdk(provider);

  await checkWethBalance(bidder, price, provider);

  const bidRequest = {
    makeAssetType: {
      assetClass: 'ERC20' as const,
      contract: toAddress(WETH_ADDRESS),
    },
    takeAssetType: {
      assetClass: 'ERC721',
      contract: toAddress(BASTARD_CONTRACT_ADDRESS),
      tokenId: toBigNumber(String(tokenId)),
    },
    amount: 1,
    originFees: [],
    payouts: [],
    maker: toAddress(bidder),
    price: toBigNumber(utils.parseEther(price).toString()),
  };

  const bidOrder = await sdk.order.bid(bidRequest);

  return bidOrder;
};

// export declare type BidRequest = {
//   makeAssetType: EthAssetType | Erc20AssetType;
//   amount: number;
//   takeAssetType: AssetTypeRequest;
// } & HasPrice & OrderRequest;

// export declare type HasPrice = {
//   price: BigNumberValue;
// } | {
//   priceDecimal: BigNumberValue;
// };

// export declare type OrderRequest = {
//   maker?: Address;
//   payouts: Part[];
//   originFees: Part[];
// };
