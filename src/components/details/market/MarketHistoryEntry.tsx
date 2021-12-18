import { Activity, ActivityFilterByItemType } from '@rarible/ethereum-api-client';
import { useWeb3React } from '@web3-react/core';
import { providers } from 'ethers';
import { useEffect, useState } from 'react';
import { displayAddress } from '../../../utils/web3';

interface Props {
  activity: Activity
}

function MarketHistoryEntry({ activity }: Props) {
  const [from, setFrom] = useState<string>();
  const [to, setTo] = useState<string>();
  const { library } = useWeb3React<providers.Web3Provider>();

  useEffect(() => {
    if (!activity) return;
    setParties(library);
  }, [activity, library]);

  const setParties = async (provider?: providers.Web3Provider) => {
    const fromBase = activity['@type'] === 'match'
      ? activity.left.maker
      : activity['@type'] === 'bid' || activity['@type'] === 'list' || activity['@type'] === 'cancel_bid' || activity['@type'] === 'cancel_list'
        ? activity.maker
        : undefined;

    const toBase = activity['@type'] === 'match'
      ? activity.right.maker
      : undefined;

    const fromDisplay = fromBase && await displayAddress(fromBase, provider);
    const toDisplay = toBase && await displayAddress(toBase, provider);

    setFrom(fromDisplay);
    setTo(toDisplay);
  };

  const dateString = new Date(activity.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase();

  const actionName = {
    match: 'SOLD',
    bid: 'BID',
    list: 'LISTED',
    cancel_bid: 'BID CANCELLED',
    cancel_list: 'LISTING CANCELLED',
    mint: 'MINTED',
    burn: 'BURNED',
    transfer: 'TRANSFERRED',
  };

  const backgroundColors = {
    match: 'bg-blue-200',
    bid: 'bg-purple-200',
    list: 'bg-red-200',
    cancel_bid: 'bg-purple-200',
    cancel_list: 'bg-red-200',
    mint: 'bg-green-200',
    burn: 'bg-green-200',
    transfer: 'bg-green-200',
  };

  return (
    <tr key={activity.id} className={`border-b ${backgroundColors[activity['@type']]}`}>
      <td className="p-1">{actionName[activity['@type']]}</td>
      {/* <td className="p-1">{'source' in activity && platformName[activity.source]}</td> */}
      <td className="p-1 hidden md:table-cell">
        <a href={`https://etherscan.io/address/${from}`} target="_blank" rel="noreferrer">{from}</a>
      </td>
      <td className="p-1 hidden md:table-cell">
        <a href={`https://etherscan.io/address/${to}`} target="_blank" rel="noreferrer">{to}</a>
      </td>
      <td className="p-1">
        {'price' in activity && `${activity.price} ETH ($${Number.parseFloat(activity.priceUsd?.toString() ?? '').toFixed(0)})`}
      </td>
      <td className="p-1">
        {
          'transactionHash' in activity
            ? <a href={`https://etherscan.io/tx/${activity.transactionHash}`} target="_blank" rel="noreferrer">{dateString}</a>
            : dateString
        }
      </td>
    </tr>
  );
}

export default MarketHistoryEntry;
