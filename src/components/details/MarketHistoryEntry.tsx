import { Activity } from '@rarible/ethereum-api-client';

interface Props {
  activity: Activity
}

function MarketHistoryEntry({ activity }: Props) {
  const dateString = new Date(activity.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

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

  const platformName = {
    RARIBLE: 'Rarible',
    OPEN_SEA: 'OpenSea',
    CRYPTO_PUNKS: 'Invalid',
  };

  if (actionName[activity['@type']].includes('CANCELLED')) return null;

  return (
    <tr key={activity.id} className={`border-b ${backgroundColors[activity['@type']]}`}>
      <td className="p-1">{actionName[activity['@type']]}</td>
      <td className="p-1">{'source' in activity && platformName[activity.source]}</td>
      <td className="p-1">
        {'price' in activity && `${activity.price} ETH ($${Number.parseFloat(activity.priceUsd?.toString() ?? '').toFixed(0)})`}
      </td>
      <td className="p-1">{dateString}</td>
    </tr>
  );
}

export default MarketHistoryEntry;
