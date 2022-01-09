import { Activity } from '@rarible/ethereum-api-client';
import { useWeb3React } from '@web3-react/core';
import { useAsync } from 'react-async-hook';
import { providers } from 'ethers';
import { displayAddress } from '../../../utils/web3';
import { ETHERSCAN_BASE } from '../../../utils/constants';

interface Props {
  activity: Activity
}

function MarketHistoryEntry({ activity }: Props) {
  const { library } = useWeb3React<providers.Web3Provider>();

  const from = activity['@type'] === 'match'
    ? activity.left.maker
    : activity['@type'] === 'bid' || activity['@type'] === 'list' || activity['@type'] === 'cancel_bid' || activity['@type'] === 'cancel_list'
      ? activity.maker
      : undefined;

  const to = activity['@type'] === 'match'
    ? activity.right.maker
    : undefined;

  const { result: fromDisplay } = useAsync(displayAddress, [from, library]);
  const { result: toDisplay } = useAsync(displayAddress, [to, library]);

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
    <tr className={`border-b ${backgroundColors[activity['@type']]}`}>
      <td className="p-1">{actionName[activity['@type']]}</td>
      <td className="p-1 hidden md:table-cell">
        <a href={`${ETHERSCAN_BASE}/address/${from}`} target="_blank" rel="noreferrer">{fromDisplay}</a>
      </td>
      <td className="p-1 hidden md:table-cell">
        <a href={`${ETHERSCAN_BASE}/address/${to}`} target="_blank" rel="noreferrer">{toDisplay}</a>
      </td>
      <td className="p-1">
        {'price' in activity && `${activity.price} ETH ($${Number.parseFloat(activity.priceUsd?.toString() ?? '').toFixed(0)})`}
      </td>
      <td className="p-1">
        {
          'transactionHash' in activity
            ? <a href={`${ETHERSCAN_BASE}/tx/${activity.transactionHash}`} target="_blank" rel="noreferrer">{dateString}</a>
            : dateString
        }
      </td>
    </tr>
  );
}

export default MarketHistoryEntry;
