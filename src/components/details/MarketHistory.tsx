import { MarketData } from '../../utils/interfaces';
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
      <div className="w-3/4 mx-auto">
        <table className="table-fixed w-full">
          <thead className="border-b-2 border-black text-left">
            <tr>
              <th className="w-1/4 p-1">TYPE</th>
              <th className="w-1/4 p-1">PLATFORM</th>
              <th className="w-1/4 p-1">PRICE</th>
              <th className="w-1/4 p-1">DATE</th>
            </tr>
          </thead>
          <tbody>
            {marketData.activity.map((activity) => (<MarketHistoryEntry activity={activity} />))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MarketHistory;
