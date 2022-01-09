import { MarketData } from '../../../utils/interfaces';
import MarketHistoryEntry from './MarketHistoryEntry';

interface Props {
  marketData: MarketData;
}

function MarketHistory({ marketData }: Props) {
  if (!marketData) return null;
  if (marketData.activity.length === 0) return null;

  return (
    <div>
      <h3 className="font-bold text-center text-xl sm:text-2xl md:text-3xl">HISTORY</h3>
      <div className="w-full xl:w-4/5 mx-auto">
        <table className="table-fixed w-full">
          <thead className="border-b-2 border-black text-left">
            <tr>
              <th className="w-1/5 p-1">TYPE</th>
              <th className="w-1/5 p-1 hidden md:table-cell">FROM</th>
              <th className="w-1/5 p-1 hidden md:table-cell">TO</th>
              <th className="w-1/5 p-1">PRICE</th>
              <th className="w-1/5 p-1">DATE</th>
            </tr>
          </thead>
          <tbody>
            {marketData.activity.map((activity) => (<MarketHistoryEntry activity={activity} key={activity.id} />))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MarketHistory;
